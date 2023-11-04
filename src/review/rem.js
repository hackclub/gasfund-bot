const { App } = require('@slack/bolt');

const handleRemButton = async ({ ack, body, client }) => {
    await ack();
    
    const remmodalView = {
        type: 'modal',
        callback_id: 'modal-callback-3', 
        title: {
          type: 'plain_text',
          text: 'The Gas Fund 3/3',
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
            block_id: 'rem_method',
            element: {
              type: 'static_select',
              action_id: 'input_rem_method',
              placeholder: {
                type: 'plain_text',
                text: 'How would you like to be reimbursed?',
              },
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'ACH Transfer',
                  },
                  value: 'ACH Transfer',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'International Wire Transfer',
                  },
                  value: 'International Wire Transfer',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Mailed Check',
                  },
                  value: 'Mailed Check',
                },
              ],
            },
            label: {
              type: 'plain_text',
              text: 'How did you travel to the hackathon?',
            },
            optional: false, 
          },
        ],
        submit: {
          type: 'plain_text',
          text: 'Submit',
        }
      };
 

  try {
    await client.views.open({
      trigger_id: body.trigger_id,
      view: remmodalView,
    });
  } catch (error) {
    console.error('Error opening step 2 modal:', error);
  };
};
  
  module.exports = {
    handleRemButton, 
  };
  