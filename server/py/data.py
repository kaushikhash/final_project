from flask import Flask, Response
app = Flask(__name__)


def gen_frames():
    pass


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(debug=True)
