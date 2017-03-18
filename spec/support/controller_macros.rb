module ControllerMacros
  def login_admin(admin)
    @request.env["devise.mapping"] = Devise.mappings[:admin]
    sign_in admin
  end

  def login_user(user)
    allow(controller).to receive(:current_user).and_return(user)
    @request.env["devise.mapping"] = Devise.mappings[:user]
    sign_in user
  end
end
