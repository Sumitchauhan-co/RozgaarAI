"use client";

import { ApplicationStatus } from "@/app/features/applications/workers/types";
import { Loader2, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { WorkerApplicationItem } from "../types";

interface EditWorkerAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedApp: Partial<WorkerApplicationItem>;
  setSelectedApp: React.Dispatch<
    React.SetStateAction<Partial<WorkerApplicationItem>>
  >;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  submitting: boolean;
}

export default function EditWorkerAppModal({
  isOpen,
  onClose,
  selectedApp,
  setSelectedApp,
  onSubmit,
  submitting,
}: EditWorkerAppModalProps) {
  const [professionInput, setProfessionInput] = useState("");
  const [skillInput, setSkillInput] = useState("");

  if (!isOpen) return null;

  const handleAddProfession = () => {
    const trimmed = professionInput.trim();
    const currentProfessions = selectedApp.profession || [];
    if (trimmed && !currentProfessions.includes(trimmed)) {
      setSelectedApp(p => ({
        ...p,
        profession: [...currentProfessions, trimmed],
      }));
      setProfessionInput("");
    }
  };

  const handleRemoveProfession = (index: number) => {
    const currentProfessions = selectedApp.profession || [];
    setSelectedApp(p => ({
      ...p,
      profession: currentProfessions.filter((_, i) => i !== index),
    }));
  };

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    const currentSkills = selectedApp.skills || [];
    if (trimmed && !currentSkills.includes(trimmed)) {
      setSelectedApp(p => ({
        ...p,
        skills: [...currentSkills, trimmed],
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    const currentSkills = selectedApp.skills || [];
    setSelectedApp(p => ({
      ...p,
      skills: currentSkills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-xl font-bold text-[#2B0F05]">
          Edit Application Details
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Tag-style Professions Box */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
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
                placeholder="Type profession and click Add"
                className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:ring-2 focus:ring-[#8F3E13] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddProfession}
                className="flex items-center gap-1 rounded-xl bg-[#F8ECE4] px-4 py-2.5 text-xs font-bold text-[#8F3E13] transition hover:bg-[#8F3E13] hover:text-white"
              >
                <Plus size={14} /> Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(selectedApp.profession || []).map((prof, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#ECE3DA] bg-[#FCFBF9] px-3 py-1 text-xs font-semibold text-[#55463E]"
                >
                  {prof}
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

          {/* Tag-style Skills Box */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
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
                placeholder="Type skill and click Add"
                className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:ring-2 focus:ring-[#8F3E13] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="flex items-center gap-1 rounded-xl bg-[#F8ECE4] px-4 py-2.5 text-xs font-bold text-[#8F3E13] transition hover:bg-[#8F3E13] hover:text-white"
              >
                <Plus size={14} /> Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(selectedApp.skills || []).map((skill, index) => (
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

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                Status
              </label>
              <select
                value={selectedApp.status || "pending"}
                onChange={e =>
                  setSelectedApp(p => ({
                    ...p,
                    status: e.target.value as ApplicationStatus,
                  }))
                }
                className="w-full rounded-xl border border-[#ECE3DA] bg-white p-2.5 text-sm focus:ring-2 focus:ring-[#8F3E13] focus:outline-none"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                Experience (Yrs)
              </label>
              <input
                type="number"
                value={selectedApp.experienceYears ?? ""}
                onChange={e =>
                  setSelectedApp(p => ({
                    ...p,
                    experienceYears: e.target.value
                      ? Number(e.target.value)
                      : null,
                  }))
                }
                className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:ring-2 focus:ring-[#8F3E13] focus:outline-none"
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
                className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:ring-2 focus:ring-[#8F3E13] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                Expected Salary
              </label>
              <input
                type="number"
                value={selectedApp.salaryExpectation ?? ""}
                onChange={e =>
                  setSelectedApp(p => ({
                    ...p,
                    salaryExpectation: e.target.value
                      ? Number(e.target.value)
                      : null,
                  }))
                }
                className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:ring-2 focus:ring-[#8F3E13] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                Currency
              </label>
              <input
                type="text"
                maxLength={3}
                value={selectedApp.currency || ""}
                onChange={e =>
                  setSelectedApp(p => ({
                    ...p,
                    currency: e.target.value.toUpperCase(),
                  }))
                }
                className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-center text-sm uppercase focus:ring-2 focus:ring-[#8F3E13] focus:outline-none"
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
                    payPeriod: e.target.value as
                      | "hourly"
                      | "monthly"
                      | "yearly",
                  }))
                }
                className="w-full rounded-xl border border-[#ECE3DA] bg-white p-2.5 text-sm focus:ring-2 focus:ring-[#8F3E13] focus:outline-none"
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
                City *
              </label>
              <input
                type="text"
                required
                value={selectedApp.city || ""}
                onChange={e =>
                  setSelectedApp(p => ({ ...p, city: e.target.value }))
                }
                className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:ring-2 focus:ring-[#8F3E13] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase">
                Country *
              </label>
              <input
                type="text"
                required
                value={selectedApp.country || ""}
                onChange={e =>
                  setSelectedApp(p => ({ ...p, country: e.target.value }))
                }
                className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:ring-2 focus:ring-[#8F3E13] focus:outline-none"
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
              className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:ring-2 focus:ring-[#8F3E13] focus:outline-none"
            />
          </div>

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
              className="w-full rounded-xl border border-[#ECE3DA] p-2.5 text-sm focus:ring-2 focus:ring-[#8F3E13] focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#ECE3DA] px-4 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 rounded-xl bg-[#5B1E05] px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#442003]"
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
