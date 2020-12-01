class CreateProductToComponents < ActiveRecord::Migration[6.0]
  def change
    create_table :product_to_components do |t|
      t.references :product, null: false, foreign_key: true, index: true
      t.references :component, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
