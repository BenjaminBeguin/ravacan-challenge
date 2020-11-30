class Api::ComponentsController < ApplicationController
  # before_action :set_component, only: [:show, :update, :destroy]

  def index
    @components = Component.non_roots.includes(:supplier)
    render json: @components, include: ['supplier']
  end

  private
  # def component_params
  #   params.require(:component).permit(:name)
  # end

  # def set_component
  #   @component = Component.find(params[:id])
  # end
end