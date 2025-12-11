import { useParams } from "react-router-dom"
import api from "../services/api";
import { useEffect, useRef, useState } from "react";
import { Bot } from "../types/Bot";
import Header from "../components/Header";
import CreateBot from "../components/CreateBot";

export default function SingleBot() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const [name, setNewName] = useState<string>("")
    const [isVisible, setIsVisible] = useState<boolean>(false)

    let { id } = useParams();
    const [singleBot, setSingleBot] = useState<Bot | null>(null);

    const renderSensibleContent = (text: string | undefined) => {
        if (!text) return "N/A"

        return isVisible ? text : "••••••••••••••••••••••••••••••"
    }

    function enableChangeName() {
        setReadOnly(false);

        setTimeout(() => {
            inputRef.current?.focus()
            inputRef.current?.select()
        }, 0)
    }

    async function updateBotName() {
        try {
            (await api.put(`/bots/${id}`, { name }))
            console.log("Nome atualizado..")
        } catch (error: any) {
            console.log(error.message)
        }
    }

    async function handleGetBotInfos() {
        try {
            const result = await api.get(`/bots/${id}`);
            setSingleBot(result.data);
            setNewName(result.data.name)
            console.log(result.data)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        handleGetBotInfos()
    }, [])

    return (
        <div className="w-100 min-vh-100 bg-light">
            <Header onClick={() => setIsModalOpen(true)} />

            <main className="container pt-4 pb-5">
                <div className="bg-white p-4 rounded shadow-sm mb-4 border-start border-primary-light border-5">
                    <div className="d-flex w-100 justify-content-between gap-3 align-items-center mb-2">
                        <div className="d-flex w-75 align-items-center gap-4">
                            <input ref={inputRef} className="border w-50 fs-3"
                                value={name || ''} readOnly={readOnly}
                                onChange={(e) => setNewName(e.target.value)}
                                onBlur={() => {
                                    setReadOnly(true)
                                    updateBotName()
                                }}
                            ></input>
                            <i className="bi bi-pencil fw-bold fs-4" title="Editar nome" onClick={() => enableChangeName()}></i>
                        </div>
                        <i className="bi bi-trash fw-bold fs-4 ms-auto" title="Excluir bot"></i>
                    </div>
                    <p className="mb-0 text-muted small">
                        Criado em: {' '}
                        {singleBot?.created_at
                            ? new Date(singleBot.created_at).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                            : "Data indisponível."
                        }
                    </p>
                    <p className="mb-0 text-muted small">
                        Criado por <strong className="text-dark">{singleBot?.user_name || 'Usuário Indisponível'}</strong>
                    </p>
                </div>

                <div className="card shadow-sm border-0">
                    <div className="card-header bg-white  border-bottom fw-semibold text-dark">
                        <div className=" fs-3 p-2 d-flex align-items-center justify-content-between">
                            🔑  Informações de Acesso
                            <i
                                className={`bi ${isVisible ? 'bi-eye-slash' : 'bi-eye'}`}
                                onClick={() => setIsVisible(!isVisible)}
                                style={{ cursor: 'pointer' }}
                                title={isVisible ? "Ocultar informações" : "Mostrar informações"}
                            ></i>

                        </div>
                    </div>
                    <div className="card-body p-4">
                        <div className="row g-4">

                            {/* Bloco de Informação Reutilizável */}
                            <div className="col-lg-6 col-md-12">
                                <h6 className="text-muted mb-1 small fw-bold text-uppercase">Access Token</h6>
                                <p className="text-break fw-light">{renderSensibleContent(singleBot?.access_token || 'N/A')}</p>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <h6 className="text-muted mb-1 small fw-bold text-uppercase">Access Token Secret</h6>
                                <p className="text-break fw-light">{renderSensibleContent(singleBot?.access_token_secret || 'N/A')}</p>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <h6 className="text-muted mb-1 small fw-bold text-uppercase">API Key</h6>
                                <p className="text-break fw-light">{renderSensibleContent(singleBot?.api_key || 'N/A')}</p>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <h6 className="text-muted mb-1 small fw-bold text-uppercase">API Key Secret</h6>
                                <p className="text-break fw-light">{renderSensibleContent(singleBot?.api_key_secret || 'N/A')}</p>
                            </div>

                            <div className="col-12">
                                <h6 className="text-muted mb-1 small fw-bold text-uppercase">Bearer Token</h6>
                                <p className="text-break fw-normal">{renderSensibleContent(singleBot?.bearer_token || 'N/A')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 card border rounded-top h-100 w-100 bg-white p-2">
                    <h2 className="fw-bold ms-3 mb-3 text-dark">Outras configurações</h2>
                    <div className="w-50 h-50 p-2 d-flex justify-content-start gap-3">
                        <button className="btn border btn-light">Visualizar informações</button>
                        <button className="btn border btn-light">Criar job</button>
                        <button className="btn border btn-light">Editar jobs</button>
                        <button className="btn border btn-light">Apagar jobs</button>
                    </div>
                </div>

            </main>

            <CreateBot isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={() => setIsModalOpen(false)} />
            {isModalOpen && <div className="offcanvas-backdrop fade show backdrop-custom" onClick={() => setIsModalOpen(false)}></div>}

        </div>
    );
}