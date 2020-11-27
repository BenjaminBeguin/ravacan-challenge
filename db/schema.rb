# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_27_194211) do

  create_table "component_to_components", force: :cascade do |t|
    t.integer "component_id", null: false
    t.integer "child_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["child_id"], name: "index_component_to_components_on_child_id"
    t.index ["component_id"], name: "index_component_to_components_on_component_id"
  end

  create_table "components", force: :cascade do |t|
    t.string "name"
    t.boolean "isRoot"
    t.integer "price"
    t.integer "supplier_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "product_to_components", force: :cascade do |t|
    t.integer "product_id", null: false
    t.integer "component_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["component_id"], name: "index_product_to_components_on_component_id"
    t.index ["product_id"], name: "index_product_to_components_on_product_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "component_to_components", "components"
  add_foreign_key "product_to_components", "components"
  add_foreign_key "product_to_components", "products"
end
