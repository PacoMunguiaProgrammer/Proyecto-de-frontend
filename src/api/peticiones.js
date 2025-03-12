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
        const response = await fetch(`/api/usuarios/${id}`);
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

export async function actualizarUsuarioAdmin(id, datos) {
    const res = await fetch(`/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });
    if (!res.ok) throw new Error("Error al actualizar usuario");
    return await res.json();
}
  
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
  


