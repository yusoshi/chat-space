class GroupsController < ApplicationController
before_action :get_group, only: [:edit, :update]

  def new
   @group = Group.new
  end

  def create
    @group = Group.new(create_params)
    if @group.save
      redirect_to groups_messages_path id: @group.id
    else
      flash.now[:alert] = "グループが保存できませんでした。"
      render action: :new
    end
  end

  def edit
  end

  def update
    if @group.update(create_params)
      redirect_to groups_messages_path id: @group.id
    else
      flash.now[:alert] = "グループ情報を更新できませんでした。"
      render action: :edit
    end
  end

  def messages
    @groups = Group.includes(:users).where(groups_users: {user_id: current_user.id})
    @group = Group.find(params[:id])
  end

  private

  def create_params
    params.require(:group).permit(:name, { user_ids: [] })
  end

  def get_group
    @group = Group.find(params[:id])
  end
end
