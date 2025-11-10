import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";

export const AuthenticateUser = createMiddleware<{
    Variables: {
        userId:string;
    }
}>(async (req, next) => {
  const auth = getAuth(req);

  if (!auth?.userId) {
    return req.json(
      {
        message: "Unauthenticated User",
      },
      401
    );
  }

  req.set("userId",auth.userId);

  await next();
});
