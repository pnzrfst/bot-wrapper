class TwitterPostService 
  def self.call(bot, rule)
    client = X::Client.new do |config|
      config.api_key = bot.api_key
      config.api_key_secret = bot.api_key_secret
      config.bearer_token = bot.bearer_token
      config.access_token = bot.access_token
      config.access_token_secret = bot.access_token_secret
    end
    begin
      payload = {text: rule.content}.to_json
      
      post = client.post("tweets", payload)

      BotLog.create!(bot_id: bot.id, status: :success, message: "Tweet enviado. ID: #{post.id}")
      
      return post
    rescue StandardError => e 
        BotLog.create!(bot_id: bot.id, status: :failure, message:  "erro na API: #{e.message}")
    end
  end
end