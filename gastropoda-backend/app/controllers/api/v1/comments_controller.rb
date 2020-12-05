class Api::V1::CommentsController < ApplicationController
  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment, status: 200
    else 
      render json: {message: comment.errors.full_messages}
    end
  end

  def update
    comment = Comment.find_by(id: params[:id])
    if comment.update(comment_params)
      render json: comment, status: 200 
    else 
      render json: {message: comment.errors.full_messages}
    end 
  end

  def destroy
    comment = Comment.find_by(id: params[:id])
    comment.destroy
    if !comment.destroyed?
      render json: {message: 'An error occured while deleting'}
    else 
      render json: {success: 'Sucess'}
    end
  end

  private 

  def comment_params 
    params.require(:comment).permit(:name, :email, :content, :entry_id, :id)
  end
end