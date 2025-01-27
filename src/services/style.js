const API = 'http://localhost:3000/style';

export function createStyle(style) {
    return fetch(`${API}`, {
        method: 'POST',
        body: JSON.stringify(style),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
}

export function getAllStyles() {
    return fetch(`${API}`)
        .then(response => response.json());
}

export function getStyleById(id) {
    return fetch(`${API}/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Style not found');
            return response.json();
        });
}

export function getActiveStyle() {
    return fetch(`${API}/active`)
        .then(response => {
            if (!response.ok) throw new Error('Active style not found');
            return response.json();
        });
}

export function updateStyle(id, style) {
    return fetch(`${API}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(style),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) throw new Error('Style not found');
        return response.json();
    });
}

export function deleteStyle(id) {
    return fetch(`${API}/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) throw new Error('Style not found');
    });
}
