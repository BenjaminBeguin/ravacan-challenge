class ComponentToComponent < ApplicationRecord
  belongs_to :component
  belongs_to :subcomponent, class_name: "Component"
end
