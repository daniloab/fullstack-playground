import SES, { PromiseResult } from 'aws-sdk/clients/ses';

// eslint-disable-next-line
import AWS from 'aws-sdk';
import HTMLToText from 'html-to-text';

export type sendEmailPayload = {
  name?: string;
  email?: string;
  emailHtml?: string;
  subject: string;
};

export const sendEmail = async (payload: sendEmailPayload): Promise<PromiseResult<object, Error>> => {
  const { email: rawEmail, subject, emailHtml, name } = payload;

  const email = rawEmail.replace(/(\+\w+)/, '');

  const ses = new SES();
  const plainText = HTMLToText.fromString(emailHtml, {
    ignoreImage: true,
  });

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Data: emailHtml,
        },
        Text: {
          Data: plainText,
        },
      },
      Subject: {
        Data: subject,
      },
    },
    Source: `${name} <${email}>`,
    ReplyToAddresses: [email],
    ReturnPath: email,
  };

  // eslint-disable-next-line
  // set region if not set (as not set by the SDK by default)
  // if (!AWS.config.region) {
  //   AWS.config.update({
  //     region: 'eu-west-1',
  //   });
  // }

  try {
    return await ses.sendEmail(params).promise();
  } catch (err) {
    // eslint-disable-next-line
    console.log('Error when sending email with ses:', err);

    return err.toString();
  }
};
