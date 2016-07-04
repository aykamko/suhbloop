require 'securerandom'
require 'faker'

(1..10).each do |i|
  GoogleFormResponse.create(
    response_id: SecureRandom.hex,
    timestamp: (Date.today - i),
    respondent_email: Faker::Internet.email,
    respondent_name: Faker::Name.name,
    json_data: ActiveSupport::JSON.encode((1..5).map { Faker::Hipster.words(2) })
  )
end
