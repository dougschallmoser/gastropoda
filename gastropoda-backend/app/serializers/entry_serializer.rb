class EntrySerializer < ActiveModel::Serializer 
  attributes :title, :content
  has_many :comments
end