from fastapi import FastAPI
import httpx

app = FastAPI()


@app.get('/')
def home():
    return {"message":"Say hello to my little friend"}

@app.get("/star_employee")
def get_star_employee():

    other_url="http://127.0.0.1:8000/retrieve_winner"

    with httpx.AsyncClient() as client:
        response = client.get(other_url)

        if response == 200:
            return response
        else:
            return {"error": "Failed to retrieve the current employee"}
    


@app.get('/hall-of-famers')
async def get_hofs():

    other_url="http://127.0.0.1:8001/hall-of-famers"

    async with httpx.AsyncClient() as client:

        response = await client.get(other_url)

        if response.status_code == 200:
            return response.json()
        else:
            return {"error":"Failed to retrieve the list"}


