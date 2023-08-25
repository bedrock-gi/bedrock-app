// app/routes/auth/auth0.tsx
import { ActionArgs, redirect } from "@remix-run/node";

import { authenticator } from "~/utils/auth.server";

export let loader = () => redirect("/login");

export let action = ({ request }: ActionArgs) => {
  return authenticator.authenticate("auth0", request);
};
