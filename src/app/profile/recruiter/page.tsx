"use client";

import {
  Recruiter,
  recruiterModel,
  UpdateRecruiter,
} from "@/app/models/recruiter.model";
import { useAuthStore } from "@/app/store/store";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { AxiosError } from "axios";
import {
  Building,
  Edit3,
  Loader2,
  Plus,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

export default function RecruiterProfilePage() {
  const { setRecruiterId, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Recruiter>>({});
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

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
            setRecruiterId(rawData.id);
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
    if (isAuthenticated) fetchData();
  }, [isAuthenticated, setRecruiterId]);

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
        : await api.post<ApiResponse<UpdateRecruiter>>(
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
    </main>
  );
}
