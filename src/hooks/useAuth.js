"use client";
import axios from "axios";
import { useRouter } from "next/navigation"; // <---- Asegúrate de este import
import { useEffect, useState } from "react";

export function useAuth(roles = null) {
    const router = useRouter(); // <---- Asegúrate de que se ejecuta dentro del componente
    const [autorizado, setAutorizado] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let bandera = true;
        const verificarAutorizacion = async () => {
            try {
                const res = await axios.get("/api/auth", { withCredentials: true });

                console.log("Respuesta de /api/auth:", res.data);

                if (!res.data.estado || !res.data.estado.usuario) {
                    throw new Error("Usuario no encontrado en la respuesta");
                }

                const usuario = res.data.estado.usuario;

                if (roles && !roles.includes(usuario.tipoUsuario)) {
                    router.replace("/ingresar");
                }

                setAutorizado(usuario);
            } catch (error) {
                console.error("Error en useAuth:", error);
                setError("Error de conexión");
                router.replace("/ingresar");
            }
        };

        if (autorizado === null) {
            verificarAutorizacion();
        }

        return () => { bandera = false };
    }, [router, roles]);

    return autorizado;
}

