import os
import sqlite3
import json

script_dir = os.path.dirname(os.path.abspath(__file__))

db_path = os.path.join(script_dir, "navbar.db")
json_path = os.path.join(script_dir, "navbar.json")

if os.path.exists(db_path):
    os.remove(db_path)
    print("Old database deleted, creating new one...")

with open(json_path, "r", encoding="utf-8") as file:
    navbar_data = json.load(file)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE navbar (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lang TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        about TEXT NOT NULL,
        about_desc TEXT NOT NULL
    )
""")

for lang, content in navbar_data.items():
    title = content.get("navbar_title", "")
    about = content.get("navbar_about", "")
    about_desc = content.get("navbar_about_desc", "")

    cursor.execute("""
        INSERT INTO navbar (lang, title, about, about_desc)
        VALUES (?, ?, ?, ?)
    """, (lang, title, about, about_desc))

conn.commit()
print(f"Navbar data successfully imported into SQLite: {db_path}")

conn.close()
