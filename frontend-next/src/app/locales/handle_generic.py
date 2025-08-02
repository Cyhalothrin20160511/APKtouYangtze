import os
import sqlite3
import json

script_dir = os.path.dirname(os.path.abspath(__file__))

db_path = os.path.join(script_dir, "generic.db")
json_path = os.path.join(script_dir, "generic.json")

if os.path.exists(db_path):
    os.remove(db_path)
    print("Old database deleted, creating new one...")

with open(json_path, "r", encoding="utf-8") as file:
    generic_text = json.load(file)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE generic (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lang TEXT NOT NULL UNIQUE,
        data TEXT NOT NULL
    )
""")

for lang, content in generic_text.items():
    data_json = json.dumps(content, ensure_ascii=False)
    cursor.execute("""
        INSERT INTO generic (lang, data) 
        VALUES (?, ?)
    """, (lang, data_json))

conn.commit()
print(f"Generic text successfully imported into SQLite: {db_path}")
conn.close()
