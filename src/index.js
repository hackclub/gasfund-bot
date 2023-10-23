require('dotenv').config();

const { App, ExpressReceiver } = require('@slack/bolt');

const expressReceiver = new ExpressReceiver({ signingSecret: process.env.SLACK_SIGNING_SECRET });
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  receiver: expressReceiver,
  logLevel: 'debug',
});


async function sendGasMessage(channelId, ts) {
  try {
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channelId || "gas-fund-dev",
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

app.message(async ({ message }) => {
  console.log('Received message:', message.text, 'in channel', message.channel);

  if (message.text && message.text.toLowerCase().includes('gas')) {
    sendGasMessage(message.channel, message.ts);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
