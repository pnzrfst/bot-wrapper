class CreateRunTable < ActiveRecord::Migration[8.1]
  def change
    create_table :run_tables do |t|
      t.timestamps
    end
  end
end
