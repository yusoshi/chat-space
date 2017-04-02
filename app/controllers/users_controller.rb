class UsersController < ApplicationController
  def search
  @lists = []
  @results = User.where('name LIKE(?)', "%#{ params[:q] }%")
  render 'user/search', formats: [:json], handler: [:jbuilder]

  # results.each do |result|
  #   lists << { name: result.name, id: result.id}  if result.name && result.id
  # end

  # render json: { lists: lists }


  end
end
