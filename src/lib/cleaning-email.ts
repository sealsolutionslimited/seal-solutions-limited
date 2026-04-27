import { EXTRAS, SERVICE_TYPES, formatPrice } from "./cleaningPricing";

interface BookingEmailData {
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	serviceType: string;
	bedrooms: number;
	bathrooms: number;
	extras: string[];
	address: string;
	postcode: string;
	date: string;
	timeSlot: string;
	notes: string;
	totalAmount: number;
	bookingRef: string;
}

function row(label: string, value: string, accent = "#c9a84c") {
	return `
	<tr>
	  <td style="padding-bottom:10px;">
	    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;border-radius:10px;border-left:4px solid ${accent};">
	      <tr>
	        <td style="padding:14px 18px;">
	          <p style="margin:0 0 2px 0;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${accent};">${label}</p>
	          <p style="margin:0;font-size:15px;font-weight:600;color:#0f1a45;">${value}</p>
	        </td>
	      </tr>
	    </table>
	  </td>
	</tr>`;
}

export function cleaningConfirmationHtml(data: BookingEmailData): string {
	const service = SERVICE_TYPES[data.serviceType]?.label ?? data.serviceType;
	const extraLabels = data.extras.map((e) => EXTRAS[e]?.label ?? e).join(", ") || "None";
	const formattedDate = new Date(data.date).toLocaleDateString("en-GB", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking Confirmed – Seal Solutions</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f2f7;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(15,26,69,0.12);">

          <tr>
            <td style="background:linear-gradient(135deg,#0f1a45 0%,#1a2b6b 60%,#2d4090 100%);padding:40px 48px;">
              <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">Seal Solutions Limited</p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.2;">Booking Confirmed!</h1>
              <p style="margin:8px 0 0 0;font-size:13px;color:rgba(255,255,255,0.6);">Your cleaning has been booked and paid. See you soon, ${data.customerName.split(" ")[0]}!</p>
            </td>
          </tr>

          <tr><td style="height:4px;background:linear-gradient(90deg,#c9a84c,#e8c97a,#c9a84c);"></td></tr>

          <tr>
            <td style="padding:40px 48px;">
              <p style="margin:0 0 24px 0;font-size:15px;color:#4b5563;line-height:1.6;">Here is a summary of your booking:</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${row("Booking Reference", data.bookingRef)}
                ${row("Service", service, "#1a2b6b")}
                ${row("Date & Time", `${formattedDate} at ${data.timeSlot}`)}
                ${row("Address", `${data.address}, ${data.postcode}`, "#1a2b6b")}
                ${row("Property", `${data.bedrooms} bedroom${data.bedrooms !== 1 ? "s" : ""} · ${data.bathrooms} bathroom${data.bathrooms !== 1 ? "s" : ""}`)}
                ${data.extras.length > 0 ? row("Add-ons", extraLabels, "#1a2b6b") : ""}
                ${data.notes ? row("Your Notes", data.notes) : ""}
                ${row("Total Paid", formatPrice(data.totalAmount), "#1a2b6b")}
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;background:linear-gradient(135deg,#0f1a45,#1a2b6b);border-radius:10px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;color:#c9a84c;">What happens next?</p>
                    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.75);line-height:1.7;">
                      Our team will review your booking and send a cleaner confirmation within 2 hours.
                      If you need to make any changes please call us on <strong style="color:#ffffff;">+44 7879 183213</strong> or reply to this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#f8f5f0;padding:28px 48px;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 4px 0;font-size:12px;font-weight:700;color:#0f1a45;">Seal Solutions Limited</p>
              <p style="margin:0;font-size:11px;color:#9ca3af;">112B Brigstock Road, Thornton Heath, Croydon, CR7 7JB</p>
              <p style="margin:4px 0 0 0;font-size:11px;color:#9ca3af;">+44 7879 183213 &nbsp;·&nbsp; sealsolutionslim@gmail.com</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function cleaningAdminNotificationHtml(data: BookingEmailData): string {
	const service = SERVICE_TYPES[data.serviceType]?.label ?? data.serviceType;
	const extraLabels = data.extras.map((e) => EXTRAS[e]?.label ?? e).join(", ") || "None";
	const formattedDate = new Date(data.date).toLocaleDateString("en-GB", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Cleaning Booking – Seal Solutions</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f2f7;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f7;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 40px rgba(15,26,69,0.12);">

          <tr>
            <td style="background:linear-gradient(135deg,#0f1a45 0%,#1a2b6b 60%,#2d4090 100%);padding:40px 48px;">
              <p style="margin:0 0 4px 0;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">Seal Solutions Limited</p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.2;">New Cleaning Booking</h1>
              <p style="margin:8px 0 0 0;font-size:13px;color:rgba(255,255,255,0.6);">A customer has booked and paid for a cleaning service.</p>
            </td>
          </tr>

          <tr><td style="height:4px;background:linear-gradient(90deg,#c9a84c,#e8c97a,#c9a84c);"></td></tr>

          <tr>
            <td style="padding:40px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${row("Booking Reference", data.bookingRef)}
                ${row("Customer", data.customerName, "#1a2b6b")}
                ${row("Email", data.customerEmail)}
                ${row("Phone", data.customerPhone, "#1a2b6b")}
                ${row("Service", service)}
                ${row("Date & Time", `${formattedDate} at ${data.timeSlot}`, "#1a2b6b")}
                ${row("Address", `${data.address}, ${data.postcode}`)}
                ${row("Property", `${data.bedrooms} bed · ${data.bathrooms} bath`, "#1a2b6b")}
                ${data.extras.length > 0 ? row("Add-ons", extraLabels) : ""}
                ${data.notes ? row("Customer Notes", data.notes, "#1a2b6b") : ""}
                ${row("Amount Paid", formatPrice(data.totalAmount))}
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;background:linear-gradient(135deg,#0f1a45,#1a2b6b);border-radius:10px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;">
                      <span style="color:#c9a84c;font-weight:700;">Action required:</span> Assign a cleaner and confirm availability for <strong style="color:#ffffff;">${formattedDate} at ${data.timeSlot}</strong>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#f8f5f0;padding:28px 48px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:11px;color:#9ca3af;">This is an automated notification from sealsolutions.co.uk</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
