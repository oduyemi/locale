import secrets
import string

def generate_api_key(length=32):
    """Generate a random API key."""
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(length))
