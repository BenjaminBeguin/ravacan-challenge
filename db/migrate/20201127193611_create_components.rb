class CreateComponents < ActiveRecord::Migration[6.0]
  def change
    create_table :components do |t|
      t.string :name
      t.boolean :isRoot, default: false
      t.integer :price, default: 0
      t.references :supplier

      t.timestamps
    end
  end
end
