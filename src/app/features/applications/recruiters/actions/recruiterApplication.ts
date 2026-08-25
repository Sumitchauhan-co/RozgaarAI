import api from "@/app/utils/api";
import axios from "axios";
import { RecruiterFormInputs } from "../types";

export async function fetchWorkerApplicationsAction() {
  try {
    const res = await api.get("/api/worker/application/");
    if (res.data?.success) {
      return { error: false, data: res.data.data || [] };
    }
    return { error: res.data?.message || "Failed to fetch applications." };
  } catch (err) {
    console.error("Fetch worker applications action failure:", err);
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

export async function createRecruiterApplicationAction(
  recruiterId: string,
  data: RecruiterFormInputs
) {
  const payload = {
    firstName: data.firstName?.trim() || "",
    lastName: data.lastName?.trim() || null,
    jobTitle: data.jobTitle?.trim() || "",
    description: data.description?.trim() || "",
    skills: Array.isArray(data.skills)
      ? data.skills
      : typeof data.skills === "string"
        ? (data.skills as string)
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean)
        : [],
    experienceRequired: data.experienceRequired
      ? Number(data.experienceRequired)
      : null,
    employmentType: data.employmentType?.trim() || null,
    companyName: data.companyName?.trim() || "",
    industry: data.industry?.trim() || null,
    city: data.city?.trim() || "",
    country: data.country?.trim() || "",
    locality: data.locality?.trim() || null,
    salary: data.salary ? Number(data.salary) : null,
    currency: (data.currency || "INR").trim().toUpperCase(),
    payPeriod: data.payPeriod || "yearly",
    phone: data.phone?.trim() || null,
    status: data.status || "pending",
  };

  try {
    const res = await api.post(
      `/api/recruiter/application/${recruiterId}`,
      payload
    );

    if (res.data?.success) {
      return { error: false, data: res.data };
    }

    return { error: res.data?.message || "Failed to save application." };
  } catch (err) {
    console.error("Create recruiter application action failure:", err);

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
