require "test_helper"

class BotsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bot = bots(:one)
  end

  test "should get index" do
    get bots_url, as: :json
    assert_response :success
  end

  test "should create bot" do
    assert_difference("Bot.count") do
      post bots_url, params: { bot: { access_token: @bot.access_token, access_token_token: @bot.access_token_token, api_key: @bot.api_key, api_key_secret: @bot.api_key_secret, bearer_token: @bot.bearer_token, name: @bot.name } }, as: :json
    end

    assert_response :created
  end

  test "should show bot" do
    get bot_url(@bot), as: :json
    assert_response :success
  end

  test "should update bot" do
    patch bot_url(@bot), params: { bot: { access_token: @bot.access_token, access_token_token: @bot.access_token_token, api_key: @bot.api_key, api_key_secret: @bot.api_key_secret, bearer_token: @bot.bearer_token, name: @bot.name } }, as: :json
    assert_response :success
  end

  test "should destroy bot" do
    assert_difference("Bot.count", -1) do
      delete bot_url(@bot), as: :json
    end

    assert_response :no_content
  end
end
