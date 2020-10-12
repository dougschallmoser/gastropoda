class EntrySerializer < ActiveModel::Serializer 
  attributes :content
  has_many :comments
end