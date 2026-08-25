"use client";

import { ApplicationStatus } from "@/app/features/applications/recruiters/types";
import {
  BriefcaseBusiness,
  Building2,
  Edit3,
  Loader2,
  MapPin,
  Phone,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { RecruiterApplicationItem } from "../types";

interface RecruiterApplicationProps {
  applications: RecruiterApplicationItem[];
  loading: boolean;
  onEdit: (app: RecruiterApplicationItem) => void;
  onDelete: (appId: string) => Promise<void>;
}

type FilterTab = "all" | ApplicationStatus;

export default function RecruiterApplication({
  applications,
  loading,
  onEdit,
  onDelete,
}: RecruiterApplicationProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredApplications = useMemo(() => {
    if (activeTab === "all") return applications;
    return applications.filter(app => app.status === activeTab);
  }, [applications, activeTab]);

  const getStatusBadgeStyle = (status: ApplicationStatus) => {
    switch (status) {
      case "accepted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "rejected":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "pending":
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const tabs: { label: string; value: FilterTab }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
  ];

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-[#ECE3DA] bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[#ECE3DA] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#55463E]">
            Tracked Applications
          </h2>
          <p className="mt-0.5 text-xs text-gray-400">
            Active openings and status summaries managed by your account
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] p-1">
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                activeTab === tab.value
                  ? "bg-[#8F3E13] text-white shadow-sm"
                  : "text-[#55463E] hover:text-[#8F3E13]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-[#5B1E05]" />
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 py-12 text-center">
            <BriefcaseBusiness className="mx-auto mb-2 h-10 w-10 text-gray-300" />
            <p className="text-sm font-medium text-gray-400">
              {activeTab === "all"
                ? "No recruiter applications configured yet."
                : `No applications found under "${activeTab}" status.`}
            </p>
          </div>
        ) : (
          <div className="max-h-[500px] space-y-4 overflow-y-auto pr-1">
            {filteredApplications.map(app => (
              <div
                key={app.id}
                className="rounded-3xl border border-orange-100/40 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block rounded-md border px-2 py-0.5 text-xs font-bold capitalize ${getStatusBadgeStyle(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                        <span className="inline-block rounded-md bg-[#F5E7DA] px-2 py-0.5 text-xs font-bold text-[#8F3E13]">
                          {app.employmentType || "Full-Time"}
                        </span>
                        {app.experienceRequired !== null && (
                          <span className="inline-block rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                            {app.experienceRequired}+ Yrs Exp
                          </span>
                        )}
                      </div>
                      <h2 className="mt-2 text-xl font-bold text-[#2B0F05]">
                        {app.jobTitle}
                      </h2>
                      <p className="flex items-center gap-1.5 text-sm font-semibold text-[#8F3E13]">
                        <Building2 size={14} /> {app.companyName}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEdit(app)}
                        className="rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-[#8F3E13]"
                        title="Edit Application"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(app.id)}
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete Application"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {app.description && (
                    <p className="line-clamp-2 text-xs text-gray-600">
                      {app.description}
                    </p>
                  )}

                  {app.skills && app.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {app.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] font-medium text-gray-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-100 pt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {app.locality ? `${app.locality}, ` : ""}
                      {app.city}, {app.country}
                    </span>
                    {app.industry && (
                      <span className="flex items-center gap-1">
                        <BriefcaseBusiness size={13} />
                        {app.industry}
                      </span>
                    )}
                    {app.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={13} />
                        {app.phone}
                      </span>
                    )}
                    {app.salary && (
                      <span className="rounded bg-orange-50 px-2 py-0.5 text-xs font-semibold text-[#8F3E13] uppercase">
                        Salary: {app.salary?.toLocaleString()} {app.currency} /{" "}
                        {app.payPeriod}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
