class Api::V1::FeaturedSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :featured_thumbnail_key
  end
  