Rails.application.routes.draw do
  match '*all', to: 'application#preflight', via: [:options]

  namespace :google do
    resources :form_responses, only: [:show, :index, :create]
  end

  devise_for :reviewers, only: []
  devise_scope :reviewer do
    post '/reviewers/login', to: 'reviewers/sessions#create'
    delete '/reviewers/logout', to: 'reviewers/sessions#destroy'

    # post '/reviewers/confirmations', to: 'reviewers/confirmations#create'
    #
    # post '/reviewers/password', to: 'reviewers/passwords#create'
    # patch '/reviewers/password/:id', to: 'reviewers/passwords#update'
    # post '/reviewers/passwords/request_reset', to: 'reviewers/passwords#request_reset'
    # post '/reviewers/passwords/reset', to: 'reviewers/passwords#reset'
  end

  # must be last for React Router to catch all "undefined" paths
  match '*all', to: 'application#index', via: [:get]
end
