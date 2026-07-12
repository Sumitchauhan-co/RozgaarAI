"use client";

import {
  BriefcaseBusiness,
  Building2,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Plus,
  Sparkles,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../store/store";
import api from "../../utils/api";

interface ApplicationItem {
  id: string;
  workerId: string;
  firstName: string;
  lastName: string | null;
  salaryExpectation: number | null;
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

export default function ApplicationsPage() {
  const router = useRouter();
  const { userId, workerId, role, setWorkerId } = useAuthStore();
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    city: "",
    country: "",
    locality: "",
    salaryExpectation: "",
    currency: "INR",
    payPeriod: "yearly",
    phone: "",
  });

  const fetchAllApplications = useCallback(async () => {
    if (!workerId) return;
    try {
      const response = await api.get(`/api/worker/application/`);
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

    if (role !== "worker") {
      router.replace("/profile");
      return;
    }

    if (userId && workerId) {
      fetchAllApplications();
    }
  }, [userId, workerId, role, router, fetchAllApplications]);

  useEffect(() => {
    const resolveWorkerProfile = async () => {
      if (!userId || !role || role !== "worker" || workerId) return;

      try {
        const response = await api.get("/api/worker/profile");
        const profilePayload = response.data?.data;
        const profile = Array.isArray(profilePayload)
          ? profilePayload[0]
          : profilePayload;

        if (profile?.id) {
          setWorkerId(profile.id);
        } else {
          router.replace("/profile");
        }
      } catch (err) {
        console.error("Failed to resolve worker profile:", err);
        router.replace("/profile");
      }
    };

    resolveWorkerProfile();
  }, [userId, workerId, role, router, setWorkerId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!userId) {
      setStatusMessage("Please sign in before creating an application.");
      return;
    }

    let resolvedWorkerId = workerId;
    if (!resolvedWorkerId) {
      try {
        const response = await api.get("/api/worker/profile");
        const profilePayload = response.data?.data;
        const profile = Array.isArray(profilePayload)
          ? profilePayload[0]
          : profilePayload;

        if (!profile?.id) {
          setStatusMessage("Create your worker profile first.");
          return;
        }

        resolvedWorkerId = profile.id;
        setWorkerId(profile.id);
      } catch (err) {
        console.error("Failed to resolve worker profile:", err);
        setStatusMessage("Unable to resolve your worker profile right now.");
        return;
      }
    }

    const payload = {
      companyName: formData.companyName.trim(),
      city: formData.city.trim(),
      country: formData.country.trim(),
      industry: formData.industry.trim(),
      locality: formData.locality.trim() || null,
      salaryExpectation: formData.salaryExpectation
        ? Number(formData.salaryExpectation)
        : null,
      currency: formData.currency.trim().toUpperCase() || "INR",
      payPeriod: formData.payPeriod,
      phone: formData.phone.trim() || null,
    };

    setIsSubmitting(true);

    try {
      const response = await api.post(
        `/api/worker/application/${resolvedWorkerId}`,
        payload
      );

      const json = response.data;
      if (json.success) {
        setIsModalOpen(false);
        setFormData({
          companyName: "",
          industry: "",
          city: "",
          country: "",
          locality: "",
          salaryExpectation: "",
          currency: "INR",
          payPeriod: "yearly",
          phone: "",
        });
        setStatusMessage("Application created successfully.");
        fetchAllApplications();
      }
    } catch (err) {
      console.error("Failed to save record:", err);
      setStatusMessage("Unable to create the application right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (
    appId: string,
    targetStatus: "accepted" | "rejected"
  ) => {
    if (!workerId) return;
    try {
      const response = await api.patch(
        `/api/worker/application/${workerId}/${appId}`,
        {
          status: targetStatus,
        }
      );

      if (response.data.success || response.status === 200) {
        setApplications(prev =>
          prev.map(app =>
            app.id === appId ? { ...app, status: targetStatus } : app
          )
        );
      }
    } catch (err) {
      console.error("Error updating application state:", err);
    }
  };

  const handleDelete = async (appId: string, appWorkerId: string) => {
    if (!confirm("Are you sure you want to permanently drop this application?"))
      return;
    try {
      const response = await api.delete(
        `/api/worker/application/${appWorkerId}/${appId}`
      );

      if (response.data.success || response.status === 200) {
        setApplications(prev => prev.filter(app => app.id !== appId));
      }
    } catch (err) {
      console.error("Error removing file record:", err);
    }
  };

  const getStatusUI = (status: string) => {
    if (status === "pending") {
      return (
        <span className="flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1.5 text-sm font-semibold text-yellow-600">
          <Clock size={16} /> Pending
        </span>
      );
    }
    if (status === "accepted") {
      return (
        <span className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-600">
          <CheckCircle size={16} /> Accepted
        </span>
      );
    }
    return (
      <span className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600">
        <XCircle size={16} /> Rejected
      </span>
    );
  };

  return (
    <main className="relative min-h-screen bg-[#FCF8F4]">
      {/* HEADER SECTION */}
      <section className="bg-linear-to-r from-[#5B1E05] to-[#8F3E13] py-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 sm:flex-row sm:items-center lg:px-10">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/20 p-4">
              <Sparkles className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">Applications</h1>
              <p className="mt-1 text-white/80">
                Manage all job applications in one place
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 self-start rounded-2xl bg-white px-5 py-3 font-bold text-[#8F3E13] shadow-lg transition hover:bg-orange-50 sm:self-auto"
          >
            <Plus size={20} /> Create Application
          </button>
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
                No application metrics saved to your workspace profile context.
              </p>
            </div>
          ) : (
            applications.map(app => (
              <div
                key={app.id}
                className="rounded-3xl border border-orange-100/40 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  {/* DATA VISUAL METRICS */}
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
                        {app.salaryExpectation && (
                          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700 uppercase">
                            {app.salaryExpectation.toLocaleString()}{" "}
                            {app.currency} / {app.payPeriod}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* OPERATIONS GATE OVERLAYS */}
                  <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4 lg:justify-end lg:border-t-0 lg:pt-0">
                    <div>{getStatusUI(app.status)}</div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateStatus(app.id, "accepted")}
                        disabled={app.status === "accepted"}
                        className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-40"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(app.id, "rejected")}
                        disabled={app.status === "rejected"}
                        className="rounded-xl bg-red-100 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-200 disabled:opacity-40"
                      >
                        Reject
                      </button>

                      {/* Explicit Row Deletion */}
                      {app.workerId === workerId && (
                        <button
                          onClick={() => handleDelete(app.id, app.workerId)}
                          className="ml-2 rounded-xl border border-gray-200 p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete Application"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CREATE APPLICATION DIALOG MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="mb-4 text-2xl font-black text-[#2B0F05]">
              New Application Entry
            </h3>
            {statusMessage && (
              <div className="mb-4 rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-700">
                {statusMessage}
              </div>
            )}
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-gray-700">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={e =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-bold text-gray-700">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={e =>
                      setFormData({ ...formData, city: e.target.value })
                    }
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
                    value={formData.country}
                    onChange={e =>
                      setFormData({ ...formData, country: e.target.value })
                    }
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
                    value={formData.locality}
                    onChange={e =>
                      setFormData({ ...formData, locality: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold text-gray-700">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={e =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="mb-1 block text-sm font-bold text-gray-700">
                    Salary
                  </label>
                  <input
                    type="number"
                    value={formData.salaryExpectation}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        salaryExpectation: e.target.value,
                      })
                    }
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
                    value={formData.currency}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        currency: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-center outline-none focus:ring-2 focus:ring-[#8F3E13]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold text-gray-700">
                    Period
                  </label>
                  <select
                    value={formData.payPeriod}
                    onChange={e =>
                      setFormData({ ...formData, payPeriod: e.target.value })
                    }
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
                  value={formData.phone}
                  onChange={e =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
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
                  className="rounded-xl bg-[#8F3E13] px-5 py-2.5 font-bold text-white shadow-md transition hover:bg-[#5B1E05] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
