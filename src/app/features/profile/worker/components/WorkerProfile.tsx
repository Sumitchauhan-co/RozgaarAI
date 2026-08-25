"use client";

import { workerModel } from "@/app/server/models/worker.model";
import { useAuthStore } from "@/app/store/store";
import { AxiosError } from "axios";
import {
  ArrowLeft,
  Briefcase,
  Edit3,
  Loader2,
  Plus,
  Trash2,
  User as UserIcon,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import EditWorkerAppModal from "../components/EditWorkerModal";
import {
  deleteWorkerApplication,
  deleteWorkerProfile,
  getUserProfile,
  getWorkerApplications,
  getWorkerProfile,
  saveWorkerProfile,
  updateWorkerApplication,
} from "../server/actions/worker";
import {
  ApiResponse,
  LocalWorkerState,
  UserSession,
  WorkerApplicationItem,
} from "../types";
import WorkerApplications from "./WorkerApplications";

type WorkerFormValues = {
  age: string;
  city: string;
  experienceYears: string;
  bio: string;
};

const defaultWorkerValues: WorkerFormValues = {
  age: "",
  city: "",
  experienceYears: "",
  bio: "",
};

export default function WorkerProfile() {
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

  // Dynamic Tag Input State
  const [professions, setProfessions] = useState<string[]>([]);
  const [professionInput, setProfessionInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<
    Partial<WorkerApplicationItem>
  >({});
  const [appSubmitting, setAppSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<WorkerFormValues>({
    defaultValues: defaultWorkerValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  const fetchApplications = useCallback(async () => {
    if (!workerId) return;

    setLoadingApps(true);
    try {
      const resData = await getWorkerApplications(workerId);
      if (resData?.success) {
        setApplications(Array.isArray(resData.data) ? resData.data : []);
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
        const userRes = await getUserProfile();
        if (userRes?.success) setUser(userRes.data);

        const profileRes = await getWorkerProfile();
        if (profileRes?.success && profileRes?.data) {
          const rawData = Array.isArray(profileRes.data)
            ? profileRes.data[0]
            : profileRes.data;
          if (rawData && Object.keys(rawData).length > 0) {
            const nextData: LocalWorkerState = {
              ...rawData,
            };
            setFormData(nextData);
            setProfessions(
              Array.isArray(rawData.profession) ? rawData.profession : []
            );
            setSkills(Array.isArray(rawData.skills) ? rawData.skills : []);
            reset({
              age: nextData.age?.toString() ?? "",
              city: nextData.city ?? "",
              experienceYears: nextData.experienceYears?.toString() ?? "",
              bio: nextData.bio ?? "",
            });
            setProfileExists(true);
            setWorkerId(rawData.id);
            return;
          }
        }
        setFormData({
          age: null,
          city: "",
          profession: [],
          skills: [],
          experienceYears: null,
          bio: "",
        });
        setProfessions([]);
        setSkills([]);
        reset(defaultWorkerValues);
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
  }, [isAuthenticated, setWorkerId, fetchApplications, reset]);

  const handleAddProfession = () => {
    const trimmed = professionInput.trim();
    if (trimmed && !professions.includes(trimmed)) {
      setProfessions(prev => [...prev, trimmed]);
      setProfessionInput("");
    }
  };

  const handleRemoveProfession = (index: number) => {
    setProfessions(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills(prev => [...prev, trimmed]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const onProfileSubmit = async (values: WorkerFormValues) => {
    setServerError(null);

    const parsed = workerModel.safeParse({
      age: values.age ? Number(values.age) : undefined,
      city: values.city || undefined,
      profession: professions,
      skills: skills,
      experienceYears: values.experienceYears
        ? Number(values.experienceYears)
        : undefined,
      bio: values.bio || undefined,
    });

    if (!parsed.success) {
      parsed.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof WorkerFormValues;
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
    const payload = {
      age: parsed.data.age ?? null,
      city: parsed.data.city ?? null,
      profession: parsed.data.profession ?? [],
      skills: parsed.data.skills ?? [],
      experienceYears: parsed.data.experienceYears ?? null,
      bio: parsed.data.bio ?? null,
    };

    try {
      const resData = await saveWorkerProfile(payload, profileExists);

      if (resData?.success) {
        const updated = Array.isArray(resData.data)
          ? resData.data[0]
          : resData.data;
        const nextData: LocalWorkerState = {
          ...updated,
        };
        setFormData(nextData);
        setProfessions(
          Array.isArray(updated?.profession) ? updated.profession : []
        );
        setSkills(Array.isArray(updated?.skills) ? updated.skills : []);
        reset({
          age: nextData.age?.toString() ?? "",
          city: nextData.city ?? "",
          experienceYears: nextData.experienceYears?.toString() ?? "",
          bio: nextData.bio ?? "",
        });
        setProfileExists(true);
        setIsEditing(false);
        setWorkerId(resData.data.id);
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
      await deleteWorkerProfile();
      setProfileExists(false);
      setIsEditing(false);
      setFormData({
        age: null,
        city: "",
        profession: [],
        skills: [],
        experienceYears: null,
        bio: "",
      });
      setProfessions([]);
      setSkills([]);
      reset(defaultWorkerValues);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAppDelete = async (appId: string) => {
    if (!workerId) return;
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      const resData = await deleteWorkerApplication(workerId, appId);
      if (resData?.success) {
        setApplications(prev => prev.filter(app => app.id !== appId));
      }
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Failed to delete application entry.");
    }
  };

  const handleAppEditOpen = (app: WorkerApplicationItem) => {
    setSelectedApp(app);
    setIsAppModalOpen(true);
  };

  const handleAppEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!workerId || !selectedApp.id) return;

    setAppSubmitting(true);
    try {
      const resData = await updateWorkerApplication(
        workerId,
        selectedApp.id,
        selectedApp
      );
      if (resData?.success) {
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
                onClick={() => {
                  setIsEditing(true);
                  setProfessions(formData.profession || []);
                  setSkills(formData.skills || []);
                  reset({
                    age: formData.age?.toString() ?? "",
                    city: formData.city ?? "",
                    experienceYears: formData.experienceYears?.toString() ?? "",
                    bio: formData.bio ?? "",
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
                  setProfessions([]);
                  setSkills([]);
                  reset(defaultWorkerValues);
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-[#55463E]"
                  >
                    Current Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    {...register("age")}
                    className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:bg-white focus:ring-1 focus:ring-[#5B1E05] focus:outline-none"
                  />
                  {errors.age && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.age.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="experienceYears"
                    className="block text-sm font-medium text-[#55463E]"
                  >
                    Experience Years
                  </label>
                  <input
                    id="experienceYears"
                    type="number"
                    {...register("experienceYears")}
                    className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:bg-white focus:ring-1 focus:ring-[#5B1E05] focus:outline-none"
                  />
                  {errors.experienceYears && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.experienceYears.message}
                    </p>
                  )}
                </div>
              </div>

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

              {/* Professions Tag Input Box */}
              <div>
                <label className="block text-sm font-medium text-[#55463E]">
                  Professions
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={professionInput}
                    onChange={e => setProfessionInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddProfession();
                      }
                    }}
                    placeholder="Add profession (e.g. Driver, Plumber)..."
                    className="block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:bg-white focus:ring-1 focus:ring-[#5B1E05] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddProfession}
                    className="flex items-center gap-1 rounded-xl bg-[#5B1E05] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#442003] active:scale-95"
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {professions.map((prof, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#ECE3DA] bg-[#F8ECE4] px-3 py-1.5 text-xs font-semibold text-[#5B1E05] shadow-sm transition-all duration-200 hover:shadow"
                    >
                      {prof}
                      <button
                        type="button"
                        onClick={() => handleRemoveProfession(index)}
                        className="rounded-full p-0.5 transition-colors hover:bg-[#5B1E05]/10 hover:text-red-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  {professions.length === 0 && (
                    <p className="text-xs text-gray-400 italic">
                      No professions added yet. Type above and click Add.
                    </p>
                  )}
                </div>
              </div>

              {/* Skills Tag Input Box */}
              <div>
                <label className="block text-sm font-medium text-[#55463E]">
                  Skills
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    placeholder="Add skill (e.g. Wiring, Soldering)..."
                    className="block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:bg-white focus:ring-1 focus:ring-[#5B1E05] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="flex items-center gap-1 rounded-xl bg-[#5B1E05] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#442003] active:scale-95"
                  >
                    <Plus size={16} /> Add
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#ECE3DA] bg-[#FCFBF9] px-3 py-1.5 text-xs font-semibold text-[#55463E] shadow-sm transition-all duration-200 hover:shadow"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className="rounded-full p-0.5 transition-colors hover:bg-gray-200 hover:text-red-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  {skills.length === 0 && (
                    <p className="text-xs text-gray-400 italic">
                      No skills added yet. Type above and click Add.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-[#55463E]"
                >
                  Bio / Summary
                </label>
                <textarea
                  id="bio"
                  rows={3}
                  {...register("bio")}
                  className="mt-1 block w-full rounded-xl border border-[#ECE3DA] bg-[#FCFBF9] px-4 py-3 text-sm focus:border-[#5B1E05] focus:bg-white focus:ring-1 focus:ring-[#5B1E05] focus:outline-none"
                />
                {errors.bio && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.bio.message}
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
                      setProfessions(formData.profession || []);
                      setSkills(formData.skills || []);
                      reset({
                        age: formData.age?.toString() ?? "",
                        city: formData.city ?? "",
                        experienceYears:
                          formData.experienceYears?.toString() ?? "",
                        bio: formData.bio ?? "",
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
                  Age
                </span>
                <p className="mt-1 font-medium text-[#55463E]">
                  {formData.age ?? "Not declared"}
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
              <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4 transition-all duration-200 hover:bg-white hover:shadow-sm">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Experience
                </span>
                <p className="mt-1 font-medium text-[#55463E]">
                  {formData.experienceYears !== null &&
                  formData.experienceYears !== undefined
                    ? `${formData.experienceYears} Years`
                    : "Not declared"}
                </p>
              </div>
              <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4 transition-all duration-200 hover:bg-white hover:shadow-sm sm:col-span-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Bio / Summary
                </span>
                <p className="mt-1 font-medium whitespace-pre-line text-[#55463E]">
                  {formData.bio || "No summary provided."}
                </p>
              </div>
              <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4 transition-all duration-200 hover:bg-white hover:shadow-sm sm:col-span-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Professions
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.profession && formData.profession.length > 0 ? (
                    formData.profession.map((prof, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-[#F8ECE4] px-2.5 py-1 text-xs font-medium text-[#5B1E05] shadow-xs"
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
              <div className="rounded-xl border border-[#ECE3DA]/60 bg-[#FCFBF9] p-4 transition-all duration-200 hover:bg-white hover:shadow-sm sm:col-span-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">
                  Skills
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.skills && formData.skills.length > 0 ? (
                    formData.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-[#55463E] shadow-xs"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">
                      No skills added
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <WorkerApplications
        applications={applications}
        loading={loadingApps}
        onEdit={handleAppEditOpen}
        onDelete={handleAppDelete}
      />

      <EditWorkerAppModal
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
