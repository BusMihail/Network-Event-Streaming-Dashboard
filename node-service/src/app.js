const express = require("express");
const eventsRouter = require("./routes/events");

const app = express();

app.use(express.json());
app.use("/events", eventsRouter);

app.get("/health", (req, res) => res.json({ status: "ok" }));

module.exports = app;
