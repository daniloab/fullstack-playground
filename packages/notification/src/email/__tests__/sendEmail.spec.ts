import SES from 'aws-sdk/clients/ses';

import { sendEmail } from '../sendEmail';
import { getHtmlEmail } from '../htmlEmail';

type SesCall = {
  Destination: {
    ToAddresses: string[];
  };
  Message: {
    Body: {
      Html: {
        Data: string;
      };
      Text: {
        Data: string;
      };
    };
    Subject: {
      Data: string;
    };
  };
  Source: string;
  ReplyToAddresses: string[];
  ReturnPath: string;
};

export const getEmailFromSes = (): SesCall[] => {
  let emails: SesCall = [];

  SES.mock.results.map(result => {
    result.value.sendEmail.mock.calls.map(call => {
      if (Array.isArray(call) && call.length > 0) {
        emails = [...emails, call[0]];
      }
    });
  });

  return emails;
};

it('should send email and validate href token', async () => {
  const token = 'token';

  const url = `https://fullstackplayground/login?token=${token}`;

  const emailName = 'Danilo Assis';

  const payload = {
    email: 'hi@daniloassis.dev',
    name: emailName,
    subject: 'Fullstack Playground - Login',
    emailHtml: getHtmlEmail({ name: emailName, url }),
  };

  await sendEmail(payload);

  const emails = getEmailFromSes();

  expect(emails.length).toBe(1);

  // expect(response.body.errors).toBeUndefined();
  // expect(response.body.data.version).toBe(version);
});
