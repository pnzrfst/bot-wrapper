import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import api from '../services/api'
import {useNavigate } from "react-router-dom";

interface User {
    email_address: string;
    password: string;
}


export default function Login() {
    const [email_address, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
       const user : User = {
         email_address,
         password
       }

       try {
        console.log("entrou")
        const loggedUser = await api.post("/users", user);
        navigate("/dashboard")
       } catch (error: any) {
        console.log(error.message)
       }
    }

    return (
        <div className="form-group d-flex w-25 h-75 flex-column m-5 p-5 align-items-start justify-content-evenly border shadow-sm">
            <h1 className="align-self-start p-1 fw-bolder">Entrar</h1>
            <p className="p-1 text text-muted fw-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Morbi sed arcu consequat ex congue mattis eu vel nibh. Sed blandit arcu ut tortor volutpat, ultrices ultricies risus tempus.</p>
            <form className="d-flex flex-column justify-content-around w-100 h-100" onSubmit={handleSubmit}>
                <div className="d-flex flex-column justify-content-evenly gap-1">
                    <label className="mb-2 mt-2 fw-light">Email</label>
                    <input className="form-control" aria-describedby="emailHelp" type="email" value={email_address} onChange={(e) => setEmail(e.target.value)}></input>
                    <label className="mb-2 mt-2 fw-light">Senha</label>
                    <input className="form-control" aria-describedby="passwordHelp" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button className="btn w-50 btn-light border align-self-end" type="submit" onClick={() => console.log("clicou")}>Entrar</button>
            </form>

            <div>
                <p className="fw-lighter">Esqueci minha <strong className="cursor-pointer">senha</strong></p>
                <p className="fw-lighter">Problemas ao <strong>acessar</strong></p>
            </div>
        </div>
    )
}