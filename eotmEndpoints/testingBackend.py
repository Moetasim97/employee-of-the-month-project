from fastapi import FastAPI


app = FastAPI()

# this list represents the hall of famers expected json list
test_HOFs=[{"Name":"Michael Scott","image":"https://miro.medium.com/v2/resize:fit:1396/1*njwXqsShWvK81ANQCMBevw.jpeg"
           ,"past_eofa":10},
{
            "Name":"Dwight Schrute","image":"https://religionnews.com/wp-content/uploads/2023/04/webRNS-Rainn-Wilson-Dwight-Schrute2.jpg"
           ,"past_eofa":16},
{
            "Name":"Jim Halpert","image":"https://upload.wikimedia.org/wikipedia/en/7/7e/Jim-halpert.jpg"
           ,"past_eofa":9}
]

test_employee_winner = {
            "Name":"Jim Halpert","image":"https://upload.wikimedia.org/wikipedia/en/7/7e/Jim-halpert.jpg"
           ,"past_eofa":9}


@app.get('/')
def home_test():
    return {"response":"yep, the concept is solid"}


@app.get("/hall-of-famers")
def hofs_test()->list:

    return test_HOFs



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8002)