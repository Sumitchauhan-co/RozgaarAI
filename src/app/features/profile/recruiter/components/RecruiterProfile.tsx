"use client";

import { useAuthStore } from "@/app/store/store";
import {
  ArrowLeft,
  Building,
  Edit3,
  Loader2,
  Plus,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Recruiter, RecruiterApplicationItem, UserSession } from "../types";
import EditApplicationModal from "./EditApplicationModal";
import RecruiterApplication from "./RecruiterApplications";

import { recruiterModel } from "@/app/server/models/recruiter.model";
import {
  deleteRecruiterApplication,
  deleteRecruiterProfile,
  fetchRecruiterApplications,
  fetchRecruiterProfile,
  fetchUserData,
  saveRecruiterProfile,
  updateRecruiterApplication,
} from "../server/actions/recruiter";

type RecruiterFormValues = {
  companyName: string;
  city: string;
  industry: string;
  companyDescription: string;
};

const defaultRecruiterValues: RecruiterFormValues = {
  companyName: "",
  city: "",
  industry: "",
  companyDescription: "",
};

export default function RecruiterProfile() {
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

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<
    Partial<RecruiterApplicationItem>
  >({});
  const [appSubmitting, setAppSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RecruiterFormValues>({
    defaultValues: defaultRecruiterValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  const loadApplications = useCallback(async () => {
    if (!recruiterId) return;

    setLoadingApps(true);
    const result = await fetchRecruiterApplications(recruiterId);
    if (result.success) {
      setApplications(result.data);
    }
    setLoadingApps(false);
  }, [recruiterId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResult = await fetchUserData();
        if (userResult.success) setUser(userResult.data);

        const profileResult = await fetchRecruiterProfile();
        if (profileResult.success && profileResult.data) {
          const nextData: Partial<Recruiter> = {
            ...profileResult.data,
            companyDescription: profileResult.data.companyDescription ?? "",
          };
          setFormData(nextData);
          reset({
            companyName: nextData.companyName ?? "",
            city: nextData.city ?? "",
            industry: nextData.industry ?? "",
            companyDescription: nextData.companyDescription ?? "",
          });
          setProfileExists(true);
          return;
        }

        setFormData(defaultRecruiterValues);
        reset(defaultRecruiterValues);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
      loadApplications();
    }
  }, [isAuthenticated, setRecruiterId, loadApplications, reset]);

  const onProfileSubmit = async (values: RecruiterFormValues) => {
    setServerError(null);

    const parsed = recruiterModel.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof RecruiterFormValues;
        if (field) {
          setError(field, {
            type: "manual",
            message: issue.message,
          });
        }
      });
      return;
    }

    setSubmitting(true);
    const result = await saveRecruiterProfile(parsed.data, profileExists);

    if (result.success && result.data) {
      const nextData: Partial<Recruiter> = {
        ...result.data,
        companyDescription: result.data.companyDescription ?? "",
      };
      setFormData(nextData);
      reset({
        companyName: nextData.companyName ?? "",
        city: nextData.city ?? "",
        industry: nextData.industry ?? "",
        companyDescription: nextData.companyDescription ?? "",
      });
      setProfileExists(true);
      setIsEditing(false);
      setRecruiterId(result.data.id);
    } else {
      setServerError(result.error);
    }
    setSubmitting(false);
  };

  const handleDelete = async () => {
    if (!confirm("Clear profile metrics?")) return;
    const result = await deleteRecruiterProfile();
    if (result.success) {
      setProfileExists(false);
      setIsEditing(false);
      setFormData(defaultRecruiterValues);
      reset(defaultRecruiterValues);
    }
  };

  const handleAppDelete = async (appId: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    if (!recruiterId) return;

    const result = await deleteRecruiterApplication(recruiterId, appId);
    if (result.success) {
      setApplications(prev => prev.filter(app => app.id !== appId));
    } else {
      alert("Failed to delete application entry.");
    }
  };

  const handleAppEditOpen = (app: RecruiterApplicationItem) => {
    setSelectedApp(app);
    setIsAppModalOpen(true);
  };

  const handleAppEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!recruiterId) return;

    setAppSubmitting(true);
    const result = await updateRecruiterApplication(recruiterId, selectedApp);

    if (result.success) {
      setApplications(prev =>
        prev.map(app =>
          app.id === selectedApp.id ? { ...app, ...selectedApp } : app
        )
      );
      setIsAppModalOpen(false);
    } else {
      alert("Failed to update application details.");
    }
    setAppSubmitting(false);
  };

  if (loading)
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FCFBF9]">
        <Loader2 className="h-10 w-10 animate-spin text-[#5B1E05]" />
      </div>
    );

  return (
    <main className="min-h-screen space-y-6 bg-[#FCFBF9] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 rounded-xl border border-[#ECE3DA] bg-white px-4 py-2 text-sm font-semibold text-[#55463E] shadow-sm transition-all duration-200 hover:border-[#5B1E05]/30 hover:bg-[#F8ECE4]/50 hover:shadow-md active:scale-95"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>

      <div className="mx-auto max-w-3xl rounded-2xl border border-[#ECE3DA] bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col items-center border-b border-[#ECE3DA] pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F8ECE4] shadow-inner">
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
                onClick={() => {
                  setIsEditing(true);
                  reset({
                    companyName: formData.companyName ?? "",
                    city: formData.city ?? "",
                    industry: formData.industry ?? "",
                    companyDescription: formData.companyDescription ?? "",
                  });
                }}
                className="flex items-center gap-2 rounded-xl border border-[#ECE3DA] bg-white px-4 py-2 text-sm font-semibold text-[#55463E] transition-all duration-200 hover:border-[#5B1E05]/30 hover:bg-[#F8ECE4]/50 hover:shadow-md active:scale-95"
              >
                <Edit3 size={16} /> Modify
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-100 hover:shadow-md active:scale-95"
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
                onClick={() => {
                  setIsEditing(true);
                  reset(defaultRecruiterValues);
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#5B1E05] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-[#442003] hover:shadow-md active:scale-95"
              >
                <Plus size={16} /> Setup Profile
              </button>
            </div>
          ) : isEditing ? (
            <form
              onSubmit={handleSubmit(onProfileSubmit)}
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
                  id="companyName"
                  {...register("companyName")}
                  className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:bg-white focus:ring-1 focus:ring-[#5B1E05] focus:outline-none"
                />
                {errors.companyName && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-[#55463E]"
                  >
                    Operating City
                  </label>
                  <input
                    id="city"
                    {...register("city")}
                    className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:bg-white focus:ring-1 focus:ring-[#5B1E05] focus:outline-none"
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.city.message}
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
                    id="industry"
                    {...register("industry")}
                    className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:bg-white focus:ring-1 focus:ring-[#5B1E05] focus:outline-none"
                  />
                  {errors.industry && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.industry.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="companyDescription"
                  className="block text-sm font-medium text-[#55463E]"
                >
                  Company Description
                </label>
                <textarea
                  id="companyDescription"
                  rows={3}
                  {...register("companyDescription")}
                  className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:bg-white focus:ring-1 focus:ring-[#5B1E05] focus:outline-none"
                />
                {errors.companyDescription && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.companyDescription.message}
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
                    onClick={() => {
                      setIsEditing(false);
                      reset({
                        companyName: formData.companyName ?? "",
                        city: formData.city ?? "",
                        industry: formData.industry ?? "",
                        companyDescription: formData.companyDescription ?? "",
                      });
                    }}
                    className="rounded-xl border border-[#ECE3DA] bg-white px-5 py-2.5 text-sm font-semibold text-[#55463E] transition-all duration-200 hover:bg-[#F8ECE4]/50 hover:shadow-sm active:scale-95"
                  >
                    Discard
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || submitting}
                  className="flex items-center gap-2 rounded-xl bg-[#5B1E05] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-[#442003] hover:shadow-lg active:scale-95"
                >
                  {(submitting || isSubmitting) && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  Save Parameters
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4 transition-all duration-200 hover:bg-white hover:shadow-sm">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Company Name
                </span>
                <p className="mt-1 font-medium text-[#55463E]">
                  {formData.companyName || "Not declared"}
                </p>
              </div>
              <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4 transition-all duration-200 hover:bg-white hover:shadow-sm">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  City
                </span>
                <p className="mt-1 font-medium text-[#55463E]">
                  {formData.city || "Not declared"}
                </p>
              </div>
              <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4 transition-all duration-200 hover:bg-white hover:shadow-sm sm:col-span-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Industry
                </span>
                <p className="mt-1 font-medium text-[#55463E]">
                  {formData.industry || "Not declared"}
                </p>
              </div>
              <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4 transition-all duration-200 hover:bg-white hover:shadow-sm sm:col-span-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Company Description
                </span>
                <p className="mt-1 font-medium whitespace-pre-line text-[#55463E]">
                  {formData.companyDescription || "No description provided."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <RecruiterApplication
        applications={applications}
        loading={loadingApps}
        onEdit={handleAppEditOpen}
        onDelete={handleAppDelete}
      />

      <EditApplicationModal
        isOpen={isAppModalOpen}
        onClose={() => setIsAppModalOpen(false)}
        selectedApp={selectedApp}
        setSelectedApp={setSelectedApp}
        onSubmit={handleAppEditSubmit}
        submitting={appSubmitting}
      />
    </main>
  );
}
