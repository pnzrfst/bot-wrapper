Rails.application.routes.draw do
 resources :users
 resources :bots

 post "login", to: "authentication#login"
end
