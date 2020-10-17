class CommentSerializer < ActiveModel::Serializer 
  attributes :id, :name, :email, :content, :entry_id, :created_at
  belongs_to :entry
end