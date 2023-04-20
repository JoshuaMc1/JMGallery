import axios from 'axios';
import catchError from './catchError';

export async function posts() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}posts`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function postsAuth(token) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}posts_auth`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function create(token, formData) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}post`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        catchError(error);
    }
};

export async function update(token, formData) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}update_post`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function deletePost(token, slug) {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}delete_post/${slug}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function getPost(token, slug = "") {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}post/${slug}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function getFavoritePosts(token) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}favorite_posts`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function getMyPosts(token) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}my_posts`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export async function likePost(token, data) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}like_post`, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        catchError(error);
    }
}
