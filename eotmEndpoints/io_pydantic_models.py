
from pydantic import BaseModel


class User(BaseModel):
    username :str
    password :str

class User_Validation_Output(BaseModel):
    username:str
    id:int
    session_id:str



class EmployeeData(BaseModel):
    id:int 
    name:str | None = None
    photo:str | None = None
    phone:str | None = None

class EmployeeDataOutput(EmployeeData):
    user:int
    selection_counter:int
    job_title:str
    liked_eotm:bool

class InteractionData(BaseModel):
    employee_id: int
    comment: str | None = None
    likes: bool | None = None

class Employee_of_the_month_output(BaseModel):
    id:int
    employee_id:int
    month:str
    description:str
    is_selected_for_month:bool
    likes:int
    photo:str
    name:str

class ReturnedInteractions(BaseModel):
    comments:list[dict]
    meta_data:list[dict]

