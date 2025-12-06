class RenameAccessTokenTokentoAccessTokenSecret < ActiveRecord::Migration[8.1]
  def change
    rename_column :bots, :access_token_token, :access_token_secret
  end
end
