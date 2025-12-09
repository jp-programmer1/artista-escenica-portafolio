import { Resend } from "resend";
console.log(process.env.RESEND_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

import type { APIRoute } from "astro";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: "Todos los campos son requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: "El formato del email no es válido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create email content
    const emailContent = `
      Nuevo mensaje de contacto de ${data.name}
      
      Email: ${data.email}
      
      Mensaje:
      ${data.message}
    `;

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: import.meta.env.GOOGLE_EMAIL,
      subject: `Mensaje de ${data.name}`,
      text: emailContent,
    });

    return new Response(
      JSON.stringify({ success: "Mensaje enviado correctamente" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        error: "Error al enviar el mensaje. Inténtalo de nuevo más tarde.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
