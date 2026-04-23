import Link from "next/link";
import NavbarStatic from "@/components/layout/NavbarStatic";
import { CheckCircle, Clock, Search, ArrowRight } from "lucide-react";

const PLAN_LABELS: Record<string, string> = {
	starter: "Starter — 30 days",
	standard: "Standard — 90 days",
	premium: "Premium — 6 months",
};

export default async function SuccessPage({
	searchParams,
}: {
	searchParams: Promise<{ id?: string; plan?: string }>;
}) {
	const { id, plan } = await searchParams;

	return (
		<>
			<NavbarStatic />
			<main className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center px-6">
				<div className="max-w-lg w-full text-center">
					{/* Icon */}
					<div className="flex justify-center mb-6">
						<div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center">
							<CheckCircle size={40} className="text-emerald-500" />
						</div>
					</div>

					<h1 className="text-3xl font-extrabold text-[#0b1535] mb-3">
						Listing submitted!
					</h1>
					<p className="text-gray-500 text-base mb-8 max-w-sm mx-auto">
						Your property has been received and is now under review. It will go
						live within 2 hours.
					</p>

					{/* Info cards */}
					<div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100 mb-8 text-left shadow-sm">
						<div className="flex items-start gap-4 px-6 py-5">
							<div className="p-2 bg-amber-50 rounded-lg mt-0.5 shrink-0">
								<Clock size={16} className="text-amber-500" />
							</div>
							<div>
								<p className="text-sm font-semibold text-[#0b1535]">
									Under review
								</p>
								<p className="text-sm text-gray-400 mt-0.5">
									Our team will verify your listing and make it live within 2
									business hours.
								</p>
							</div>
						</div>
						{plan && PLAN_LABELS[plan] && (
							<div className="flex items-start gap-4 px-6 py-5">
								<div className="p-2 bg-amber-50 rounded-lg mt-0.5 shrink-0">
									<CheckCircle size={16} className="text-amber-500" />
								</div>
								<div>
									<p className="text-sm font-semibold text-[#0b1535]">
										Plan activated
									</p>
									<p className="text-sm text-gray-400 mt-0.5">
										{PLAN_LABELS[plan]}
									</p>
								</div>
							</div>
						)}
						<div className="flex items-start gap-4 px-6 py-5">
							<div className="p-2 bg-amber-50 rounded-lg mt-0.5 shrink-0">
								<Search size={16} className="text-amber-500" />
							</div>
							<div>
								<p className="text-sm font-semibold text-[#0b1535]">
									Reference ID
								</p>
								<p className="text-sm text-gray-400 font-mono mt-0.5 break-all">
									{id ?? "—"}
								</p>
							</div>
						</div>
					</div>

					{/* Actions */}
					<div className="flex flex-col sm:flex-row gap-3 justify-center">
						<Link
							href="/properties"
							className="flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#0b1535] font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
						>
							Browse Listings
							<ArrowRight size={14} />
						</Link>
						<Link
							href="/list-property"
							className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:text-[#0b1535] hover:border-gray-300 font-semibold text-sm px-6 py-3 rounded-xl transition-colors"
						>
							List Another Property
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}
