"use client";

import { UpdateWorker, Worker, workerModel } from "@/app/models/worker.model";
import { useAuthStore } from "@/app/store/store";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { AxiosError } from "axios";
import {
  Briefcase,
  Edit3,
  Loader2,
  Plus,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import api from "../../utils/api";

// Create a UI-specific schema extending your model to process the raw comma-separated string input
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
  companyName: string;
  city: string;
  country: string;
  industry: string | null;
  locality: string | null;
  salaryExpectation: number | null;
  currency: string;
  payPeriod: "hourly" | "monthly" | "yearly";
  status: "pending" | "rejected" | "accepted";
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

// Extend the local component state type to manage the string format for editing
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
  const [applicationsLoading, setApplicationsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

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
    if (isAuthenticated) fetchData();
  }, [isAuthenticated, setWorkerId]);

  useEffect(() => {
    if (!workerId) return;
    const fetchApps = async () => {
      try {
        setApplicationsLoading(true);
        const res = await api.get<ApiResponse<WorkerApplicationItem[]>>(
          `/api/worker/application/${workerId}`
        );
        if (res.data?.success)
          setApplications(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setApplicationsLoading(false);
      }
    };
    fetchApps();
  }, [workerId]);

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
        : await api.post<ApiResponse<UpdateWorker>>(
            "/api/worker/profile",
            payload
          );

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

  if (loading)
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FCFBF9]">
        <Loader2 className="h-10 w-10 animate-spin text-[#5B1E05]" />
      </div>
    );

  return (
    <main className="min-h-screen bg-[#FCFBF9] px-4 py-12 sm:px-6 lg:px-8">
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

        {/* Applications view section */}
        <section className="mt-8 rounded-2xl border border-[#ECE3DA] bg-[#FCFBF9] p-6">
          <h2 className="text-lg font-semibold text-[#55463E]">
            Your Applications
          </h2>
          {applicationsLoading ? (
            <div className="mt-5 text-sm text-gray-500">Loading...</div>
          ) : applications.length === 0 ? (
            <div className="mt-5 text-sm text-gray-500">
              No applications found.
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {applications.map(app => (
                <div
                  key={app.id}
                  className="flex items-start justify-between rounded-xl border border-[#ECE3DA] bg-white p-4"
                >
                  <div>
                    <p className="font-semibold text-[#55463E]">
                      {app.companyName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {app.city}, {app.country}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${app.status === "accepted" ? "bg-green-100 text-green-700" : app.status === "rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
