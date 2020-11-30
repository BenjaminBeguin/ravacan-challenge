class Api::Products::TreesController < ApplicationController
  before_action :set_product, only: [:tree, :create]


  def tree
    render json: @product.get_tree
  end

  def create
    p = params["tree"]

    p["subcomponent_ids"].each do |id|
      if !@product.can_add_edge?(p["component_id"], id) or p["component_id"] == id.to_i #cycle check
        render json: "Cannot add this component. Adding it will result in a cycle!".to_json, 
          status: :unprocessable_entity
        return
      end

      edge = ComponentToComponent.new(component_id: p["component_id"], 
        subcomponent_id: id, product_id: p["product_id"])
      
      if edge.save
      else
        render json: edge.errors, status: :unprocessable_entity
        return
      end
    end
    
    render json: "created".to_json, status: :created
  end

  def destroy
    edge = ComponentToComponent.find(params[:id]) 

    if edge.destroy
      render json: "ok".to_json, status: :ok 
    else
      render json: record.errors, status: :unprocessable_entity 
    end
  end

  private
  def tree_params
    params.require(:tree).permit(:component_id, :subcomponent_ids, :product_id)
  end

  def set_product
    @product = Product.find(params[:product_id])
  end

end