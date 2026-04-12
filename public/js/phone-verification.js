import { handlePhoneVerification } from './phone-verification-logic.js';

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

    // Validar que exista el ID de usuario para 2FA, si no, redirigir al login
    if (!sessionStorage.getItem('twoFactorUserId')) {
        window.location.href = "/login";
        return;
    }

    if (verifyForm) {
        verifyForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            let code = "";
            codeInputs.forEach(input => code += input.value);

            if (code.length === 6) {
                // Animación de carga en el boton
                const btn = verifyForm.querySelector('.btn');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';
                btn.disabled = true;

                // Llamar a la funcion de logica unificada
                const result = await handlePhoneVerification(code);

                if (result.success) {
                    window.location.href = "/home";
                } else {
                    alert(result.message);
                    // Restaurar boton si falla
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }
            } else {
                alert('Por favor ingrese el código de 6 dígitos');
            }
        });
    }

});
