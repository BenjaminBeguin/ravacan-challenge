class Api::Products::TreesController < ApplicationController

  def tree
    @product = Product.find(params[:product_id])
    render json: @product.get_tree
  end

  def create
    p = params["tree"]
    
    p["subcomponent_ids"].each do |id|
      edge = ComponentToComponent.new(component_id: p["component_id"], 
        subcomponent_id: id, product_id: p["product_id"])
      if edge.save
      else
        render json: edge.errors, status: :unprocessable_entity
      end
    end
    
    render json: "created".to_json, status: :created
  end

  def destroy
    edge = ComponentToComponent.find_by(component_id: params[:parent_id], 
      subcomponent_id: params[:id], product_id: params[:product_id]) 

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

end