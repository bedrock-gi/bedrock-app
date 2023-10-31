import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { requireUserProjectRole } from "~/utils/auth.server";

import { readFileSync } from "fs";
import {
  createAgsImportSummary,
  uploadToPrismaFromBlob,
} from "~/models/ags/importSummary";
import { getAgsUpload } from "~/models/prisma/agsUploads";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { toast } from "react-toastify";
import { useEffect } from "react";
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
  if (!upload || !upload.fileUrl) {
    return redirect(`/projects/${params.projectId}/upload`);
  }

  const fileData = await readFileSync(upload.fileUrl, "utf8");
  const parsed = await createAgsImportSummary(
    fileData,
    role.projectId,
    upload.id
  );

  return typedjson({ role, upload, parsed });
};

export const action = async ({ request, params }: ActionArgs) => {
  if (!params.projectId) {
    throw new Error("Project not found");
  }

  const role = await requireUserProjectRole(request, params.projectId);
  if (!role) {
    throw new Error("Project not found");
  }

  if (!params.uploadId) {
    throw new Error("Upload not found");
  }

  const upload = await getAgsUpload(params.uploadId);
  if (!upload || !upload.fileUrl) {
    throw new Error("Upload not found");
  }

  console.log("uploading");
  await uploadToPrismaFromBlob(upload);
  console.log("upload complete");

  return typedjson({ status: 200, message: "ok" });
};

export default function () {
  const data = useTypedLoaderData<typeof loader>();

  const actionData = useActionData<typeof action>();
  const nav = useNavigate();

  useEffect(() => {
    if (actionData?.message === "ok") {
      toast("Upload Complete", {
        type: "success",
      });
      nav(`/projects/${data.role.projectId}`);
    } else if (actionData?.message) {
      // toast(actionData.message);
    }
  }, [actionData, data.role.projectId, nav]);

  return (
    <div>
      <h1>Upload Summary</h1>
      <table>
        <thead>
          <tr>
            <th>Table </th>
            <th>Ags Table </th>
            <th>Number of New Records</th>
            <th>Number of Updated Records</th>
          </tr>
        </thead>

        {data.parsed.map((table) => (
          <tbody key={table.mapping.agsTableName}>
            <tr>
              <td>{table.mapping.prismaLabel}</td>
              <td>{table.mapping.agsTableName}</td>
              <td>{table.numNewRecords}</td>
              <td>{table.numUpdatedRecords}</td>
            </tr>
          </tbody>
        ))}
      </table>

      <Form method="post">
        <button type="submit" className="btn btn-primary">
          Confirm Import
        </button>
      </Form>
    </div>
  );
}
