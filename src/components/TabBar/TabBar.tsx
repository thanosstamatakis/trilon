import { useEffect, useState } from "react";
import * as S from "./TabBar.styles";
import { TabBarProps } from "./TabBar.types";

export const TabBar = ({ items, onTabChange }: TabBarProps) => {
  const [selectedTab, setSelectedTab] = useState<string>();

  useEffect(() => {
    if (items.length > 0) {
      setSelectedTab(items[0].id);
      onTabChange(items[0].id);
    }
  }, []);

  return (
    <S.TabBarWrapper>
      {items.map((item) => (
        <S.TabItem
          key={item.id}
          onClick={() => {
            setSelectedTab(item.id);
            onTabChange(item.id);
          }}
          selected={selectedTab === item.id}
        >
          {item.label}
          {selectedTab === item.id && <S.Line layoutId="underline" />}
        </S.TabItem>
      ))}
    </S.TabBarWrapper>
  );
};
