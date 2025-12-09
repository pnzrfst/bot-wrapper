class RulesController < Application RulesController
  def create
    #captura o bot atual baseado no user logado
    bot = @current_user.bots.find(params[:bot_id])

    #cria uma instancia de rule usando strong params
    rule = bot.rules.create(rule_params)

    if rule.persisted?
      render json: rule, status: :created
    else
      render json: {errors: rule.errors.full_messages}, status: :unprocessable_entity
    end
  end

  private
  
  def rule_params
    params.require(rule).permit(:content, :frequency)
  end
end