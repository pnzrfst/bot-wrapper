class CreateBotLogsTable < ActiveRecord::Migration[8.1]
  def change
    create_table :bot_logs_tables do |t|
      t.string :bot_id
      t.integer :status
      t.string :message
      t.string :executed_at

      t.timestamps
    end
  end
end
