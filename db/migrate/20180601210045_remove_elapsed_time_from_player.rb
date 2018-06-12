class RemoveElapsedTimeFromPlayer < ActiveRecord::Migration[5.1]
  def change
    remove_column :players, :elapsed_time, :string
  end
end
