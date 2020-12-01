class Supplier < ApplicationRecord
  has_many :components

  validates :name, presence: true, uniqueness: true
end
