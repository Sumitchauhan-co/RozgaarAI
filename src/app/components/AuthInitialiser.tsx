"use client";

import { getAccessToken, useAuthStore } from "@/app/store/store";
import api from "@/app/utils/api";
import { useEffect } from "react";

export default function AuthInitializer() {
  const { setAuthenticated } = useAuthStore();

  useEffect(() => {
    const currentToken = getAccessToken();

    api
      .get("/api/auth/getUser")
      .then(() => {
        setAuthenticated(true, currentToken ?? undefined);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, [setAuthenticated]);

  return null;
}
