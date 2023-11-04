const { App } = require('@slack/bolt');

const reviewApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SOCKET_TOKEN,
  socketMode: true,
  logLevel: 'debug',
});

const handleReviewButton = async ({ ack, body, client }) => {
  await ack();

  const revmodalView = {
    type: 'modal',
    callback_id: 'modal-callback-2', 
    title: {
      type: 'plain_text',
      text: 'The Gas Fund 2/3',
    },
    blocks: [
      {
        type: 'section',
        block_id: 'description',
        text: {
          type: 'mrkdwn',
          text: 'Submit Receipts & Selfies for Reimbursement',
        },
      },

      {
        type: 'input',
        block_id: 'post',
        element: {
          type: 'plain_text_input',
          action_id: 'input_post',
        },
        label: {
          type: 'plain_text',
          text: 'Link to your message in #gas-fund.',
        },
      },
      {
        type: 'section',
        block_id: 'selfie',
        text: {
          type: 'mrkdwn',
          text: '*Attach a selfie of you at the hackathon.*',
        },
        accessory: {
          type: 'button',
          action_id: 'button_open_url',
          text: {
            type: 'plain_text',
            text: 'Attach Selfie',
          },
          url: 'https://example.com/', 
        },
      },
      {
        type: 'input',
        block_id: 'travel_method',
        element: {
          type: 'static_select',
          action_id: 'input_travel_method',
          placeholder: {
            type: 'plain_text',
            text: 'Select a travel method',
          },
          options: [
            {
              text: {
                type: 'plain_text',
                text: 'in a car (as either a driver as a passenger)',
              },
              value: 'in a car (as either a driver as a passenger)',
            },
            {
              text: {
                type: 'plain_text',
                text: 'On a bus or a train',
              },
              value: 'On a bus or a train',
            },
          ],
        },
        label: {
          type: 'plain_text',
          text: 'How did you travel to the hackathon?',
        },
        optional: false, 
      },
      {
        type: 'input',
        block_id: 'amount',
        element: {
          type: 'plain_text_input',
          action_id: 'input_amount',
        },
        label: {
          type: 'plain_text',
          text: 'How much did you spend on gas for your journey?\nPlease use <https://www.calculator.net/fuel-cost-calculator.html> , we\'ll ask you to submit a screenshot of this page in the next question.',
        },
      },
      {
        type: 'section',
        block_id: 'screenshot',
        text: {
          type: 'mrkdwn',
          text: '*Please attach that screenshot, thank you!*',
        },
        accessory: {
          type: 'button',
          action_id: 'button_open_url',
          text: {
            type: 'plain_text',
            text: 'Attach Selfie',
          },
          url: 'https://example.com/', 
        },
      },
    ],
    submit: {
      type: 'plain_text',
      text: 'Next',
    }
  };

  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: revmodalView,
    });
  } catch (error) {
    console.error('Error opening modal:', error);
  }
};


module.exports = {
  handleReviewButton,
};
