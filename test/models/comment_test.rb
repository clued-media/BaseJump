# == Schema Information
#
# Table name: comments
#
#  id          :integer          not null, primary key
#  body        :text             not null
#  author_id   :integer          not null
#  parent_type :string           not null
#  parent_id   :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
