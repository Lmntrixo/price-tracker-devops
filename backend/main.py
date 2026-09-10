from fastapi import FastAPI
#we initiate fastapi app
app = FastAPI(title="My FastAPI Application", description="This is a sample FastAPI application.", version="1.0.0")
from fastapi.middleware.cors import CORSMiddleware
#Cors configuration
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#  Define a simple test route
@app.get("/")
async def read_root():
    return {"status": "online", "message": "API Price Tracker opérationnelle"}