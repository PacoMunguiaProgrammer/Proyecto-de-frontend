'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // Next.js 13+
import { useAuth } from "@/hooks/useAuth";
import { actualizarUsuario } from "@/api/peticiones";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditarUsuario() {
    const router = useRouter();
    const { id } = useParams(); // Obtiene el ID de la URL
    const autorizado = useAuth(["usuario", "admin"]);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (autorizado && autorizado._id === id) {
            setEmail(autorizado.email);
        } else {
            router.replace("/ingresar");
        }
    }, [autorizado, id, router]);

    if (!autorizado) {
        return <p>Verificando autorización...</p>;
    }

    const handleEditar = async (e) => {
        e.preventDefault();
        try {
            const datosActualizados = { email };
            if (password.trim() !== "") {
                datosActualizados.password = password;
            }
            await actualizarUsuario(id, datosActualizados);
            alert("Usuario actualizado correctamente");
            router.push("/usuario");
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            alert("Error al actualizar usuario");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="mb-3 text-center">Editar Usuario</h3>
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
                        <label className="form-label">Nueva contraseña (opcional):</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-warning w-100">Guardar</button>
                    <button type="button" className="btn btn-danger w-100 mt-2" onClick={() => router.push("/usuario")}>Cancelar</button>
                </form>
            </div>
        </div>
    );
}