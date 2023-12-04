import type { SidebarLinkItem } from "~/types/sidebar";
import { SidebarLink } from "./SidebarLink";

type Props = {
  items: SidebarLinkItem[];
  title?: string;
};

export const SidebarItems = ({ items, title }: Props) => (
  <ul className="menu menu-md w-full bg-base-200">
    {title && <li className="menu-title">{title}</li>}
    <li>
      {items.map((item, index) => (
        <SidebarLink
          key={index}
          to={item.to}
          icon={item.icon}
          label={item.label}
        />
      ))}
    </li>
  </ul>
);
