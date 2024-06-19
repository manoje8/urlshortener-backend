import { Router } from "express";
import ShortURL from "../controller/url.controller.js";
import {verifyAccessToken} from '../utils/jwtHelper.js'

const urlRouter = Router()

urlRouter.post("/create", verifyAccessToken, ShortURL.createShortURL)
urlRouter.get("/dashboard", verifyAccessToken, ShortURL.dashboard)
urlRouter.get("/urls", verifyAccessToken, ShortURL.getAllUrls)
urlRouter.get("/hit-count", ShortURL.urlCount)
urlRouter.get("/:shortId", ShortURL.getShortURL)

export default urlRouter;