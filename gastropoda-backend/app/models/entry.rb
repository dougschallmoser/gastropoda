class Entry < ApplicationRecord
  has_many :comments
  validates :title, :author_name, :author_bio, :content, :image, presence: true

  def created_at
    attributes['created_at'].strftime("%B %e, %Y")
  end
end
