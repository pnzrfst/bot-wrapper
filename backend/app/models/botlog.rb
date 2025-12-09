class BotLog < ApplicationRecord
  enum status: {pending: 0, published: 1}
end