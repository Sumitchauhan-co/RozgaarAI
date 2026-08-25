import api from "@/app/utils/api";
import axios from "axios";
import { WorkerFormInputs } from "../types";

export async function fetchRecruiterApplicationsAction() {
  try {
    const res = await api.get("/api/recruiter/application/");
    if (res.data?.success) {
      return { error: false, data: res.data.data || [] };
    }
    return { error: res.data?.message || "Failed to fetch applications." };
  } catch (err) {
    console.error("Fetch recruiter applications action failure:", err);
    if (axios.isAxiosError(err)) {
      return {
        error:
          err.response?.data?.message ||
          "Unable to load applications right now.",
      };
    }
    return { error: "An unexpected error occurred while loading data." };
  }
}

export async function createWorkerApplicationAction(
  workerId: string,
  data: WorkerFormInputs
) {
  const payload = {
    firstName: data.firstName?.trim() || "",
    lastName: data.lastName?.trim() || null,
    profession: Array.isArray(data.profession)
      ? data.profession
      : typeof data.profession === "string"
        ? (data.profession as string)
            .split(",")
            .map(item => item.trim())
            .filter(Boolean)
        : [],
    skills: Array.isArray(data.skills)
      ? data.skills
      : typeof data.skills === "string"
        ? (data.skills as string)
            .split(",")
            .map(item => item.trim())
            .filter(Boolean)
        : [],
    experienceYears: data.experienceYears ? Number(data.experienceYears) : null,
    industry: data.industry?.trim() || "",
    city: data.city?.trim() || "",
    country: data.country?.trim() || "",
    locality: data.locality?.trim() || null,
    salaryExpectation: data.salaryExpectation
      ? Number(data.salaryExpectation)
      : null,
    currency: (data.currency || "INR").trim().toUpperCase(),
    payPeriod: data.payPeriod || "yearly",
    phone: data.phone?.trim() || null,
    status: data.status || "pending",
  };

  try {
    const res = await api.post(`/api/worker/application/${workerId}`, payload);

    if (res.data?.success) {
      return { error: false, data: res.data };
    }

    return { error: res.data?.message || "Failed to save application." };
  } catch (err) {
    console.error("Create worker application action failure:", err);

    if (axios.isAxiosError(err)) {
      return {
        error:
          err.response?.data?.message ||
          "Unable to create the application right now.",
      };
    }

    return { error: "An unexpected error occurred during submission." };
  }
}
