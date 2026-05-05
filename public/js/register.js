document.addEventListener('DOMContentLoaded', () => {
    let canRegister = false;
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        const numberId = document.getElementById('numberId');

        numberId.addEventListener('blur', async () => {
            const response = await fetch(`http://padron.com/cedula/${numberId.value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                canRegister = false;
                alert("Cédula inválida o no encontrada");
                return;
            }

            const responsev2 = await fetch(`http://localhost:3000/userNameById/${numberId.value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            canRegister = true;

            document.getElementById('name').value = data.nombre;
            document.getElementById('lastName1').value = data.apellidoPaterno;
            document.getElementById('lastName2').value = data.apellidoMaterno;

            document.getElementById('name').disabled = true;
            document.getElementById('lastName1').disabled = true;
            document.getElementById('lastName2').disabled = true;

        });

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!canRegister) {
                alert("Cédula inválida o no encontrada");
                return;
            }
            const numberId = document.getElementById('numberId').value;
            const name = document.getElementById('name').value;
            const fLastName = document.getElementById('lastName1').value;
            const sLastName = document.getElementById('lastName2').value;
            const mail = document.getElementById('email').value;
            let phoneNumber = document.getElementById('phone').value;

            // quitar espacios por si acaso
            phoneNumber = phoneNumber.replace(/\s+/g, '');
            if (!phoneNumber.startsWith('+506')) {
                phoneNumber = `+506${phoneNumber}`;
            }
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        numberId: Number(numberId),
                        name,
                        fLastName,
                        sLastName,
                        email: mail,
                        phoneNumber,
                        password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    window.location.href = "/check-email";
                } else {
                    alert(data.message || "Error al registrar el usuario");
                }
            } catch (error) {
                alert("Error de conexión con el servidor");
            }
        });
    }
});
