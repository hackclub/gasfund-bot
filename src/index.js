require('dotenv').config();

const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

async function sendGasMessage(channelId) {
  try {
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channelId,
      text: 'gas',
    });
    console.log('Sent "gas" message');
  } catch (error) {
    console.error('Error sending "gas" message:', error);
  }
}

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');

  const channelId = 'gas-fund-dev';

  setInterval(() => {
    sendGasMessage(channelId);
  }, 2000); 
})();
