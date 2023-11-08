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
import invariant from "tiny-invariant";

export const loader = async ({ params, request }: LoaderArgs) => {
  invariant(params.projectId);

  const role = await requireUserProjectRole(request, params.projectId);
  invariant(role);

  return typedjson({ role });
};

export const action = async ({ request, params }: ActionArgs) => {
  invariant(params.projectId);
  const role = await requireUserProjectRole(request, params.projectId);
  invariant(role);
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
