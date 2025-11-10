import Fastify from "fastify";
import { clerkPlugin, getAuth } from '@clerk/fastify'
import { AuthenticateUser } from "./middlewares/authMiddleware.js";

const fastify = Fastify();

fastify.register(clerkPlugin)

fastify.get("/health",(request,reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now()
  })
})

fastify.get("/test",{preHandler:AuthenticateUser},(request,reply) => {
  return reply.status(200).send({message:"product service authenticated",userId:request.userId})
})

const start = async () => {
  try {
    await fastify.listen({ port: 8001 })
    console.log("Order Service is running on : http://localhost:8001");
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()