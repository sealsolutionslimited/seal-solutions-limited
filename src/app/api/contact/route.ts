import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactEmailHtml } from "@/lib/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { name, phone, interest, message } = body;

		if (!name || !phone || !interest) {
			return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
		}

		const { error } = await resend.emails.send({
			from: "Seal Solutions <onboarding@resend.dev>",
			to: "sealsolutionslim@gmail.com",
			subject: `New Callback Request from ${name}`,
			html: contactEmailHtml({ name, phone, interest, message }),
		});

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Internal server error." }, { status: 500 });
	}
}
