const { App } = require('@slack/bolt');

const handleInfoButton = async ({ ack, body, client }) => {
  await ack();

  const modalView = {
    type: 'modal',
    callback_id: 'modal-callback-1',
    title: {
      type: 'plain_text',
      text: 'The Gas Fund 1/3',
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
        block_id: 'name',
        element: {
          type: 'plain_text_input',
          action_id: 'input_name',
        },
        label: {
          type: 'plain_text',
          text: "What's your name?",
        },
      },
      {
        type: 'input',
        block_id: 'phone_num',
        element: {
          type: 'plain_text_input',
          action_id: 'input_phone_num',
        },
        label: {
          type: 'plain_text',
          text: "What's your phone number?",
        },
      },
      {
        type: 'input',
        block_id: 'email',
        element: {
          type: 'plain_text_input',
          action_id: 'input_email',
        },
        label: {
          type: 'plain_text',
          text: "What's your email address?",
        },
      },
      
    ],
    submit: {
      type: 'plain_text',
      text: 'Next',
    },
    close: {
      type: 'plain_text',
      text: 'Cancel',
    },
  };

  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: modalView,
    });
  } catch (error) {
    console.error('Error opening modal:', error);
  }
};

module.exports = {
  handleInfoButton,
};
