class CreateComponentToComponents < ActiveRecord::Migration[6.0]
  def change
    create_table :component_to_components do |t|
      t.references :component, null: false, foreign_key: true, index: true
      t.references :subcomponent, null: false, index: true
      t.references :product, null: false, index: true

      t.timestamps
    end
  end
end
