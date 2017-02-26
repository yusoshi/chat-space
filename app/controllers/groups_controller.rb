class GroupsController < ApplicationController
  def new
    @group = Group.new
  end

  def create
    if Group.create(create_params)
      redirect_to controller: :chat_groups, action: :messages
    else
      render :action => "new", alert: 'グループの保存に失敗しました。'
    end
  end

  def edit
  end

  private

  def create_params
    params.require(:group).permit(:name, {:user_ids => []})
  end
end
