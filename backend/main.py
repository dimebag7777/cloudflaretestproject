from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI Backend!"}

@app.get("/api/data")
def read_data():
    return {
        "data": [
            {"id": 1, "name": "Item 1", "description": "This is item 1"},
            {"id": 2, "name": "Item 2", "description": "This is item 2"},
            {"id": 3, "name": "Item 3", "description": "This is item 3"},
        ]
    }
