    import axios from "axios"

    const api = axios.create({
        baseURL: "http://localhost:3000",
        withCredentials: true
    });

    // Adiciona um interceptor para enviar o token antes de cada requisição
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('authToken');

        if (token) {
            // Formato Bearer Token (esperado pelo Rails)
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });


    export default api