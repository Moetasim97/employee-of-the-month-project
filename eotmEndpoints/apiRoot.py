import json
from fastapi import FastAPI, HTTPException, Request
import httpx
from io_pydantic_models import *
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()


origins = ["http://localhost:3000", "http://localhost:8000"]
app.add_middleware(
    CORSMiddleware,
    # You can specify a list of allowed origins or use "*" for any origin.
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get('/')
def home():
    return {"message": "Say hello to my little friend"}


@app.post("/validate_user", response_model=User_Validation_Output)
async def getting_user(user: User):
    user = user.dict()
    other_url = "http://127.0.0.1:8000/validate_user/"

    async with httpx.AsyncClient() as client:

        response = await client.post(other_url, json=user)
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": "Failed to validate the user"}


@app.post("/edit_employee", response_model=EmployeeDataOutput)
async def editing_emp_profile(employee_data: EmployeeData):
    employee_data = employee_data.dict()
    other_url = "http://127.0.0.1:8000/edit_employee/"
    async with httpx.AsyncClient() as client:
        response = await client.post(other_url, json=employee_data)

        if response.status_code == 200:
            return response.json()
        else:
            return {"error": "Failed to edit employee data"}


@app.get("/get_employee/{employee_id}")
async def getting_employee_data(employee_id: int):

    # other_url ='http://127.0.0.1:8000/return_employee/'
    async with httpx.AsyncClient() as client:
        response = await client.get(f'http://127.0.0.1:8000/return_employee/{employee_id}/')

        if response.status_code == 200:
            return response.json()
        else:
            return response.json()


@app.get("/all_stars")
async def getting_hall_of_famers():

    async with httpx.AsyncClient() as client:

        other_url = "http://127.0.0.1:8000/all_time_winners/"

        response = await client.get(other_url)

        if response.status_code == 200:

            return response.json()

        else:

            {"error": "Failed to fetch hall of famers."}

# @app.get("/star_employee")
# async def get_star_employee():

#     other_url="http://127.0.0.1:8000/retrieve_winner/"

#     async with httpx.AsyncClient() as client:
#         response = httpx.get(other_url)
#         if response:
#             return response.json()
#         else:
#             return {"error": "Failed to retrieve the current employee"}


@app.get('/current_eotm', response_model=Employee_of_the_month_output)
async def getting_current_winner():
    other_url = "http://127.0.0.1:8000/retrieve_winner/"
    async with httpx.AsyncClient() as client:
        response = await client.get(other_url)
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": "Failed to retrieve the winner"}


@app.post("/submit_interaction")
async def submitting_current_interaction(interaction_data:InteractionData):
    other_url = "http://127.0.0.1:8000/update_eotm_interactions/"
    interaction_data = interaction_data.dict()
    async with httpx.AsyncClient() as client:
        response = await client.post(other_url, json=interaction_data)
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": "Failed to submit new interactions with the eotm post."}


@app.put("/reset_password", response_model=User_Validation_Output)
async def resetting_password(new_user_data: User):
    other_url = "http://127.0.0.1:8000/reset_pass/"
    new_user_data = new_user_data.dict()
    async with httpx.AsyncClient() as client:
        response = await client.put(other_url, json=new_user_data)
        if response.status_code == 200:
            return response.json()
        else:
            return {"error": "Failed to update user password"}


@app.get("/logout")
async def logging_out():

    other_url = "http://127.0.0.1:8000/logout_from_session/"

    async with httpx.AsyncClient() as client:
        response = await client.get(other_url)

        if response.status_code == 200:
            return response.json()
        else:
            return {"error": "Failed to logout from session"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)
