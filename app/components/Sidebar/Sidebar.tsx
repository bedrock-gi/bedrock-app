import { MdClose, MdMenu } from "react-icons/md";
import { SidebarContent } from "./SidebarContent";

type Props = {
  isExpanded: boolean;
  toggle: () => void;
};

export function Sidebar({ isExpanded, toggle }: Props) {
  return (
    <div className="h-full bg-base-200 transition-all duration-300">
      <div className="flex w-full justify-between p-4 align-middle">
        {isExpanded && <h1 className="text-2xl font-bold">Bedrock</h1>}
        <button
          onClick={toggle}
          className=" justify-self btn rounded-full p-2 hover:bg-base-300"
        >
          {isExpanded ? <MdClose /> : <MdMenu />}
        </button>
      </div>
      {isExpanded && <SidebarContent />}
    </div>
  );
}
