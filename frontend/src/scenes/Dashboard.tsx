import { useEffect, useState } from "react"
import CreateBot from "../components/CreateBot";
import api from "../services/api";
import { Bot } from "../types/Bot";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [bots, setBots] = useState<Bot[] | null>(null);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        handleGetBots()
    }, [])

    function handleBotCreated(newBot: Bot) {
        if (bots === null) {
            setBots([newBot])
        } else {
            setBots([newBot, ...bots])
        };
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
        <div className="bg-light">
            <header className="w-100 h-75 p-4 border d-flex shadow-sm">
                <div className="d-flex  justify-content-between container h-100 bg-transparent">
                    <button className="btn btn-light-outline border h-100 align-self-center"
                        onClick={() => setIsModalOpen(true)}>
                        <i className="bi bi-plus text-dark align-self-center fw-bold"></i>
                    </button>

                    <div className=" d-flex w-50 align-items-center fw-light">
                        <div className="d-flex justify-content-between align-items-center container h-100">
                            <div className="d-flex justify-content-evenly container h-100 w-25 align-items-center p-2 border">
                                <p className=" my-1 mx-1 align-self-center">Perfil</p>
                                <button className="btn btn-light-outline">
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                            <div className="d-flex justify-content-evenly container h-100 w-25 align-items-center p-2 border">
                                <p className=" my-1 mx-1 align-self-center">Gerenciar</p>
                                <button className="btn btn-light-outline">
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                            <div className="d-flex justify-content-evenly container h-100 w-25 align-items-center p-2 border">
                                <p className=" my-1 mx-1 align-self-center">Ações</p>
                                <button className="btn btn-light-outline">
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <ul className="list-none">
                    {bots?.map((bot) => (
                        <li key={bot.id}>
                            <div className="border h-50 w-50">
                                <p>{bot.name}</p>
                                <p>{bot.access_token}</p>
                                <p>{bot.access_token_secret}</p>
                                <p>{bot.api_key}</p>
                                <p>{bot.api_key_secret}</p>
                                <p>{bot.created_at}</p>
                            </div>


                            <button onClick={() => navigate(`/bots/${bot.id}`)} className="btn btn-light border">Ver</button>
                        </li>
                    ))}
                </ul>
            </main>


            <CreateBot onCreateBot={handleBotCreated} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={() => setIsModalOpen(false)} />
            {isModalOpen && <div className="offcanvas-backdrop fade show backdrop-custom" onClick={() => setIsModalOpen(false)}></div>}

        </div>
    )
}