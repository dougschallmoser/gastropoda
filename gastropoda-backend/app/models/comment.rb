class Comment < ApplicationRecord
  belongs_to :entry
  validates :email, presence: true

  def created_at
    attributes['created_at'].strftime("%B %e, %Y @%l:%S %p")
  end
end
