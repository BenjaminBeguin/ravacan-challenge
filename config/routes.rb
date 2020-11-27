Rails.application.routes.draw do
  root to: "home#index"

  #api routes

  get '*path', to: 'home#index'
end
