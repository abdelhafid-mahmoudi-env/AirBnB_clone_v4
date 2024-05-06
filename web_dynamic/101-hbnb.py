#!/usr/bin/python3
""" Filters """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from flask import Flask, render_template
import uuid


app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'


@app.teardown_appcontext
def close_session(exception):
    storage.close()


@app.route('/101-hbnb')
def app_filters(the_id=None):
    state_objs = storage.all('State').values()
    states = dict([state.name, state] for state in state_objs)
    amenities = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    return render_template(
        '101-hbnb.html',
        states=states,
        amenities=amenities,
        places=places,
        users=users,
        cache_id=uuid.uuid4()
    )


if __name__ == "__main__":
    app.run(host=host, port=port)
