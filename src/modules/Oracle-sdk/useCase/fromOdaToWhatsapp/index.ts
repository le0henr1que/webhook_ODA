
import { FromOdaToWhatsappController } from "./fromOdaToWhatsappController";
import { FromOdaToWhatsappUseCase } from "./fromOdaToWhatsappUseCase";


const fromOdaToWhatsappUseCase = new FromOdaToWhatsappUseCase();

const fromOdaToWhatsappController = new FromOdaToWhatsappController(fromOdaToWhatsappUseCase);

export { fromOdaToWhatsappUseCase, fromOdaToWhatsappController };