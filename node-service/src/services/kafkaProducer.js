const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: 'node-service',
    brokers: [process.env.KAFKA_BROKER || 'localhost:29092']
});

const producer = kafka.producer();

async function connectProducer() {
    await producer.connect();
    console.log('Kafka producer connected');
}

async function sendEvent(event){
    try {
        await producer.send({
            topic: 'network-events',
            messages: [
                { value: JSON.stringify(event) }
            ],
        });
    } catch (err) {
        console.error('Kafka send failed:', err.message);
    }
}

module.exports = {connectProducer, sendEvent};