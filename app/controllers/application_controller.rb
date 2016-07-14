class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  before_action :allow_cross_origin_requests, if: proc { Rails.env.development? }

  def preflight
    render nothing: true
  end

  private

  def allow_cross_origin_requests
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
    headers['Access-Control-Allow-Headers'] = \
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, ' \
      'access-token, token-type, client, expiry, uid'
    headers['Access-Control-Expose-Headers'] = headers['Access-Control-Allow-Headers']
    headers['Access-Control-Max-Age'] = '1728000'
  end
end
