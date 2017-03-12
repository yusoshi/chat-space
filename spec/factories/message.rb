FactoryGirl.define do

  factory :message do
    body              "Hello"
    group_id          { Faker::Number.between(1, 1000) }
    user_id           { Faker::Number.between(1, 1000) }
  end

end
