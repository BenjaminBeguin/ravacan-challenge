class CreateComponents < ActiveRecord::Migration[6.0]
  def change
    create_table :components do |t|
      t.string :name
      t.boolean :isRoot
      t.integer :price
      t.integer :supplier_id

      t.timestamps
    end
  end
end
