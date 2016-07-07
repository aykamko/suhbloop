class Reviewers::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    reviewer = Reviewer.find_by_email(params[:reviewer][:email])
    return invalid_login if reviewer.nil?
    return not_confirmed unless reviewer.confirmed?
    if reviewer.valid_password?(params[:reviewer][:password])
      sign_in reviewer
      render json: reviewer,
             serializer: ReviewerBaseSerializer,
             status: :created
    else
      invalid_login
    end
  end

  private

  def invalid_login
    error_response(message: 'Incorrect email or password.', status: 401)
  end

  def not_confirmed
    error_response(message: 'Please check your email for confirmation instructions.', status: 401)
  end
end
