import os
import sqlite3
import json

script_dir = os.path.dirname(os.path.abspath(__file__))

db_path = os.path.join(script_dir, "articles.db")
json_path = os.path.join(script_dir, "articles.json")

if os.path.exists(db_path):
    os.remove(db_path)
    print("Old database has been deleted.")

with open(json_path, "r", encoding="utf-8") as file:
    articles_data = json.load(file)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        article_id TEXT NOT NULL,
        lang TEXT NOT NULL,
        title TEXT NOT NULL,
        desc TEXT NOT NULL,
        short_desc TEXT NOT NULL,
        image_url TEXT,
        UNIQUE (article_id, lang)
    )
""")

for article_id, article_info in articles_data.items():
    translations = article_info.get("translations", {})
    image_url = article_info.get("image_url", None)

    for lang, content in translations.items():
        title = content.get("title", None)
        desc = content.get("desc", None)
        short_desc = content.get("short_desc", None)

        if title and desc and short_desc:
            cursor.execute("""
                INSERT OR IGNORE INTO articles (article_id, lang, title, desc, short_desc, image_url) 
                VALUES (?, ?, ?, ?, ?, ?)
            """, (article_id, lang, title, desc, short_desc, image_url))

conn.commit()
print(f"Article data successfully imported into SQLite: {db_path}")

def edit_article(article_id, lang, new_title=None, new_desc=None, new_short_desc=None, new_image_url=None):
    updates = []
    params = []

    if new_title:
        updates.append("title = ?")
        params.append(new_title)
    if new_desc:
        updates.append("desc = ?")
        params.append(new_desc)
    if new_short_desc:
        updates.append("short_desc = ?")
        params.append(new_short_desc)
    if new_image_url:
        updates.append("image_url = ?")
        params.append(new_image_url)

    if updates:
        params.append(article_id)
        params.append(lang)
        cursor.execute(f"UPDATE articles SET {', '.join(updates)} WHERE article_id = ? AND lang = ?", params)
        conn.commit()
        print(f"Article {article_id} ({lang}) has been updated.")
    else:
        print("No update content provided.")

conn.close()
