require 'test_helper'

class GoogleFormsResponsesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @response_id = '2_ABaOnucoJPTvrWxRXhphlFX0j6375RSved71fWs6wJpJwferpXBZSLjRW5WVWQ'
    @timestamp = '2016-07-03T20:31:06.448Z'
    @email = 'foo@bar.baz'
    @name = 'Farty McFarterson'
    @create_params = {
      response_id: @response_id,
      timestamp: @timestamp,
      respondent_email: @email,
      respondent_name: @name
    }
  end

  test 'should create GoogleFormResponse on post' do
    post google_form_responses_url, params: @create_params
    assert_response :success

    gfr = GoogleFormResponse.order(created_at: :desc).first
    assert_equal(@response_id, gfr.response_id)
    assert_equal(@timestamp.to_time(:utc), gfr.timestamp)
    assert_equal(@email, gfr.respondent_email)
    assert_equal(@name, gfr.respondent_name)
  end

  test 'should return GoogleFormResponse on get' do
    post google_form_responses_url, params: @create_params
    assert_response :success

    get google_form_response_url(@response_id)
    assert_response :success

    gfr = ActiveSupport::JSON.decode(@response.body).symbolize_keys
    assert_equal(@response_id, gfr[:response_id])
    assert_equal(@timestamp.to_time(:utc), gfr[:timestamp])
    assert_equal(@email, gfr[:respondent_email])
    assert_equal(@name, gfr[:respondent_name])
  end
end
