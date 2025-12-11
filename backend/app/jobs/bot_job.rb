class BotDeployJob < ApplicationJob
  queue_as :default

  def perform(bot_id)
    SpawnBot.new(bot_id).call
end