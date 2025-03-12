"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { actualizarUsuario, borrarUsuario} from "@/api/peticiones";

export default function Usuario() {
    const autorizado = useAuth(["usuario", "admin"]);
    const router = useRouter();
    const [editando, setEditando] = useState(false);
    const [email, setEmail] = useState(autorizado?.email || "");
    const [password, setPassword] = useState("");

    if (autorizado === null) {
        return <p>Verificando autorización...</p>;
    }

    if (!autorizado) {
        return <p>No tienes permiso para ver esta página.</p>;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/ingresar");
    };

    const handleEditar = async (e) => {
        e.preventDefault();
        try {
            await actualizarUsuario(autorizado._id, { email, password });
            alert("Usuario actualizado correctamente");
            setEditando(false);
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            alert("Error al actualizar usuario");
        }
    };

    const handleEliminar = async () => {
        if (confirm("¿Estás seguro de eliminar tu cuenta?")) {
            try {
                await borrarUsuario(autorizado._id);
                alert("Usuario eliminado correctamente");
                handleLogout();
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                alert("Error al eliminar usuario");
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Datos del usuario</h1>
            <p>Nombre: {autorizado.username}</p>
            <p>Rol: {autorizado.tipoUsuario}</p>
            {editando ? (
                <form onSubmit={handleEditar}>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditando(false)}>Cancelar</button>
                </form>
            ) : (
                <>
                    <p>Email: {autorizado.email}</p>
                    <button className="btn btn-warning me-2" onClick={() => setEditando(true)}>Editar</button>
                    <button className="btn btn-danger me-2" onClick={handleEliminar}>Eliminar</button>
                    <button className="btn btn-secondary" onClick={handleLogout}>Cerrar sesión</button>
                </>
            )}
        </div>
    );
}



