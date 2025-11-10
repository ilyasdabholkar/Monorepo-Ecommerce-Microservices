import { FastifyRequest, FastifyReply } from "fastify";
import { clerkPlugin, getAuth } from "@clerk/fastify";

declare module "fastify" {
    interface FastifyRequest{
        userId? : string
    }
}

export const AuthenticateUser =async  (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = getAuth(request);
  if (!userId)
    return reply.status(401).send({ message: "Unauthenticated User" });

  request.userId = userId;
};
