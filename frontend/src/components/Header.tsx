import { useState } from "react";
import CreateBot from "./CreateBot"
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    onClick: () => void
}


export default function Header({ onClick }: HeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate()

    return (
        <header className="w-100 h-75 p-4 border d-flex shadow-sm">
            <div className="d-flex w-100 justify-content-between container p-1 h-100 bg-transparent">
                <div className="d-flex  justify-content-evenly w-25 align-items-center border rounded-top">
                    <button className="btn btn-light-outline  h-75 align-self-center" onClick={() => navigate("/dashboard")} title="Voltar para a página principal">
                        <i className="bi bi-house text-dark align-self-center fw-bold"></i>
                    </button>
                    <button className="btn btn-light-outline border rounded-top h-75 align-self-center" onClick={() => onClick()} title="Criar novo">
                        <i className="bi bi-plus text-dark align-self-center fw-bold"></i>
                    </button>
                    <button className="btn btn-light-outline  h-75 align-self-center" title="Procurar">
                        <i className="bi bi-search text-dark align-self-center fw-bold"></i>
                    </button>
                    <button className="btn btn-light-outline  h-75 align-self-center" title="Notificações">
                        <i className="bi bi-bell text-dark align-self-center fw-bold"></i>
                    </button>

                </div>
                <div className=" d-flex w-50 align-items-center fw-light">
                    <div className="d-flex justify-content-between align-items-center container h-100">
                        <div className="d-flex justify-content-evenly container h-100 w-25 align-items-center p-2 border rounded-top">
                            <p className=" my-1 mx-1 align-self-center">Perfil</p>
                            <button className="btn btn-light-outline">
                                <i className="bi bi-arrow-right"></i>
                            </button>
                        </div>
                        <div className="d-flex justify-content-evenly container h-100 w-25 align-items-center p-2 border rounded-top">
                            <p className=" my-1 mx-1 align-self-center">Gerenciar</p>
                            <button className="btn btn-light-outline">
                                <i className="bi bi-arrow-right"></i>
                            </button>
                        </div>
                        <div className="d-flex justify-content-evenly container h-100 w-25 align-items-center p-2 border rounded-top">
                            <p className=" my-1 mx-1 align-self-center">Ações</p>
                            <button className="btn btn-light-outline">
                                <i className="bi bi-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <button className="btn btn-light-outline align-self-center border h-75" title="Sair">
                    <i className="bi bi-door-closed text-dark align-self-center fw-bold"></i>
                </button>
            </div>


            <CreateBot isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={() => setIsModalOpen(false)} />

        </header>
    )
}