import axios from "axios";
const API = process.env.NEXT_PUBLIC_API_URL;

// ✅ Registrar usuario
export const peticionRegistro = async (usuario) => {
    console.log("Datos enviados al backend:", usuario);
    return await axios.post(`${API}/registro`, usuario, { withCredentials: true });
};

// ✅ Iniciar sesión
export const login = async (usuario) => {
    try {
        const respuesta = await axios.post(`${API}/ingresar`, usuario, { withCredentials: true });
        console.log("Respuesta en el frontend:", respuesta.data);

        if (!respuesta.data) return { estado: false };

        return {
            estado: true,
            tipoUsuario: respuesta.data.mensajeUsuario
        };
    } catch (error) {
        console.error("Error en la petición de login:", error);
        return { estado: false };
    }
};

// ✅ Obtener todos los usuarios y admins
export const obtenerUsuariosYAdmins = async () => {
    try {
        const respuesta = await axios.get(`${API}/obtenerTodosUsuarios`, { withCredentials: true });
        return {
            usuarios: respuesta.data.usuarios,
            admins: respuesta.data.admins
        };
    } catch (error) {
        console.error("Error al obtener datos:", error);
        return { usuarios: [], admins: [] };
    }
};

// Obtener un usuario por ID
export const obtenerUsuarioPorId = async (id) => {
    try {
        const respuesta = await axios.put(`${API}/usuarios/${id}`, nuevosDatos, { headers: { Authorization: `Bearer ${token}` } });
        if (!response.ok) {
            throw new Error("Error al obtener usuario");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en obtenerUsuarioPorId:", error);
        throw error;
    }
};

// Actualizar un usuario
export const actualizarPerfilUsuario = async (id, nuevosDatos, token) => {
    try {
        const respuesta = await axios.put(`${API}/usuario/actualizarPerfil/${id}`, nuevosDatos, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return respuesta.data;
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return null;
    }
};

// Actualizar un usuario admin
export const actualizarUsuarioAdmin = async (id, usuario) => {
    try {
        console.log("Actualizando admin:", id, usuario);
        const response = await axios.put(`${API}/admins/${id}`, usuario, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta de la API:", error.response.data);
            throw new Error(`Error al actualizar admin: ${error.response.statusText}`);
        } else if (error.request) {
            console.error("No se recibió respuesta de la API:", error.request);
            throw new Error("Error al actualizar admin: No se recibió respuesta de la API");
        } else {
            console.error("Error al configurar la solicitud:", error.message);
            throw new Error(`Error al actualizar admin: ${error.message}`);
        }
    }
};

// Actualizar un usuario regular
export const actualizarUsuario = async (id, usuario) => {
    try {
        console.log("Actualizando usuario:", id, usuario);
        const response = await axios.put(`${API}/usuarios/${id}`, usuario, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error en la respuesta de la API:", error.response.data);
            throw new Error(`Error al actualizar usuario: ${error.response.statusText}`);
        } else if (error.request) {
            console.error("No se recibió respuesta de la API:", error.request);
            throw new Error("Error al actualizar usuario: No se recibió respuesta de la API");
        } else {
            console.error("Error al configurar la solicitud:", error.message);
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }
};

// 🔹 Borrar usuario
export const borrarUsuario = async (id) => {
    try {
        const { data } = await axios.delete(`${API}/usuarios/admin/borrarUsuario/${id}`, { withCredentials: true });
        return data;
    } catch (error) {
        console.error("Error al borrar usuario:", error);
        return { mensaje: "Error al borrar usuario" };
    }
};
export const cerrarSesion = async () => {
    try {
        const response = await fetch('/api/salir', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Error en la respuesta de la API: ${data.mensaje}`);
        }

        return data;
    } catch (error) {
        console.error("Error en cerrarSesion:", error);
        throw error;
    }
};
  


