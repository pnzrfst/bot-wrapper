class Bot < ApplicationRecord
  encrypts :access_token, :access_token_secret, :api_key, :api_key_secret, :bearer_token
  
end
