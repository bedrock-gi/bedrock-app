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
import { getAgsUpload } from "~/models/agsUploads";
export const loader = async ({ params, request }: LoaderArgs) => {
  if (!params.projectId) {
    return redirect("/projects");
  }

  const role = await requireUserProjectRole(request, params.projectId);
  if (!role) {
    return redirect("/projects");
  }

  if (!params.uploadId) {
    return redirect(`/projects/${params.projectId}/upload`);
  }

  const upload = await getAgsUpload(params.uploadId);
  if (!upload) {
    return redirect(`/projects/${params.projectId}/upload`);
  }

  const fileData = await readFileSync(upload.fileUrl, "utf8");
  const parsed = loadAgsToPrisma(fileData);
  console.log("parsed", parsed);

  return typedjson({ role, upload, parsed });
};

export default function () {
  const data = useTypedLoaderData<typeof loader>();

  return (
    <div>
      <h1>Upload</h1>
      <div>{JSON.stringify(data.parsed)}</div>
    </div>
  );
}
