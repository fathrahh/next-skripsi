import numpy as np
import requests
import os

from joblib import load
from os.path import dirname, abspath
from fastapi import FastAPI
from api.request.models import Features
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client
from io import BytesIO

app = FastAPI()

fileDir = dirname(abspath(__file__))

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/hello")
def hello_world():
    return {
        'cwd': os.getcwd(),
        'fd': fileDir,
    }


@app.post("/api/predict")
def predict(payload: Features) -> int:
    payload = payload.dict()

    # __location__ = os.path.realpath(
    #     os.path.join(os.getcwd(), os.path.dirname(__file__)))

    url = os.environ.get("supa_url")
    key = os.environ.get("supa_key")

    supabase = create_client(url, key)
    url_joblib = supabase.storage.from_('model').get_public_url("model.joblib")

    response = requests.get(url_joblib)
    file_content = response.content

    model = load(BytesIO(file_content))

    X_dict = {
        'gender': payload['gender'],
        'age': payload['age'],
        'hypertension': payload['hypertension'],
        'heart_disease': payload['heartDisease'],
        'ever_married': payload['everMarried'],
        'work_type': payload['workType'],
        'residence_type': payload['residentType'],
        'avg_glucose_level': payload['avgGlucoseLevel'],
        'bmi': payload['bmi'],
        'smoking_status': payload['smokingStatus']
    }

    X_test = np.array(list(X_dict.values()))
    y_pred = model.predict(X_test.reshape(-1, len(X_test)))

    return y_pred
