require('dotenv').config();

const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SOCKET_TOKEN,
  socketMode: true,
  logLevel: 'debug',
});

app.message('gas', async ({ message, say, client }) => {
  const gasButton = {
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
            action_id: "gas_button",
            style: 'primary',
          },
        ],
      },
    ],
    thread_ts: message.ts,
  };

  await say(gasButton);

  try {
    await client.reactions.add({
      token: process.env.SLACK_BOT_TOKEN,
      name: 'fuelpump', 
      channel: message.channel,
      timestamp: message.ts,
    });
  } catch (error) {
    console.error('Error adding reaction:', error);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
