class CreateEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :entries do |t|
      t.string :title 
      t.string :content 
      t.string :author_name 
      t.string :author_bio 
      t.integer :likes
      t.timestamps
    end
  end
end