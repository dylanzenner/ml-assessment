from flask import Flask, request
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)


@app.route("/coordinates", methods=["POST"])
def calculate_coordinates():
    data = []
    return_data = []

    dimension = eval(request.form["dimension"])
    corner_points = sorted(eval(request.form["corner_points"]))
    bottom_left, top_left, bottom_right, top_right = (
        corner_points[0],
        corner_points[1],
        corner_points[2],
        corner_points[3],
    )

    x = np.linspace(bottom_left[0], bottom_right[0], dimension[0])
    y = np.linspace(top_left[0], top_right[0], dimension[1])
    distributed_points = np.stack(np.meshgrid(x, y), axis=-1)

    for array in distributed_points:
        print(array)
        for subarray in array:
            return_data.append(subarray.tolist())

    for line in return_data:
        data.append({"x": line[0], "y": line[1]})

    return data


if __name__ == "__main__":
    app.run(host="0.0.0.0")
