
import { VerifyCallbackController } from "./VerifyCallbackController";
import { VerifyCallbackUseCase } from "./VerifyCallbackUseCase";


const verifyCallbackUseCase = new VerifyCallbackUseCase();

const verifyCallbackController = new VerifyCallbackController(verifyCallbackUseCase);

export { verifyCallbackUseCase, verifyCallbackController };