from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pymongo import MongoClient
from bson import ObjectId
from pydantic import BaseModel

class UserRegistration(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str
    
app = FastAPI(debug=True)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["mess_rating"]
collection = db["user_data"]

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


@app.post("/signup")
async def signup(user_data: UserRegistration):
    try:
        # Check if the email is already registered
        existing_user = collection.find_one({"email": user_data.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        # Insert the new user into the database
        user_dict = user_data.dict()  # Convert the Pydantic model to a dictionary
        print("Received user data:", user_dict)  # Log the received user data
        insert_result = collection.insert_one(user_dict)
        inserted_id = str(insert_result.inserted_id)
        print("User inserted with ID:", inserted_id)  # Log the inserted user ID
        return {"message": "User registered successfully", "user_id": inserted_id}
    except Exception as e:
        print("Error registering user:", e)  # Log any registration errors
        raise HTTPException(status_code=500, detail="Failed to register user")
    
@app.post("/login")
async def login(user_data: UserLogin):
    try:
        # Check if the provided credentials match any user in the database
        user = collection.find_one({"email": user_data.email, "password": user_data.password})
        if user:
            return RedirectResponse(url="/home")
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except Exception as e:
        print("Error logging in:", e)  # Log any errors during login
        raise HTTPException(status_code=500, detail="Failed to login")

# MongoDB CRUD operations for ratings
@app.post("/ratings/")
async def create_rating(rating: dict):
    insert_result = collection.insert_one(rating)
    inserted_id = str(insert_result.inserted_id)
    return {"message": "Rating created successfully", "rating_id": inserted_id}

@app.get("/ratings/{rating_id}")
async def read_rating(rating_id: str):
    user_data = collection.find_one({"_id": ObjectId(rating_id)})
    if user_data:
        return user_data
    else:
        raise HTTPException(status_code=404, detail="Rating not found")

@app.put("/ratings/{rating_id}")
async def update_rating(rating_id: str, new_rating: dict):
    result = collection.update_one({"_id": ObjectId(rating_id)}, {"$set": new_rating})
    if result.modified_count == 1:
        return {"message": "Rating updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="Rating not found")

@app.delete("/ratings/{rating_id}")
async def delete_rating(rating_id: str):
    result = collection.delete_one({"_id": ObjectId(rating_id)})
    if result.deleted_count == 1:
        return {"message": "Rating deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Rating not found")

@app.get("/rated", response_class=HTMLResponse)
async def rated(request: Request):
    ratings = collection.find()
    return templates.TemplateResponse("rated.html", {"request": request, "ratings": ratings})

