export async function verifyAccount(token, id) {
    if (!token || !id) {
        return false;
    }

    const param = new URLSearchParams();
    param.append("token", token);
    param.append("id", id);
    
    try {
        const response = await fetch(`http://localhost:3000/auth/validate-email?${param.toString()}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {

        return false;
    }
}