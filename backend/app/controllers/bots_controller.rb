class BotsController < ApplicationController
  before_action :authenticate

  def create
    #Achar o meu usuario logado
    #Deixar ele criar o bot
    @bot = @current_user.bots.create(bots_params)
  end

  def index 
    @bots = @current_user.bots.all
    render json: @bots
  end

  def show
    @bot = @current_user.bots.find(params[:id])

    bot_data = @bot.as_json

    bot_data[:user_name] = @current_user.name

    render json: bot_data
  end

  def update
    @bot = @current_user.bots.find(params[:id])
    if @bot.update(title_update_params)
      render json: {name: @bot.name}, status: :ok
    else
      render json: {error: @bot.errors.full_messages}, status: :unprocessable_entity
    end
    
  end


  private 

  def title_update_params
    params.require(:bot).permit(:name)
  end

  def bots_params
    params.require(:bot).permit(:name, :api_key, :api_key_secret, :bearer_token, :access_token, :access_token_secret)
  end
end