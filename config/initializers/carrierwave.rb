case Rails.env
when 'production'
  CarrierWave.configure do |config|
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: 'ap-northeast-1'
    }
  config.fog_directory = 'chat-space-bucket-for-prod'
  config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/chat-space-bucket-for-prod'
  end

when 'development'
  CarrierWave.configure do |config|
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: 'ap-northeast-1'
    }
    config.fog_directory = 'chat-space-bucket-for-dev'
    config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/chat-space-bucket-for-dev'
  end

when 'test'
  CarrierWave.configure do |config|
    config.storage = :file
  end
end
