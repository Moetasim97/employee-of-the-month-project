import json
from fastapi import FastAPI, HTTPException, Request
import httpx
from pydantic import BaseModel
app = FastAPI(port=8001)




class User(BaseModel):
    username :str
    password :str

class EmployeeData(BaseModel):
    id:int | None = None
    name:str | None = None
    photo:str | None = None
    phone:str | None = None


# class Car(BaseModel):
#     car_name: str | None = None





@app.get('/')
def home():
    return {"message":"Say hello to my little friend"}




@app.post("/validate_user")
async def get_user(user:User):
    user = user.dict()
    other_url = "http://127.0.0.1:8000/validate_user/"
    
    async with httpx.AsyncClient() as client:
        
        response = await client.post(other_url,json = user)
        if response:
            return response.json()
        else:
            raise {"error":"Failed to validate the user"}

@app.post("/edit_employee")
async def edit_emp_profile(employee_data:EmployeeData):
    employee_data=employee_data.dict()
    other_url = "http://127.0.0.1:8000/edit_employee/"
    async with httpx.AsyncClient() as client:
        response = await client.post(other_url, json = employee_data)

        if response.status_code == 200:
            return response.json()
        else:
            return {"error": "Failed to edit employee data"}





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


