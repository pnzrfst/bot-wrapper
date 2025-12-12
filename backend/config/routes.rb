Rails.application.routes.draw do
 resources :users

 resources :bots do
  post "activate", on: :member
 end

 post "login", to: "authentication#login"
end
