import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = true; // ¡IMPORTANTE! Habilita el modo servidor para esta ruta.

// Usamos el método oficial de Astro para acceder a las variables de entorno.
const apiKey = import.meta.env.RESEND_API_KEY;
const emailTo = import.meta.env.EMAIL_TO;

export const POST: APIRoute = async ({ request }) => {
	// Verificación de variables de entorno
	if (!apiKey || !emailTo) {
		console.error("Error de configuración: Faltan las variables de entorno RESEND_API_KEY o EMAIL_TO.");
		return new Response(JSON.stringify({ message: 'Error de configuración en el servidor. Contacta al administrador.' }), { status: 500 });
	}

	const resend = new Resend(apiKey);

	try {
		// Cambiamos a request.json() porque el script del cliente envía los datos como JSON.
		const body = await request.json();
		const { email } = body;

		if (!email) {
			return new Response(
				JSON.stringify({ message: 'Faltan campos requeridos.' }),
				{ status: 400 }
			);
		}

		const response = await resend.emails.send({
			// En modo de prueba (sin dominio verificado), Resend requiere usar 'onboarding@resend.dev' como remitente.
			// --- CAMBIO PARA PRODUCCIÓN ---
			// Cuando tengas un dominio verificado en Resend, cambia la siguiente línea.
			// Puedes usar 'noreply', 'contacto', 'info', etc., seguido de tu dominio.
			// Ejemplo: from: 'Tu Sitio Web <contacto@tudominio.com>',
			// El nombre 'Tu Sitio Web' es lo que el destinatario verá como remitente.
			from: 'onboarding@resend.dev',
			to: [emailTo], // Importante: 'to' debe ser un array de strings.
			reply_to: email, // Para poder responder directamente al usuario.
			subject: `Nueva suscripción al newsletter`,
			html: `<p>¡Nueva suscripción al newsletter!</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p>El usuario se ha suscrito para recibir actualizaciones.</p>`,
		});

		// ¡Éxito! Imprimimos el ID del correo para poder rastrearlo en el panel de Resend.
		// La respuesta puede ser { data, error }. Verificamos si hubo un error en la respuesta de Resend.
		if (response.error) {
			console.error('Error desde la API de Resend:', response.error);
			return new Response(JSON.stringify({ message: response.error.message }), { status: 500 });
		}
		console.log('Email enviado con éxito. ID:', response.data?.id);

		return new Response(JSON.stringify({ message: 'Suscripción exitosa' }), { status: 200 });
	} catch (e) {
		console.error('Error inesperado en la API:', e);
		return new Response(JSON.stringify({ message: 'Error interno del servidor.' }), { status: 500 });
	}
};