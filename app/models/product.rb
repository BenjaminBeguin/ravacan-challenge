class Product < ApplicationRecord
  has_one :product_to_component, dependent: :destroy
  has_one :root_component, -> { where(components: { isRoot: true } ) },
    through: :product_to_component, source: :component
  #TODO: Delete root_component on product delete.
end
