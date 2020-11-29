class Api::Products::TreesController < ApplicationController
  before_action :set_product, only: [:tree, :create, :destroy]

  def tree
    render json: @product.get_tree
  end

  def create
    edge = ComponentToComponent.new(tree_params)
    if edge.save
      render json: edge, status: :created
    else
      render json: edge.errors, status: :unprocessable_entity
    end
  end

  private
  def tree_params
    params.require(:tree).permit(:component_id, :subcomponent_id)
  end

  def set_product
    @product = Product.find(params[:product_id])
  end
end