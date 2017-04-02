class UsersController < ApplicationController
  def search
  lists = []
  results = User.where('name LIKE(?)', "%#{ params[:q] }%")

  results.each do |result|
    lists << { name: result.name, id: result.id}  if result.name && result.id
  end

  render json: { lists: lists }
  end
end
