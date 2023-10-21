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
    console.log("redirecting");
    return redirect("/projects");
  }

  return typedjson({ role });
};

export const action = async ({ request }: ActionArgs) => {
  console.log("action");
  //   console.log("request", request);

  const uploadHandler = unstable_composeUploadHandlers(
    async ({ name, contentType, data, filename }) => {
      const filePath = "temp.txt";
      const writableStream = createWriteStream(filePath);

      await writeAsyncIterableToWritable(data, writableStream);

      const agsData = readFileSync(filePath).toString();
      loadAgsToPrisma(agsData);

      unlinkSync(filePath);

      return "hello";
    },
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  console.log("formData", formData);
  return redirect("../");
};

export default function () {
  const { role } = useTypedLoaderData<typeof loader>();

  return (
    <div>
      <Form method="post" encType="multipart/form-data">
        <input type="file" name="file" />

        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </Form>
    </div>
  );
}
