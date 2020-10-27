type HtmlCompositionProps = {
  name: string;
  url: string;
};

export const getHtmlEmail = ({ name, url }: HtmlCompositionProps): string => {
  return `
    <table width="100%" height="100%">
      <tbody>
        <tr>
          <td align="center">
            <table
              width="auto"
              style="background:#fff;border-radius:2px;margin:0px auto;padding:20px 20px"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <table width="100%" style="margin:15px 0">
                      <tbody>
                        <tr>
                          <td align="center">
                            <table width="100%">
                              <tbody>
                                <tr>
                                  <td align="center">
                                    <p style='font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";color:#607389;font-size:14px;font-weight:600;text-align:center;margin:5 auto;line-height:1.71;letter-spacing:0.4px'>
                                      Hi, ${name}. Welcome to
                                      Fullstack Playground!
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table width="100%" style="margin:15px 0">
                      <tbody>
                        <tr>
                          <td align="center">
                            <table width="100%">
                              <tbody>
                                <tr>
                                  <td align="center">
                                    <p style='font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";color:#607389;font-size:14px;font-weight:600;text-align:center;margin:5 auto;line-height:1.71;letter-spacing:0.4px'>
                                      Please click the button below to sign in{" "}
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td align="center">
                            <a
                              href="${url}"
                              rel="noopener"
                              style='font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";border-radius:100px;background:#309dd1;padding:8px 20px;font-weight:600;color:#fff;text-decoration:none'
                              target="_blank"
                              data-saferedirecturl="https://www.google.com/url?q=${url}"
                            >
                              Sign In
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>`;
};
