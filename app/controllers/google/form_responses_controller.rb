module Google
  class FormResponsesController < ApplicationController
    def index
      @responses = GoogleFormResponse.all.order(created_at: :desc)
      render json: @responses
    end

    def create
      GoogleFormResponse.create(create_params)
    end

    def show
      @response = GoogleFormResponse.where(response_id: params[:id]).first
      render json: @response
    end

    private

    def create_params
      params.permit(:response_id, :timestamp, :respondent_email, :respondent_name)
    end
  end
end
