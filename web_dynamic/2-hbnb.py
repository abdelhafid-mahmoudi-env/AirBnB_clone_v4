#!/usr/bin/python3
""" Flask application utilizing SQLAlchemy models """
from flask import Flask, render_template
from models import storage
from models.amenity import Amenity
from models.base_model import Base
from models.city import City
from models.place import Place
from models.review import Review
from models.state import State
from models.user import User
import uuid

app = Flask(__name__)

@app.route('/2-hbnb/', strict_slashes=False)
def hbnb():
    """Route to <url>/2-hbnb/"""
    # Récupération des données des modèles pour passer au template
    states = storage.all("State").values()
    amenities = storage.all("Amenity").values()
    places_tmp = storage.all("Place").values()
    owners = storage.all("User")
    places = []
    for k, v in owners.items():
        for place in places_tmp:
            if k == place.user_id:
                places.append(["{} {}".format(
                    v.first_name, v.last_name), place])
    places.sort(key=lambda x: x[1].name)
    # Rendu du template avec les données et un UUID pour gérer le cache
    return render_template(
        "2-hbnb.html", 
        amenities=amenities, 
        states=states, 
        places=places, 
        cache_id=uuid.uuid4()
    )

@app.teardown_appcontext
def close_storage(exception):
    """Ferme la session de stockage à la fin de la requête."""
    storage.close()

if __name__ == "__main__":
    # Configuration pour exécuter l'application
    app.run(host="0.0.0.0", port="5000")
