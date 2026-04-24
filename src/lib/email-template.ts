interface ContactEmailProps {
	name: string;
	phone: string;
	interest: string;
	message?: string;
}

export function contactEmailHtml({
	name,
	phone,
	interest,
	message,
}: ContactEmailProps): string {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Request – Seal Solutions</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f2f7;font-family:'DM Sans',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(15,26,69,0.12);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f1a45 0%,#1a2b6b 60%,#2d4090 100%);padding:40px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">Seal Solutions Limited</p>
                    <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.2;">New Callback Request</h1>
                    <p style="margin:8px 0 0 0;font-size:13px;color:rgba(255,255,255,0.55);">A potential client has submitted a contact form.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Gold accent line -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#c9a84c,#e8c97a,#c9a84c);"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 48px;">

              <p style="margin:0 0 28px 0;font-size:15px;color:#4b5563;line-height:1.6;">
                Here are the details submitted through the website contact form:
              </p>

              <!-- Detail cards -->
              <table width="100%" cellpadding="0" cellspacing="0">

                <tr>
                  <td style="padding-bottom:12px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;border-radius:10px;border-left:4px solid #c9a84c;">
                      <tr>
                        <td style="padding:16px 20px;">
                          <p style="margin:0 0 2px 0;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;">Full Name</p>
                          <p style="margin:0;font-size:16px;font-weight:600;color:#0f1a45;">${name}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom:12px;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;border-radius:10px;border-left:4px solid #1a2b6b;">
                      <tr>
                        <td style="padding:16px 20px;">
                          <p style="margin:0 0 2px 0;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1a2b6b;">Phone Number</p>
                          <p style="margin:0;font-size:16px;font-weight:600;color:#0f1a45;">${phone}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom:${message ? "12px" : "0"};">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;border-radius:10px;border-left:4px solid #c9a84c;">
                      <tr>
                        <td style="padding:16px 20px;">
                          <p style="margin:0 0 2px 0;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;">Interest</p>
                          <p style="margin:0;font-size:16px;font-weight:600;color:#0f1a45;">${interest}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                ${
					message
						? `
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;border-radius:10px;border-left:4px solid #1a2b6b;">
                      <tr>
                        <td style="padding:16px 20px;">
                          <p style="margin:0 0 6px 0;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1a2b6b;">Message</p>
                          <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                `
						: ""
				}

              </table>

              <!-- CTA reminder -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;background:linear-gradient(135deg,#0f1a45,#1a2b6b);border-radius:10px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;">
                      <span style="color:#c9a84c;font-weight:700;">Reminder:</span> Please follow up with this client within <strong style="color:#ffffff;">24 hours</strong> to maintain our service standard.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f5f0;padding:28px 48px;border-top:1px solid #e5e7eb;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px 0;font-size:12px;font-weight:700;color:#0f1a45;">Seal Solutions Limited</p>
                    <p style="margin:0;font-size:11px;color:#9ca3af;">112B Brigstock Road, Thornton Heath, Croydon, CR7 7JB</p>
                    <p style="margin:4px 0 0 0;font-size:11px;color:#9ca3af;">+44 7879 183213 &nbsp;·&nbsp; sealsolutionslim@gmail.com</p>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <p style="margin:0;font-size:10px;color:#d1d5db;">This is an automated notification.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;
}
