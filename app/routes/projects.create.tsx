import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form } from "@remix-run/react";
import { prisma } from "../db.server";
import { createProject } from "~/models/projects";

export const action = (async ({ request }) => {
  const formData = await request.formData();
  const projectName = formData.get("projectName") as string;

  const userId = "63b4c490-9507-4d34-9694-42ab32c66c03";
  const project = await createProject(userId, projectName);

  return redirect(`/projects`);
}) satisfies ActionFunction;

export default function CreateProject() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="mb-4 text-2xl font-bold">Create a New Project</h1>
      <Form method="post">
        <div className="mb-4">
          <label htmlFor="projectName" className="mb-1 block font-semibold">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            className="w-full border p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Create Project
        </button>
      </Form>
    </div>
  );
}
