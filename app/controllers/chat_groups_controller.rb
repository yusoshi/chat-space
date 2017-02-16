class ChatGroupsController < ApplicationController
  def messages
    @user = current_user
  end
end
