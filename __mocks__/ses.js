const SES = jest.fn(() => ({
  sendEmail: jest.fn(() => ({
    promise: () => new Promise(res => res(true)),
  })),
  sendRawEmail: jest.fn(() => ({
    promise: () => new Promise(res => res(true)),
  })),
}));

export default SES;
