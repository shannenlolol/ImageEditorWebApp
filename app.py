from flask import Flask, request, send_file, render_template, jsonify
from rembg import remove
from PIL import Image
from io import BytesIO

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/remove-bg', methods=['POST'])
def remove_bg():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file:
        input_image = Image.open(BytesIO(file.read()))
        output_image = remove(input_image)
        img_byte_arr = BytesIO()
        output_image.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)
        return send_file(img_byte_arr, mimetype='image/png')

@app.route('/upload-cropped', methods=['POST'])
def upload_cropped():
    if 'croppedImage' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['croppedImage']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file:
        # Here you might save the file or further process it;
        # For now, we'll just send it back as a response.
        return send_file(
            BytesIO(file.read()),
            mimetype='image/png',
            as_attachment=True,
            attachment_filename='cropped.png'
        )

if __name__ == '__main__':
    app.run(debug=True)
