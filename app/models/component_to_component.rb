class ComponentToComponent < ApplicationRecord
  belongs_to :component
  belongs_to :child
end
