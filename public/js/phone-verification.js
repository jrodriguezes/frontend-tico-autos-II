document.addEventListener('DOMContentLoaded', () => {
    const codeInputs = document.querySelectorAll('.code-input');
    const verifyForm = document.getElementById('verify-form');

    // Manejar el enfoque automatico entre los cuadros del código
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
        
        // Evitar el pegado de cualquier cosa que no sea números
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const paste = e.clipboardData.getData('text');
            const digits = paste.match(/\d/g);
            if (digits) {
                digits.forEach((digit, i) => {
                    if (index + i < codeInputs.length) {
                        codeInputs[index + i].value = digit;
                        if (index + i + 1 < codeInputs.length) {
                            codeInputs[index + i + 1].focus();
                        }
                    }
                });
            }
        });
    });

    if (verifyForm) {
        verifyForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            let code = "";
            codeInputs.forEach(input => code += input.value);

            if (code.length === 6) {
                console.log('Verificando código:', code);
                
                // Animación de carga en el botón
                const btn = verifyForm.querySelector('.btn');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
                btn.disabled = true;

                // Simulamos una demora de verificación
                setTimeout(() => {
                    // Por ahora, aceptamos cualquier código de 6 dígitos
                    // En el futuro, aquí se haría un fetch al backend para validar el código.
                    window.location.href = "/home";
                }, 1500);

            } else {
                alert('Por favor ingrese el código de 6 dígitos');
            }
        });
    }

    const resendLink = document.querySelector('.resend-link');
    if (resendLink) {
        resendLink.addEventListener('click', () => {
            alert('Se ha enviado un nuevo código a su correo electrónico.');
        });
    }
});
