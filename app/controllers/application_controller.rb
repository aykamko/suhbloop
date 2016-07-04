class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index
    @props = {
      appConfig: {
        googleFormUrl: Rails.application.config.google_form_url
      }
    }

    render file: 'index.html'
  end
end
