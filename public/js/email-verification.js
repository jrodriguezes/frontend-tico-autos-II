document.addEventListener('DOMContentLoaded', () => {
    const checkStatusBtn = document.getElementById('check-status-btn');
    const verifySection = document.getElementById('verify-section');
    const statusCard = document.getElementById('status-card');
    const statusIcon = document.getElementById('status-icon');
    const statusTitle = document.getElementById('status-title');
    const statusMessage = document.getElementById('status-message');

    if (checkStatusBtn) {
        checkStatusBtn.addEventListener('click', async () => {
            // Animación de carga en el botón
            const originalText = checkStatusBtn.innerHTML;
            checkStatusBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
            checkStatusBtn.disabled = true;

            // Simulamos una demora de verificación al backend
            setTimeout(() => {
                // Aquí el backend respondería con el estado
                // Vamos a simular que el correo ha sido verificado (puede ajustarse para pruebas)
                showAccountStatus(true);
            }, 2000);
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
            accessBtn.innerText = "Ir al Inicio";
            accessBtn.className = "btn";
            accessBtn.style.marginTop = "2rem";
            accessBtn.onclick = () => window.location.href = "/home";
            statusCard.appendChild(accessBtn);
        } else {
            statusIcon.innerHTML = '<i class="fas fa-exclamation-circle" style="color: #ef4444;"></i>';
            statusTitle.innerText = "Pendiente de Verificación";
            statusMessage.innerText = "Aún no hemos confirmado tu correo electrónico. Por favor, revisa tu bandeja de entrada o solicita un nuevo enlace.";
            
            const retryBtn = document.createElement('button');
            retryBtn.innerText = "Intentar de Nuevo";
            retryBtn.className = "btn";
            retryBtn.style.marginTop = "2rem";
            retryBtn.onclick = () => window.location.reload();
            statusCard.appendChild(retryBtn);
        }
    }

    const resendLink = document.querySelector('.resend-link');
    if (resendLink) {
        resendLink.addEventListener('click', () => {
            alert('Se ha enviado un nuevo enlace de verificación a su correo electrónico.');
        });
    }
});
