export type TabItem = {
  label: string;
  id: string;
};

export type TabBarProps = {
  items: TabItem[];
  onTabChange: (id: string) => void;
};
