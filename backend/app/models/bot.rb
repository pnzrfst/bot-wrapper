class Bot < ApplicationRecord
  encrypts :api_key, :api_secret, :access_token, :access_token_secret, :bearer_token

  has_many :bots_logs
end
