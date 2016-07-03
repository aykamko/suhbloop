class SuhbloopController < ApplicationController
  def index
    @props = {
      appConfig: {
        googleFormUrl: Rails.application.config.google_form_url
      }
    }
  end
end
