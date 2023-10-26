import type { V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export function loader() {
  return redirect("/projects");
}
