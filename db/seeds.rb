require 'securerandom'
require 'faker'

(1..10).each do |i|
  GoogleFormResponse.create(
    response_id: SecureRandom.hex,
    timestamp: (Date.today - i),
    respondent_email: Faker::Internet.email,
    respondent_name: Faker::Name.name
  )
end
