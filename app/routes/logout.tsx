// app/routes/auth/logout.ts
import type { ActionFunctionArgs } from "@remix-run/node";

import { redirect } from "@remix-run/node";

import { sessionStorage } from "~/services/session.server";

const { AUTH0_LOGOUT_URL, AUTH0_CLIENT_ID, AUTH0_RETURN_TO_URL } = process.env;

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  if (AUTH0_LOGOUT_URL === undefined)
    throw new Error("AUTH0_LOGOUT_URL is undefined");
  if (AUTH0_CLIENT_ID === undefined)
    throw new Error("AUTH0_CLIENT_ID is undefined");
  if (AUTH0_RETURN_TO_URL === undefined)
    throw new Error("AUTH0_RETURN_TO_URL is undefined");

  const logoutURL = new URL(AUTH0_LOGOUT_URL); // i.e https://YOUR_TENANT.us.auth0.com/v2/logout

  logoutURL.searchParams.set("client_id", AUTH0_CLIENT_ID);
  logoutURL.searchParams.set("returnTo", AUTH0_RETURN_TO_URL);

  return redirect(logoutURL.toString(), {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
};
