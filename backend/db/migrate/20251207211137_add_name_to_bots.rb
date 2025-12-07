class AddNameToBots < ActiveRecord::Migration[8.1]
  def change
    add_column :bots, :name, :string
  end
end
