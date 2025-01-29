const API = "http://localhost:5173/src/json/users.json"; // Ruta local del JSON Server

export function createUser(user) {
    return fetch(`${API}`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json());
}

export function getAllUsers() {
    return fetch(`${API}`)
        .then(response => response.json());
}

export function getUserById(id) {
    return fetch(`${API}/${id}`)
        .then(response => {
            if (!response.ok) throw new Error("User not found");
            return response.json();
        });
}

export function updateUser(id, user) {
    return fetch(`${API}/${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (!response.ok) throw new Error("User not found");
        return response.json();
    });
}

export function deleteUser(id) {
    return fetch(`${API}/${id}`, {
        method: "DELETE"
    }).then(response => {
        if (!response.ok) throw new Error("User not found");
    });
}
