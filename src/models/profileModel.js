import axios from 'axios';
import catchError from './catchError';

export async function updateProfile(token, data) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}update_profile`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function updatePassword(token, data) {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}update_password`, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function changeNSFW(token, data) {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}change_nsfw`, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function deleteUser(token) {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}delete_user`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        catchError(error);
    }
}
