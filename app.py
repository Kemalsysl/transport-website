from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import bcrypt

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect("database.db")
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    ''')
    conn.commit()
    conn.close()

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    firstname = data.get("firstname")
    lastname = data.get("lastname")
    email = data.get("email")
    phone = data.get("phone")
    password = data.get("password")
    accept_promotions = data.get("acceptPromotions", False)

    if not all([firstname, lastname, email, phone, password]):
        return jsonify({"error": "Tüm alanlar zorunludur"}), 400

    password_hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    try:
        conn = sqlite3.connect("database.db")
        cur = conn.cursor()
        cur.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstname TEXT,
                lastname TEXT,
                email TEXT UNIQUE,
                phone TEXT,
                password TEXT,
                accept_promotions INTEGER
            )
        ''')
        cur.execute('''
            INSERT INTO users (firstname, lastname, email, phone, password, accept_promotions)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (firstname, lastname, email, phone, password_hashed, int(accept_promotions)))
        conn.commit()
        conn.close()
        return jsonify({"message": "Kayıt başarılı"}), 201

    except sqlite3.IntegrityError:
        return jsonify({"error": "Bu e-posta ile daha önce kayıt olunmuş"}), 409


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "E-posta ve şifre gereklidir"}), 400

    conn = sqlite3.connect("database.db")
    cur = conn.cursor()
    cur.execute("SELECT id, firstname, lastname, email, password FROM users WHERE email = ?", (email,))
    user = cur.fetchone()
    conn.close()

    if user and bcrypt.checkpw(password.encode("utf-8"), user[4]):
        user_info = {
            "id": user[0],
            "firstname": user[1],
            "lastname": user[2],
            "email": user[3]
        }
        return jsonify({"message": "Giriş başarılı", "user": user_info}), 200
    else:
        return jsonify({"error": "Geçersiz e-posta veya şifre"}), 401


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# SAHTE VERİ: Gerçek veri tabanı yerine başlangıçta kullanacağız
fake_tickets = [
    {
        "email": "ali@example.com",
        "from": "İstanbul",
        "to": "Ankara",
        "date": "2025-06-10",
        "time": "10:00",
        "seat": "12A",
        "price": "350 TL"
    },
    {
        "email": "ali@example.com",
        "from": "Ankara",
        "to": "İzmir",
        "date": "2025-06-20",
        "time": "15:30",
        "seat": "7B",
        "price": "280 TL"
    },
    {
        "email": "ayse@example.com",
        "from": "İzmir",
        "to": "Antalya",
        "date": "2025-06-25",
        "time": "09:15",
        "seat": "5C",
        "price": "300 TL"
    }
]

@app.route("/api/my-tickets", methods=["POST"])
def get_user_tickets():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "E-posta gereklidir."}), 400

    user_tickets = [ticket for ticket in fake_tickets if ticket["email"] == email]
    return jsonify({"tickets": user_tickets}), 200

if __name__ == "__main__":
    app.run(debug=True)
