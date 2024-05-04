#!/usr/bin/python3
""" Combining Flask with SQLAlchemy for the first time"""
from flask import Flask
from flask import render_template
from models import storage
from models.amenity import Amenity
from models.base_model import Base
from models.city import City
from models.place import Place
from models.review import Review
from models.state import State
from models.user import User
from os import getenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import uuid

app = Flask(__name__)


@app.route('/0-hbnb', strict_slashes=False)
def app_0_hbnb():
    """Route to <url>/0-hbnb"""
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
    return render_template(
        "0-hbnb.html",
        amenities=amenities,
        result=states,
        places=places,
        cache_id=uuid.uuid4()
    )


@app.teardown_appcontext
def destroy_session(exception):
    """destroy the database session or saves the file."""
    storage.close()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
