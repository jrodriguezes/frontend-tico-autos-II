document.addEventListener('DOMContentLoaded', () => {
    // Verificar si venimos de un login exitoso con Google (el backend puede redirigir con el token en la URL)
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token')

    if (urlToken) {
        sessionStorage.setItem('token', urlToken);
        window.location.href = "/home";
        return;
    }

    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const identifier = document.getElementById('identifier').value.trim();
            const password = document.getElementById('password').value;

            // Basic validation
            if (!identifier || !password) {
                alert('Por favor complete todos los campos');
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/auth/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ identifier, password })
                });

                const data = await response.json();

                if (response.ok && data.access_token) {
                    // Guardar el token para futuras peticiones
                    sessionStorage.setItem('token', data.access_token);
                    window.location.href = "/home";
                } else {
                    alert(data.message || "Error al iniciar sesión: Credenciales inválidas");
                }
            } catch (error) {
                alert("Error de conexión con el servidor");
            }

        });
    }

    // Manejar botones sociales
    const googleBtn = document.querySelector('.btn-google');

    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            window.location.href = "http://localhost:3000/auth/google";
        });
    }

});
