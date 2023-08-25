// app/utils/auth.server.ts
import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import { getOrCreateUser } from "~/models/user";
import { User } from "@prisma/client";
import { sessionStorage } from "~/services/session.server";

export const requireUser = (request: Request) => {
  return authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
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
    return getOrCreateUser(profile.emails[0].value);
  }
);

authenticator.use(auth0Strategy);
