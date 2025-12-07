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
            <Header onClick={() => setIsModalOpen(true)}/>
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