"use client";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Inicio() {
    const router = useRouter();

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-5 shadow-lg text-center">
                <h1 className="mb-4 fw-bold">Bienvenido</h1>
                <p className="text-muted">Explora y disfruta de nuestra plataforma.</p>
                <div className="mt-4">
                    <button 
                        className="btn btn-primary me-3"
                        onClick={() => router.push("/ingresar")}
                    >
                        Ingresar
                    </button>
                    <button 
                        className="btn btn-success"
                        onClick={() => router.push("/registro")}
                    >
                        Registrarse
                    </button>
                </div>
            </div>
        </div>
    );
}
