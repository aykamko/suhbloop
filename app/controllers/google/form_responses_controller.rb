module Google
  class FormResponsesController < ApplicationController
    # TODO(aleks, 07/03/16): validate Google's identity before creating form response
    protect_from_forgery except: :create

    def index
      @responses = GoogleFormResponse.all.order(created_at: :desc)
      render json: @responses
    end

    def create
      GoogleFormResponse.create(create_params)
    end

    private

    def create_params
      params.permit(:response_id, :timestamp, :respondent_email, :respondent_name)
    end
  end
end
