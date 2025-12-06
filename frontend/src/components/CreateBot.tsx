import { useEffect, useState } from "react"

interface CreateBotProps {
    isOpen: boolean;
    onClose: () => void
    onSubmit: () => void
}


export default function CreateBot({ isOpen, onClose, onSubmit }: CreateBotProps) {

    //Credencial,Função,Onde Usar
    //API Key (Consumer Key),Identifica seu aplicativo.,Na construção do objeto tweepy.Client ou tweepy.API.
    //API Secret (Consumer Secret),Chave secreta que valida seu aplicativo.,Na construção do objeto tweepy.Client ou tweepy.API.
    //Access Token,Permite que o aplicativo aja em nome de uma conta específica.,Na construção do objeto tweepy.Client ou tweepy.API.
    //Access Token Secret,Chave secreta que valida seu Access Token.,Na construção do objeto tweepy.Client ou tweepy.API.

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [profile_pic, setProfilePic] = useState<string>("");

    const [isVisible, setIsVisible] = useState<boolean>(false)

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 10)
            return () => clearTimeout(timer)
        } else {
            setIsVisible(false);

            const exitTimer = setTimeout(() => {

            }, 300)
        }
    }, [isOpen])

    if (!isOpen && !isVisible) return null

    return (
        <div className={`offcanvas offcanvas-top ${isVisible ? "show" : ""} backdrop `} style={{ visibility: isVisible ? "visible" : "hidden" }} tabIndex={-1}>
            <div className="offcanvas-header">
                <h3 className="fw-light border-bottom m-2">Criar novo bot</h3>
                <button type="button" className="btn-close text-reset" onClick={onClose}></button>
            </div>
            <div className="offcanvas-body h-100 w-100 d-flex">
                <form className="w-100 h-100 border p-2 row"
                    onSubmit={(e) => {
                        onSubmit();
                    }}
                >
                    <div className="col d-flex flex-column justify-content-evenly input-group">
                        <label className="label">Nome de usuário</label>
                        <input className="w-25 input-group-text" type="text" placeholder="@" />
                        <label className="label">Senha</label>
                        <input className="w-25" type="text" placeholder="Name" />
                    </div>
                </form>
            </div>
        </div>
    )
}