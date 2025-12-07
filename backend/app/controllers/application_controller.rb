require 'jwt'


class ApplicationController < ActionController::API
  before_action :authenticate

  rescue_from JWT::VerificationError, with: :invalid_token
  rescue_from JWT::DecodeError, with: :decode_error

  private

  def authenticate
    authorization_header = request.headers['Authorization']

    if authorization_header && authorization_header.start_with?('Bearer ')
      token = authorization_header.split(' ').last 
    end

    decoded_token = JsonWebToken.decode(token)

    @current_user = User.find(decoded_token[:user_id])
  end

  def invalid_token
    render json: {invalid_token: "Token invalido."}
  end 

  def decode_error
    render json: {decode_error: "Error ao decodificar o token."}
  end

end
