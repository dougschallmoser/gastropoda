class Entry < ApplicationRecord
  has_many :comments

  def created_at
    attributes['created_at'].strftime("%A, %b %d")
  end
end
