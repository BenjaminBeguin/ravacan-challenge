Rails.application.routes.draw do
  root to: "home#index"

  namespace :api do
    resources :products
  end

  get '*path', to: 'home#index'
end
