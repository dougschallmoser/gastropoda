class EntrySerializer < ActiveModel::Serializer 
  attributes :id, :title, :author_name, :author_bio, :fiction, :content, :likes, :image, :created_at
  has_many :comments do 
    object.comments.order(:id)
  end
end