import face_recognition
import cv2
import numpy as np
from pathlib import Path

from flask import Flask, jsonify, Response, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
name_of = ""


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/get_name', methods=['GET'])
def get_name():
    return jsonify({"Result": name_of})


@app.route('/exit')
def exit():
    if video_capture.isOpened():
        video_capture.release()
        print("Exited")
        return ("Done")


known_encodings_file_path = r"D:\final_project\data\known_encodings_file.csv"
people_file_path = r"D:\final_project\data\people_file.csv"

known_encodings_file = Path(known_encodings_file_path)
if known_encodings_file.is_file():
    known_encodings = np.genfromtxt(known_encodings_file, delimiter=',')
else:
    known_encodings = []

people_file = Path(people_file_path)
if people_file.is_file():
    people = np.genfromtxt(people_file, dtype='U', delimiter=',')
else:
    people = []


def gen_frames():
    global video_capture
    video_capture = cv2.VideoCapture(0)
    face_locations = []
    face_encodings = []
    face_names = []
    process_this_frame = True
    global name_of

    count = 0
    while True:
        # Grab a single frame of video
        ret, frame = video_capture.read()
        if not ret:
            break

        if process_this_frame:
            # Resize frame of video to 1/4 size for faster face recognition processing
            small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

            # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
            rgb_small_frame = small_frame[:, :, ::-1]

            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(
                rgb_small_frame, face_locations)

            face_names = []
            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                matches = face_recognition.compare_faces(
                    known_encodings, face_encoding)
                name = "Unknown"

                # # If a match was found in known_face_encodings, just use the first one.
                # if True in matches:
                #     first_match_index = matches.index(True)
                #     name = known_face_names[first_match_index]

                # Or instead, use the known face with the smallest distance to the new face
                face_distances = face_recognition.face_distance(
                    known_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = people[best_match_index]

                face_names.append(name)
                # print(face_names)
        process_this_frame = not process_this_frame

        # Display the results

        for (top, right, bottom, left), name in zip(face_locations, face_names):
            # Scale back up face locations since the frame we detected in was scaled to 1/4 size
            # yield (name)
            if count == 0:
                name_of = name
                count += 1
            if name != "Unknown":
                top *= 4
                right *= 4
                bottom *= 4
                left *= 4

                # Draw a box around the face
                cv2.rectangle(frame, (left, top),
                              (right, bottom), (0, 255, 0), 1)

                # Draw a label with a name below the face
                cv2.rectangle(frame, (left, bottom - 35),
                              (right, bottom), (0, 255, 0), cv2.FILLED)
                font = cv2.FONT_HERSHEY_DUPLEX
                cv2.putText(frame, name, (left + 6, bottom - 6),
                            font, 1.0, (255, 255, 255), 1)
            else:
                top *= 4
                right *= 4
                bottom *= 4
                left *= 4

                cv2.rectangle(frame, (left, top),
                              (right, bottom), (0, 0, 255), 1)
                cv2.rectangle(frame, (left, bottom - 35),
                              (right, bottom), (0, 0, 255), cv2.FILLED)
                font = cv2.FONT_HERSHEY_DUPLEX
                cv2.putText(frame, name, (left + 6, bottom - 6),
                            font, 1.0, (255, 255, 255), 1)
        _, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    video_capture.release()
# print("Handled and destroyed")


if __name__ == '__main__':
    app.run()
