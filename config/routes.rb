Rails.application.routes.draw do
  root to: "home#index"

  namespace :api do
    resources :components, only: [:index, :show, :create, :destroy, :update]

    resources :products, only: [:index, :show, :create, :destroy, :update] do
      scope module: 'products' do
        get 'tree', to: 'trees#tree'
        resources :trees, only: [:create, :destroy]
      end
    end
  end

  get '*path', to: 'home#index'
end
