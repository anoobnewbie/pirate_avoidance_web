from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uvicorn
import logic


# Import your logic and data structures
from logic import (
    ports as port_data,
    reallocate_traffic
)

app = FastAPI()

# Allow all CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PortDisruptionRequest(BaseModel):
    port_name: str

@app.post("/calculate_traffic_percentage")
async def calculate_traffic_percentage(request: PortDisruptionRequest):
    disrupted_port = request.port_name

    # Log the incoming request
    print(f"Received request for disrupted port: {disrupted_port}")

    # Validate the port name
    port_names = [port['name'] for port in port_data]
    if disrupted_port not in port_names:
        error_msg = "Invalid port name"
        print(f"Error: {error_msg}")
        return {"error": error_msg}

    # Call the reallocate_traffic function
    result = reallocate_traffic(disrupted_port)

    if result is None:
        error_msg = "Unable to reallocate traffic"
        print(f"Error: {error_msg}")
        return {"error": error_msg}

    traffic_percentage_changes, port_activity_increase, total_cost, total_time, unallocated_traffic = result

    response = {}
    
    # Add percentage changes in traffic to the response
    for traffic_change in traffic_percentage_changes:
        route_key = f"{traffic_change['ports'][0]}-{traffic_change['ports'][1]}"
        response[route_key] = traffic_change['percent_change']

    # Add port activity increase to the response
    for port_name, increase in port_activity_increase.items():
        response[port_name] = increase

    # Add total cost and time if needed
    response["total_cost"] = total_cost
    response["total_time"] = total_time
    
    response["Unrouted Traffic"] = unallocated_traffic
    response["Total Cost"] = total_cost
    response["Total Time"] = total_time

    # Log the response
    print(f"Response data: {response}")

    return response

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8050)
