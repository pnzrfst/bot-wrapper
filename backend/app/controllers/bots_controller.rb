class BotsController < ApplicationController
  before_action :set_bot, only: %i[ show update destroy ]

  # GET /bots
  def index
    @bots = Bot.all

    render json: @bots
  end

  # GET /bots/1
  def show
    render json: @bot
  end

  # POST /bots
  def create
    @bot = Bot.new(bot_params)

    if @bot.save
      render json: @bot, status: :created, location: @bot
    else
      render json: @bot.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /bots/1
  def update
    if @bot.update(bot_params)
      render json: @bot
    else
      render json: @bot.errors, status: :unprocessable_content
    end
  end

  # DELETE /bots/1
  def destroy
    @bot.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bot
      @bot = Bot.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def bot_params
      params.expect(bot: [ :name, :api_key, :api_key_secret, :bearer_token, :access_token, :access_token_secret ])
    end
end
