Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do 
      resources :entries
      resources :comments, only: [:create, :destroy]
    end
  end
end
