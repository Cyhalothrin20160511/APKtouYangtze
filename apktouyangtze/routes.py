from apktouyangtze import app
from flask import render_template, jsonify, request
from apktouyangtze.localisations import translations
from itertools import islice
import time

articles = {
    "12221": "https://t10.baidu.com/it/u=3045961866,3225824374&fm=173&s=DA28BE475D537FCE5A5657730300D07A&w=640&h=422&img.JPEG",
    "12373": "https://img1.artron.net/auction/2019/art008169/d/art0081692874.jpg",
    "12529": "https://5b0988e595225.cdn.sohucs.com/images/20180623/83cece98cdec4867896beb5dbf1e5b5c.jpeg",
    "13943": "https://imgculture.gmw.cn/attachement/png/site2/20220218/f44d30758a5923794c2c43.png",
    "13977": "https://y1.ifengimg.com/2253a9cab0a78f1f/2013/1031/rdn_5272069885c9a.jpg",
    "14025": "https://imagepphcloud.thepaper.cn/pph/image/317/338/578.jpg",
    "14031": "https://img.mp.itc.cn/upload/20170421/2d08b134c7aa483b9fa825dfac8192d5_th.jpeg",
    "14064": "https://img2.baidu.com/it/u=2507090757,181547341&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
    "14086": "https://img2.baidu.com/it/u=3400810000,1944534423&fm=253&fmt=auto&app=138&f=JPEG?w=591&h=442",
    "14098": "https://5b0988e595225.cdn.sohucs.com/images/20200513/a14984eb9e8841f293fe228bfa32aae3.jpeg",
    "14130": "https://img0.baidu.com/it/u=547653965,2593207619&fm=253&fmt=auto&app=138&f=JPEG?w=625&h=500",
    "14135": "https://img0.baidu.com/it/u=2224930080,734682804&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=425",
    "14772": "https://img2.baidu.com/it/u=2047438460,3147748277&fm=253&fmt=auto&app=138&f=JPEG?w=753&h=500",
    "14806": "https://news.online.sh.cn/news/gb/content/attachement/jpg/site1/20170210/IMG0025116ac73c43670946152.jpg",
    "14836": "https://images.daojia.com/pic/ugc/bc29692fed6ab0196592448b4a64c182.png",
    "14841": "https://image.thepaper.cn/www/image/4/191/330.jpg",
}

@app.context_processor
def cache_buster():
    return dict(cache_buster=int(time.time()))

@app.route('/')
@app.route("/home")
def home_page():
    page = request.args.get('page', 1, type=int)
    start = (page - 1) * 9
    end = start + 9

    paginated_arts = dict(islice(articles.items(), start, end))
    return render_template('home.html', title_id="home-title", articles=paginated_arts, page=page)

@app.route('/get_translation/<lang>')
def get_translation(lang):
    return jsonify(translations.get(lang, translations['en']))

@app.route('/about/<id>')
def about_page(id):
    title_id = "id" + str(id) + "-title"
    name_id = "id" + str(id) + "-name"
    desc_id = "id" + str(id) + "-desc"
    return render_template('article.html', title_id=title_id, name_id=name_id, desc_id=desc_id, img_url=articles[id])
