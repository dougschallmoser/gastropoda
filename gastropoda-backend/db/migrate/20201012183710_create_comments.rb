class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :name
      t.string :email
      t.string :content
      t.integer :entry_id

      t.timestamps
    end
  end
end
