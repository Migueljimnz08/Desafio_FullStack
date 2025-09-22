export const login = async (email, password) => {
    try{
        const res = await fetch(`/api/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include', 
        });
        if (!res.ok) {
            throw new Error( 'Error loging in');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const logout = async () => {
    try{
        const res = await fetch(`/api/logout`, {
            method: 'POST',
            credentials: 'include', 
        });
        if (!res.ok) {
            throw new Error('Error login out');
        }
        return res.json();
    } catch (error) {
        throw new Error(error.message);
    } 
};