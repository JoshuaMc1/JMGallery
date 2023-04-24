const currentDate = new Date();

export function getYear() {
    return currentDate.getFullYear();
}

export const generateId = () =>
    Math.random().toString(36).substr(2) + Date.now().toString(36);

export const formatPrice = price => {
    return new Intl.NumberFormat('es-HN', {
        style: 'currency',
        currency: 'HNL'
    }).format(price);
}

export const formatNumber = number => {
    return new Intl.NumberFormat('es-HN').format(number);
}

export const formatTime = time => {
    return new Date(time).toLocaleTimeString('es-HN');
}

export const formatDateTime = dateTime => {
    return new Date(dateTime).toLocaleString('es-HN');
}

export const formatDateOnly = date => {
    return new Date(date).toLocaleDateString('es-HN');
}

export const formatDate = date => {
    const newDate = new Date(date);

    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }

    return newDate.toLocaleDateString('es-HN', options)
}

export const initials = fullName => {
    return fullName.split(" ").map(word => word.charAt(0)).join("").toUpperCase();
}

export const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const isEmail = email => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

export const isPhone = phone => {
    return /^\d{10}$/.test(phone);
}

export const isPassword = password => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
}
export const isName = name => {
    return /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(name);
}

