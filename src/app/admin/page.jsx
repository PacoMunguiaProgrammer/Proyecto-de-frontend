'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerUsuariosYAdmins, borrarUsuario } from "@/api/peticiones";
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPage = () => {
    const router = useRouter();
    const [usuarios, setUsuarios] = useState([]);
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const data = await obtenerUsuariosYAdmins();
                console.log("Datos recibidos:", data);
                
                if (Array.isArray(data)) {
                    setUsuarios(data.filter((u) => u.tipoUsuario === "usuario"));
                    setAdmins(data.filter((u) => u.tipoUsuario === "admin"));
                } else if (data && typeof data === 'object') {
                    setUsuarios(data.usuarios || []);
                    setAdmins(data.admins || []);
                } else {
                    console.error("Error: la respuesta no es un array ni un objeto esperado", data);
                }
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };
        cargarDatos();
    }, []);

    const editarUsuario = (id) => {
        router.push(`/admin/editar/${id}`);
    };

    const eliminarUsuario = async (id) => {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            try {
                await borrarUsuario(id, "TOKEN_ADMIN"); // ⚠️ Usa el token real del admin
                alert("Usuario eliminado");

                // Actualizar la lista sin hacer reload
                setUsuarios((prevUsuarios) => prevUsuarios.filter((u) => u._id !== id));
                setAdmins((prevAdmins) => prevAdmins.filter((a) => a._id !== id));
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                alert("No se pudo eliminar el usuario");
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/ingresar");
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Panel de Administración</h1>
            <div className="mb-3">
                <button className="btn btn-primary me-2" onClick={() => router.push("/registro")}>Registrar Usuario</button>
                <button className="btn btn-secondary me-2" onClick={handleLogout}>Cerrar Sesión</button>
                <button className="btn btn-secondary" onClick={() => router.push("/")}>Inicio</button>
            </div>

            <h2>Usuarios</h2>
            {usuarios.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario._id}>
                                <td>{usuario._id}</td>
                                <td>{usuario.username}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    <button className="btn btn-warning me-2" onClick={() => editarUsuario(usuario._id)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => eliminarUsuario(usuario._id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay usuarios disponibles</p>
            )}

            <h2>Administradores</h2>
            {admins.length > 0 ? (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin._id}>
                                <td>{admin._id}</td>
                                <td>{admin.username}</td>
                                <td>{admin.email}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => editarUsuario(admin._id)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay administradores disponibles</p>
            )}
        </div>
    );
};

export default AdminPage;