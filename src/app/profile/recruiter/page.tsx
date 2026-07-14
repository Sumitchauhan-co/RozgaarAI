"use client";

import { recruiterModel } from "@/app/models/recruiter.model";
import { useAuthStore } from "@/app/store/store";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { AxiosError } from "axios";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building,
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
import api from "../../utils/api";

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

interface RecruiterApplicationItem {
  id: string;
  workerId: string;
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

interface Recruiter {
  id: string;
  companyName: string;
  industry: string;
  city: string;
}

export default function RecruiterProfilePage() {
  const { setRecruiterId, isAuthenticated, recruiterId } = useAuthStore();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Recruiter>>({});
  const [user, setUser] = useState<UserSession | null>(null);
  const [applications, setApplications] = useState<RecruiterApplicationItem[]>(
    []
  );
  const [loadingApps, setLoadingApps] = useState(false);

  // Application Edit Modal State variables
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<
    Partial<RecruiterApplicationItem>
  >({});
  const [appSubmitting, setAppSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  const fetchApplications = useCallback(async () => {
    if (!recruiterId) return;

    setLoadingApps(true);
    try {
      const response = await api.get(
        `/api/recruiter/application/${recruiterId}`
      );
      if (response.data?.success) {
        setApplications(response.data.data || []);
      }
    } catch (err) {
      console.error("Error loading profile applications:", err);
    } finally {
      setLoadingApps(false);
    }
  }, [recruiterId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes =
          await api.get<ApiResponse<UserSession>>("/api/auth/getUser");
        if (userRes.data?.success) setUser(userRes.data.data);

        const profileRes = await api.get<ApiResponse<Recruiter>>(
          "/api/recruiter/profile"
        );
        if (profileRes.data?.success && profileRes.data?.data) {
          const rawData = Array.isArray(profileRes.data.data)
            ? profileRes.data.data[0]
            : profileRes.data.data;
          if (rawData && Object.keys(rawData).length > 0) {
            setFormData(rawData);
            setProfileExists(true);
            return;
          }
        }
        setFormData({ companyName: "", city: "", industry: "" });
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
  }, [isAuthenticated, setRecruiterId, fetchApplications]);

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: recruiterModel });
    },
    shouldValidate: "onBlur",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    const submission = parseWithZod(new FormData(e.currentTarget), {
      schema: recruiterModel,
    });

    if (submission.status !== "success") return;

    setSubmitting(true);
    try {
      const res = profileExists
        ? await api.patch<ApiResponse<Recruiter>>(
            "/api/recruiter/profile",
            submission.value
          )
        : await api.post<ApiResponse<Recruiter>>(
            "/api/recruiter/profile",
            submission.value
          );

      if (res.data?.success) {
        const updated = Array.isArray(res.data.data)
          ? res.data.data[0]
          : res.data.data;
        setFormData(updated);
        setProfileExists(true);
        setIsEditing(false);
        setRecruiterId(res.data.data.id);
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
      await api.delete("/api/recruiter/profile");
      setProfileExists(false);
      setIsEditing(false);
      setFormData({ companyName: "", city: "", industry: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // Delete handler for specific applications
  const handleAppDelete = async (appId: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      const res = await api.delete(
        `/api/recruiter/application/${recruiterId}/${appId}`
      );
      if (res.data?.success) {
        setApplications(prev => prev.filter(app => app.id !== appId));
      }
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Failed to delete application entry.");
    }
  };

  // Open Edit Application state overlay mapping
  const handleAppEditOpen = (app: RecruiterApplicationItem) => {
    setSelectedApp(app);
    setIsAppModalOpen(true);
  };

  // Save changes to updated application structural metrics
  const handleAppEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppSubmitting(true);
    try {
      const res = await api.patch(
        `/api/recruiter/application/${recruiterId}/${selectedApp.id}`,
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
      console.error("Error editing application parameters:", err);
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
      {/* Back button container */}
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
              <Building className="h-8 w-8 text-[#5B1E05]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#55463E] capitalize">
                {user
                  ? `${user.firstName} ${user.lastName}`
                  : "Recruiter Profile"}
              </h1>
              <p className="text-sm font-medium text-[#5B1E05]/70">
                Recruiter Account
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
                  htmlFor="companyName"
                  className="block text-sm font-medium text-[#55463E]"
                >
                  Company Name
                </label>
                <input
                  {...getInputProps(fields.companyName, { type: "text" })}
                  value={formData.companyName || ""}
                  onChange={e =>
                    setFormData(p => ({ ...p, companyName: e.target.value }))
                  }
                  className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:outline-none"
                />
                {fields.companyName.errors && (
                  <p className="mt-1 text-xs text-red-600">
                    {fields.companyName.errors}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-[#55463E]"
                >
                  Operating City
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
                  htmlFor="industry"
                  className="block text-sm font-medium text-[#55463E]"
                >
                  Industry Domain
                </label>
                <input
                  {...getInputProps(fields.industry, { type: "text" })}
                  value={formData.industry || ""}
                  onChange={e =>
                    setFormData(p => ({ ...p, industry: e.target.value }))
                  }
                  className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:outline-none"
                />
                {fields.industry.errors && (
                  <p className="mt-1 text-xs text-red-600">
                    {fields.industry.errors}
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
                  Company Name
                </span>
                <p className="mt-1 font-medium text-[#55463E]">
                  {formData.companyName}
                </p>
              </div>
              <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  City
                </span>
                <p className="mt-1 font-medium text-[#55463E]">
                  {formData.city}
                </p>
              </div>
              <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4 sm:col-span-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Industry
                </span>
                <p className="mt-1 font-medium text-[#55463E]">
                  {formData.industry}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recruiter Applications Section (Bottom View) */}
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
                No recruiter applications configured yet.
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
                            Applicant Profile
                          </span>
                          {/* App Action Buttons (Edit & Delete) */}
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
              ))}
            </div>
          )}
        </div>
      </div>

      {/* EDIT APPLICATION DIALOG OVERLAY MODAL */}
      {isAppModalOpen && (
        <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-xl font-bold text-[#2B0F05]">
              Edit Application Details
            </h3>
            <form onSubmit={handleAppEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={selectedApp.firstName || ""}
                    onChange={e =>
                      setSelectedApp(p => ({ ...p, firstName: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:outline-none"
                  />
                </div> */}
                {/* <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={selectedApp.lastName || ""}
                    onChange={e =>
                      setSelectedApp(p => ({ ...p, lastName: e.target.value }))
                    }
                    className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:outline-none"
                  />
                </div> */}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                    Expected Salary
                  </label>
                  <input
                    type="number"
                    value={selectedApp.salary || ""}
                    onChange={e =>
                      setSelectedApp(p => ({
                        ...p,
                        salary: e.target.value ? Number(e.target.value) : null,
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
                  )}
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
