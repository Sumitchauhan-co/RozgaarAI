import axios from "axios";
import api from "../utils/api";

export async function signInAction(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await api.post("/api/auth/signin", { email, password });

    const data = res.data?.data;
    const token = res.data?.data?.accessToken;

    if (!data || !token) {
      return { error: "Invalid response from the server." };
    }

    return { error: false, data };
  } catch (err) {
    console.error("Sign-in action failure:", err);

    if (axios.isAxiosError(err)) {
      return {
        error: err.response?.data?.message || "Invalid email or password.",
      };
    }

    return { error: "An unexpected authentication error occurred." };
  }
}

export async function signUpAction(formData: FormData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  if (!firstName || !lastName || !email || !password || !role) {
    return { error: "All registration fields are required." };
  }

  try {
    const res = await api.post("/api/auth/signup", {
      firstName,
      lastName,
      email,
      password,
      role,
    });

    const data = res.data.data;
    const token = res.data?.data?.accessToken;

    if (!data || !token) {
      return { error: "Invalid registration data returned from server." };
    }

    return { error: false, data };
  } catch (err) {
    console.error("Sign-up action failure:", err);

    if (axios.isAxiosError(err)) {
      return {
        error:
          err.response?.data?.message ||
          "Registration failed. Please check details.",
      };
    }

    return {
      error: "An unexpected system error occurred during registration.",
    };
  }
}

export async function signOutAction() {
  try {
    await api.post("/api/auth/signout");

    return { error: false, success: true };
  } catch (err) {
    console.error("Sign-out action failure:", err);
    if (axios.isAxiosError(err)) {
      return {
        error:
          err.response?.data?.message ||
          "Failed to sign out from the server properly.",
      };
    }
    return { error: "An unexpected error occurred during sign out." };
  }
}
