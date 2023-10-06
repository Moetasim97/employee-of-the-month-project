from fastapi import FastAPI
import httpx

app = FastAPI(port=8001)



dummy_user={"username":"halpert","password":"sharkllord"}

@app.get('/')
def home():
    return {"message":"Say hello to my little friend"}


@app.get("/validate_user")
async def get_user():
    other_url = "http://127.0.0.1:8000/validate_user/"

    async with httpx.AsyncClient() as client:
        response = await client.post(other_url,json = dummy_user)

        if response:
            return response.json()
        else:
            return {"error": "Failed to validate this user's credentials"}




@app.get("/star_employee")
async def get_star_employee():

    other_url="http://127.0.0.1:8000/retrieve_winner/"

    async with httpx.AsyncClient() as client:
        response = httpx.get(other_url)
     

        if response:
            return response.json()
        else:
            return {"error": "Failed to retrieve the current employee"}
    


@app.get('/current_eotm')
async def getting_current_winner():
    other_url = "http://127.0.0.1:8000/retrieve_winner"
    async with httpx.AsyncClient() as client:
        response = await client.get(other_url)
        if response.status_code == 200:
            print(response.json)
            return response.json()
        else:
            return {"error":"Failed to retrieve the list"}

@app.get('/all_stars')
async def getting_hall_of_famers():
    other_url = "http://127.0.0.1:8000/all_time_winners/"  
    async with httpx.AsyncClient() as client:    
        response = await client.get(other_url)
        if response.status_code == 200:
            return response.json()
        else:
            return {"error":"Failed to retrieve hall of famers"}  

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)


