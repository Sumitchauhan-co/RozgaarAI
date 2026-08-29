import api from "@/app/utils/api";
import { AxiosError } from "axios";
import {
  ApiResponse,
  Recruiter,
  RecruiterApplicationItem,
  UserSession,
} from "../types";

export async function fetchUserData() {
  try {
    const userRes =
      await api.get<ApiResponse<UserSession>>("/api/auth/getUser");
    if (userRes.data?.success) {
      return { success: true, data: userRes.data.data };
    }
    return { success: false, data: null };
  } catch (err) {
    console.error("Error fetching user data:", err);
    return { success: false, data: null };
  }
}

export async function fetchRecruiterProfile() {
  try {
    const profileRes = await api.get<ApiResponse<Recruiter>>(
      "/api/recruiter/profile"
    );
    if (profileRes.data?.success && profileRes.data?.data) {
      const rawData = Array.isArray(profileRes.data.data)
        ? profileRes.data.data[0]
        : profileRes.data.data;
      if (rawData && Object.keys(rawData).length > 0) {
        return { success: true, data: rawData };
      }
    }
    return { success: false, data: null };
  } catch (err) {
    console.error("Error fetching recruiter profile:", err);
    return { success: false, data: null };
  }
}

export async function saveRecruiterProfile(
  data: Partial<Recruiter>,
  exists: boolean
) {
  try {
    const res = exists
      ? await api.patch<ApiResponse<Recruiter>>("/api/recruiter/profile", data)
      : await api.post<ApiResponse<Recruiter>>("/api/recruiter/profile", data);

    if (res.data?.success) {
      const updated = Array.isArray(res.data.data)
        ? res.data.data[0]
        : res.data.data;
      return { success: true, data: updated, error: null };
    }
    return { success: false, data: null, error: "Failed to save profile." };
  } catch (err) {
    const errorMsg =
      (err as AxiosError<ApiResponse<never>>).response?.data?.message ||
      "Error saving profile.";
    return { success: false, data: null, error: errorMsg };
  }
}

export async function deleteRecruiterProfile() {
  try {
    await api.delete("/api/recruiter/profile");
    return { success: true };
  } catch (err) {
    console.error("Error clearing recruiter profile:", err);
    return { success: false };
  }
}

export async function fetchRecruiterApplications(recruiterId: string) {
  try {
    const response = await api.get<ApiResponse<RecruiterApplicationItem[]>>(
      `/api/recruiter/application/${recruiterId}`
    );
    if (response.data?.success) {
      return { success: true, data: response.data.data || [] };
    }
    return { success: false, data: [] };
  } catch (err) {
    console.error("Error loading recruiter applications:", err);
    return { success: false, data: [] };
  }
}

export async function updateRecruiterApplication(
  recruiterId: string,
  application: Partial<RecruiterApplicationItem>
) {
  try {
    const res = await api.patch(
      `/api/recruiter/application/${recruiterId}/${application.id}`,
      application
    );
    if (res.data?.success) {
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    console.error("Error updating application parameters:", err);
    return { success: false };
  }
}

export async function deleteRecruiterApplication(
  recruiterId: string,
  appId: string
) {
  try {
    const res = await api.delete(
      `/api/recruiter/application/${recruiterId}/${appId}`
    );
    if (res.data?.success) {
      return { success: true };
    }
    return { success: false };
  } catch (err) {
    console.error("Error deleting application:", err);
    return { success: false };
  }
}
