class AddNameEmailToGoogleFormResponse < ActiveRecord::Migration[5.0]
  def change
    add_column :google_form_responses, :respondent_email, :string
    add_column :google_form_responses, :respondent_name, :string
  end
end
