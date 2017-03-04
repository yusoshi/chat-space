class GroupsController < ApplicationController
  def new
   @group = Group.new
  end

  def create
    @group = Group.new(create_params)
    if @group.save
      redirect_to groups_messages_path
    else
      flash.now[:alert] = "グループが保存できませんでした。"
      render action: :new
    end
  end

  def edit
  end

  def messages
    @user = current_user
  end

  private

  def create_params
    params.require(:group).permit(:name, { user_ids: [] })
  end
end
