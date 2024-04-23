import { create } from "zustand";
import { AuthStoreState, AuthStoreActions } from "./useAuthStore.types";
import { LocalStorageKeys } from "@trilon/constants";

const useAuthStore = create<AuthStoreState & AuthStoreActions>((set) => ({
  accessToken: undefined,
  loading: false,
  initialised: false,
  setInitialState: () => {
    set({ loading: true });
    const accessToken = localStorage.getItem(LocalStorageKeys.AccessToken);
    if (accessToken) {
      set({ accessToken, loading: false, initialised: true });
    } else {
      set({ loading: false, initialised: true, accessToken: undefined });
    }
  },
  setAccessToken: (token) => {
    localStorage.setItem(LocalStorageKeys.AccessToken, token);
    set({ accessToken: token });
  },
}));

export default useAuthStore;
