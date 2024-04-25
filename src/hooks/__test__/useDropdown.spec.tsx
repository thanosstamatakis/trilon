import { act, render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDropdown } from "@trilon/hooks/useDropdown";

const MockDropdownComponent = () => {
  const { ref, isOpen, toggle, close } = useDropdown<HTMLDivElement>();
  return (
    <div data-testid="outer">
      <button onClick={toggle}>Toggle Dropdown</button>
      <div ref={ref}>
        {isOpen && (
          <div>
            Dropdown Content
            <button onClick={close}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

describe("useDropdown", () => {
  it("should initialize with isOpen as false", () => {
    const { result } = renderHook(() => useDropdown<HTMLDivElement>());
    expect(result.current.isOpen).toBe(false);
  });

  it("should toggle the dropdown when toggling", async () => {
    const { result } = renderHook(() => useDropdown<HTMLDivElement>());
    await act(async () => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);
    await act(async () => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("should close the dropdown when closing", async () => {
    const { result } = renderHook(() => useDropdown<HTMLDivElement>());
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);
    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("closes the dropdown when clicking outside", async () => {
    render(<MockDropdownComponent />);

    act(() => {
      userEvent.click(screen.getByText(/Toggle Dropdown/));
    });
    await waitFor(() => {
      expect(screen.queryByText(/Dropdown Content/)).toBeInTheDocument();
    });
    act(() => {
      userEvent.click(screen.getByTestId(/outer/));
    });
    await waitFor(() => {
      expect(screen.queryByText(/Dropdown Content/)).not.toBeInTheDocument();
    });
  });
});
