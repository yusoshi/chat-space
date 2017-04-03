class UsersController < ApplicationController
  def search
  @lists = []
  @results = User.where('name LIKE(?)', "%#{ params[:q] }%")
  render 'user/search', formats: [:json], handler: [:jbuilder]

  end
end
