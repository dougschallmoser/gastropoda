class EntrySerializer < ActiveModel::Serializer 
  attributes :id, :title, :author_name, :author_bio, :content, :likes, :image
  has_many :comments
end