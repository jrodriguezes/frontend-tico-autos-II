export async function handlePhoneVerification(code) {
    const userId = sessionStorage.getItem('twoFactorUserId');

    if (!userId) {
        window.location.href = "/login";
        return { success: false, message: "Sesión expirada o inválida" };
    }

    try {
        const response = await fetch("http://localhost:3000/auth/2fa/verify", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, code })
        });

        const data = await response.json();

        if (response.ok && (data.access_token || data.token)) {
            const token = data.access_token || data.token;
            sessionStorage.setItem('token', token);
            sessionStorage.removeItem('twoFactorUserId');
            return { success: true };
        } else {
            return { success: false, message: data.message || "Código incorrecto o expirado" };
        }
    } catch (error) {
        console.error("Error en la verificación:", error);
        return { success: false, message: "Error de conexión con el servidor" };
    }
}