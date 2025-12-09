class AddStatusToBot < ActiveRecord::Migration[8.1]
  def change
    add_column :bots, :status, :boolean
  end
end
