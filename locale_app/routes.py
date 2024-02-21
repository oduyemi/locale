import os, random, string, qr_codes, qrcode, base64, hashlib, io, time, logging
from datetime import datetime
from fastapi import APIRouter, Request, status, Depends, HTTPException, Form
from fastapi.responses import StreamingResponse, RedirectResponse, FileResponse, JSONResponse
from sqlalchemy import or_
from sqlalchemy.orm import Session
from locale_app import starter, models, schemas
from typing import Optional, List
# from locale_app.models import URL, Visit, Contact
from .dependencies import get_db
from io import BytesIO
from instance.config import SECRET_KEY, DATABASE_URI




locale_router = APIRouter()

logger = logging.getLogger(__name__)


#    E  N  D  P  O  I  N  T  S
@starter.get("/")
async def get_index():
    return {"message": "Locale API!"}