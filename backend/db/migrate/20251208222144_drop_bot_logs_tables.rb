class DropBotLogsTables < ActiveRecord::Migration[8.1]
  def change
    drop_table :bot_logs_tables
  end
end
