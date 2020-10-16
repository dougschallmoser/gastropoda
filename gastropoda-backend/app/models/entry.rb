class Entry < ApplicationRecord
  has_many :comments

  def created_at
    attributes['created_at'].strftime("%B %e, %Y")
  end
end
