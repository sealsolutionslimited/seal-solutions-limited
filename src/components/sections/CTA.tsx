"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Send, CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormSelect } from "@/components/form/FormSelect";
import { FormButton } from "@/components/form/FormButton";

const contactDetails = [
	{
		icon: MapPin,
		text: "112B Brigstock Road, Thornton Heath, Croydon, CR7 7JB",
	},
	{
		icon: Phone,
		text: "+44 7879 183213",
	},
	{
		icon: Mail,
		text: "sealsolutionslim@gmail.com",
	},
];

const interestOptions = [
	{ label: "Buy", value: "Buy" },
	{ label: "Rent", value: "Rent" },
	{ label: "Sell", value: "Sell" },
	{ label: "Invest", value: "Invest" },
];

const validationSchema = Yup.object({
	name: Yup.string()
		.min(2, "Name must be at least 2 characters")
		.required("Full name is required"),
	phone: Yup.string()
		.matches(/^[+\d][\d\s\-().]{6,}$/, "Enter a valid phone number")
		.required("Phone number is required"),
	interest: Yup.string()
		.oneOf(["Buy", "Rent", "Sell", "Invest"])
		.required("Please select an interest"),
	message: Yup.string().max(500, "Message must be under 500 characters"),
});

const initialValues = {
	name: "",
	phone: "",
	interest: "",
	message: "",
};

export default function CTA() {
	const [submitted, setSubmitted] = useState(false);
	const [submittedName, setSubmittedName] = useState("");
	const [serverError, setServerError] = useState("");

	return (
		<section
			id="contact"
			className="py-24 relative overflow-hidden"
			style={{
				background:
					"linear-gradient(135deg, #0f1a45 0%, #1a2b6b 60%, #2d4090 100%)",
			}}
		>
			<div
				className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
				style={{
					background:
						"radial-gradient(circle, #c9a84c, transparent 70%)",
				}}
			/>
			<div
				className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-10"
				style={{
					background:
						"radial-gradient(circle, #4060b0, transparent 70%)",
				}}
			/>

			<div className="max-w-7xl mx-auto px-6 relative z-10">
				<div className="grid lg:grid-cols-2 gap-16 items-center">
					{/* Left */}
					<div>
						<p className="section-label mb-3 text-gold">
							Get In Touch
						</p>
						<h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
							Ready to Find Your Dream Property?
						</h2>
						<p className="text-white/60 text-base leading-relaxed max-w-md mb-8">
							Let our expert agents guide you through
							Nigeria&apos;s property market. Drop your details
							and we&apos;ll be in touch within 24 hours.
						</p>

						<div className="flex flex-col gap-4">
							{contactDetails.map((item, i) => {
								const Icon = item.icon;
								return (
									<div
										key={i}
										className="flex items-center gap-3 text-white/70 text-sm group"
									>
										<Icon className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
										<span className="group-hover:text-white transition-colors">
											{item.text}
										</span>
									</div>
								);
							})}
						</div>
					</div>

					{/* Right */}
					<div
						className="bg-white rounded-2xl p-8 md:p-10"
						style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}
					>
						{submitted ? (
							<div className="text-center py-8">
								<CheckCircle
									size={52}
									className="text-green-500 mx-auto mb-4"
								/>
								<h3 className="text-2xl font-bold text-navy mb-2">
									Message Received!
								</h3>
								<p className="text-gray-500 text-sm">
									Thank you, {submittedName}. One of our
									agents will reach out within 24 hours.
								</p>
							</div>
						) : (
							<>
								<h3 className="text-2xl font-bold text-navy mb-6">
									Request a Callback
								</h3>

								<Formik
									initialValues={initialValues}
									validationSchema={validationSchema}
									onSubmit={async (
										values,
										{ setSubmitting },
									) => {
										setServerError("");
										try {
											const res = await fetch(
												"/api/contact",
												{
													method: "POST",
													headers: {
														"Content-Type":
															"application/json",
													},
													body: JSON.stringify(
														values,
													),
												},
											);

											if (!res.ok) {
												const data = await res.json();
												setServerError(
													data.error ??
														"Something went wrong. Please try again.",
												);
												return;
											}

											setSubmittedName(values.name);
											setSubmitted(true);
										} catch {
											setServerError(
												"Network error. Please check your connection and try again.",
											);
										} finally {
											setSubmitting(false);
										}
									}}
								>
									<Form className="flex flex-col gap-4">
										<FormInput
											name="name"
											label="Full Name"
											type="text"
											placeholder="e.g. Adaora Okonkwo"
										/>

										<FormInput
											name="phone"
											label="Phone Number"
											type="tel"
											placeholder="+44 7099 100210"
										/>

										<FormSelect
											name="interest"
											label="I'm looking to"
											placeholder="Select an option"
											options={interestOptions}
										/>

										<FormTextarea
											name="message"
											label="Message (optional)"
											rows={3}
											placeholder="Tell us more about what you're looking for..."
										/>

										{serverError && (
											<p className="text-xs text-red-500 -mt-1">
												{serverError}
											</p>
										)}

										<FormButton
											className="bg-navy-dark hover:bg-navy text-white mt-1"
											loadingText="Sending..."
										>
											<Send size={16} />
											Send Message
										</FormButton>
									</Form>
								</Formik>
							</>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
