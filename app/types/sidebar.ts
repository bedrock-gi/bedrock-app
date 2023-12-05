import type { TableHierarchy } from "~/models/prisma/hierarchy";

export type SidebarLinkItem = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

export interface TableSidebarData extends TableHierarchy {
  count?: number;
}
