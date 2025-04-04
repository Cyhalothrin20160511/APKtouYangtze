from apktouyangtze import app
from fastapi import Query, HTTPException
from fastapi.responses import JSONResponse, Response, FileResponse
import os
import sqlite3
import json
import datetime

script_dir = os.path.dirname(os.path.abspath(__file__))
static_dir = os.path.join(script_dir, "static")

@app.get("/api/generic")
async def get_generic(lang: str = Query("en")):
    db_path = os.path.join(script_dir, "generic.db")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("SELECT data FROM generic WHERE lang = ?", (lang,))
    row = cursor.fetchone()
    conn.close()
    
    if not row:
        raise HTTPException(status_code=404, detail="Data not found")

    return json.loads(row[0])
    
@app.get("/api/articles")
async def get_articles(page: int = Query(1), lang: str = Query("en")):
    page_size = 9
    offset = (page - 1) * page_size

    db_path = os.path.join(script_dir, "articles.db")
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute(
        "SELECT article_id, title, short_desc, image_url FROM articles WHERE lang = ? LIMIT ? OFFSET ?",
        (lang, page_size, offset),
    )
    rows = cursor.fetchall()

    cursor.execute(
        "SELECT COUNT(*) FROM articles WHERE lang = ?",
        (lang,)
    )
    total_articles = cursor.fetchone()[0]

    conn.close()

    articles = [
        {"article_id": row[0], "title": row[1], "short_desc": row[2], "image_url": row[3]}
        for row in rows
    ]

    return {"articles": articles, "hasNextPage": total_articles > page * page_size, "page": page}

@app.get("/api/articles/{article_id}")
async def get_article(article_id: str, lang: str = Query("en")):
    db_path = os.path.join(script_dir, "articles.db")
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM articles WHERE article_id = ? AND lang = ?", (article_id, lang))
    result = cursor.fetchone()
    conn.close()

    if not result:
        raise HTTPException(status_code=404, detail="Article not found")

    return {key: result[key] for key in result.keys()}
    
@app.get("/api/songjiang")
async def get_songjiang(lang: str = Query("en")):
    db_path = os.path.join(script_dir, "songjiang.db")
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute(
        "SELECT article_id, title, short_desc, image_url FROM articles WHERE lang = ?",
        (lang,)
    )
    rows = cursor.fetchall()

    conn.close()

    articles = [
        {"article_id": row[0], "title": row[1], "short_desc": row[2], "image_url": row[3]}
        for row in rows
    ]

    return {"articles": articles}

@app.get("/api/songjiang/{article_id}")
async def get_songjiang(article_id: str, lang: str = Query("en")):
    db_path = os.path.join(script_dir, "songjiang.db")
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM articles WHERE article_id = ? AND lang = ?", (article_id, lang))
    result = cursor.fetchone()
    conn.close()

    if not result:
        raise HTTPException(status_code=404, detail="Article not found")

    return {key: result[key] for key in result.keys()}

proposed_changes_file = os.path.join(script_dir, "proposed_changes.json")

def load_proposed_changes():
    try:
        with open(proposed_changes_file, "r", encoding="utf-8") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []
    
def save_proposed_changes(changes):
    with open(proposed_changes_file, "w", encoding="utf-8") as file:
        json.dump(changes, file, ensure_ascii=False, indent=4)

@app.post('/api/propose-changes')
async def propose_changes(data: dict):
    if "id" not in data or "content" not in data:
        raise HTTPException(status_code=400, detail="Invalid data")

    proposed_changes = load_proposed_changes()
    proposed_changes.append({"id": data["id"], "content": data["content"]})

    save_proposed_changes(proposed_changes)
    return JSONResponse(content={"message": "Success"}, status_code=201)

proposed_articles_file = os.path.join(script_dir, "proposed_articles.json")

def load_proposed_articles():
    try:
        with open(proposed_articles_file, "r", encoding="utf-8") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []
    
def save_proposed_articles(articles):
    with open(proposed_articles_file, "w", encoding="utf-8") as file:
        json.dump(articles, file, ensure_ascii=False, indent=4)

@app.post('/api/propose-articles')
async def propose_articles(data: dict):
    if "title" not in data or "desc" not in data or "language" not in data:
        raise HTTPException(status_code=400, detail="Invalid data")

    proposed_articles = load_proposed_articles()
    proposed_articles.append({
        "title": data["title"],
        "desc": data["desc"],
        "language": data["language"],
        "shortDesc": data.get("shortDesc", ""),
        "sourceUrl": data.get("sourceUrl", ""),
        "imageUrl": data.get("imageUrl", ""),
    })

    save_proposed_articles(proposed_articles)
    return JSONResponse(content={"message": "Success"}, status_code=201)

@app.get("/{full_path:path}")
async def serve_react(full_path: str):
    return FileResponse(os.path.join(static_dir, "index.html"))
