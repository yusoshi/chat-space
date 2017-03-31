class GroupsController < ApplicationController
before_action :get_group, only: [:edit, :update]

  def new
   @group = Group.new
  end

  def create
    @group = Group.new(create_params)
    if @group.save
        redirect_to group_messages_path(@group), notice: "グループを作成しました。"
    else
      flash.now[:alert] = "グループが保存できませんでした。"
      render action: :new
    end
  end

  def edit
  end

  def update
    if @group.update(create_params)
      redirect_to group_messages_path(@group), notice: "グループを更新しました。"
    else
      flash.now[:alert] = "グループ情報を更新できませんでした。"
      render action: :edit
    end
  end

  def search
    raise unless params[:q]
    lists = []
    results = User.where('name LIKE(?)', "%#{ params[:q] }%")

    results.each do |result|
      lists << result.name if result.name
    end

    render json: { lists: lists }

    rescue
      render json: { result: "error_search"}, status: 400
  end

  private

  def create_params
    params.require(:group).permit(:name, { user_ids: [] })
  end

  def get_group
    @group = Group.find(params[:id])
  end

end
