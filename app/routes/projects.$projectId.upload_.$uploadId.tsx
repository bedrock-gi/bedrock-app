import type { LoaderArgs } from "@remix-run/node";
import { redirect, typedjson, useTypedLoaderData } from "remix-typedjson";
import { requireUserProjectRole } from "~/utils/auth.server";
import { readFileSync } from "fs";
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
