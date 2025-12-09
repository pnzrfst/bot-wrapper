class AddColumnsToRule < ActiveRecord::Migration[8.1]
  def change
    create_table :rules do |t|
      t.timestamps
    end
  end
end
