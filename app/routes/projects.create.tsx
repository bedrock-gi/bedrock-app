import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";

import { requireUser } from "~/utils/auth.server";
import LabeledInput from "~/components/LabeledInput";
import { createProject } from "~/models/prisma/projects";

export const action = (async ({ request }) => {
  const user = await requireUser(request);

  const formData = await request.formData();
  const projectName = formData.get("projectName") as string;
  const description = formData.get("description") as string;

  await createProject(user.id, projectName, description);

  return redirect(`/projects`);
}) satisfies ActionFunction;

export const handle = {
  breadcrumb: () => <Link to="/projects/create">Create</Link>,
};

export default function CreateProject() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-4 text-2xl font-bold">New Project</h1>
      <Form method="post">
        <div className="form-control mb-4">
          <LabeledInput
            label="Project Name"
            id="projectName"
            name="projectName"
            required={true}
          />
          <LabeledInput
            label="Description"
            id="description"
            name="description"
            required={true}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Project
        </button>
      </Form>
    </div>
  );
}
