Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'groups/:id/messages' => 'groups#messages', as: 'groups_messages'
  resources :groups, only: [:new, :create, :edit]
end
