"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { actualizarUsuario, borrarUsuario } from "@/api/peticiones";

export default function Usuario() {
    const autorizado = useAuth(["usuario", "admin"]);
    const router = useRouter();
    const [editando, setEditando] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (autorizado?.email) {
            setEmail(autorizado.email);
        }
    }, [autorizado]);

    if (autorizado === null) {
        return <div className="alert alert-info text-center">Verificando autorización...</div>;
    }

    if (!autorizado) {
        return <div className="alert alert-danger text-center">No tienes permiso para ver esta página.</div>;
    }

    const userId = autorizado?._id || autorizado?.id;
    if (!userId) {
        console.error("Error: No se encontró el ID del usuario en el frontend", autorizado);
        return <div className="alert alert-warning text-center">Error: No se encontró el ID del usuario.</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/ingresar");
    };

    const handleEditar = async (e) => {
        e.preventDefault();
        try {
            const datosActualizados = { email };
            if (password.trim() !== "") datosActualizados.password = password;
            await actualizarUsuario(userId, datosActualizados);
            alert("Usuario actualizado correctamente");
            setEditando(false);
            setPassword("");
            router.push("/ingresar");
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            alert("Error al actualizar usuario");
        }
    };

    const handleEliminar = async () => {
        if (window.confirm("¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer.")) {
            try {
                await borrarUsuario(userId);
                alert("Usuario eliminado correctamente");
                handleLogout();
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                alert("Error al eliminar usuario");
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="mb-3 text-center">Perfil de Usuario</h3>

                <div className="mb-2"><strong>Nombre:</strong> {autorizado.username}</div>
                <div className="mb-2"><strong>Rol:</strong> {autorizado.tipoUsuario}</div>

                {editando ? (
                    <form onSubmit={handleEditar} className="mt-3">
                        <div className="mb-2">
                            <label className="form-label">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Nueva Contraseña (opcional):</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100">Guardar</button>
                        <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => setEditando(false)}>Cancelar</button>
                    </form>
                ) : (
                    <>
                        <div className="mb-3"><strong>Email:</strong> {autorizado.email}</div>
                        <div className="d-grid gap-2">
                            <button className="btn btn-warning" onClick={() => setEditando(true)}>Editar</button>
                            <button className="btn btn-danger" onClick={handleEliminar}>Eliminar Cuenta</button>
                            <button className="btn btn-secondary" onClick={handleLogout}>Cerrar Sesión</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
