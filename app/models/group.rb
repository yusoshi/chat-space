class Group < ApplicationRecord
  has_many :groups_users
  has_many :users, through: :groups_users
  has_many :messages

  validates :name, uniqueness: true, presence: true

  def latest_message
    if self.messages.order('created_at DESC').first
      latest_message = self.messages.order('created_at DESC').first.body
    else
      latest_message = "まだメッセージはありません。"
    end
    return latest_message
  end
end
