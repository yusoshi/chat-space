require 'rails_helper'

describe MessagesController, type: :controller do

  let(:user) { create(:user) }
  let(:group) { create(:group) }

  describe 'GET #index' do
    before do
      login_user user
    end

    it "populates an array of messages ordered by created_at DESC" do
      messages = create_list(:message, 5, user_id: user.id, group_id: group.id)
      get :index, params: { group_id: group.id }
      expect(assigns(:messages)).to match(messages)
    end

    it "renders the :index template" do
      get :index, params: { group_id: group.id }
      expect(response).to render_template :index
    end
  end

end
