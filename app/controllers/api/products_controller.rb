class Api::ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  def index
    @products = Product.all
    render json: @products
  end

  def show
    render json: @product
  end

  private
  def product_params
    params.require(:product).permit(:name)
  end

  def set_product
    @product = Product.find(params[:id])
  end
end