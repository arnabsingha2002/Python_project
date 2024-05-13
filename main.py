from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import openai

app = FastAPI(debug=True)


app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})



@app.get("/about", response_class=HTMLResponse)
async def about_us(request: Request):
    return templates.TemplateResponse("abt.html", {"request": request})

@app.get("/rate", response_class=HTMLResponse)
async def rate(request: Request):
    return templates.TemplateResponse("rate.html", {"request": request})

@app.get("/login", response_class=HTMLResponse)
async def login(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@app.get("/home", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("home.html", {"request": request})


OPENAI_API_KEY = "sk-proj-S46xsOnl9kuKz4yRqTU9T3BlbkFJNTpsem3oDhmdGUdEXb1x"
openai.api_key = OPENAI_API_KEY

class Message(BaseModel):
    message: str
    
@app.post("/chatbot")
async def chatbot(message: Message):
    # Get user message
    user_message = message.message

    # Generate response using ChatGPT
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_message},
        ],
    )

    # Extract bot response
    bot_response = response["choices"][0]["message"]["content"]

    return {"message": bot_response}

# Run FastAPI server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)