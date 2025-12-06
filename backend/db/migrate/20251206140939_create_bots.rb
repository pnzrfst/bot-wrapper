class CreateBots < ActiveRecord::Migration[8.1]
  def change
    create_table :bots do |t|
      t.string :name
      t.string :api_key
      t.string :api_key_secret
      t.string :bearer_token
      t.string :access_token
      t.string :access_token_token

      t.timestamps
    end
  end
end
