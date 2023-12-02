import { Link } from "@remix-run/react";

type Props = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

export const SidebarLink = ({ to, icon, label }: Props) => (
  <Link to={to} className="gap-4">
    <span className="text-lg">{icon}</span>
    {label}
  </Link>
);
