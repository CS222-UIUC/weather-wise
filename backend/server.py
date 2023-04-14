from flask import Flask

app = Flask(__name__)

#Membes API route
@app.route("/members")
def members():
    return {"members": "member1"}

if __name__ == "__main__":
    app.run(debug = True)