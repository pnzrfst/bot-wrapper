require 'open3'

class SpawnBot 
  def initialize(bot)
    @bot = bot
  end

  def call
    env_vars = {
    "API_KEY" => @bot.api_key.to_s,
    "API_KEY_SECRET" => @bot.api_key_secret.to_s,
    "ACCESS_TOKEN" => @bot.access_token.to_s,
    "ACCESS_TOKEN_SECRET" => @bot.access_token_secret.to_s,
    "BEARER_TOKEN" => @bot.bearer_token.to_s,
    "BOT_ID" => @bot.id.to_s
  }
    
    command = "docker compose -f config/docker-compose-bot.yml -p bot_#{@bot.id} up -d"

    stoud, stderr, status = Open3.capture3(env_vars, command)

    if status.success?
      Rails.logger.info "Bot #{@bot.id} subiu com sucesso."
      return true
    else
      Rails.logger.info "Erro ao subir, #{stderr}"
      return false
    end
  end
end