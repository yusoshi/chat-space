require 'rails_helper'

describe MessagesController, type: :controller do

  let(:user) { create(:user) }
  let(:group) { create(:group) }

  describe 'GET #index' do
    before do
      login_user user
    end

    it "@messagesが最新になるように取得されること" do
      messages = create_list(:message, 5, user_id: user.id, group_id: group.id)
      get :index, params: { group_id: group.id }
      expect(assigns(:messages)).to match(messages)
    end

    it "indexアクションに対応したビューに遷移すること" do
      get :index, params: { group_id: group.id }
      expect(response).to render_template :index
    end
  end

  describe 'POST #create' do
    before do
      login_user user
    end

    context 'メッセージの保存に成功した場合' do

      it "データベースに新しいメッセージが登録されること" do
        expect{
          post :create, params: { message: attributes_for(:message, { body: 'hello' }), group_id: group.id }
          }.to change(Message, :count).by(1)
      end

      it 'messagesコントローラーのindexアクションにリダイレクトすること' do
        post :create, params: { message: attributes_for(:message, { body: 'hello' }), group_id: group.id }
        expect(response).to redirect_to group_messages_path(group)
      end
    end

    context 'メッセージの保存に失敗した場合' do
      it 'indexアクションにリダイレクトすること' do
        post :create, params: { message: attributes_for(:message, { body: 'hello' }), group_id: group.id }
        expect(response).to redirect_to group_messages_path(group)
      end
    end
  end
end
