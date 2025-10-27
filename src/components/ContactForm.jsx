import { useState } from 'preact/hooks';

export default function ContactForm() {
    const [status, setStatus] = useState({ submitting: false, message: null, isError: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, message: null, isError: false });

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus({ submitting: false, message: '¡Mensaje enviado con éxito!', isError: false });
                e.target.reset();
            } else {
                const result = await response.json();
                setStatus({ submitting: false, message: result.message || 'Ocurrió un error.', isError: true });
            }
        } catch (error) {
            setStatus({ submitting: false, message: 'Error inesperado. Inténtalo de nuevo.', isError: true });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div class="form-group">
                <label for="name" class="form-label">Nombre</label>
                <input type="text" id="name" name="name" class="form-input" required />
            </div>
            <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" name="email" class="form-input" required />
            </div>
            <div class="form-group">
                <label for="message" class="form-label">Mensaje</label>
                <textarea id="message" name="message" rows="5" class="form-textarea" required></textarea>
            </div>
            <button type="submit" disabled={status.submitting} class="btn btn-primary" style="width: auto; max-width: 200px;">
                {status.submitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>

            {status.message && (
                <div class={`status-message ${status.isError ? 'error' : 'success'}`}>
                    {status.message}
                </div>
            )}
        </form>
    );
}
