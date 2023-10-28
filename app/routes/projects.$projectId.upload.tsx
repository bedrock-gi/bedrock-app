import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
  writeAsyncIterableToWritable,
} from "@remix-run/node";
import { Form } from "@remix-run/react";
import { redirect, typedjson } from "remix-typedjson";
import { requireUserProjectRole } from "~/utils/auth.server";

import { createWriteStream } from "fs";
import { v4 as uuidv4 } from "uuid";
import { createAgsUpload } from "~/models/prisma/agsUploads";

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
