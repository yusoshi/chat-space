Rails.application.routes.draw do
  devise_for :users
  devise_scope :user do
    authenticated :user do 
      root 'groups#index'
    end
    unauthenticated :user do
      root 'devise/sessions#new'
    end
  end

  get 'users/search' => 'users#search'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :groups, except: [:show, :delete] do
    resources :messages, only: [:index, :create]
  end
end
