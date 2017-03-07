class MessagesController < ApplicationController
    def index
    @groups = current_user.groups.includes(:users)
    @group = Group.find(params[:group_id])
  end

end
