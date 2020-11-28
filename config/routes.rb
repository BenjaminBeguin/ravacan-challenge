Rails.application.routes.draw do
  root to: "home#index"

  namespace :api do
    resources :products, only: [:index, :show, :create, :destroy, :update]
  end

  get '*path', to: 'home#index'
end
