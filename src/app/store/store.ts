import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { tokenPayload } from "../utils/token";

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  workerId: string | null;
  recruiterId: string | null;
  role: string | null;
  accessToken: string | null;
  setAuthenticated: (status: boolean, token?: string) => void;
  setWorkerId: (id: string | null | undefined) => void;
  setRecruiterId: (id: string | null | undefined) => void;
  clearAuth: () => void;
}

let accessToken: string | null = null;
export const setAccessToken = (token: string | null) => {
  accessToken = token;
  useAuthStore.setState(state => ({ ...state, accessToken: token }));
};
export const getAccessToken = () =>
  useAuthStore.getState().accessToken ?? accessToken;

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      set => ({
        isAuthenticated: false,
        userId: null,
        workerId: null,
        recruiterId: null,
        role: null,
        accessToken: null,

        setAuthenticated: (status, token) => {
          if (status) {
            const nextToken = token ?? getAccessToken();

            if (nextToken) {
              try {
                setAccessToken(nextToken);
                const decoded = jwtDecode<tokenPayload>(nextToken);

                set(
                  {
                    isAuthenticated: true,
                    userId: decoded.id,
                    role: decoded.role,
                    accessToken: nextToken,
                  },
                  false,
                  "auth/setAuthenticated_Success"
                );
                return;
              } catch (error) {
                console.error("Failed to decode token context payload:", error);
              }
            }
          }

          if (!status) {
            setAccessToken(null);
            set(
              {
                isAuthenticated: false,
                userId: null,
                workerId: null,
                recruiterId: null,
                role: null,
                accessToken: null,
              },
              false,
              "auth/setAuthenticated_StatusOnly"
            );
            return;
          }

          set(
            state => ({ ...state, isAuthenticated: true }),
            false,
            "auth/setAuthenticated_StatusOnly"
          );
        },

        setWorkerId: id =>
          set(state => ({ ...state, workerId: id }), false, "auth/setWorkerId"),

        setRecruiterId: id =>
          set(
            state => ({ ...state, recruiterId: id }),
            false,
            "auth/setRecruiterId"
          ),

        clearAuth: () => {
          setAccessToken(null);
          set(
            {
              isAuthenticated: false,
              userId: null,
              workerId: null,
              recruiterId: null,
              role: null,
              accessToken: null,
            },
            false,
            "auth/clearAuth"
          );
        },
      }),
      {
        name: "auth-storage",
        partialize: state => ({
          isAuthenticated: state.isAuthenticated,
          userId: state.userId,
          workerId: state.workerId,
          recruiterId: state.recruiterId,
          role: state.role,
          accessToken: state.accessToken,
        }),
      }
    )
  )
);
