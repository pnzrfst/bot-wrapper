class AuthenticationController < ApplicationController
  skip_before_action :authenticate

  def login
    user = User.find_by(email: params[:email])
    authenticated_user = user&.authenticate(params[:password])

    if authenticated_user
      token = JsonWebToken.encode(user_id: user.id)
      expires_at = JsonWebToken.decode(token)[:exp]

      render json: {token: token, expires_at: expires_at}, status: :ok
    else
      render json: {error: "Não autorizado."}, status: :unauthorized
    end
  end

end
