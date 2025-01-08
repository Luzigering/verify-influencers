import requests

def test_similarity_service():
    url = "http://localhost:5001/similarity"
    payload = {
        "claim": "Beber água melhora a saúde.",
        "sources": [
            "Beber água diariamente é essencial para a saúde.",
            "Comer frutas melhora o bem-estar.",
        ]
    }
    response = requests.post(url, json=payload)
    if response.status_code != 200:
        raise AssertionError
    assert len(response.json()) == 2
    if response.json()[0]['similarity'] <= 0.5:
        raise AssertionError
