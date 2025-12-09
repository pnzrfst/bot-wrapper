class CreateBotLogs < ActiveRecord::Migration[8.1]
  def change
    create_table :bot_logs do |t|
      t.timestamps
    end
  end
end
