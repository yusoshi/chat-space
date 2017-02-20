class Group < ApplicationRecord
  has_many :groups_users
  has_many :users, through: :groups_users
  accepts_nested_attributes_for :users
end
