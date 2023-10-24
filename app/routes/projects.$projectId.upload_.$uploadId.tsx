import {
  LoaderArgs,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
  ActionArgs,
  writeAsyncIterableToWritable,
} from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  RouteMatch,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { json } from "stream/consumers";
import { getProject } from "~/models/projects";
import { requireUserProjectRole } from "~/utils/auth.server";

import DropZone from "react-dropzone";
import {
  WriteStream,
  createReadStream,
  createWriteStream,
  readFile,
  readFileSync,
  unlinkSync,
} from "fs";
import { loadAgsToPrisma } from "~/models/ags/prisma";
export const loader = async ({ params, request }: LoaderArgs) => {
  if (!params.projectId) {
    return redirect("/projects");
  }

  //   console.log("request", request);

  const role = await requireUserProjectRole(request, params.projectId);
  if (!role) {
    return redirect("/projects");
  }

  return typedjson({ role });
};

export default function () {
  return (
    <div>
      <div>
        <ul className="steps">
          <li className="step step-primary">Upload</li>
          <li className="step">Review</li>
          <li className="step">Complete</li>
        </ul>
      </div>
    </div>
  );
}
