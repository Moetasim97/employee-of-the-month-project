from fastapi import FastAPI


app = FastAPI()


@app.get('/')
def home():
    return {"message":"Say hello to my little friend"}