class Comment < ApplicationRecord
  belongs_to :entry

  def created_at
    attributes['created_at'].strftime("%B %e, %Y @%l:%S %p")
  end
end
