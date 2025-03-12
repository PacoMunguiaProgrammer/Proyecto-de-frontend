"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { peticionRegistro } from "@/api/peticiones";
import { useRouter, useSearchParams } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Registro() {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Obtener el tipo de usuario desde la URL
    const tipoUsuario = searchParams.get("tipo") || "usuario"; // Si no se define, usa "usuario"

    useEffect(() => {
        console.log("Registrando como:", tipoUsuario);
    }, [tipoUsuario]);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Regístrate como {tipoUsuario === "admin" ? "Administrador" : "Usuario"}</h1>
            <form 
              onSubmit={handleSubmit(async (usuario) => {
                usuario.tipoUsuario = tipoUsuario; // Agregar tipo de usuario al objeto enviado
                console.log("Datos del formulario:", usuario);
                await peticionRegistro(usuario);
                router.push("/ingresar");
            })}
            >
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <input type="text" className="form-control" placeholder="Usuario" {...register("username")} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input type="email" className="form-control" placeholder="Correo" {...register("email")} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        className="form-control" 
                        placeholder="Contraseña" 
                        {...register("password")} 
                        required
                    />
                </div>
                <div className="form-check mb-3">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        onChange={() => setShowPassword(!showPassword)} 
                    />
                    <label className="form-check-label">Mostrar contraseña</label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Registrar {tipoUsuario === "admin" ? "Administrador" : "Usuario"}
                </button>
            </form>
            <div className="mt-3">
                <button className="btn btn-secondary me-2" onClick={() => router.push("/ingresar")}>Ingresar Usuario</button>
                <button className="btn btn-secondary" onClick={() => router.push("/")}>Inicio</button>
            </div>
        </div>
    );
}
