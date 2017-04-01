class GroupsController < ApplicationController
before_action :get_group, only: [:edit, :update]

  def new
   @group = Group.new
  end

  def create
    @group = Group.new(create_params)
    if @group.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: "グループを作成しました。" }
        format.json { render json: @group }
      end
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
    lists = []
    results = User.where('name LIKE(?)', "%#{ params[:q] }%")

    results.each do |result|
      lists << { name: result.name, id: result.id}  if result.name && result.id
    end

    render json: { lists: lists }
  end

  private

  def create_params
    params.require(:group).permit(:name, { user_ids: [] })
  end

  def get_group
    @group = Group.find(params[:id])
  end

end
