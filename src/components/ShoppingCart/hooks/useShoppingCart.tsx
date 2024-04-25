import { TabItem } from "@trilon/components/TabBar";
import { useProductFetch } from "@trilon/hooks";
import { useCallback, useState } from "react";

const tabItems: TabItem[] = [
  { label: "Smartphones", id: "smartphones" },
  { label: "Laptops", id: "laptops" },
];

export const useShoppingCart = () => {
  const [selectedTab, setSelectedTab] = useState<string>();
  const query = useProductFetch({
    productType: selectedTab,
    enabled: !!selectedTab,
  });

  const onChangeTab = useCallback(setSelectedTab, [setSelectedTab]);

  return { tabItems, onChangeTab, ...query, selectedTab };
};
