import { useEffect, useState } from "react"
import api from "../services/api";
import { Bot, BotInput } from "../types/Bot";

interface CreateBotProps {
    isOpen: boolean;
    onClose: () => void
    onSubmit: () => void
    onCreateBot: ( newBot: Bot) => void;
}



export default function CreateBot({ isOpen, onClose, onSubmit, onCreateBot}: CreateBotProps) {

    const [name, setName] = useState<string>("")
    const [apiKey, setApiKey] = useState<string>("");
    const [apiKeySecret, setApiKeySecret] = useState<string>("");
    const [bearerToken, setBearerToken] = useState<string>("");
    const [accessToken, setAccessToken] = useState<string>("");
    const [accessTokenSecret, setAccessTokenSecret] = useState<string>("");


    function clearInputs() {
        setName(""); 
        setApiKey("");
        setApiKeySecret("");
        setBearerToken("");
        setAccessToken("");
        setAccessTokenSecret("");
    }


    async function handleCreateABot() {

        const newBot : BotInput = {
            name,
            api_key: apiKey,
            api_key_secret: apiKeySecret,
            bearer_token: bearerToken,
            access_token: accessToken,
            access_token_secret: accessTokenSecret
        }

        try {
            const result = await api.post("/bots", newBot);
            onCreateBot(result.data as Bot);
            console.log(result)
        } catch (error: any) {
            console.log(error.message)
        }


    }

    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
          
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 10)
            return () => clearTimeout(timer)
        } else {
            setIsVisible(false);

            
            clearInputs();
            
           
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div 
            className={`offcanvas offcanvas-top ${isVisible ? "show" : ""} h-50`} 
            style={{ visibility: isVisible ? "visible" : "hidden", maxWidth: '100vw' }} 
            tabIndex={-1}
        >
            
            <div className="offcanvas-header border-bottom">
                <div>
                    <h2 className="fw-light mb-1">Criar novo bot</h2>
                    <p className="fw-light text-muted small mb-0">Crie um novo bot na sua pool.</p>
                </div>
                <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>

            <div className="offcanvas-body flex-grow-1">
                <form 
                    className="h-100 p-2 d-flex flex-column" 
                    id="form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        onSubmit();
                        handleCreateABot();
                        onClose();
                        clearInputs();
                    }}
                >
                    <div className="row flex-grow-1 g-3">
                        
                        <div className="col-lg-4 d-flex flex-column justify-content-start">
                            <div className="mb-3">
                                <label htmlFor="botName" className="form-label fw-light">Nome</label>
                                <input 
                                    id="botName" 
                                    className="form-control" 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder="Eu quero que se chame..." 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apiKey" className="form-label fw-light">API Key</label>
                                <input 
                                    id="apiKey" 
                                    className="form-control" 
                                    type="text" 
                                    value={apiKey} 
                                    onChange={(e) => setApiKey(e.target.value)} 
                                    placeholder="XXX-XXX-XXX" 
                                />
                            </div>
                        </div>

                        <div className="col-lg-4 d-flex flex-column justify-content-start">
                            <div className="mb-3">
                                <label htmlFor="bearerToken" className="form-label fw-light">Bearer Token</label>
                                <input 
                                    id="bearerToken" 
                                    className="form-control" 
                                    type="text" 
                                    value={bearerToken} 
                                    onChange={(e) => setBearerToken(e.target.value)} 
                                    placeholder="XXX-XXX-XXX" 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apiKeySecret" className="form-label fw-light">API Key Secret</label>
                                <input 
                                    id="apiKeySecret" 
                                    className="form-control" 
                                    type="text" 
                                    value={apiKeySecret} 
                                    onChange={(e) => setApiKeySecret(e.target.value)} 
                                    placeholder="XXX-XXX-XXX" 
                                />
                            </div>
                        </div>

                        <div className="col-lg-4 d-flex flex-column justify-content-start">
                            <div className="mb-3">
                                <label htmlFor="accessToken" className="form-label fw-light">Access Token</label>
                                <input 
                                    id="accessToken" 
                                    className="form-control" 
                                    type="text" 
                                    value={accessToken} 
                                    onChange={(e) => setAccessToken(e.target.value)} 
                                    placeholder="XXX-XXX-XXX" 
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="accessTokenSecret" className="form-label fw-light">Access Token Secret</label>
                                <input 
                                    id="accessTokenSecret" 
                                    className="form-control" 
                                    type="text" 
                                    value={accessTokenSecret} 
                                    onChange={(e) => setAccessTokenSecret(e.target.value)} 
                                    placeholder="XXX-XXX-XXX" 
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-light border fw-light d-flex align-items-center">
                            Criar
                            <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}