import { Link } from "@remix-run/react";

interface Props {
  activeTab: string;
  to: string;
}

export default function Tab({ activeTab, to }: Props) {
  return (
    <Link
      className={`tab ${activeTab === to ? "tab-active" : ""} tab-bordered`}
      to={`./${to}`}
    >
      {to}
    </Link>
  );
}
