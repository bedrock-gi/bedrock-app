import type { LoaderArgs } from "@remix-run/node";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { requireUserProjectRole } from "~/utils/auth.server";

import { readFileSync } from "fs";
import { createAgsImportSummary } from "~/models/ags/createSummary";
import { getAgsUpload } from "~/models/prisma/agsUploads";
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
  const parsed = await createAgsImportSummary(fileData, role.projectId);
  console.log("parsed", parsed);

  return typedjson({ role, upload, parsed });
};

export default function () {
  const data = useTypedLoaderData<typeof loader>();

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
              <td>{table.newRecords}</td>
              <td>{table.updatedRecords}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
