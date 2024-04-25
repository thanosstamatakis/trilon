import { render, screen, waitFor } from "@testing-library/react";
import { TabBar } from "@trilon/components/TabBar";
import userEvent from "@testing-library/user-event";

const MOCK_ITEMS = [
  { id: "tab1", label: "Tab 1" },
  { id: "tab2", label: "Tab 2" },
];

describe("TabBar Component", () => {
  it("should render correctly with the first tab selected", () => {
    const onTabChange = jest.fn();
    render(<TabBar items={MOCK_ITEMS} onTabChange={onTabChange} />);

    const firstTab = screen.getByText("Tab 1");
    const secondTab = screen.getByText("Tab 2");

    expect(firstTab).toBeInTheDocument();
    expect(secondTab).toBeInTheDocument();

    expect(onTabChange).toHaveBeenCalledWith("tab1");
  });

  it("selects the first tab by default if items are provided", () => {
    const onTabChange = jest.fn();
    render(<TabBar items={MOCK_ITEMS} onTabChange={onTabChange} />);

    expect(onTabChange).toHaveBeenCalledWith("tab1");
  });

  it("should update the selected tab and call onTabChange when a tab is clicked", async () => {
    const onTabChange = jest.fn();
    render(<TabBar items={MOCK_ITEMS} onTabChange={onTabChange} />);

    const secondTab = screen.getByText("Tab 2");

    userEvent.click(secondTab);

    await waitFor(() => {
      expect(onTabChange).toHaveBeenCalledTimes(2);
      expect(onTabChange).toHaveBeenCalledWith("tab2");
    });
  });
});
