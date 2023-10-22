require('dotenv').config();

const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

async function sendGasMessage(channelId, ts) {
  try {
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channelId,
      text: 'gas button:',
      thread_ts: ts,
      blocks: [
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Reimburse me!',
              },
              action_id: 'gas_button_click',
              style: 'primary',
            },
          ],
        },
      ],
    });
    console.log('gas button sent');
  } catch (error) {
    console.error('Error sending "gas button" message:', error);
  }
}

const channelId = 'gas-fund-dev';

app.action('gas_button_click', async ({ ack, body }) => {
  ack();
  sendGasMessage(channelId);
});

app.event("message", async ({ event }) => {
  if (event.text.contains("gas) && event.channel_id === channelId) {
    sendGasMessage(channelId, event.ts);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');

  setInterval(() => {
    sendGasMessage(channelId);
  }, 200000);
})();
