import { act, renderHook } from "@testing-library/react";
import { LocalStorageKeys } from "@trilon/constants";
import { useAuthStore } from "@trilon/stores/auth";

const ORIGINAL_STATE = useAuthStore.getState();
const TEST_ACCESS_TOKEN = "an-access-token";

beforeEach(() => {
  window.localStorage.clear();
  useAuthStore.setState(ORIGINAL_STATE);
});

describe("useAuthState", () => {
  it("should return an uninitialized store", () => {
    const { result } = renderHook(() => useAuthStore());
    expect(result.current.accessToken).toBeUndefined();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.initialised).toBeFalsy();
  });

  it("should initialize the store correctly with no access token in localstorage", () => {
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.setInitialState();
    });
    expect(result.current.accessToken).toBeUndefined();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.initialised).toBeTruthy();
  });

  it("should initialize the store correctly with an access token in localstorage", () => {
    window.localStorage.setItem(LocalStorageKeys.AccessToken, TEST_ACCESS_TOKEN);
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.setInitialState();
    });
    expect(result.current.accessToken).toBe(TEST_ACCESS_TOKEN);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.initialised).toBeTruthy();
  });

  it("should update the access token correctly", () => {
    const { result } = renderHook(() => useAuthStore());

    expect(result.current.accessToken).toBeUndefined();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.initialised).toBeFalsy();
    expect(window.localStorage.getItem(LocalStorageKeys.AccessToken)).toBeNull();

    act(() => {
      result.current.setAccessToken(TEST_ACCESS_TOKEN);
    });

    expect(result.current.accessToken).toBe(TEST_ACCESS_TOKEN);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.initialised).toBeFalsy();
    expect(window.localStorage.getItem(LocalStorageKeys.AccessToken)).toBe(TEST_ACCESS_TOKEN);
  });
});
