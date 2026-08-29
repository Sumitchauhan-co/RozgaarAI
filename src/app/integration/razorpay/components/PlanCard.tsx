import { PlanDetails } from "@/app/server/config/payment";
import UpgradeButton from "./UpgradeButton";

interface PlanCardProps {
  userId: string | null;
  plan: PlanDetails;
  currentPlanType?: string;
}

export default function PlanCard({
  userId,
  plan,
  currentPlanType,
}: PlanCardProps) {
  const {
    planKey,
    title,
    priceDisplay,
    credits,
    description,
    features,
    isPopular,
  } = plan;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-[30px] border p-7 pt-10 transition-all duration-300 ${
        isPopular
          ? "border-[#D6A77E] bg-gradient-to-br from-[#5B1E05] via-[#8F3E13] to-[#3B1809] text-white shadow-[0_25px_80px_rgba(91,30,5,0.28)]"
          : "border-[#F1E5D9] bg-white/85 text-gray-800 shadow-[0_18px_45px_rgba(91,30,5,0.06)] backdrop-blur-sm"
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <span className="inline-flex rounded-full border border-[#D6A77E]/40 bg-[#F6E9DE] px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] whitespace-nowrap text-[#5B1E05] uppercase shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div>
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <p
              className={`text-xs font-semibold tracking-[0.2em] uppercase ${
                isPopular ? "text-[#F6D8B3]" : "text-[#8F3E13]"
              }`}
            >
              {isPopular ? "Recommended" : "Essential"}
            </p>
            <h3
              className={`mt-3 text-2xl font-extrabold ${
                isPopular ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </h3>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isPopular
                ? "bg-white/10 text-[#F6D8B3] ring-1 ring-white/15"
                : "bg-[#FFF3E8] text-[#8F3E13]"
            }`}
          >
            30 days
          </span>
        </div>

        <p
          className={`mb-6 text-sm leading-6 ${
            isPopular ? "text-orange-100/90" : "text-gray-600"
          }`}
        >
          {description}
        </p>

        <div className="mb-6 flex items-end gap-2">
          <span
            className={`text-4xl font-black tracking-tight ${
              isPopular ? "text-white" : "text-gray-900"
            }`}
          >
            {priceDisplay}
          </span>
          <span className={isPopular ? "text-orange-100/80" : "text-gray-500"}>
            / pass
          </span>
        </div>

        <div
          className={`mb-6 flex items-center gap-3 rounded-2xl p-3 ${
            isPopular
              ? "bg-white/10 ring-1 ring-white/15"
              : "bg-[#FFF7F0] ring-1 ring-[#F1E5D9]"
          }`}
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
              isPopular
                ? "bg-white/10 text-[#FCE7CF]"
                : "bg-[#F4D7BF] text-[#5B1E05]"
            }`}
          >
            AI
          </div>
          <div>
            <p
              className={
                isPopular
                  ? "text-sm font-semibold text-white"
                  : "text-sm font-semibold text-gray-900"
              }
            >
              {credits} AI Job Searches
            </p>
            <p
              className={
                isPopular
                  ? "text-xs text-orange-100/80"
                  : "text-xs text-gray-500"
              }
            >
              Valid for 30 days
            </p>
          </div>
        </div>

        <ul className="mb-8 space-y-3.5">
          {features.map((feature, i) => (
            <li
              key={i}
              className={`flex items-start text-sm ${
                isPopular ? "text-orange-50" : "text-gray-700"
              }`}
            >
              <span
                className={`mt-0.5 mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  isPopular
                    ? "bg-white/10 text-[#FCE7CF]"
                    : "bg-[#F4D7BF] text-[#5B1E05]"
                }`}
              >
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <UpgradeButton
        userId={userId ?? ""}
        planType={planKey}
        currentPlan={currentPlanType}
      />
    </div>
  );
}
