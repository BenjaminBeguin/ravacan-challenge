class Component < ApplicationRecord
  has_many :parent_components, foreign_key: :subcomponent_id, class_name: "ComponentToComponent",
    dependent: :destroy

  has_many :parents, through: :parent_components, source: :component
  
  #--------Reverse rel/ship----------
  
  has_many :child_components, foreign_key: :component_id, class_name: "ComponentToComponent", 
    dependent: :destroy
  
  has_many :subcomponents, through: :child_components, source: :subcomponent

  #####################

  has_one :product_to_component
  has_one :product, through: :product_to_component

  scope :non_roots, -> { where(isRoot: false) }
end
