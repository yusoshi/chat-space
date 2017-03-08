class MessagesController < ApplicationController
  before_action :get_group, only: [:index, :create]

  def index
    @groups = current_user.groups.includes(:users)
    @message = Message.new
    @messages = Message.where(group_id: params[:group_id]).order('created_at ASC').includes(:user)
    @users = @group.users
  end

  def create
    @message = Message.new(create_params)
    if @message.save
      redirect_to group_messages_path(@group)
    else
      flash.now[:alert] = "メッセージが送信できませんでした。"
      render action: :index
    end
  end

  private

  def create_params
    params.require(:message).permit(:body).merge(group_id: params[:group_id], user_id: current_user.id)
  end
  def get_group
    @group = Group.find(params[:group_id])
  end

end
