// app/utils/auth.server.ts
import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";

import type { User } from "@prisma/client";
import { sessionStorage } from "~/services/session.server";
import { getProjectRole } from "~/models/prisma/projects";
import { getOrCreateUser } from "~/models/prisma/users";

export const requireUser = (request: Request) => {
  return authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export const requireUserProjectRole = async (
  request: Request,
  projectId: string
) => {
  const user = await requireUser(request);
  if (!user) {
    return false;
  }

  if (!projectId) {
    return false;
  }

  return (await getProjectRole(user.id, projectId)) || false;
};

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<User>(sessionStorage);

const { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN } = process.env;
if (!AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET || !AUTH0_DOMAIN) {
  throw new Error("Missing Auth0 env variables");
}

let auth0Strategy = new Auth0Strategy(
  {
    callbackURL: "http://localhost:3000/callback",
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    domain: AUTH0_DOMAIN,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    if (!profile.emails?.length) {
      throw new Error("No email found in the user profile");
    }

    // Get the user data from your DB or API using the tokens and profile
    const user = await getOrCreateUser(profile.emails[0].value);
    console.log("user", user);
    return user;
  }
);

authenticator.use(auth0Strategy);
