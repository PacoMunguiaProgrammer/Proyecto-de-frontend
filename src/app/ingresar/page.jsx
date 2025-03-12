'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "@/api/peticiones";
import { useRouter } from "next/navigation";

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
        <>
            <h1>Iniciar Sesión</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Usuario" {...register("username")} required /><br/><br/>
                <input type="password" placeholder="Contraseña" {...register("password")} required /><br/><br/>
                <button type="submit">Ingresar</button>
            </form>
            <button onClick={() => router.push("/registro")}>Registrar Usuario</button>
            <button onClick={() => router.push("/")}>Inicio</button>
        </>
    );
}