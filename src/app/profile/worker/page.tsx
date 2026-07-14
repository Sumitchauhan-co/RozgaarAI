"use client";

import { workerModel } from "@/app/models/worker.model";
import { useAuthStore } from "@/app/store/store";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { AxiosError } from "axios";
import {
  ArrowLeft,
  Briefcase,
  BriefcaseBusiness,
  Edit3,
  Loader2,
  MapPin,
  Phone,
  Plus,
  Trash2,
  UserCheck,
  User as UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import api from "../../utils/api";

// UI-specific schema extending model to process raw comma-separated values
const uiWorkerSchema = workerModel.extend({
  profession: z.preprocess(val => {
    if (typeof val !== "string" || !val.trim()) return [];
    return val
      .split(",")
      .map(p => p.trim())
      .filter(Boolean);
  }, workerModel.shape.profession),
});

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

interface UserSession {
  firstName: string;
  lastName: string;
  email: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface Worker {
  id: string;
  age?: number | null | undefined;
  profession?: string[] | null | undefined;
  city?: string | null | undefined;
}

type LocalWorkerState = Partial<Worker> & {
  professionRawString?: string;
};

export default function WorkerProfilePage() {
  const { setWorkerId, isAuthenticated, workerId } = useAuthStore();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [formData, setFormData] = useState<LocalWorkerState>({});
  const [user, setUser] = useState<UserSession | null>(null);
  const [applications, setApplications] = useState<WorkerApplicationItem[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);

  // Application Edit Overlay Modal States modeled from reference component
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<
    Partial<WorkerApplicationItem>
  >({});
  const [appSubmitting, setAppSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  const fetchApplications = useCallback(async () => {
    if (!workerId) return;

    setLoadingApps(true);
    try {
      const res = await api.get<ApiResponse<WorkerApplicationItem[]>>(
        `/api/worker/application/${workerId}`
      );
      if (res.data?.success) {
        setApplications(Array.isArray(res.data.data) ? res.data.data : []);
      }
    } catch (err) {
      console.error("Error loading profile applications:", err);
    } finally {
      setLoadingApps(false);
    }
  }, [workerId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes =
          await api.get<ApiResponse<UserSession>>("/api/auth/getUser");
        if (userRes.data?.success) setUser(userRes.data.data);

        const profileRes = await api.get<ApiResponse<Worker>>(
          "/api/worker/profile"
        );
        if (profileRes.data?.success && profileRes.data?.data) {
          const rawData = Array.isArray(profileRes.data.data)
            ? profileRes.data.data[0]
            : profileRes.data.data;
          if (rawData && Object.keys(rawData).length > 0) {
            const localData: LocalWorkerState = { ...rawData };
            if (Array.isArray(rawData.profession)) {
              localData.professionRawString = rawData.profession.join(", ");
            }
            setFormData(localData);
            setProfileExists(true);
            setWorkerId(rawData.id);
            return;
          }
        }
        setFormData({
          age: null,
          city: "",
          profession: [],
          professionRawString: "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
      fetchApplications();
    }
  }, [isAuthenticated, setWorkerId, fetchApplications]);

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: uiWorkerSchema });
    },
    shouldValidate: "onBlur",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    const submission = parseWithZod(new FormData(e.currentTarget), {
      schema: uiWorkerSchema,
    });

    if (submission.status !== "success") return;

    setSubmitting(true);
    const payload = {
      age: submission.value.age ? Number(submission.value.age) : null,
      city: submission.value.city || null,
      profession: submission.value.profession || [],
    };

    try {
      const res = profileExists
        ? await api.patch<ApiResponse<Worker>>("/api/worker/profile", payload)
        : await api.post<ApiResponse<Worker>>("/api/worker/profile", payload);

      if (res.data?.success) {
        const updated = Array.isArray(res.data.data)
          ? res.data.data[0]
          : res.data.data;
        const localData: LocalWorkerState = { ...updated };
        if (Array.isArray(updated?.profession)) {
          localData.professionRawString = updated.profession.join(", ");
        }
        setFormData(localData);
        setProfileExists(true);
        setIsEditing(false);
        setWorkerId(res.data.data.id);
      }
    } catch (err) {
      setServerError(
        (err as AxiosError<ApiResponse<never>>).response?.data?.message ||
          "Error saving profile."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Clear profile metrics?")) return;
    try {
      await api.delete("/api/worker/profile");
      setProfileExists(false);
      setIsEditing(false);
      setFormData({
        age: null,
        city: "",
        profession: [],
        professionRawString: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Delete worker application record inline matching standard pattern[cite: 8]
  const handleAppDelete = async (appId: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      const res = await api.delete(
        `/api/worker/application/${workerId}/${appId}`
      );
      if (res.data?.success) {
        setApplications(prev => prev.filter(app => app.id !== appId));
      }
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Failed to delete application entry.");
    }
  };

  // Open modal overlay with selected application attributes mapped[cite: 8]
  const handleAppEditOpen = (app: WorkerApplicationItem) => {
    setSelectedApp(app);
    setIsAppModalOpen(true);
  };

  // Save changes to dynamic worker application fields[cite: 8]
  const handleAppEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppSubmitting(true);
    try {
      const res = await api.patch(
        `/api/worker/application/${workerId}/${selectedApp.id}`,
        selectedApp
      );
      if (res.data?.success) {
        setApplications(prev =>
          prev.map(app =>
            app.id === selectedApp.id ? { ...app, ...selectedApp } : app
          )
        );
        setIsAppModalOpen(false);
      }
    } catch (err) {
      console.error("Error updating application parameters:", err);
      alert("Failed to update application details.");
    } finally {
      setAppSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FCFBF9]">
        <Loader2 className="h-10 w-10 animate-spin text-[#5B1E05]" />
      </div>
    );

  return (
    <main className="min-h-screen space-y-6 bg-[#FCFBF9] px-4 py-8 sm:px-6 lg:px-8">
      {/* Back button container alignment matching reference profile[cite: 8] */}
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 rounded-xl border border-[#ECE3DA] bg-white px-4 py-2 text-sm font-semibold text-[#55463E] shadow-sm transition hover:bg-[#F8ECE4]/40"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>

      {/* Profile Metrics Section */}
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#ECE3DA] bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center border-b border-[#ECE3DA] pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F8ECE4]">
              <Briefcase className="h-8 w-8 text-[#5B1E05]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#55463E] capitalize">
                {user ? `${user.firstName} ${user.lastName}` : "Worker Profile"}
              </h1>
              <p className="text-sm font-medium text-[#5B1E05]/70">
                Worker Account
              </p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
          {profileExists && !isEditing && (
            <div className="mt-4 flex gap-3 sm:mt-0">
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-xl border border-[#ECE3DA] px-4 py-2 text-sm font-semibold text-[#55463E] hover:bg-[#F8ECE4]/40"
              >
                <Edit3 size={16} /> Modify
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
              >
                <Trash2 size={16} /> Clear
              </button>
            </div>
          )}
        </div>

        <div className="mt-8">
          {!profileExists && !isEditing ? (
            <div className="py-8 text-center">
              <UserIcon className="mx-auto h-12 w-12 text-gray-300" />
              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#5B1E05] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#442003]"
              >
                <Plus size={16} /> Setup Profile
              </button>
            </div>
          ) : isEditing ? (
            <form
              {...getFormProps(form)}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-[#55463E]"
                >
                  Current Age Tracking
                </label>
                <input
                  {...getInputProps(fields.age, { type: "number" })}
                  value={formData.age ?? ""}
                  onChange={e =>
                    setFormData(p => ({
                      ...p,
                      age: e.target.value ? Number(e.target.value) : null,
                    }))
                  }
                  className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:outline-none"
                />
                {fields.age.errors && (
                  <p className="mt-1 text-xs text-red-600">
                    {fields.age.errors}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-[#55463E]"
                >
                  Residential Operating City
                </label>
                <input
                  {...getInputProps(fields.city, { type: "text" })}
                  value={formData.city || ""}
                  onChange={e =>
                    setFormData(p => ({ ...p, city: e.target.value }))
                  }
                  className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:outline-none"
                />
                {fields.city.errors && (
                  <p className="mt-1 text-xs text-red-600">
                    {fields.city.errors}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="profession"
                  className="block text-sm font-medium text-[#55463E]"
                >
                  Professions (Comma Separated)
                </label>
                <input
                  {...getInputProps(fields.profession, { type: "text" })}
                  value={formData.professionRawString || ""}
                  placeholder="Driver, Electrician, Plumber"
                  onChange={e =>
                    setFormData(p => ({
                      ...p,
                      professionRawString: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:outline-none"
                />
                {fields.profession.errors && (
                  <p className="mt-1 text-xs text-red-600">
                    {fields.profession.errors}
                  </p>
                )}
              </div>

              {serverError && (
                <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                  {serverError}
                </div>
              )}

              <div className="flex justify-end gap-3 border-t border-[#ECE3DA] pt-4">
                {profileExists && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl border border-[#ECE3DA] px-5 py-2.5 text-sm font-semibold text-[#55463E]"
                  >
                    Discard
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-xl bg-[#5B1E05] px-6 py-2.5 text-sm font-semibold text-white shadow-md"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}{" "}
                  Save Parameters
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Age
                </span>
                <p className="mt-1 font-medium text-[#55463E]">
                  {formData.age ?? "Not declared"}
                </p>
              </div>
              <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  City
                </span>
                <p className="mt-1 font-medium text-[#55463E]">
                  {formData.city || "Not declared"}
                </p>
              </div>
              <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4 sm:col-span-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Professions
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.profession && formData.profession.length > 0 ? (
                    formData.profession.map((prof, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-[#F8ECE4] px-2.5 py-1 text-xs font-medium text-[#5B1E05]"
                      >
                        {prof}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">
                      No professions added
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tracked Applications Section (Mirrors Recruiter Card Grid Strategy)[cite: 8] */}
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#ECE3DA] bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#ECE3DA] pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#55463E]">
              Tracked Applications
            </h2>
            <p className="mt-0.5 text-xs text-gray-400">
              Active openings and status summaries managed by your account
            </p>
          </div>
        </div>

        <div className="mt-6">
          {loadingApps ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-[#5B1E05]" />
            </div>
          ) : applications.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 py-12 text-center">
              <BriefcaseBusiness className="mx-auto mb-2 h-10 w-10 text-gray-300" />
              <p className="text-sm font-medium text-gray-400">
                No applications configured yet.
              </p>
            </div>
          ) : (
            <div className="max-h-[500px] space-y-4 overflow-y-auto pr-1">
              {applications.map(app => (
                <div
                  key={app.id}
                  className="rounded-3xl border border-orange-100/40 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex w-full items-start gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50">
                        <UserCheck className="text-[#8F3E13]" size={24} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="inline-block rounded-md bg-[#F5E7DA] px-2 py-0.5 text-xs font-bold text-[#8F3E13]">
                            Application Slot
                          </span>
                          {/* App Actions (Edit overlay & Delete service workflow)[cite: 8] */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAppEditOpen(app)}
                              className="rounded-lg p-1.5 text-gray-500 transition hover:bg-gray-100 hover:text-[#8F3E13]"
                              title="Edit Application"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => handleAppDelete(app.id)}
                              className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                              title="Delete Application"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <h2 className="mt-1 text-xl font-bold text-[#2B0F05]">
                          {app.firstName} {app.lastName || ""}
                        </h2>

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
                              Expected:{" "}
                              {app.salaryExpectation?.toLocaleString()}{" "}
                              {app.currency} / {app.payPeriod}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* EDIT APPLICATION DIALOG OVERLAY MODAL[cite: 8] */}
      {isAppModalOpen && (
        <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-xl font-bold text-[#2B0F05]">
              Edit Application Details
            </h3>
            <form onSubmit={handleAppEditSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                    Expected Salary
                  </label>
                  <input
                    type="number"
                    value={selectedApp.salaryExpectation || ""}
                    onChange={e =>
                      setSelectedApp(p => ({
                        ...p,
                        salaryExpectation: e.target.value
                          ? Number(e.target.value)
                          : null,
                      }))
                    }
                    className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                    Currency
                  </label>
                  <input
                    type="text"
                    value={selectedApp.currency || ""}
                    onChange={e =>
                      setSelectedApp(p => ({ ...p, currency: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-center text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                    Pay Period
                  </label>
                  <select
                    value={selectedApp.payPeriod || "monthly"}
                    onChange={e =>
                      setSelectedApp(p => ({
                        ...p,
                        payPeriod: e.target.value as any,
                      }))
                    }
                    className="w-full rounded-xl border border-[#ECE3DA] bg-white p-2.5 text-sm focus:outline-none"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedApp.city || ""}
                    onChange={e =>
                      setSelectedApp(p => ({ ...p, city: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                    Country
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedApp.country || ""}
                    onChange={e =>
                      setSelectedApp(p => ({ ...p, country: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                  Locality
                </label>
                <input
                  type="text"
                  value={selectedApp.locality || ""}
                  onChange={e =>
                    setSelectedApp(p => ({ ...p, locality: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={selectedApp.industry || ""}
                    onChange={e =>
                      setSelectedApp(p => ({ ...p, industry: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                    Phone Reference
                  </label>
                  <input
                    type="text"
                    value={selectedApp.phone || ""}
                    onChange={e =>
                      setSelectedApp(p => ({ ...p, phone: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAppModalOpen(false)}
                  className="rounded-xl border border-[#ECE3DA] px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={appSubmitting}
                  className="flex items-center gap-2 rounded-xl bg-[#5B1E05] px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#442003]"
                >
                  {appSubmitting && (
                    <Loader2 size={14} className="animate-spin" />
                  )}{" "}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
