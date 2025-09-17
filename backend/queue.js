const amqp = require('amqplib');

async function connectQueue() {
  try {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();

    const queue = 'tasks';
    await channel.assertQueue(queue);

    // Example producer
    function sendTask(msg) {
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log('📤 Sent:', msg);
    }

    // Example consumer
    channel.consume(queue, (msg) => {
      console.log('📥 Received:', msg.content.toString());
      channel.ack(msg);
    });

    return { sendTask };
  } catch (err) {
    console.error('RabbitMQ connection error:', err);
  }
}

module.exports = connectQueue;
