require 'test_helper'

class GoogleFormsResponsesControllerTest < ActionDispatch::IntegrationTest
  test "should create GoogleFormResponse on post" do
    @response_id = '2_ABaOnucoJPTvrWxRXhphlFX0j6375RSved71fWs6wJpJwferpXBZSLjRW5WVWQ'
    @timestamp = '2016-07-03T20:31:06.448Z'
    post google_form_responses_url, params: {
      response_id: @response_id,
      timestamp: @timestamp,
    }
    assert_response :success

    gfr = GoogleFormResponse.order('created_at DESC').first
    assert_equal(@response_id, gfr.response_id)
    assert_equal(@timestamp.to_time(:utc), gfr.timestamp)
  end
end
