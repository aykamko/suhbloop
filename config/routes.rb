Rails.application.routes.draw do
  match '*all', to: 'application#preflight', via: [:options]

  mount_devise_token_auth_for 'Reviewer', at: 'auth'

  namespace :google do
    resources :form_responses, only: [:show, :index, :create]
  end

  # must be last for React Router to catch all "undefined" paths
  match '*all', to: 'application#index', via: [:get]
end
