class AddIndexToMessages < ActiveRecord::Migration[5.0]
  def change
    add_index :messages, [:group_id, :user_id]
  end
end
