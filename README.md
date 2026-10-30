# My Garage — Vehicle Fleet, Fuel, Range & Maintenance Hub 🚗🏍️⛽⚡

A modern, responsive, and real-time web application to track all your personal vehicles and bikes, monitor remaining fuel / battery levels, dynamically calculate driving range, schedule maintenance, track repairs, and capture photos directly using your device camera.

---

## 🌟 Key Features

1. **Remaining Fuel & Battery Display**:
   - Visual colored fuel gauges with percentage badges.
   - Dynamic indicators: Green (>50%), Amber (20–50%), and Red Flashing (<20% Low Fuel Warning).
   - Supports Petrol, Diesel, Hybrid, and Electric (kWh) vehicles.

2. **Accurate Distance Range Calculation**:
   - Calculates real-time distance remaining: `Range = Current Fuel × Fuel Efficiency`.
   - Supports both Metric (`km`, `Liters`, `km/L`, `km/kWh`) and Imperial (`Miles`, `Gallons`, `MPG`, `mi/kWh`) with instant one-click switching.

3. **Vehicle Health, Service Schedule & Repair Manager**:
   - Health score percentage & status badge (Excellent, Good, Fair, Critical).
   - Service due dates with dynamic countdowns and overdue alert tags.
   - Interactive repair checklist: add tasks, assign priority levels (High, Medium, Low), mark as completed, or delete.
   - Dedicated filter pills: view vehicles with **Service Due** or **Repairs Needed**.

4. **Device Camera & Photo Studio**:
   - Real WebRTC device camera capture (`navigator.mediaDevices.getUserMedia`) for smartphones, laptops, and webcams.
   - Take live photos of your vehicles, bikes, and parking spots with shutter flash animation.
   - Front/rear camera toggle, photo preview review, and direct photo assignment to vehicles.
   - Local file upload fallback with automatic image compression and `localStorage` persistence.

5. **Where Parked Last & Google Maps Integration**:
   - Record exact parking location, timestamps, and landmark notes for every vehicle.
   - One-click Google Maps search link to view the vehicle's location.

6. **Interactive Live Fuel Slider**:
   - Drag the fuel slider on any vehicle card to simulate fuel burn or refills — watch driving distance and gauges update in real time.

7. **Trip Distance Simulator**:
   - Enter any destination trip distance (e.g. `250 km` or `150 miles`).
   - The app instantly evaluates every vehicle and displays badges showing which vehicles can complete the trip directly and which will need refueling stops.

8. **Fleet Statistics Dashboard**:
   - Total number of registered vehicles and bikes.
   - Combined total range across the entire fleet.
   - Average fuel level % across all vehicles.
   - Low fuel alert counter and maintenance alert counter.

9. **User Authentication & Profiles**:
   - User sign-in and registration portal with demo accounts (`gowtham` / `password123`).
   - Profile badge in header and session persistence.

10. **Search, Filter & Sort**:
    - Search by vehicle name, model, license plate, location, or fuel type.
    - Filter by All, Cars, SUVs, Trucks, Motorcycles/Bikes, Electric/Hybrid, Low Fuel, Service Due, or Repairs Needed.
    - Sort by Highest Range, Lowest Range, Fuel %, or Alphabetical.

---

## 🚀 How to Run

### Method 1: Direct Browser Launch (Simplest)
Double-click `run_website.bat` or directly open `index.html` in Chrome, Edge, Firefox, or Safari.

### Method 2: Local Python Web Server
Double-click `start_server.bat` or run:
```powershell
python -m http.server 8080
```
Then visit: `http://localhost:8080` in your web browser.

---

## 📁 Project Structure
```
vehicle-range-tracker/
├── index.html          # Web interface structure, dashboards, and modals
├── styles.css          # Design system, glassmorphism, responsive grid, animations
├── app.js              # State management, distance math, camera studio, maintenance manager
├── images/             # Vehicle photography and assets
├── run_website.bat     # One-click browser launcher
├── start_server.bat    # One-click local Python web server
├── .gitignore          # Git ignore rules
└── README.md           # Documentation
```
