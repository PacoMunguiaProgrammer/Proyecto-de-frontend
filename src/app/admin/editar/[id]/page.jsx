"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { actualizarUsuarioAdmin, actualizarUsuario, obtenerUsuariosYAdmins } from "@/api/peticiones";

const EditarUsuario = () => {
    const router = useRouter();
    const { id } = useParams();
    const [usuario, setUsuario] = useState({ email: "", password: "", tipoUsuario: "" });

    useEffect(() => {
        const cargarUsuario = async () => {
            try {
                const data = await obtenerUsuariosYAdmins();
                console.log("Datos obtenidos:", data); // Agrega este console.log para ver los datos
                if (data && typeof data === 'object') {
                    const todosUsuarios = [...(data.usuarios || []), ...(data.admins || [])];
                    const usuarioEncontrado = todosUsuarios.find((u) => u._id === id);
                    if (usuarioEncontrado) setUsuario(usuarioEncontrado);
                } else {
                    console.error("Error: la respuesta no es un objeto esperado", data);
                }
            } catch (error) {
                console.error("Error al obtener usuario:", error);
            }
        };
        if (id) cargarUsuario();
    }, [id]);

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (usuario.tipoUsuario === "admin") {
                await actualizarUsuarioAdmin(id, usuario); // Usa la función para actualizar admins
            } else {
                await actualizarUsuario(id, usuario); // Usa la función para actualizar usuarios
            }
            alert("Usuario actualizado correctamente");
            router.push("/admin");
        } catch (error) {
            console.error("Error al actualizar:", error);
            alert("Error al actualizar el usuario");
        }
    };

    return (
        <div>
            <h1>Editar Usuario</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" name="email" value={usuario.email} onChange={handleChange} required />

                <label>Contraseña:</label>
                <input type="password" name="password" value={usuario.password} onChange={handleChange} required />

                <label>Tipo de Usuario:</label>
                <select name="tipoUsuario" value={usuario.tipoUsuario} onChange={handleChange} required>
                    <option value="usuario">Usuario</option>
                    <option value="admin">Admin</option>
                </select>

                <button type="submit">Actualizar</button>
            </form>
            <button onClick={() => router.push("/admin")}>Cancelar</button>
        </div>
    );
};

export default EditarUsuario;