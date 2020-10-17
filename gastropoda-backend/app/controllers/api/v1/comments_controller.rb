class Api::V1::CommentsController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment, status: 200
    else 
      render json: {messages: comment.errors.full_messages}
    end
  end

  private 

  def comment_params 
    params.require(:comment).permit(:name, :email, :content, :entry_id)
  end
end