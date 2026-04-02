document.addEventListener('DOMContentLoaded', () => {
    const completeForm = document.getElementById('google-complete-form');
    const urlParams = new URLSearchParams(window.location.search);
    const tempToken = urlParams.get('tempToken'); // Obtiene el tempToken de la URL

    if (!tempToken) {
        alert('Sesión inválida o expirada. Por favor, intenta de nuevo.');
        window.location.href = '/login';
        return;
    }

    if (completeForm) {
        completeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const numberIdInput = document.getElementById('numberId');
            const submitBtn = document.getElementById('submit-btn');
            const errorMsg = document.getElementById('error-msg');
            const numberId = Number(numberIdInput.value.trim());

            if (!numberId || isNaN(numberId)) {
                alert('Por favor ingrese un número de cédula válido');
                return;
            }

            // UI state
            submitBtn.disabled = true;
            submitBtn.innerText = 'Validando e Iniciando...';
            errorMsg.style.display = 'none';

            try {
                const response = await fetch("http://localhost:3000/auth/complete-google-registration", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ tempToken, numberId })
                });

                const data = await response.json();

                if (response.ok && data.access_token) {
                    // Guardar el token final
                    sessionStorage.setItem('token', data.access_token);
                    window.location.href = "/home";
                } else {
                    errorMsg.innerText = data.message || "Error: No se pudo validar la cédula o el usuario ya existe.";
                    errorMsg.style.display = 'block';
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'Finalizar Registro';
                }
            } catch (error) {
                errorMsg.innerText = "Error de conexión con el servidor";
                errorMsg.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.innerText = 'Finalizar Registro';
            }
        });
    }
});
