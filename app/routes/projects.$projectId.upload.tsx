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
import { v4 as uuidv4 } from "uuid";
import { createAgsUpload } from "~/models/agsUploads";

export const loader = async ({ params, request }: LoaderArgs) => {
  if (!params.projectId) {
    return redirect("/projects");
  }

  //   console.log("request", request);

  const role = await requireUserProjectRole(request, params.projectId);
  if (!role) {
    console.log("redirecting");
    return redirect("/projects");
  }

  return typedjson({ role });
};

export const action = async ({ request, params }: ActionArgs) => {
  if (!params.projectId) {
    return redirect("/projects");
  }
  const role = await requireUserProjectRole(request, params.projectId);
  if (!role) {
    return redirect("/projects");
  }
  const uploadHandler = unstable_composeUploadHandlers(
    async ({ name, contentType, data, filename }) => {
      const randomId = uuidv4();
      const filePath = `./uploads/${randomId}.ags`;
      const writableStream = createWriteStream(filePath);
      const agsUpload = await createAgsUpload(
        role.projectId,
        role.userId,
        filePath
      );

      await writeAsyncIterableToWritable(data, writableStream);

      return agsUpload.id;
    },
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const newUploadId = formData.get("file");

  return redirect(`./${newUploadId}`);
};

export default function () {
  return (
    <div>
      <Form method="post" encType="multipart/form-data">
        <input type="file" name="file" className="file-input" />

        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </Form>
    </div>
  );
}
