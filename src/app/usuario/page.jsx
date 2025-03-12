"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Usuario() {
    const autorizado = useAuth(["usuario", "admin"]);
    const router = useRouter();

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

    return (
        <div>
            <h1>Datos del usuario</h1>
            <p>Nombre: {autorizado.username}</p>
            <p>Rol: {autorizado.tipoUsuario}</p>
            <p>Email: {autorizado.email}</p>
            <p>Password: {autorizado.password}</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
}



