"use client";

import { ApplicationStatus } from "@/app/features/applications/workers/types";
import {
  BriefcaseBusiness,
  Edit3,
  Loader2,
  MapPin,
  Phone,
  Trash2,
  UserCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { WorkerApplicationItem } from "../types";

interface WorkerApplicationsListProps {
  applications: WorkerApplicationItem[];
  loading: boolean;
  onEdit: (app: WorkerApplicationItem) => void;
  onDelete: (appId: string) => Promise<void>;
}

type FilterTab = "all" | ApplicationStatus;

export default function WorkerApplications({
  applications,
  loading,
  onEdit,
  onDelete,
}: WorkerApplicationsListProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredApplications = useMemo(() => {
    if (activeTab === "all") return applications;
    return applications.filter(app => app.status === activeTab);
  }, [applications, activeTab]);

  const getStatusBadgeStyle = (status?: ApplicationStatus) => {
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

        {/* Status Filter Buttons */}
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
                ? "No applications configured yet."
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
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50">
                        <UserCheck className="text-[#8F3E13]" size={22} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-block rounded-md border px-2 py-0.5 text-xs font-bold capitalize ${getStatusBadgeStyle(
                              app.status
                            )}`}
                          >
                            {app.status || "pending"}
                          </span>
                          <span className="inline-block rounded-md bg-[#F5E7DA] px-2 py-0.5 text-xs font-bold text-[#8F3E13]">
                            Application Slot
                          </span>
                          {app.experienceYears !== null &&
                            app.experienceYears !== undefined && (
                              <span className="inline-block rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                {app.experienceYears} Yrs Exp
                              </span>
                            )}
                        </div>
                        <h2 className="mt-1 text-xl font-bold text-[#2B0F05]">
                          {app.firstName} {app.lastName || ""}
                        </h2>
                      </div>
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

                  {/* Profession Tags */}
                  {app.profession && app.profession.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {app.profession.map((prof, i) => (
                        <span
                          key={i}
                          className="rounded-md bg-[#F8ECE4] px-2 py-0.5 text-xs font-medium text-[#5B1E05]"
                        >
                          {prof}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Skills Tags */}
                  {app.skills && app.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {app.skills.map((skill, i) => (
                        <span
                          key={i}
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
                    {app.salaryExpectation && (
                      <span className="rounded bg-orange-50 px-2 py-0.5 text-xs font-semibold text-[#8F3E13] uppercase">
                        Expected: {app.salaryExpectation?.toLocaleString()}{" "}
                        {app.currency} / {app.payPeriod}
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
