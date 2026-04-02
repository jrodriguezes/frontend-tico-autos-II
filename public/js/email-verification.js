import { verifyAccount } from './email-verification-logic.js';

document.addEventListener('DOMContentLoaded', () => {
    const checkStatusBtn = document.getElementById('check-status-btn');
    const verifySection = document.getElementById('verify-section');
    const statusCard = document.getElementById('status-card');
    const statusIcon = document.getElementById('status-icon');
    const statusTitle = document.getElementById('status-title');
    const statusMessage = document.getElementById('status-message');

    const url = new URLSearchParams(window.location.search);
    const token = url.get('token');
    const id = url.get('id');

    if (!token || !id) {
        window.location.href = "/login";
        return;
    }

    if (checkStatusBtn) {
        checkStatusBtn.addEventListener('click', async () => {
            // Animación de carga en el botón
            const originalText = checkStatusBtn.innerHTML;
            checkStatusBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
            checkStatusBtn.disabled = true;

            const isVerified = await verifyAccount(token, id);

            // Simulamos una demora de verificación al backend para que el usuario aprecie el estado
            setTimeout(() => {
                showAccountStatus(isVerified);
            }, 1000);
        });
    }

    function showAccountStatus(isVerified) {
        verifySection.style.display = 'none';
        statusCard.style.display = 'block';

        if (isVerified) {
            statusIcon.innerHTML = '<i class="fas fa-check-circle" style="color: #10b981;"></i>';
            statusTitle.innerText = "¡Todo en orden!";
            statusMessage.innerText = "Tu cuenta ha sido verificada satisfactoriamente. Ahora puedes disfrutar de todos los servicios de TicoAutos.";

            // Reemplazar botón por botón de acceso
            const accessBtn = document.createElement('button');
            accessBtn.innerText = "Ir al inicio";
            accessBtn.className = "btn";
            accessBtn.style.marginTop = "2rem";
            accessBtn.onclick = () => window.location.href = "/home";
            statusCard.appendChild(accessBtn);
        } else {
            statusIcon.innerHTML = '<i class="fas fa-exclamation-circle" style="color: #ef4444;"></i>';
            statusTitle.innerText = "Pendiente de Verificación";
            statusMessage.innerText = "No se ha confirmado tu correo electrónico. Verifica si tu cuenta ya ha sido verificada o el link no coincide con tu cuenta.";
        }
    }
});
