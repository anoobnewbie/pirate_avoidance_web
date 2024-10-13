# ===============================
# 1. Port Coordinates
# ===============================

port_coordinates = {
    "Singapore": {"lat": 1.3521, "lon": 103.8198},
    "Port Klang": {"lat": 3.0036, "lon": 101.3678},
    "Tanjung Priok": {"lat": -6.1045, "lon": 106.8804},
    "Shanghai": {"lat": 31.2304, "lon": 121.4737},
    "Shenzhen": {"lat": 22.5431, "lon": 114.0579},
    "Rotterdam": {"lat": 51.9225, "lon": 4.4791},
    "Felixstowe": {"lat": 51.9556, "lon": 1.3039},
    "Los Angeles": {"lat": 33.7406, "lon": -118.2712},
    "New York": {"lat": 40.7128, "lon": -74.0060},
    "Santos": {"lat": -23.9608, "lon": -46.3336},
    "Buenos Aires": {"lat": -34.6037, "lon": -58.3816},
    "Vancouver": {"lat": 49.2827, "lon": -123.1207},
    "Savannah": {"lat": 32.0835, "lon": -81.0998},
}

# ===============================
# 2. Alternative Port Connections
# ===============================
# Updated with more realistic data and connections
alternative_ports = {
    "Singapore": {
        "Port Klang": {"cost": 500, "time_delay": 12},
        "Tanjung Priok": {"cost": 700, "time_delay": 18},
        "Shanghai": {"cost": 2000, "time_delay": 48},
        "Shenzhen": {"cost": 1800, "time_delay": 42},
    },
    "Port Klang": {
        "Singapore": {"cost": 500, "time_delay": 12},
        "Tanjung Priok": {"cost": 600, "time_delay": 15},
        "Shenzhen": {"cost": 1900, "time_delay": 45},
    },
    "Tanjung Priok": {
        "Singapore": {"cost": 700, "time_delay": 18},
        "Port Klang": {"cost": 600, "time_delay": 15},
        "Shenzhen": {"cost": 2100, "time_delay": 50},
    },
    "Shanghai": {
        "Shenzhen": {"cost": 800, "time_delay": 20},
        "Singapore": {"cost": 2000, "time_delay": 48},
        "Rotterdam": {"cost": 3000, "time_delay": 72},
    },
    "Shenzhen": {
        "Shanghai": {"cost": 800, "time_delay": 20},
        "Singapore": {"cost": 1800, "time_delay": 42},
        "Port Klang": {"cost": 1900, "time_delay": 45},
        "Tanjung Priok": {"cost": 2100, "time_delay": 50},
    },
    "Rotterdam": {
        "Felixstowe": {"cost": 300, "time_delay": 8},
        "New York": {"cost": 2500, "time_delay": 60},
        "Savannah": {"cost": 2700, "time_delay": 65},
    },
    "Felixstowe": {
        "Rotterdam": {"cost": 300, "time_delay": 8},
        "New York": {"cost": 2400, "time_delay": 58},
    },
    "Los Angeles": {
        "Vancouver": {"cost": 400, "time_delay": 10},
        "Shanghai": {"cost": 2200, "time_delay": 55},
    },
    "New York": {
        "Savannah": {"cost": 500, "time_delay": 12},
        "Rotterdam": {"cost": 2500, "time_delay": 60},
        "Felixstowe": {"cost": 2400, "time_delay": 58},
    },
    "Santos": {
        "Buenos Aires": {"cost": 600, "time_delay": 14},
        "Savannah": {"cost": 2800, "time_delay": 68},
    },
    "Buenos Aires": {
        "Santos": {"cost": 600, "time_delay": 14},
        "Savannah": {"cost": 2900, "time_delay": 70},
    },
    "Vancouver": {
        "Los Angeles": {"cost": 400, "time_delay": 10},
        "Shanghai": {"cost": 2300, "time_delay": 58},
    },
    "Savannah": {
        "New York": {"cost": 500, "time_delay": 12},
        "Rotterdam": {"cost": 2700, "time_delay": 65},
        "Buenos Aires": {"cost": 2900, "time_delay": 70},
    },
}

# ===============================
# 3. Ports Information
# ===============================
# Updated with realistic current_load_TEUs
ports = [
    {
        "name": "Singapore",
        "max_capacity_TEUs": 37000000,
        "current_load_TEUs": 33000000,
        "weight": 10,
    },
    {
        "name": "Port Klang",
        "max_capacity_TEUs": 12800000,
        "current_load_TEUs": 11000000,
        "weight": 8,
    },
    {
        "name": "Tanjung Priok",
        "max_capacity_TEUs": 8000000,
        "current_load_TEUs": 7000000,
        "weight": 8,
    },
    {
        "name": "Shanghai",
        "max_capacity_TEUs": 43000000,
        "current_load_TEUs": 40000000,
        "weight": 9,
    },
    {
        "name": "Shenzhen",
        "max_capacity_TEUs": 27600000,
        "current_load_TEUs": 24000000,
        "weight": 7,
    },
    {
        "name": "Rotterdam",
        "max_capacity_TEUs": 14600000,
        "current_load_TEUs": 12200000,
        "weight": 7,
    },
    {
        "name": "Felixstowe",
        "max_capacity_TEUs": 4000000,
        "current_load_TEUs": 3600000,
        "weight": 6,
    },
    {
        "name": "Los Angeles",
        "max_capacity_TEUs": 9600000,
        "current_load_TEUs": 9000000,
        "weight": 7,
    },
    {
        "name": "New York",
        "max_capacity_TEUs": 7200000,
        "current_load_TEUs": 6500000,
        "weight": 6,
    },
    {
        "name": "Santos",
        "max_capacity_TEUs": 4200000,
        "current_load_TEUs": 3800000,
        "weight": 5,
    },
    {
        "name": "Buenos Aires",
        "max_capacity_TEUs": 2400000,
        "current_load_TEUs": 2200000,
        "weight": 5,
    },
    {
        "name": "Vancouver",
        "max_capacity_TEUs": 3400000,
        "current_load_TEUs": 3000000,
        "weight": 6,
    },
    {
        "name": "Savannah",
        "max_capacity_TEUs": 4200000,
        "current_load_TEUs": 3700000,
        "weight": 5,
    },
]

# ===============================
# 4. Undirected Traffic Data
# ===============================
traffic_data = [
    {"ports": ["Singapore", "Rotterdam"], "traffic_TEUs": 1500000},
    {"ports": ["Port Klang", "Felixstowe"], "traffic_TEUs": 800000},
    {"ports": ["Tanjung Priok", "Felixstowe"], "traffic_TEUs": 1200000},
    {"ports": ["Shanghai", "Rotterdam"], "traffic_TEUs": 1800000},
    {"ports": ["Shenzhen", "Felixstowe"], "traffic_TEUs": 900000},
    {"ports": ["Rotterdam", "Los Angeles"], "traffic_TEUs": 1700000},
    {"ports": ["Felixstowe", "New York"], "traffic_TEUs": 1100000},
    {"ports": ["Los Angeles", "New York"], "traffic_TEUs": 1600000},
    {"ports": ["New York", "Santos"], "traffic_TEUs": 700000},
    {"ports": ["Santos", "Buenos Aires"], "traffic_TEUs": 1300000},
    {"ports": ["Buenos Aires", "Vancouver"], "traffic_TEUs": 600000},
    {"ports": ["Vancouver", "Savannah"], "traffic_TEUs": 500000},
    {"ports": ["Savannah", "Rotterdam"], "traffic_TEUs": 1400000},
    {"ports": ["Shanghai", "Los Angeles"], "traffic_TEUs": 2000000},
    {"ports": ["Shenzhen", "Vancouver"], "traffic_TEUs": 800000},
]

import heapq
import copy
import math

# Function to calculate the great-circle distance between two points using the Haversine formula
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Radius of Earth in kilometers
    
    # Convert latitude and longitude from degrees to radians
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    
    # Haversine formula
    a = math.sin(delta_phi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    return R * c

# Distance limit in kilometers
MAX_DISTANCE_KM = 2000

def reallocate_traffic(failed_port_name):
    local_ports = copy.deepcopy(ports)
    local_traffic_data = copy.deepcopy(traffic_data)
    port_lookup = {port['name']: port for port in local_ports}
    initial_current_loads = {port['name']: port['current_load_TEUs'] for port in local_ports}
    
    # Find all traffic involving the failed port
    affected_traffic = [traffic for traffic in local_traffic_data if failed_port_name in traffic['ports']]
    
    # Calculate available capacities
    for port in local_ports:
        port['available_capacity'] = port['max_capacity_TEUs'] - port['current_load_TEUs']
    
    # Initialize total cost, total time, and allocation tracking
    total_cost = 0
    total_time = 0
    allocation_times = []
    port_allocations = {}
    unallocated_traffic = {}
    total_traffic = sum(traffic['traffic_TEUs'] for traffic in affected_traffic)
    
    # Copy of original traffic data for comparison
    original_traffic_data = traffic_data.copy()
    
    # Remove affected traffic from the main traffic data
    traffic_data_remaining = [t for t in local_traffic_data if failed_port_name not in t['ports']]
    
    # Reallocate traffic
    for traffic in affected_traffic:
        other_port = traffic['ports'][0] if traffic['ports'][1] == failed_port_name else traffic['ports'][1]
        traffic_amount = traffic['traffic_TEUs']
        
        # Potential alternative ports
        alternative_port_names = alternative_ports.get(failed_port_name, {}).keys()
        alternative_ports_info = []
        for alt_port_name in alternative_port_names:
            alt_port = port_lookup.get(alt_port_name)
            if alt_port and alt_port['available_capacity'] > 0:
                # Calculate the distance between the failed port and the alternative port
                failed_port_coords = port_coordinates[failed_port_name]
                alt_port_coords = port_coordinates[alt_port_name]
                distance = haversine(failed_port_coords['lat'], failed_port_coords['lon'], alt_port_coords['lat'], alt_port_coords['lon'])
                
                # Only consider the alternative port if it is within the maximum distance
                if distance <= MAX_DISTANCE_KM:
                    connection = alternative_ports[failed_port_name][alt_port_name]
                    priority = connection['cost'] * connection['time_delay']
                    heapq.heappush(alternative_ports_info, (priority, alt_port_name))
        
        total_allocated = 0
        allocations = []
        while alternative_ports_info and traffic_amount > 0:
            _, alt_port_name = heapq.heappop(alternative_ports_info)
            alt_port = port_lookup[alt_port_name]
            connection = alternative_ports[failed_port_name][alt_port_name]
            allocatable = min(alt_port['available_capacity'], traffic_amount)
            if allocatable > 0:
                allocations.append({
                    'ports': [other_port, alt_port_name],
                    'traffic_TEUs': allocatable
                })
                alt_port['available_capacity'] -= allocatable
                alt_port['current_load_TEUs'] += allocatable
                traffic_amount -= allocatable
                total_allocated += allocatable
                
                # Track allocations per port
                port_allocations[alt_port_name] = port_allocations.get(alt_port_name, 0) + allocatable
                
                # Update total cost and time
                allocation_cost = (allocatable * connection['cost']) / 10
                allocation_time = connection['time_delay']
                total_cost += allocation_cost
                allocation_times.append(allocation_time)
                total_time = max(total_time, allocation_time)
            
        if traffic_amount > 0:
            print(f"Unable to allocate {traffic_amount} TEUs from {failed_port_name} for traffic between {traffic['ports']}.")
            unallocated_traffic[f"{traffic['ports'][0]}-{traffic['ports'][1]}"] = traffic_amount
        
        # Update traffic data with new allocations
        traffic_data_remaining.extend(allocations)
    
    # Calculate % increase in port activity
    port_activity_increase = {}
    for port_name, allocated_amount in port_allocations.items():
        initial_load = initial_current_loads[port_name]
        new_load = port_lookup[port_name]['current_load_TEUs']
        if initial_load > 0:
            percent_increase = ((new_load - initial_load) / initial_load) * 100
            port_activity_increase[port_name] = percent_increase
        else:
            port_activity_increase[port_name] = 'N/A (initial load zero)'
    
    # Calculate percentage changes in traffic data
    traffic_percentage_changes = []
    for traffic in traffic_data_remaining:
        route = sorted(traffic['ports'])
        original_traffic = next((t['traffic_TEUs'] for t in original_traffic_data if sorted(t['ports']) == route), None)
        if original_traffic:
            percent_change = ((traffic['traffic_TEUs'] - original_traffic) / original_traffic) * 100
        else:
            percent_change = 100.0  # New route created
        traffic_percentage_changes.append({
            'ports': traffic['ports'],
            'percent_change': percent_change
        })
    
    # Calculate unallocated traffic as a percentage of total affected traffic
    total_unallocated = sum(unallocated_traffic.values())
    unrouted_traffic = (total_unallocated / total_traffic) * 100 if total_traffic > 0 else 0
    
    return traffic_percentage_changes, port_activity_increase, total_cost, total_time, unrouted_traffic
