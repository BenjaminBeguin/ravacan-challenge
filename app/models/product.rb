class Product < ApplicationRecord
  has_one :product_to_component, dependent: :destroy
  has_one :root_component, -> { where(components: { isRoot: true } ) },
    through: :product_to_component, source: :component
  #TODO: Delete root_component on product delete.

  after_create :create_root_component

  include Tree

  def get_tree
    product_root = self.root_component #if doesn't exist, redirect to 404.
    build_tree(product_root.id)
  end

  private
  def create_root_component
    self.root_component = Component.create(name: self.name, isRoot: true)
  end
end
