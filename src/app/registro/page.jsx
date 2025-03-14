'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { peticionRegistro } from "@/api/peticiones";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Registro() {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);
    const router = useRouter();

    const onSubmit = async (usuario) => {
        try {
            const respuesta = await peticionRegistro(usuario);

            

            alert("Usuario registrado correctamente");
            router.push("/ingresar");
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            setError("Error al registrar usuario. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="mb-3 text-center">Registrar Usuario</h3>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input type="text" className="form-control" placeholder="Usuario" {...register("username")} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="Email" {...register("email")} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control" placeholder="Contraseña" {...register("password")} required />
                    </div>
                    <button type="submit" className="btn btn-warning w-100">Registrar</button>
                </form>
                <div className="mt-3 d-grid gap-2">
                    <button className="btn btn-danger" onClick={() => router.push("/ingresar")}>Iniciar Sesión</button>
                    <button className="btn btn-primary" onClick={() => router.push("/")}>Inicio</button>
                </div>
            </div>
        </div>
    );
}