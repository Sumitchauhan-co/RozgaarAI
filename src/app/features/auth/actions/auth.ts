import axios from "axios";
import api from "../../../utils/api";

const getFormField = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export async function signInAction(formData: FormData) {
  try {
    const email = getFormField(formData, "email");
    const password = getFormField(formData, "password");

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
  const firstName = getFormField(formData, "firstName");
  const lastName = getFormField(formData, "lastName");
  const email = getFormField(formData, "email");
  const password = getFormField(formData, "password");
  const role = getFormField(formData, "role");

  if (!firstName || !email || !password || !role) {
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

export async function forgotPasswordAction(formData: FormData) {
  const email = getFormField(formData, "email");

  if (!email) {
    return { error: "Email is required." };
  }

  try {
    await api.post("/api/auth/forgotPassword", { email });
    return { error: false, success: true };
  } catch (err) {
    console.error("Forgot password action failure:", err);

    if (axios.isAxiosError(err)) {
      return {
        error:
          err.response?.data?.message ||
          "Unable to send the reset link right now.",
      };
    }

    return {
      error: "An unexpected error occurred while sending the reset link.",
    };
  }
}

export async function resetPasswordAction(formData: FormData) {
  const token = getFormField(formData, "token");
  const newPassword = getFormField(formData, "newPassword");
  const confirmPassword = getFormField(formData, "confirmPassword");

  if (!token) {
    return {
      error: "Missing reset token. Please use the link sent to your email.",
    };
  }

  if (!newPassword || !confirmPassword) {
    return { error: "Passwords are required." };
  }

  if (newPassword.length < 8) {
    return { error: "Password must be at least 8 characters long." };
  }

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  try {
    const res = await api.post(
      `/api/auth/resetPassword?token=${encodeURIComponent(token)}`,
      { newPassword, confirmPassword }
    );

    return { error: false, success: true, data: res.data?.data || res.data };
  } catch (err) {
    console.error("Reset password action failure:", err);

    if (axios.isAxiosError(err)) {
      return {
        error:
          err.response?.data?.message ||
          "Unable to reset the password. Please try again.",
      };
    }

    return {
      error: "An unexpected error occurred while resetting your password.",
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
