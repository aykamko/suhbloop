Rails.application.routes.draw do
  root 'suhbloop#index'

  namespace :google do
    post '/form_responses', to: 'form_responses#create'
  end
end
