class MessagesController < ApplicationController
    def index
    @groups = Group.includes(:users).where(groups_users: {user_id: current_user.id})
    @group = Group.find(params[:group_id])
  end

end
