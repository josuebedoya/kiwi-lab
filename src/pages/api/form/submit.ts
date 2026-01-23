import type {APIContext, APIRoute} from "astro";
import resApi from "@/server/resApi.ts";
import {createAssessment} from "@/server/recaptcha.ts";
import directus from "@/server/directus.ts";
import {createItems} from "@directus/sdk";

const errorResponse = (msg: string, err: string) => {
  console.error(err, msg);
  return resApi({
    success: false,
    error: err,
    message: msg,
    data: null,
    status: 400
  })
};

const messages = {
  missingToken: "Missing reCAPTCHA token",
  formId: "Missing form ID",
  lowScore: "Error: ReCAPTCHA score too low",
  directus: "Error: Saving data into Directus",
  errorRequest: "Error: Error in the request",
  error: "Error: algo salió mal.",
  success: "Enviado exitosamente",
}
const model = 'form_submissions';

export const POST: APIRoute = async ({request}: APIContext): Promise<Response> => {
  try {
    const formData = await request.formData() as FormData;
    const token = formData.get("recaptchaToken") as string || null;
    const formId = formData.get("formId") as string || null;

    if (!token) return errorResponse(messages.missingToken, messages.error);
    if (!formId) return errorResponse(messages.formId, messages.error);

    // reCaptcha validation
    const score = await createAssessment({token});
    if (!score || score < 0.7) return errorResponse(messages.lowScore, `${messages.error} __ Score: ${score}`);

    // Data
    const payload = {
      form: formId,
      leads: Array.from(formData.entries())
        .filter(([key]) => key !== "formId" && key !== "recaptchaToken")
        .map(([key, value]) => ({
          field: key,
          value
        }))
    } as Record<string, any>;

    // Save into Directus
    const res = await directus.request(createItems(model, [payload]));
    if (!res || !Object.keys(res).length) return errorResponse(messages.directus, messages.error);

    // Response
    return resApi({
      success: true,
      error: null,
      message: messages.success,
      data: res,
      status: 200
    })

  } catch (error) {
    console.error(error);
    return errorResponse(messages.errorRequest, JSON.stringify(error));
  }
};