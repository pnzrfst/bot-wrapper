export interface BotInput {
    name: string;
    api_key: string;
    api_key_secret: string;
    bearer_token: string;
    access_token: string;
    access_token_secret: string;
}


interface Bot extends BotInput{
    id: string;
    created_at: string;
    user_name: string
}