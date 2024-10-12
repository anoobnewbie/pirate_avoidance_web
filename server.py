from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import searoute
import uvicorn

# Define a FastAPI app
app = FastAPI()


# Define a request model for the coordinates
class Coordinates(BaseModel):
    start_lat: float
    start_lon: float
    end_lat: float
    end_lon: float

# Endpoint to calculate the sea route
@app.post("/calculate-route/")
async def calculate_route(coords: Coordinates):
    try:
        # Define the start and end ports as (longitude, latitude)
        start_port = (coords.start_lon, coords.start_lat)
        end_port = (coords.end_lon, coords.end_lat)

        # Calculate the sea route
        route_coordinates = searoute.searoute(start_port, end_port)

        # Extract the distance and units
        distance = route_coordinates['properties']['length']
        units = route_coordinates['properties']['units']

        # Extract the list of coordinates along the sea route
        route_coords = route_coordinates['geometry']['coordinates']

        # Prepare the response
        response = {
            "distance": distance,
            "units": units,
            "route": route_coords
        }

        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["*"] for allowing all origins (use carefully in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods, including OPTIONS
    allow_headers=["*"],  # Allow all headers
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
