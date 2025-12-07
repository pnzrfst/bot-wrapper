import { useParams } from "react-router-dom"
import api from "../services/api";
import { useEffect, useState } from "react";
import { Bot } from "../types/Bot";
import Header from "../components/Header";
import CreateBot from "../components/CreateBot";

export default function SingleBot() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    let { id } = useParams();
    const [singleBot, setSingleBot] = useState<Bot | null>(null);


    async function handleGetBotInfos() {
        try {
            const result = await api.get(`/bots/${id}`);
            setSingleBot(result.data);
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        handleGetBotInfos()
    }, [])

    return (
        <div className="w-100">
            <Header onClick={() => setIsModalOpen(true)} />


            <div className="container d-flex flex-column mt-5 border-bottom rounded-1 bg-light p-2">
                <h1 className="fw-bolder">{singleBot?.name}</h1>
                <p className="fw-lighter">Criado em: {
                    singleBot?.created_at
                        ? new Date(singleBot.created_at).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                        : "Data indisponível."
                }
                </p>
                <p>Criado por ${singleBot?.user?.email_address}</p>
            </div>

            <div className="">

            </div>

            <CreateBot isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={() => setIsModalOpen(false)} />
            {isModalOpen && <div className="offcanvas-backdrop fade show backdrop-custom" onClick={() => setIsModalOpen(false)}></div>}

        </div>


    )
}