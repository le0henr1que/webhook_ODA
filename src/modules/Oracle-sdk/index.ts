

import { Router } from "express"
import { resolver } from "../../shared/error/appError";
import { fromOdaToWhatsappController } from "./useCase/fromOdaToWhatsapp/index"

const oracleRouter = Router();

oracleRouter.post("/bot/message", resolver((request, response) => {
    fromOdaToWhatsappController.handle(request, response)
}))



export { oracleRouter }