import express from "express";
import userRoute from "./user.router.js";
import urlRouter from "./url.router.js";
const route = express()

route.use("/auth", userRoute)
route.use("/short-url", urlRouter)

export default route