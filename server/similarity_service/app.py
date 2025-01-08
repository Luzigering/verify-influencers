from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util

# Inicializar o app Flask e o modelo
app = Flask(__name__)
model = SentenceTransformer('all-MiniLM-L6-v2')

@app.route('/similarity', methods=['POST'])
def calculate_similarity():
    data = request.json
    claim = data.get('claim')
    sources = data.get('sources')

    if not claim or not sources:
        return jsonify({'error': 'Alegação ou fontes ausentes.'}), 400

    # Gerar embeddings
    claim_embedding = model.encode(claim, convert_to_tensor=True)
    sources_embeddings = model.encode(sources, convert_to_tensor=True)

    # Calcular similaridades
    similarities = util.cos_sim(claim_embedding, sources_embeddings)

    # Preparar resultados
    results = [
        {'source': sources[i], 'similarity': float(similarities[0][i])}
        for i in range(len(sources))
    ]

    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
