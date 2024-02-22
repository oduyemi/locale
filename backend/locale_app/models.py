from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, sessionmaker, registry
from sqlalchemy.ext.declarative import declarative_base
from locale_app import Base, engine


Session = sessionmaker(bind=engine)
session = Session()

mapper_registry = registry()
mapper_registry.configure()

Base = declarative_base()



class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    fname = Column(String(250), index=True)
    lname = Column(String(250), index=True)
    email = Column(String(150), index=True)
    pwd = Column(String(120), index=True)
    hashed_pwd = Column(String(120), index=True)

class Region(Base):
    __tablename__ = "region"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), index=True, nullable=False)

    # Relationship
    states = relationship("State", back_populates="region")

class State(Base):
    __tablename__ = "state"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(250), index=True, nullable=False)
    region_id = Column(Integer, ForeignKey("region.id"), nullable=False)

    # Relationships
    region = relationship("Region", back_populates="states")  
    lgas = relationship("LGA", back_populates="state")  

class LGA(Base):
    __tablename__ = "lga"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(250), index=True)
    state_id = Column(Integer, ForeignKey("state.id"), nullable=False)

    # Relationship
    state = relationship("State", back_populates="lgas") 

class APIKey(Base):
    __tablename__ = "api_key"
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(255), index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)

    # Relationship
    user = relationship("User", back_populates="api_keys")