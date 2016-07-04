class AddJsonDataToFromResponses < ActiveRecord::Migration[5.0]
  def change
    add_column :google_form_responses, :json_data, :string
  end
end
