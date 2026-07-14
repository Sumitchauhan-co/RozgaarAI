"use client";

import { isAxiosError } from "axios";
import {
  BriefcaseBusiness,
  Building2,
  Home,
  Loader2,
  MapPin,
  Phone,
  Plus,
  Sparkles,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "../../store/store";
import api from "../../utils/api";

interface ApplicationItem {
  id: string;
  recruiterId: string;
  firstName: string;
  lastName: string | null;
  salary: number | null;
  currency: string;
  payPeriod: "hourly" | "monthly" | "yearly";
  companyName: string;
  industry: string | null;
  locality: string | null;
  city: string;
  country: string;
  phone: string | null;
  status: "pending" | "rejected" | "accepted";
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface FormInputs {
  industry: string;
  city: string;
  country: string;
  locality: string;
  salaryExpectation: string;
  currency: string;
  payPeriod: "hourly" | "monthly" | "yearly";
  phone: string;
}

export default function ApplicationsPage() {
  const router = useRouter();
  const { userId, workerId } = useAuthStore();
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Initialize React Hook Form hooks
  const { register, handleSubmit, reset } = useForm<FormInputs>({
    defaultValues: {
      industry: "",
      city: "",
      country: "",
      locality: "",
      salaryExpectation: "",
      currency: "INR",
      payPeriod: "yearly",
      phone: "",
    },
  });

  const fetchAllApplications = useCallback(async () => {
    if (!workerId) return;
    try {
      const response = await api.get(`/api/recruiter/application/`);
      const json = response.data;

      if (json.success) setApplications(json.data || []);
    } catch (err) {
      console.error("Error loading applications:", err);
    }
  }, [workerId]);

  useEffect(() => {
    if (!userId) {
      router.replace("/login");
      return;
    }

    fetchAllApplications();
  }, [userId, fetchAllApplications]);

  const handleOpenCreateModal = () => {
    setStatusMessage(null);
    setIsModalOpen(true);
  };

  const onSubmitForm: SubmitHandler<FormInputs> = async data => {
    setStatusMessage(null);

    if (!userId) {
      setStatusMessage("Please sign in before creating an application.");
      return;
    }

    const payload = {
      industry: data.industry,
      city: data.city,
      country: data.country,
      locality: data.locality || null,
      salaryExpectation: data.salaryExpectation
        ? Number(data.salaryExpectation)
        : null,
      currency: data.currency,
      payPeriod: data.payPeriod,
      phone: data.phone,
    };

    setIsSubmitting(true);

    try {
      const response = await api.post(
        `/api/worker/application/${workerId}`,
        payload
      );

      const json = response.data;
      if (json.success) {
        setIsModalOpen(false);
        setStatusMessage("Application created successfully.");
        reset();
        fetchAllApplications();
      } else {
        setStatusMessage(json.message || "Failed to save application.");
      }
    } catch (err) {
      console.error("API error during creation:", err);
      if (isAxiosError(err)) {
        setStatusMessage(
          err.response?.data?.message ||
            "Unable to create the application right now."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#FCF8F4]">
      {/* HEADER SECTION */}
      <section className="bg-gradient-to-r from-[#5B1E05] to-[#8F3E13] py-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 sm:flex-row sm:items-center lg:px-10">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/20 p-4">
              <Sparkles className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">
                Recruiter Applications
              </h1>
              <p className="mt-1 text-white/80">Explore job opportunities</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 self-start sm:self-auto">
            <button
              onClick={() => router.push("/")}
              className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/20"
            >
              <Home size={20} /> Back to Home
            </button>
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center justify-center gap-2 self-start rounded-2xl bg-white px-5 py-3 font-bold text-[#8F3E13] shadow-lg transition hover:bg-orange-50 sm:self-auto"
            >
              <Plus size={20} /> Create Worker Application
            </button>
          </div>
        </div>
      </section>

      {/* RENDER SYSTEM ENTRY LOGIC */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-6">
          {applications.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
              <BriefcaseBusiness
                className="mx-auto mb-4 text-gray-300"
                size={48}
              />
              <p className="font-medium text-gray-500">
                No recruiter openings visible in your tracking space at the
                moment.
              </p>
            </div>
          ) : (
            applications.map(app => (
              <div
                key={app.id}
                onClick={() =>
                  router.push(
                    `/applications/workers/${app.recruiterId}/${app.id}`
                  )
                }
                className="cursor-pointer rounded-3xl border border-orange-100/40 bg-white p-6 shadow-sm transition hover:border-orange-200 hover:shadow-md"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F5E7DA]">
                      <User className="text-[#8F3E13]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#2B0F05]">
                        {app.firstName} {app.lastName || ""}
                      </h2>
                      <p className="mt-0.5 flex items-center gap-1.5 font-medium text-gray-600">
                        <Building2 size={16} className="text-gray-400" />{" "}
                        {app.companyName}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {app.locality ? `${app.locality}, ` : ""}
                          {app.city}, {app.country}
                        </span>
                        {app.industry && (
                          <span className="flex items-center gap-1">
                            <BriefcaseBusiness size={14} />
                            {app.industry}
                          </span>
                        )}
                        {app.phone && (
                          <span className="flex items-center gap-1">
                            <Phone size={14} />
                            {app.phone}
                          </span>
                        )}
                        {app.salary && (
                          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700 uppercase">
                            Expected: {app.salary?.toLocaleString()}{" "}
                            {app.currency} / {app.payPeriod}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CREATE APPLICATION DIALOG MODAL */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity duration-200 ${
          isModalOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none hidden opacity-0"
        }`}
      >
        <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
          <h3 className="mb-4 text-2xl font-black text-[#2B0F05]">
            New Application Entry
          </h3>
          {statusMessage && (
            <div className="mb-4 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-700">
              {statusMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  required
                  {...register("city")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  {...register("country")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  Locality
                </label>
                <input
                  type="text"
                  {...register("locality")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  Industry *
                </label>
                <input
                  type="text"
                  required
                  {...register("industry")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  Salary
                </label>
                <input
                  type="number"
                  {...register("salaryExpectation")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  Currency
                </label>
                <input
                  type="text"
                  maxLength={3}
                  {...register("currency")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-center outline-none focus:ring-2 focus:ring-[#8F3E13]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  Period
                </label>
                <select
                  {...register("payPeriod")}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
                >
                  <option value="hourly">Hourly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Phone Reference
              </label>
              <input
                type="text"
                {...register("phone")}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl px-5 py-2.5 font-bold text-gray-500 transition hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-xl bg-[#8F3E13] px-5 py-2.5 font-bold text-white shadow-md transition hover:bg-[#5B1E05] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
