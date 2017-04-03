Rails.application.routes.draw do
  devise_for :users 
  get 'users/search' => 'users#search'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :groups, except: [:show, :delete] do
    resources :messages, only: [:index, :create]
  end
end
