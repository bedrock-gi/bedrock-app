import { V2_MetaFunction, redirect } from "@remix-run/node";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export function loader() {
  return redirect("/projects");
}
