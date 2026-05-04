const express = require("express");
const Joi = require("joi");
const NetworkEvent = require("../models/NetworkEvent");
const { sendEvent } = require("../services/kafkaProducer");

const router = express.Router();

const eventSchema = Joi.object({
  type: Joi.string()
    .valid("connection", "disconnection", "error", "alert", "traffic")
    .required(),
  severity: Joi.string().valid("low", "medium", "high", "critical").required(),
  sourceIp: Joi.string().required(),
  latency: Joi.number().min(0).default(0),
  timestamp: Joi.date().iso(),
  metadata: Joi.object().unknown(true),
});

// POST /events
router.post("/", async (req, res) => {
  const { error, value } = eventSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const event = await NetworkEvent.create(value);
  await sendEvent(event.toObject());
  res.status(201).json(event);
});

// GET
router.get("/", async (req, res) => {
  const { type, severity, from, to } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (severity) filter.severity = severity;
  if (from || to) {
    filter.timestamp = {};
    if (from) filter.timestamp.$gte = new Date(from);
    if (to) filter.timestamp.$lte = new Date(to);
  }
  const events = await NetworkEvent.find(filter)
    .sort({ timestamp: -1 })
    .limit(50);
  return res.json(events);
});

// GET /events/stats
router.get("/stats", async (req, res) => {
  const stats = await NetworkEvent.aggregate([
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
        avgLatency: { $avg: "$latency" },
      },
    },
    {
      $project: {
        _id: 0,
        eventType: "$_id",
        count: 1,
        avgLatency: { $round: ["$avgLatency", 2] },
      },
    },
    { $sort: { eventType: 1 } },
  ]);
  return res.json(stats);
});

module.exports = router;