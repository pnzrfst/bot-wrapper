import { useEffect, useState } from "react"
import CreateBot from "../components/CreateBot";

interface Bots {
    id: string;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    profile_pic: string;
    created_at: string;
}

export default function Dashboard (){
    const [bots, setBots] = useState<Bots[] | null>(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        handleGetBots()
    }, [])

    async function handleGetBots() {
        try {
            console.log("oii")
        } catch (error) {
            
        }
    }

    return(
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
                <ul>
                    {bots?.map((bot) => (
                        <li key={bot.id}>
                            <div className="border h-50 w-50">
                                <p>{bot.profile_pic}</p>
                                <p>{bot.name}</p>
                                <p>{bot.email}</p>
                                <p>{bot.created_at}</p>
                                <p>{bot.isActive}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>


            <CreateBot isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={() => console.log("oi2")}/>
        </div>
    )
}