import datetime
import hashlib

def get_currdate_hash():
    random_string = str(hash(datetime.datetime.now()))
    hash_object = hashlib.sha256(random_string.encode('utf-8'))
    return hash_object.hexdigest()