"use client";

import { useAuthStore } from "@/app/store/store";
import api from "@/app/utils/api";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Calendar,
  Clock,
  Coins,
  Loader2,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface WorkerApplicationItem {
  id: string;
  workerId: string;
  firstName: string;
  lastName: string | null;
  salaryExpectation: number | null;
  currency: string;
  payPeriod: "hourly" | "monthly" | "yearly";
  industry: string | null;
  locality: string | null;
  city: string;
  country: string;
  phone: string | null;
  status: "pending" | "rejected" | "accepted";
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export default function RecruiterDetailPage() {
  const params = useParams<{ slug?: string[] }>();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const [application, setApplication] = useState<WorkerApplicationItem | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const slug = params?.slug;
    if (!slug || slug.length < 2) {
      setError("Missing application identifiers in URL route parameters.");
      setLoading(false);
      return;
    }

    const [workerId, appId] = slug;

    console.log(workerId, appId);

    // Strict guard rail logic to ensure we don't dispatch query crashes
    if (
      !appId ||
      appId === "null" ||
      appId === "undefined" ||
      !workerId ||
      workerId === "null" ||
      workerId === "undefined"
    ) {
      setError("Invalid or uninitialized credentials loaded.");
      setLoading(false);
      return;
    }

    const fetchApplicationDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("worker id: ", workerId);
        console.log("application id: ", appId);

        console.log(`/api/worker/application/${workerId}/${appId}`);

        const res = await api.get<ApiResponse<WorkerApplicationItem>>(
          `/api/worker/application/${workerId}/${appId}`
        );

        if (res.data?.success && res.data?.data) {
          setApplication(res.data.data);
        } else {
          setError(res.data?.message || "Application not found.");
        }
      } catch (err) {
        console.error("Error fetching application details:", err);
        setError("Failed to load the application details.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetail();
  }, [params?.slug, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FCFBF9]">
        <Loader2 className="h-10 w-10 animate-spin text-[#5B1E05]" />
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-red-600">
          <p className="font-semibold">
            {error || "Application record missing."}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen space-y-6 bg-[#FCFBF9] px-4 py-8 sm:px-6 lg:px-8">
      {/* Navigation header row */}
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-xl border border-[#ECE3DA] bg-white px-4 py-2 text-sm font-semibold text-[#55463E] shadow-sm transition hover:bg-[#F8ECE4]/40"
        >
          <ArrowLeft size={16} /> Back to List
        </button>
      </div>

      {/* Main Application Summary Metadata Card */}
      <div className="mx-auto max-w-3xl space-y-8 rounded-2xl border border-[#ECE3DA] bg-white p-8 shadow-sm">
        {/* Header segment with name and baseline indicators */}
        <div className="flex flex-col gap-4 border-b border-[#ECE3DA] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50">
              <User className="text-[#8F3E13]" size={28} />
            </div>
            <div>
              <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                Application Profile
              </span>
              <h1 className="text-2xl font-bold text-[#2B0F05]">
                {application.firstName} {application.lastName || ""}
              </h1>
            </div>
          </div>
        </div>

        {/* Component Field Matrices Broken Down By Context */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Position & Domain Metadata */}

          <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase">
              <BriefcaseBusiness size={14} className="text-[#5B1E05]/60" />
              Industry Field
            </div>
            <p className="mt-1 text-base font-medium text-[#55463E]">
              {application.industry || "Not specified"}
            </p>
          </div>

          {/* Location details parameters */}
          <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4 sm:col-span-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase">
              <MapPin size={14} className="text-[#5B1E05]/60" />
              Location Details
            </div>
            <p className="mt-1 text-base font-medium text-[#55463E]">
              {[application.locality, application.city, application.country]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>

          {/* Salary Expectation metrics */}
          <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase">
              <Coins size={14} className="text-[#5B1E05]/60" />
              Offered Compensation
            </div>
            <p className="mt-1 text-lg font-bold text-[#5B1E05] uppercase">
              {application.salaryExpectation
                ? `${application.salaryExpectation.toLocaleString()} ${application.currency} / ${application.payPeriod}`
                : "No financial information configured"}
            </p>
          </div>

          {/* Contact elements metrics */}
          <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase">
              <Phone size={14} className="text-[#5B1E05]/60" />
              Contact Phone Reference
            </div>
            <p className="mt-1 text-base font-medium text-[#55463E]">
              {application.phone || "No contact line supplied"}
            </p>
          </div>

          {/* Auditing logging details timestamps */}
          <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase">
              <Calendar size={14} className="text-[#5B1E05]/60" />
              Submission Date
            </div>
            <p className="mt-1 text-sm text-[#55463E]">
              {new Date(application.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase">
              <Clock size={14} className="text-[#5B1E05]/60" />
              Last Updated Profile Status
            </div>
            <p className="mt-1 text-sm text-[#55463E]">
              {new Date(application.updatedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
