class EditRules < ActiveRecord::Migration[8.1]
  def change
    add_column :rules, :bot_id, :string
    add_column :rules, :frequency, :integer
    add_column :rules, :conten, :string
    
  end
end
