class User < ApplicationRecord
  #hasheia com o bcrypt
  has_secure_password
  #valida se um user tem somente um email
  validates_uniqueness_of :email
  #tem mtos bots ->
  has_many :bots
end
