from pydantic import BaseModel

class Employee(BaseModel):
    name: str
    photo:str
    contact:dict




class Top_Employee(BaseModel):
    name:str
    photo:str
    description:str
    likes:int
    comments:list



