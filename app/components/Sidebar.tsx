import { Link } from "@remix-run/react";
// import { MdArrowBack, MdArrowForward } from "react-icons/md";

type Props = {
  isExpanded: boolean;
  toggle: () => void;
};

export function Sidebar({ isExpanded, toggle }: Props) {
  return (
    <div className="h-full bg-base-200 transition-all duration-300">
      <div className="flex w-full justify-end p-4">
        <button onClick={toggle} className="rounded-full p-2 hover:bg-base-300">
          {/* {isExpanded ? <MdArrowBack /> : <MdArrowForward />} */}
        </button>
      </div>
      <ul className="menu rounded-box h-full">
        {isExpanded && (
          <>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            {/* Add other menu items here */}
          </>
        )}
      </ul>
    </div>
  );
}
