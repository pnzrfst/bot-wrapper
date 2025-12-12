# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_12_11_225809) do
  create_table "bot_logs", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bots", force: :cascade do |t|
    t.string "access_token"
    t.string "access_token_secret"
    t.string "api_key"
    t.string "api_key_secret"
    t.string "bearer_token"
    t.datetime "created_at", null: false
    t.string "name"
    t.boolean "status"
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_bots_on_user_id"
  end

  create_table "rules", force: :cascade do |t|
    t.string "bot_id"
    t.string "content"
    t.datetime "created_at", null: false
    t.integer "frequency"
    t.datetime "updated_at", null: false
  end

  create_table "run_tables", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.string "name"
    t.string "password_digest"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "bots", "users"
end
