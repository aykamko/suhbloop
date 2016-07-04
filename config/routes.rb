Rails.application.routes.draw do
  root 'application#index'

  namespace :google do
    resources :form_responses, only: [:create]
  end

  # must be last for React Router to catch all "undefined" paths
  match '*all', to: 'application#index', via: [:get]
end
