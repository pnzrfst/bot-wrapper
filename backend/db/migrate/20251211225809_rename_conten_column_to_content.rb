class RenameContenColumnToContent < ActiveRecord::Migration[8.1]
  def change
    rename_column :rules, :conten, :content
  end
end
