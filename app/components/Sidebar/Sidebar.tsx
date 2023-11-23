import { Link, useMatch, useMatches } from "@remix-run/react";
import {
  MdClose,
  MdMenu,
  MdArrowBack,
  MdUpload,
  MdSummarize,
  MdHome,
  MdMap,
} from "react-icons/md";

type Props = {
  isExpanded: boolean;
  toggle: () => void;
};

export function Sidebar({ isExpanded, toggle }: Props) {
  const matches = useMatches();
  // console.log(matches);
  const projectMatch = matches.find(
    (m) => m.id === "routes/projects.$projectId"
  );
  const projectdata = projectMatch?.data;
  const projectid = projectMatch?.params.projectId;

  return (
    <div className="h-full bg-base-200 transition-all duration-300">
      <div className="flex w-full justify-between p-4 align-middle">
        {isExpanded && <h1 className="text-2xl font-bold">Bedrock</h1>}
        <button
          onClick={toggle}
          className=" justify-self btn rounded-full p-2 hover:bg-base-300"
        >
          {!isExpanded ? <MdMenu /> : <MdClose />}
        </button>
      </div>

      {isExpanded && projectMatch !== undefined && (
        // back button

        <div>
          <Link className="btn btn-secondary" to="/projects">
            <MdArrowBack />
            Projects
          </Link>
          <div className="divider"></div>

          <ul className="menu menu-md w-full bg-base-200">
            <li className="menu-title">Project Menu</li>
            <li>
              <Link to={`projects/${projectid}`}>
                Summary
                <MdHome />
              </Link>

              <Link to={`projects/${projectid}/upload`}>
                Upload
                <MdUpload />
              </Link>
              <Link to={`projects/${projectid}`}>
                Mapping
                <MdMap />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
