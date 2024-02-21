from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Text, Boolean
from sqlalchemy.orm import relationship, sessionmaker, registry
from sqlalchemy.ext.declarative import declarative_base
from locale_app import Base, engine
from pydantic import BaseModel


Session = sessionmaker(bind=engine)
session = Session()

mapper_registry = registry()
mapper_registry.configure()

Base = declarative_base()