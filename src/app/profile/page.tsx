"use client";

import { useAuthStore } from "@/app/store/store";
import { AxiosError } from "axios";
import {
  Briefcase,
  Building,
  Edit3,
  Loader2,
  Plus,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../utils/api";

interface WorkerProfile {
  age: string;
  city: string;
  profession: string[];
}

interface RecruiterProfile {
  companyName: string;
  city: string;
  industry: string;
}

type ProfileFormData = Partial<WorkerProfile & RecruiterProfile> & {
  professionInput?: string;
};

interface UserSession {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "worker" | "recruiter" | string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export default function ProfilePage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [profileExists, setProfileExists] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [formData, setFormData] = useState<ProfileFormData>({});
  const [user, setUser] = useState<UserSession | null>(null);

  const role = user?.role;
  const apiEndpoint =
    role === "recruiter" ? "/api/recruiter/profile" : "/api/worker/profile";

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response =
          await api.get<ApiResponse<UserSession>>("/api/auth/getUser");

        console.log(response);
        if (response.data?.success && response.data?.data) {
          setUser(response.data.data);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Failed to fetch user session details:", err);
        router.push("/login");
      }
    };
    fetchUserData();
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated || !role) return;

    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response =
          await api.get<ApiResponse<ProfileFormData | ProfileFormData[]>>(
            apiEndpoint
          );

        if (response.data?.success && response.data?.data) {
          const rawData = response.data.data;
          const profileData = Array.isArray(rawData) ? rawData[0] : rawData;

          if (profileData && Object.keys(profileData).length > 0) {
            if (role === "worker" && Array.isArray(profileData.profession)) {
              profileData.professionInput = profileData.profession.join(", ");
            }
            setFormData(profileData);
            setProfileExists(true);
            return;
          }
        }

        setProfileExists(false);
        setFormData(
          role === "recruiter"
            ? { companyName: "", city: "", industry: "" }
            : { age: "", city: "", profession: [], professionInput: "" }
        );
      } catch (err) {
        console.error("Error structural layout profile retrieval:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [apiEndpoint, isAuthenticated, role]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    let finalPayload: Record<string, unknown> = {};
    if (role === "recruiter") {
      finalPayload = {
        companyName: formData.companyName,
        city: formData.city,
        industry: formData.industry,
      };
    } else {
      const parsedProfessions = formData.professionInput
        ? formData.professionInput
            .split(",")
            .map(p => p.trim())
            .filter(Boolean)
        : [];

      finalPayload = {
        age: Number(formData.age) || formData.age,
        city: formData.city,
        profession: parsedProfessions,
      };
    }

    try {
      const response = profileExists
        ? await api.patch<ApiResponse<ProfileFormData>>(
            apiEndpoint,
            finalPayload
          )
        : await api.post<ApiResponse<ProfileFormData>>(
            apiEndpoint,
            finalPayload
          );

      if (response.data?.success) {
        const rawResult = response.data.data;
        const updatedData = Array.isArray(rawResult) ? rawResult[0] : rawResult;

        if (role === "worker" && Array.isArray(updatedData?.profession)) {
          updatedData.professionInput = updatedData.profession.join(", ");
        }

        setFormData(updatedData || formData);
        setProfileExists(true);
        setIsEditing(false);
        alert(response.data.message || "Profile successfully synced!");
      }
    } catch (err) {
      const axiosError = err as AxiosError<ApiResponse<never>>;
      alert(
        axiosError.response?.data?.message ||
          "Something went wrong saving details."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to permanently clear your profile metrics?"
      )
    )
      return;

    setSubmitting(true);
    try {
      const response = await api.delete<ApiResponse<never>>(apiEndpoint);
      alert(response.data?.message || "Profile dropped successfully.");

      setProfileExists(false);
      setIsEditing(false);
      setFormData(
        role === "recruiter"
          ? { companyName: "", city: "", industry: "" }
          : { age: "", city: "", profession: [], professionInput: "" }
      );
    } catch (err) {
      const axiosError = err as AxiosError<ApiResponse<never>>;
      alert(
        axiosError.response?.data?.message || "Failed to terminate target rows."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FCFBF9]">
        <Loader2 className="h-10 w-10 animate-spin text-[#5B1E05]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FCFBF9] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#ECE3DA] bg-white p-8 shadow-sm">
        {/* Dynamic User Summary Header */}
        <div className="flex flex-col items-center border-b border-[#ECE3DA] pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F8ECE4]">
              {role === "recruiter" ? (
                <Building className="h-8 w-8 text-[#5B1E05]" />
              ) : (
                <Briefcase className="h-8 w-8 text-[#5B1E05]" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#55463E] capitalize">
                {user
                  ? `${user.firstName} ${user.lastName}`
                  : "Profile Details"}
              </h1>
              <p className="text-sm font-medium text-[#5B1E05]/70 capitalize">
                Registered {role} Context
              </p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>

          {profileExists && !isEditing && (
            <div className="mt-4 flex gap-3 sm:mt-0">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-xl border border-[#ECE3DA] px-4 py-2 text-sm font-semibold text-[#55463E] hover:bg-[#F8ECE4]/40"
              >
                <Edit3 size={16} /> Modify Profile
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={submitting}
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
              >
                <Trash2 size={16} /> Clear Profile
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Display Layout Interface Blocks */}
        <div className="mt-8">
          {!profileExists && !isEditing ? (
            <div className="py-8 text-center">
              <UserIcon className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-semibold text-[#55463E]">
                No data present
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Provide custom record fields matching your {role} credentials to
                configure.
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#5B1E05] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#442003]"
                >
                  <Plus size={16} /> Complete Profile Setup
                </button>
              </div>
            </div>
          ) : isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-medium text-[#55463E]">
                {profileExists
                  ? "Edit Custom Schema Fields"
                  : "Instantiate Core Metrics Profile"}
              </h3>

              {role === "recruiter" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#55463E]">
                      Company Corporate Identity
                    </label>
                    <input
                      title="input field"
                      type="text"
                      required
                      value={formData.companyName || ""}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#55463E]">
                      Operating City location
                    </label>
                    <input
                      title="input field"
                      type="text"
                      required
                      value={formData.city || ""}
                      onChange={e =>
                        setFormData(prev => ({ ...prev, city: e.target.value }))
                      }
                      className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#55463E]">
                      Target Core Industry
                    </label>
                    <input
                      title="input field"
                      type="text"
                      required
                      value={formData.industry || ""}
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          industry: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:outline-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#55463E]">
                      Current Age Tracking
                    </label>
                    <input
                      title="input field"
                      type="number"
                      required
                      value={formData.age || ""}
                      onChange={e =>
                        setFormData(prev => ({ ...prev, age: e.target.value }))
                      }
                      className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#55463E]">
                      Residential Operating City
                    </label>
                    <input
                      title="input field"
                      type="text"
                      required
                      value={formData.city || ""}
                      onChange={e =>
                        setFormData(prev => ({ ...prev, city: e.target.value }))
                      }
                      className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#55463E]">
                      Professions Matrix (Separated via commas)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.professionInput || ""}
                      placeholder="Driver, Electrician, Plumber"
                      onChange={e =>
                        setFormData(prev => ({
                          ...prev,
                          professionInput: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:outline-none"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3 border-t border-[#ECE3DA] pt-4">
                {profileExists && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl border border-[#ECE3DA] px-5 py-2.5 text-sm font-semibold text-[#55463E] hover:bg-[#F8ECE4]/40"
                  >
                    Discard Changes
                  </button>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-xl bg-[#5B1E05] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#442003] disabled:opacity-50"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {profileExists
                    ? "Push Modifications"
                    : "Build Profile Parameters"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {role === "recruiter" ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4">
                    <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Corporate Identity
                    </span>
                    <p className="mt-1 text-base font-medium text-[#55463E]">
                      {formData.companyName}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4">
                    <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Operational Base (City)
                    </span>
                    <p className="mt-1 text-base font-medium text-[#55463E]">
                      {formData.city}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4 sm:col-span-2">
                    <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Industrial Domain
                    </span>
                    <p className="mt-1 text-base font-medium text-[#55463E]">
                      {formData.industry}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4">
                    <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Chronological Age
                    </span>
                    <p className="mt-1 text-base font-medium text-[#55463E]">
                      {formData.age}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4">
                    <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Target City Context
                    </span>
                    <p className="mt-1 text-base font-medium text-[#55463E]">
                      {formData.city}
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4 sm:col-span-2">
                    <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                      Core Selected Professions
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.profession?.map((prof: string, idx: number) => (
                        <span
                          key={idx}
                          className="rounded-lg bg-[#F8ECE4] px-2.5 py-1 text-xs font-medium text-[#5B1E05]"
                        >
                          {prof}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
