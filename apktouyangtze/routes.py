from apktouyangtze import app
from flask import jsonify, request, Response, send_from_directory
import os
import sqlite3
import json
import datetime

script_dir = os.path.dirname(os.path.abspath(__file__))

@app.route("/")
def serve_react():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def serve_static_files(path):
    try:
        return send_from_directory(app.static_folder, path)
    except:
        return send_from_directory(app.static_folder, "index.html")

@app.route("/api/generic")
def get_generic():
    lang = request.args.get("lang", "en")
    
    db_path = os.path.join(script_dir, "generic.db")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT data FROM generic WHERE lang = ?", (lang,))
    row = cursor.fetchone()
    conn.close()
    
    generic_data = json.loads(row[0])
    return jsonify(generic_data)
    
@app.route("/api/articles", methods=["GET"])
def get_articles():
    page = int(request.args.get("page", 1))
    lang = request.args.get("lang", "en")
    page_size = 9
    offset = (page - 1) * page_size

    db_path = os.path.join(script_dir, "articles.db")
    conn = sqlite3.connect(db_path)
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
    result = cursor.fetchone()
    total_articles = result[0]
    has_next_page = total_articles > page * page_size

    conn.close()

    articles = [
        {"article_id": row[0], "title": row[1], "short_desc": row[2], "image_url": row[3]} for row in rows
    ]

    return jsonify({"articles": articles, "hasNextPage": has_next_page, "page": page})

@app.route("/api/articles/<article_id>", methods=["GET"])
def get_article(article_id):
    lang = request.args.get("lang", "en")

    db_path = os.path.join(script_dir, "articles.db")
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM articles WHERE article_id = ? AND lang = ?", (article_id, lang))
    result = cursor.fetchone()
    conn.close()
    
    article = {key: result[key] for key in result.keys()}
    return jsonify(article)

proposed_changes = "proposed_changes.json"

def load_proposed_changes():
    try:
        with open(proposed_changes, "r", encoding="utf-8") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []
    
def save_proposed_changes(changes):
    with open(proposed_changes, "w", encoding="utf-8") as file:
        json.dump(changes, file, ensure_ascii=False, indent=4)

@app.route('/api/propose-changes', methods=['POST'])
def propose_changes():
    try:
        data = request.get_json()
        if not data or "id" not in data or "content" not in data:
            return jsonify({"error": "Oops"}), 400
        
        proposed_changes = load_proposed_changes()

        proposed_changes.append({
            "id": data["id"],
            "content": data["content"]
        })
        
        save_proposed_changes(proposed_changes)

        return jsonify({"message": "Success"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/sitemap.xml")
def sitemap():
    host = "https://apktouyangtze.schuletoushu.com"
    lastmod = datetime.datetime.now().strftime("%Y-%m-%d")

    db_path = os.path.join(script_dir, "articles.db")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute("SELECT article_id FROM articles")
    articles = cursor.fetchall()
    conn.close()

    xml = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    xml.append(f"""
        <url>
            <loc>{host}/</loc>
            <lastmod>{lastmod}</lastmod>
            <changefreq>daily</changefreq>
            <priority>1.0</priority>
        </url>
    """)

    for article in articles:
        article_id = article[0]
        xml.append(f"""
            <url>
                <loc>{host}/article/{article_id}</loc>
                <lastmod>{lastmod}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>
        """)

    xml.append("</urlset>")
    
    response = Response("\n".join(xml), mimetype="application/xml")
    return response
