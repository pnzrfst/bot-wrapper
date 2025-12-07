class UsersController < ApplicationController 
  skip_before_action :authenticate
  
  def create
   @user = User.new(user_params)

    if @user.save
      render json: @user.as_json(only: [:name, :email]), status: :created
    else
      render json: {
        message: "Houve um problema ao salvar o usuário",
        errors: @user.errors.to_json,
      }, status: :unprocessable_entity
    end
  end

  def index
    @users = User.all.map do |user|
      user.as_json(only: [:id, :name])
    end

    render json: {users: @users}
  end

  private

  def user_params
    params.require(:user).permit(:name, :email,  :password)
  end

end
