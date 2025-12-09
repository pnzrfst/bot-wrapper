class TwitterPostService 
  def self.call(Bot, Rule)
    credentials = bot.credentials 

    client = X::Client.new do |config|
      begin
        config.api_key = bot.api_key
        config.api_key_secret = bot.api_key_secret
        config.bearer_token = bot.bearer_token
        config.access_token = bot.access_token
        config.access_token_secret = bot.access_token_secret

        post = client.post("tweets", {"text": => rule.content}.to_json)
      rescue StandardError => e 
        BotLog.create!(bot_id: bot.id, status: :failure, message:  "erro na API: #{e.message}")
      end
  end

end