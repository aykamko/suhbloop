# == Schema Information
#
# Table name: reviewers
#
#  id                     :integer          not null, primary key
#  provider               :string           default("email"), not null
#  uid                    :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  name                   :string
#  nickname               :string
#  image                  :string
#  email                  :string
#  tokens                 :json
#  created_at             :datetime
#  updated_at             :datetime
#
# Indexes
#
#  index_reviewers_on_email                 (email)
#  index_reviewers_on_reset_password_token  (reset_password_token) UNIQUE
#  index_reviewers_on_uid_and_provider      (uid,provider) UNIQUE
#

class Reviewer < ActiveRecord::Base
  # Include default devise modules.
  devise :recoverable, :rememberable, :trackable, :omniauthable
  include DeviseTokenAuth::Concerns::User
end
