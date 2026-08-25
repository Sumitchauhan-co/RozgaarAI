import api from "@/app/utils/api";
import {
  ApiResponse,
  UserSession,
  Worker,
  WorkerApplicationItem,
} from "../../types";

export const getUserProfile = async () => {
  const res = await api.get<ApiResponse<UserSession>>("/api/auth/getUser");
  return res.data;
};

export const getWorkerProfile = async () => {
  const res = await api.get<ApiResponse<Worker>>("/api/worker/profile");
  return res.data;
};

export const saveWorkerProfile = async (
  payload: { age: number | null; city: string | null; profession: string[] },
  isPatch: boolean
) => {
  const res = isPatch
    ? await api.patch<ApiResponse<Worker>>("/api/worker/profile", payload)
    : await api.post<ApiResponse<Worker>>("/api/worker/profile", payload);
  return res.data;
};

export const deleteWorkerProfile = async () => {
  const res = await api.delete("/api/worker/profile");
  return res.data;
};

export const getWorkerApplications = async (workerId: string) => {
  const res = await api.get<ApiResponse<WorkerApplicationItem[]>>(
    `/api/worker/application/${workerId}`
  );
  return res.data;
};

export const updateWorkerApplication = async (
  workerId: string,
  appId: string,
  data: Partial<WorkerApplicationItem>
) => {
  const res = await api.patch<ApiResponse<WorkerApplicationItem>>(
    `/api/worker/application/${workerId}/${appId}`,
    data
  );
  return res.data;
};

export const deleteWorkerApplication = async (
  workerId: string,
  appId: string
) => {
  const res = await api.delete<ApiResponse<null>>(
    `/api/worker/application/${workerId}/${appId}`
  );
  return res.data;
};
