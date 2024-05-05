#!/usr/bin/python3
""" Flask application utilizing SQLAlchemy models """
from flask import Flask, render_template
from models import storage
import uuid

app = Flask(__name__)

@app.route('/3-hbnb/', strict_slashes=False)
def hbnb():
    """Route to <url>/3-hbnb/"""
    # Récupération des données des modèles pour passer au template
    states = storage.all("State").values()
    amenities = storage.all("Amenity").values()
    # Rendu du template sans les places qui seront gérées par le frontend
    return render_template(
        "3-hbnb.html", 
        amenities=amenities, 
        states=states, 
        cache_id=uuid.uuid4()
    )

@app.teardown_appcontext
def close_storage(exception):
    """ Ferme la session de stockage à la fin de la requête. """
    storage.close()

if __name__ == "__main__":
    # Configuration pour exécuter l'application
    app.run(host="0.0.0.0", port="5000")
