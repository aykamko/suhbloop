Rails.application.routes.draw do
  devise_for :reviewers
  match '*all', to: 'application#preflight', via: [:options]

  namespace :google do
    resources :form_responses, only: [:show, :index, :create]
  end

  # must be last for React Router to catch all "undefined" paths
  match '*all', to: 'application#index', via: [:get]
end
