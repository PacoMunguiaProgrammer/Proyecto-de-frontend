"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { peticionRegistro } from "@/api/peticiones";
import { redirect } from "next/navigation";

export default function Registro() {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <h1>Regístrate</h1>
            <form 
              onSubmit={handleSubmit(async (usuario) => {
                console.log("Datos del formulario:", usuario); // Verifica que el campo sea "tipoUsuario"
                await peticionRegistro(usuario);
                redirect("/ingresar");
            })}
            >
                <input type="text" placeholder="Usuario" {...register("username")} required /><br/><br/>
                <input type="email" placeholder="Correo" {...register("email")} required /><br/><br/>
                
                {/* Input de contraseña */}
                <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    {...register("password")} 
                    required
                />
                <br/><br/>

                {/* Checkbox para mostrar/ocultar contraseña */}
                <label>
                    <input 
                        type="checkbox" 
                        onChange={() => setShowPassword(!showPassword)} 
                    /> Mostrar contraseña
                </label>
                <br/><br/>

                {/* Select para elegir tipo de usuario */}
                <label>Tipo de Usuario:</label>
                <select {...register("tipoUsuario")}> {/* Asegúrate de que el nombre sea "tipoUsuario" */}
    <option value="usuario">Usuario</option>
    <option value="admin">Administrador</option>
</select>
                <br/><br/>

                <button type="submit">Registrar usuario</button>
            </form>
        </>
    );
}

