# == Schema Information
#
# Table name: google_form_responses
#
#  id               :integer          not null, primary key
#  response_id      :string
#  timestamp        :datetime
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  respondent_email :string
#  respondent_name  :string
#  json_data        :string
#
# Indexes
#
#  index_google_form_responses_on_response_id  (response_id)
#

class GoogleFormResponse < ApplicationRecord
  validates :response_id, :timestamp, presence: true
end
