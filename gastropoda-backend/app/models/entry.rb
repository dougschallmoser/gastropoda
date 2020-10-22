class Entry < ApplicationRecord
  has_many :comments
  validates_inclusion_of :fiction, in: [true, false], :message => "or Creative Non-Fiction can't be blank"
  validates :title, :author_name, :author_bio, :content, :image, presence: true
  scope :by_id, -> {order("id ASC")}

  def created_at
    attributes['created_at'].strftime("%B %e, %Y")
  end
end
