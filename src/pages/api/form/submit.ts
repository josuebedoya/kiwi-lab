import { directus } from '@/server/directus';
import { createItems } from "@directus/sdk";
import type { APIRoute } from "astro";
import { createAssessment } from "@/server/recaptcha";

const resFetch = (content = {}, message = '', status = 200) => {
  return new Response(JSON.stringify({ ...content, message }), { status });
}

const errorMessage ='Error trying get data' as const;

export const POST: APIRoute = async ({ request }): Promise<Response> => {
  try {
    const formData = await request.formData() as FormData;

    const model = formData.get("model") as string;
    const token = formData.get("recaptchaToken") as string;

    if (!token) {
      return resFetch({ error: "Missing reCAPTCHA token" }, errorMessage, 400);
    }

    if (!model) {
      return resFetch({ error: "Missing model. Is Required" }, errorMessage, 400);
    }

    const score = await createAssessment({ token });

    if (!score || score < 0.7) {
      console.log("Error ReCAPTCHA score too low", score);
      return new Response(JSON.stringify({ error: "Invalid reCAPTCHA", score }), { status: 403 });
    }

    const payload: Record<string, any> = {};

    formData.forEach((value, key) => {
      if (key !== "model") {
        payload[ key ] = value;
      }
    });

    const res = await directus.request(createItems(model as string, payload as any[]));
    if (!res || !Object.keys(res).length) {
      return resFetch({ error: res }, errorMessage, 500);
    }

    return resFetch({ success: true }, 'Successful form submitted', 200);

  } catch (err) {
    console.log("Error", err);
    return resFetch({ error: "Server error.", errors: err }, errorMessage, 500);
  }
};

/*  Must be exist this code into handler form on client side
*   const token = await grecaptcha.execute('6LcgKiAsAAAAAF5PuTYXvpPELo5Y9DSCz1PLsNyW', { action: 'LOGIN' });

    const formData = new FormData(form);
    formData.append("recaptchaToken", token);
*
* */