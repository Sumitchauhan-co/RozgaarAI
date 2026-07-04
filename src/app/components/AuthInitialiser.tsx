"use client";

import { useAuthStore } from "@/app/store/store";
import api from "@/app/utils/api";
import { useEffect } from "react";

export default function AuthInitializer() {
  const { setAuthenticated } = useAuthStore();

  useEffect(() => {
    api
      .get("/api/auth/getUser")
      .then(res => {
        if (res.data) setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, [setAuthenticated]);

  return null;
}
