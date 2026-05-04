const mongoose = require('mongoose');

const networkEventSchema = new mongoose.Schema({
    type:  {
        type: String,
        required: true,
        enum: ['connection', 'disconnection', 'error', 'alert', 'traffic'],
    },
    severity: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high', 'critical'],
    },
    sourceIp: { type: String, required: true},
    timestamp: { type: Date, default: Date.now },
    latency: { type:Number, default: 0 },
    metadata: { type: mongoose.Schema.Types.Mixed },
});

module.exports = mongoose.model('NetworkEvent', networkEventSchema);