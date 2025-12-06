import { useParams } from "react-router-dom"
import api from "../services/api";
import { useState } from "react";
import { Bot } from "../types/Bot";

export default function SingleBot() {
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

    return (
        <div className="container border shadow-sm">
            <div>
                <h1>{singleBot?.name}</h1>
            </div>
        </div>
    )
}