class Entry < ApplicationRecord
  has_many :comments, dependent: :destroy
  validates_inclusion_of :fiction, in: [true, false], :message => "or Creative Nonfiction can't be blank"
  validates :title, :author_name, :author_bio, :content, :image, presence: true
  scope :by_id, -> {order("id ASC")}

  def created_at
    attributes['created_at'].strftime("%B %e, %Y")
  end
end
