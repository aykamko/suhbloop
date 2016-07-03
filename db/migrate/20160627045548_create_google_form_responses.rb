class CreateGoogleFormResponses < ActiveRecord::Migration[5.0]
  def change
    create_table :google_form_responses do |t|
      t.string :response_id
      t.timestamp :timestamp

      t.timestamps
    end
    add_index :google_form_responses, :response_id
  end
end
