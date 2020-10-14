class EntrySerializer < ActiveModel::Serializer 
  attributes :id, :title, :author_name, :author_bio, :content, :likes, :image, :created_at
  has_many :comments
end