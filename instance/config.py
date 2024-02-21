from decouple import config
from dotenv import load_dotenv

SECRET_KEY = config("SECRET_KEY")
DATABASE_URI = config("DATABASE_URI")