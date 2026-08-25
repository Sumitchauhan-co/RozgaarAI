import api from "@/app/utils/api";
import axios from "axios";

export async function fetchWorkerProfileAction() {
  try {
    const res = await api.get("/api/worker/profile");
    if (res.data?.success && res.data?.data?.id) {
      return { error: false, id: res.data.data.id };
    }
    return { error: false, id: null };
  } catch (err) {
    console.log("No worker profile created yet.", err);
    if (axios.isAxiosError(err)) {
      console.log(
        err.response?.data?.message || "Unable to fetch worker profile."
      );
    }
    return { error: true, id: null };
  }
}

export async function fetchRecruiterProfileAction() {
  try {
    const res = await api.get("/api/recruiter/profile");
    const rawData = Array.isArray(res.data?.data)
      ? res.data.data[0]
      : res.data?.data;

    if (res.data?.success && rawData?.id) {
      return { error: false, id: rawData.id };
    }
    return { error: false, id: null };
  } catch (err) {
    console.log("No recruiter profile created yet.", err);
    return { error: true, id: null };
  }
}
