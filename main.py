from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pymongo import MongoClient
from bson import ObjectId
from pydantic import BaseModel

class UserRegistration(BaseModel):
    email: str
    password: str
    
app = FastAPI(debug=True)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["mess_rating"]
collection = db["rating"]

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/login")
async def login(email: str, password: str):
    # Check if the provided credentials match any user in the database
    user = collection.find_one({"email": email, "password": password})
    if user:
        return {"message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/about", response_class=HTMLResponse)
async def about_us(request: Request):
    return templates.TemplateResponse("abt.html", {"request": request})

@app.post("/register")
async def register(user_data: UserRegistration):
    # Check if the email is already registered
    existing_user = collection.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Insert the new user into the database
    insert_result = collection.insert_one(user_data.dict())
    inserted_id = str(insert_result.inserted_id)
    return {"message": "User registered successfully", "user_id": inserted_id}

# MongoDB CRUD operations for ratings
@app.post("/ratings/")
async def create_rating(rating: dict):
    insert_result = collection.insert_one(rating)
    inserted_id = str(insert_result.inserted_id)
    return {"message": "Rating created successfully", "rating_id": inserted_id}

@app.get("/ratings/{rating_id}")
async def read_rating(rating_id: str):
    rating = collection.find_one({"_id": ObjectId(rating_id)})
    if rating:
        return rating
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


@app.get("/rate", response_class=HTMLResponse)
async def about_us(request: Request):
    return templates.TemplateResponse("rate.html", {"request": request})