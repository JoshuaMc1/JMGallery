import catchError from "./catchError";

export async function user(token) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Accept-Encoding': 'application/gzip',
                'Authorization': 'Bearer ' + token,
            },
        });
        const json = await response.json();
        return json;
    } catch (error) {
        catchError(error);
    }
}

export async function register(data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Accept-Encoding': 'application/gzip',
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        return json;
    } catch (error) {
        catchError(error);
    }
}


export async function login(data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Accept-Encoding': 'application/gzip',
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        return json;
    } catch (error) {
        catchError(error);
    }
}

export async function logout(token) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}logout`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Accept-Encoding': 'application/gzip',
                'Authorization': 'Bearer ' + token,
            },
        });
        const json = await response.json();
        return json;
    } catch (error) {
        catchError(error);
    }
}

export async function forgot(data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}forgot`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Accept-Encoding': 'application/gzip',
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        return json;
    } catch (error) {
        catchError(error);
    }
}

export async function reset(data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Accept-Encoding': 'application/gzip',
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        return json;
    } catch (error) {
        catchError(error);
    }
}
