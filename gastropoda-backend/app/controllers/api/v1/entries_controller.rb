class Api::V1::EntriesController < ApplicationController
  before_action :set_entry, only: [:show, :destroy]
  def index
    entries = Entry.all 
    render json: entries, status: 200
  end

  def show
    render json: entry, status: 200
  end

  def create
    entry = Entry.new(entry_params)
    if entry.save 
      render json: entry, status: 200
    end
  end

  def destroy
    entry.destroy
  end

  private

  def entry_params
    params.require(:entry).permit(:title, :content, :author_name, :author_bio, :likes, :comments, :image)
  end

  def set_entry
    entry = Entry.find_by(id: params[:id])
  end
end
