from pydantic import BaseModel


class Features(BaseModel):
    age: int
    avgGlucoseLevel: float
    bmi: float
    everMarried: int
    gender: int
    heartDisease: int
    hypertension: int
    residentType: int
    workType: int
    smokingStatus: int
