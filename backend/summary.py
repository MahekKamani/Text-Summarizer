import nltk
from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import numpy as np
import networkx as nx

nltk.download("stopwords")
stop_words = set(stopwords.words('english'))

def read_sentences(text):
    return [s.replace("[^a-zA-Z]", " ").split(" ") for s in text.split(". ")[:-1]]

def sentence_similarity(sent1, sent2):
    all_words = set(sent1 + sent2)
    vector1 = np.array([sent1.count(w) for w in all_words])
    vector2 = np.array([sent2.count(w) for w in all_words])
    return 1 - cosine_distance(vector1, vector2)

def build_similarity_matrix(sentences):
    n = len(sentences)
    similarity_matrix = np.zeros((n, n))
    for i in range(n):
        for j in range(i+1, n):
            similarity_matrix[i][j] = sentence_similarity(sentences[i], sentences[j])
            similarity_matrix[j][i] = similarity_matrix[i][j]
    return similarity_matrix

def generate_summary(text, top_n=5):
    sentences = read_sentences(text)
    sentence_similarity_martix = build_similarity_matrix(sentences)
    sentence_similarity_graph = nx.from_numpy_array(sentence_similarity_martix)
    scores = nx.pagerank(sentence_similarity_graph)
    ranked_sentences = [(scores[i], s) for i, s in enumerate(sentences)]
    ranked_sentences = sorted(ranked_sentences, reverse=True)
    summary_sentences = [" ".join(s) for _, s in ranked_sentences[:top_n]]
    return " ".join(summary_sentences)

def generate_summary_file(file_path, top_n=5):
    with open(file_path, "r") as file:
        text = file.read()
    return generate_summary(text, top_n)
