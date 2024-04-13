from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI(debug=True)


app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/login")
async def login(username: str, password: str):
    # Your login logic here
    return {"message": "Login successful"}

@app.get("/about", response_class=HTMLResponse)
async def about_us(request: Request):
    return templates.TemplateResponse("abt.html", {"request": request})

@app.get("/rate", response_class=HTMLResponse)
async def rate(request: Request):
    return templates.TemplateResponse("rate.html", {"request": request})