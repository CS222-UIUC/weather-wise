from flask import Flask

app = Flask(__name__)

#, methods=["GET"]
@app.route("/welcome")
def welcome():
    return {"welcome" : "Hello World!"}


if __name__ == "__main__":
    app.run()
    #host="0.0.0.0", port=3001
