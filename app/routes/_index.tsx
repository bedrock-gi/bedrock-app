import type { MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export function loader() {
  return redirect("/projects");
}
