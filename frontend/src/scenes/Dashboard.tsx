import { useEffect, useState } from "react"
import CreateBot from "../components/CreateBot";
import api from "../services/api";
import { Bot } from "../types/Bot";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Dashboard() {
    const [bots, setBots] = useState<Bot[] | null>(null);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        handleGetBots()
    }, [])

    async function handleBotCreated() {
        setIsModalOpen(false);
        await handleGetBots();
    }

    async function handleGetBots() {
        try {
            const result = await api.get("/bots");
            setBots(result.data);
        } catch (error: any) {
            console.log(error.message)
        }
    }

    return (
        <div className="min-vh-100 bg-light">
            <Header onClick={() => setIsModalOpen(true)} />
            
            <main className="container pt-4 pb-5">
                
                <h2 className="fw-bold mb-4 text-dark">Seus bots cadastrados</h2>
                
                {bots?.length !== undefined && bots.length > 0 ? (
                    
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {bots.map((bot) => (
                            <div className="col" key={bot.id}>
                                <div 
                                    className="card h-100 shadow-sm border-0 border-start border-primary-light border-4"
                                    role="button"
                                    onClick={() => navigate(`/bots/${bot.id}`)}
                                >
                                    <div className="card-body d-flex flex-column">
                                        
                                        <h5 className="card-title fw-semibold text-dark mb-2">{bot.name || `Bot ID: ${bot.id}`}</h5>
                                        
                                        <p className="card-text text-muted small mb-3">
                                            Criado em: {' '}
                                            {bot.created_at 
                                                ? new Date(bot.created_at).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) 
                                                : "Data indisponível."
                                            }
                                        </p>
                                        
                                        <div className="mt-auto pt-3 border-top">
                                            <p className="mb-1 text-truncate small text-muted">
                                                <span className="fw-bold">API Key:</span> {bot.api_key || 'N/A'}
                                            </p>
                                            <p className="mb-0 text-truncate small text-muted">
                                                <span className="fw-bold">Access Token:</span> {bot.access_token || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        ))}
                    </div>

                ) : (
                    // Mensagem de Bots Não Encontrados
                    <div className="alert alert-info border-0 p-4 text-center" role="alert">
                        <p className="mb-2 fw-bold">Nenhum bot cadastrado!</p>
                        <p className="mb-0 text-muted">Use o botão "Criar Bot" na barra superior para começar.</p>
                    </div>
                )}
            </main>


            <CreateBot onCreateBot={handleBotCreated} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={() => setIsModalOpen(false)} />
            {isModalOpen && <div className="offcanvas-backdrop fade show backdrop-custom" onClick={() => setIsModalOpen(false)}></div>}

        </div>
    )
}