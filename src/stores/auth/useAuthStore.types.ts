export type AuthStoreActions = {
  setInitialState: () => void;
  setAccessToken: (token: string) => void;
};

export type AuthStoreState = {
  loading: boolean;
  initialised: boolean;
  accessToken?: string;
};
