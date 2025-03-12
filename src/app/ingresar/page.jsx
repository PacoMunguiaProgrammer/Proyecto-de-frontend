'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "@/api/peticiones";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);
    const router = useRouter();

    const onSubmit = async (usuario) => {
        const respuesta = await login(usuario);

        if (!respuesta.estado) {
            setError("Error al iniciar sesión. Verifica tus credenciales.");
            return;
        }

        // Redirigir según el tipo de usuario
        if (respuesta.tipoUsuario === "usuario") {
            router.push("/usuario");
        } else {
            router.push("/admin");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Iniciar Sesión</h1>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <input type="text" className="form-control" placeholder="Usuario" {...register("username")} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" placeholder="Contraseña" {...register("password")} required />
                </div>
                <button type="submit" className="btn btn-primary">Ingresar</button>
            </form>
            <div className="mt-3">
                <button className="btn btn-secondary me-2" onClick={() => router.push("/registro")}>Registrar Usuario</button>
                <button className="btn btn-secondary" onClick={() => router.push("/")}>Inicio</button>
            </div>
        </div>
    );
}