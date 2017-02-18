class GroupsController < ApplicationController
  def new
    @group = Group.new
  end

  def create
    Group.create(create_params)
    redirect_to controller: :chat_groups, action: :messages
  end

  def edit
  end

  private

  def create_params
    params.require(:group).permit(:name)
  end
end
