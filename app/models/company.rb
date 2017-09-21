# == Schema Information
#
# Table name: companies
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  image_url  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Company < ApplicationRecord
  validates :name, presence: true
  before_validation :lower_case_company

  has_many :employees,
    primary_key: :id,
    foreign_key: :company_id,
    class_name: :User

  def self.find_by_company(name)
    company = Company.find_by(name: name.downcase)
  end

  private

  def lower_case_company
    self.name = self.name.downcase
  end
end
