'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { peticionRegistro } from "@/api/peticiones";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Registro() {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Regístrate</h1>
            <form 
              onSubmit={handleSubmit(async (usuario) => {
                console.log("Datos del formulario:", usuario); // Verifica que el campo sea "tipoUsuario"
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
                <div className="mb-3">
                    <label className="form-label">Tipo de Usuario</label>
                    <select className="form-select" {...register("tipoUsuario")}>
                        <option value="usuario">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Registrar usuario</button>
            </form>
            <div className="mt-3">
                <button className="btn btn-secondary me-2" onClick={() => router.push("/ingresar")}>Ingresar Usuario</button>
                <button className="btn btn-secondary" onClick={() => router.push("/")}>Inicio</button>
            </div>
        </div>
    );
}