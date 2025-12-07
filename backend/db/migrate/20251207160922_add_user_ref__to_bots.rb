class AddUserRefToBots < ActiveRecord::Migration[8.1]
  def change
    add_reference :bots, :user, null: false, foreign_key: true
  end
end
