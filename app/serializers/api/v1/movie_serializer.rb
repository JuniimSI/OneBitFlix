class Api::V1::MovieSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :description, :episode_number, :serie_id
  belongs_to :serie

  attribute :category do |object|
    object.category&.name
  end

  attribute :reviews_count do |object|
    if object.reviews.count <= 5
      object.reviews.count
    end 
    if object.reviews.count > 5
      (object.reviews.count/2) % 5
    end
  end

  attribute :favorite do |object, params|
    if params.present? && params.has_key?(:user)
      params[:user].favorites.where(favoritable: object).exists?
    end
  end

  attribute :thumbnail_url do |object|
    "http://localhost:3000/thumbnails/#{object.thumbnail_key}"
  end

  attribute :thumbnail_cover_url do |object|
    "http://localhost:3000/thumbnails/#{object.thumbnail_cover_key}"
  end

  attribute :featured_thumbnail_url do |object|
    if object[:featured_thumbnail_key].present?
      "http://localhost:3000/thumbnails/#{object.featured_thumbnail_key}"
    end
  end

  attribute :video_url do |object|
    "http://localhost:3000/videos/#{object.video_key}"
  end
end