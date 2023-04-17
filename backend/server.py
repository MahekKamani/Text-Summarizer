from flask import Flask, request, jsonify
from utils import get_currdate_hash
from summary import generate_summary, generate_summary_file
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/file', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file uploaded', 400

    file = request.files['file']
    unique_filename = f'{get_currdate_hash()}_{file.filename}'
    file.save(f'tmp/{unique_filename}')
    summary = generate_summary_file(f'tmp/{unique_filename}')
    return jsonify({'summary': summary}), 200

@app.route('/text', methods=['POST'])
def upload_text():
    #kamani
    text = request.get_json()['text']
    if not text:
        return 'No text provided', 400
    
    summary = generate_summary(text)
    return jsonify({'summary': summary}), 200

if __name__ == '__main__':
    app.run(debug=True)