"use client";

import { useAuthStore } from "@/app/store/store";
import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createWorkerApplicationAction } from "../actions/workerApplication";
import { CreateWorkerApplicationProps, WorkerFormInputs } from "../types";

export default function CreateWorkerApplication({
  isOpen,
  onClose,
  statusMessage,
  setStatusMessage,
  onSuccess,
}: CreateWorkerApplicationProps) {
  const { userId, workerId } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic state for array box items
  const [professionInput, setProfessionInput] = useState("");
  const [professionsList, setProfessionsList] = useState<string[]>([]);

  const [skillInput, setSkillInput] = useState("");
  const [skillsList, setSkillsList] = useState<string[]>([]);

  const { register, handleSubmit, reset, setValue } = useForm<WorkerFormInputs>(
    {
      defaultValues: {
        firstName: "",
        lastName: "",
        profession: [],
        skills: [],
        experienceYears: "",
        industry: "",
        city: "",
        country: "",
        locality: "",
        salaryExpectation: "",
        currency: "INR",
        payPeriod: "yearly",
        phone: "",
        status: "pending",
      },
    }
  );

  // Dynamic handler for Professions
  const handleAddProfession = () => {
    const trimmed = professionInput.trim();
    if (trimmed && !professionsList.includes(trimmed)) {
      const updated = [...professionsList, trimmed];
      setProfessionsList(updated);
      setValue("profession", updated);
      setProfessionInput("");
    }
  };

  const handleRemoveProfession = (index: number) => {
    const updated = professionsList.filter((_, i) => i !== index);
    setProfessionsList(updated);
    setValue("profession", updated);
  };

  // Dynamic handler for Skills
  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skillsList.includes(trimmed)) {
      const updated = [...skillsList, trimmed];
      setSkillsList(updated);
      setValue("skills", updated);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    const updated = skillsList.filter((_, i) => i !== index);
    setSkillsList(updated);
    setValue("skills", updated);
  };

  const onSubmitForm: SubmitHandler<WorkerFormInputs> = async data => {
    setStatusMessage(null);

    if (!userId) {
      setStatusMessage("Please sign in before creating an application.");
      return;
    }

    if (!workerId) {
      setStatusMessage("Worker profile ID is missing.");
      return;
    }

    setIsSubmitting(true);

    const result = await createWorkerApplicationAction(workerId, data);

    if (!result.error) {
      onClose();
      setStatusMessage("Application created successfully.");
      reset();
      setProfessionsList([]);
      setSkillsList([]);
      onSuccess();
    } else {
      setStatusMessage(result.error);
    }

    setIsSubmitting(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity duration-200 ${
        isOpen
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
                First Name *
              </label>
              <input
                type="text"
                required
                {...register("firstName")}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName")}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
              />
            </div>
          </div>

          {/* Profession Input Box Section */}
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
              Professions
            </label>
            <div className="flex gap-2">
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
                placeholder="e.g. Plumber, Electrician"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
              />
              <button
                type="button"
                onClick={handleAddProfession}
                className="flex items-center gap-1 rounded-xl bg-[#F8ECE4] px-4 py-2.5 text-sm font-bold text-[#8F3E13] transition hover:bg-[#8F3E13] hover:text-white"
              >
                <Plus size={16} /> Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {professionsList.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#ECE3DA] bg-[#FCFBF9] px-3 py-1 text-xs font-semibold text-[#55463E]"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveProfession(index)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Skills Input Box Section */}
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
              Skills
            </label>
            <div className="flex gap-2">
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
                placeholder="e.g. Wiring, Pipefitting"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="flex items-center gap-1 rounded-xl bg-[#F8ECE4] px-4 py-2.5 text-sm font-bold text-[#8F3E13] transition hover:bg-[#8F3E13] hover:text-white"
              >
                <Plus size={16} /> Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {skillsList.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#ECE3DA] bg-[#FCFBF9] px-3 py-1 text-xs font-semibold text-[#55463E]"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Application Status
              </label>
              <select
                {...register("status")}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Exp. Years
              </label>
              <input
                type="number"
                {...register("experienceYears")}
                placeholder="e.g. 5"
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
              />
            </div>
          </div>

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
                Salary Expectation
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
                {...register("currency", {
                  onChange: e => {
                    e.target.value = e.target.value.toUpperCase();
                  },
                })}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-center uppercase outline-none focus:ring-2 focus:ring-[#8F3E13]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-bold text-gray-700">
                Period
              </label>
              <select
                {...register("payPeriod")}
                className="w-full rounded-xl border border-gray-300 bg-white px-2 py-2.5 outline-none focus:ring-2 focus:ring-[#8F3E13]"
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
              onClick={onClose}
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
  );
}
