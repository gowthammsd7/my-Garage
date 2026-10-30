/**
 * FuelPulse - Vehicle Fleet Fuel & Range Tracker
 * Real-time dynamic distance calculations, fuel simulation, vehicle images,
 * parking locator, multi-vehicle live surveillance camera / CCTV feeds, and user authentication.
 */

// Initial Sample Vehicle Fleet with High-Res Parking Images, CCTV Feeds & Locations
const INITIAL_VEHICLES = [
  {
    id: "veh-toyota-rav4",
    name: "Toyota RAV4 Hybrid",
    year: 2023,
    type: "suv",
    fuelType: "Hybrid",
    plate: "MH-02-AB-4589",
    capacity: 55, // Liters (metric base)
    currentFuel: 38, // Liters
    efficiency: 18.5, // km/L
    color: "#10b981",
    image: "images/toyota-rav4.jpg",
    cctvImage: "images/rav4-cctv.jpg",
    cctvCamId: "CAM-18 • GARAGE P4-118",
    cctvTarget: "AI OBJECT: TOYOTA RAV4 HYBRID [SECURE IN BAY P4-118]",
    lastParked: "Home Garage - Bay P4-118",
    parkedTime: "Parked 25 mins ago",
    parkedNotes: "Ground level, near hybrid parking lane",
    notes: "Family weekend SUV & road trips",
    condition: "Excellent",
    conditionScore: 96,
    serviceDueDate: "2026-12-15",
    lastServiceDate: "2026-06-10",
    repairs: [
      { id: "rep-rav4-1", description: "Cabin air pollen filter check", priority: "low", status: "completed", dateAdded: "2026-06-10" },
      { id: "rep-rav4-2", description: "Rotate all 4 all-terrain tires at 25k km", priority: "low", status: "pending", dateAdded: "2026-10-15" }
    ]
  },
  {
    id: "veh-tesla-modely",
    name: "Tesla Model Y Long Range",
    year: 2024,
    type: "ev",
    fuelType: "Electric",
    plate: "KA-01-EV-2024",
    capacity: 75, // kWh
    currentFuel: 58, // kWh
    efficiency: 6.2, // km/kWh
    color: "#3b82f6",
    image: "images/tesla-model-y.jpg",
    cctvImage: "images/tesla-cctv.jpg",
    cctvCamId: "CAM-17 • EV LEVEL P4 [STALL 418]",
    cctvTarget: "AI OBJECT: TESLA MODEL Y [CHARGING AT STALL 418]",
    lastParked: "Tech Hub EV Station - Level 3",
    parkedTime: "Parked 1 hr ago",
    parkedNotes: "Stall #24, plugged into Supercharger",
    notes: "Daily office commuter",
    condition: "Good",
    conditionScore: 88,
    serviceDueDate: "2026-11-14",
    lastServiceDate: "2026-03-22",
    repairs: [
      { id: "rep-tmy-1", description: "HEPA filter bio-defense replacement", priority: "medium", status: "pending", dateAdded: "2026-10-02" },
      { id: "rep-tmy-2", description: "Brake fluid moisture check & sensor calibration", priority: "low", status: "pending", dateAdded: "2026-10-18" },
      { id: "rep-tmy-3", description: "Windshield washer fluid top-up", priority: "low", status: "completed", dateAdded: "2026-10-22" }
    ]
  },
  {
    id: "veh-honda-civic",
    name: "Honda Civic Touring",
    year: 2022,
    type: "car",
    fuelType: "Petrol",
    plate: "DL-04-CY-9912",
    capacity: 47, // Liters
    currentFuel: 7.5, // Liters (Low Fuel < 20%)
    efficiency: 14.2, // km/L
    color: "#ef4444",
    image: "images/honda-civic.jpg",
    cctvImage: "images/honda-civic.jpg",
    cctvCamId: "CAM-02 • SPOT #142 METRO",
    cctvTarget: "AI OBJECT: HONDA CIVIC [SECURE IN SPOT #142]",
    lastParked: "Downtown City Cafe - Spot #142",
    parkedTime: "Parked 2 hrs ago",
    parkedNotes: "Metered street parking near bookstore",
    notes: "City hatchback - needs refuel soon!",
    condition: "Critical",
    conditionScore: 54,
    serviceDueDate: "2026-10-20", // Overdue by 9 days!
    lastServiceDate: "2025-11-18",
    repairs: [
      { id: "rep-civ-1", description: "Front brake pads worn below 2.5mm - replace immediately", priority: "high", status: "pending", dateAdded: "2026-10-12" },
      { id: "rep-civ-2", description: "Synthetic engine oil & filter replacement overdue", priority: "high", status: "pending", dateAdded: "2026-10-19" },
      { id: "rep-civ-3", description: "Right LED headlight low-beam flickering", priority: "medium", status: "pending", dateAdded: "2026-10-24" }
    ]
  },
  {
    id: "veh-ford-f150",
    name: "Ford F-150 SuperCrew",
    year: 2023,
    type: "truck",
    fuelType: "Diesel",
    plate: "TN-07-TR-3301",
    capacity: 98, // Liters
    currentFuel: 68, // Liters
    efficiency: 9.8, // km/L
    color: "#f59e0b",
    image: "images/ford-f150.jpg",
    cctvImage: "images/ford-f150.jpg",
    cctvCamId: "CAM-08 • LOGISTICS BAY 34",
    cctvTarget: "AI OBJECT: FORD F-150 TRUCK [SECURE IN BAY 34]",
    lastParked: "TechCorp HQ Logistics - Bay 34",
    parkedTime: "Parked 4 hrs ago",
    parkedNotes: "South parking lot near main entrance",
    notes: "Heavy hauling and utility",
    condition: "Fair",
    conditionScore: 72,
    serviceDueDate: "2026-11-05", // Due in 7 days
    lastServiceDate: "2026-04-02",
    repairs: [
      { id: "rep-f150-1", description: "Transmission fluid flush & differential inspection", priority: "high", status: "pending", dateAdded: "2026-10-11" },
      { id: "rep-f150-2", description: "Rear suspension leaf spring bushing lubrication", priority: "medium", status: "pending", dateAdded: "2026-10-19" }
    ]
  },
  {
    id: "veh-yamaha-mt07",
    name: "Yamaha MT-07",
    year: 2024,
    type: "motorcycle",
    fuelType: "Petrol",
    plate: "KA-05-MC-7711",
    capacity: 14, // Liters
    currentFuel: 11.5, // Liters
    efficiency: 23.5, // km/L
    color: "#8b5cf6",
    image: "images/yamaha-mt07.jpg",
    cctvImage: "images/bike-cctv.jpg",
    cctvCamId: "CAM-09 • ZONE 4 [MOTO BAY 48]",
    cctvTarget: "AI OBJECT: YAMAHA MT-07 MOTORCYCLE [SECURE IN BAY 48]",
    lastParked: "The Grind Coffee Plaza - Motorcycle Bay 48",
    parkedTime: "Parked 40 mins ago",
    parkedNotes: "Designated motorcycle parking space #48 under CCTV-09",
    notes: "Weekend sports ride",
    condition: "Good",
    conditionScore: 85,
    serviceDueDate: "2026-11-10", // Due in 12 days
    lastServiceDate: "2026-07-15",
    repairs: [
      { id: "rep-mt07-1", description: "Drive chain cleaning, lubrication & tension adjustment", priority: "high", status: "pending", dateAdded: "2026-10-25" },
      { id: "rep-mt07-2", description: "Clutch cable free play inspection", priority: "low", status: "completed", dateAdded: "2026-08-30" }
    ]
  },
  {
    id: "veh-hyundai-ioniq5",
    name: "Hyundai Ioniq 5 AWD",
    year: 2023,
    type: "ev",
    fuelType: "Electric",
    plate: "AP-09-EV-8820",
    capacity: 72.6, // kWh
    currentFuel: 15.0, // kWh (Low battery ~ 20.6%)
    efficiency: 5.7, // km/kWh
    color: "#06b6d4",
    image: "images/hyundai-ioniq5.jpg",
    cctvImage: "images/hyundai-ioniq5.jpg",
    cctvCamId: "CAM-15 • SMART HUB CHARGER 2",
    cctvTarget: "AI OBJECT: HYUNDAI IONIQ 5 [CHARGING IN LEVEL 1]",
    lastParked: "Smart Parking Hub - Level 1 Charger",
    parkedTime: "Parked 3 hrs ago",
    parkedNotes: "Front charging bay near entrance",
    notes: "All-electric crossover",
    condition: "Good",
    conditionScore: 91,
    serviceDueDate: "2027-01-20",
    lastServiceDate: "2026-07-28",
    repairs: [
      { id: "rep-iq5-1", description: "Battery inverter coolant reservoir top-up", priority: "medium", status: "pending", dateAdded: "2026-10-22" }
    ]
  }
];

// Initial Users
const DEFAULT_USERS = [
  {
    id: "user-gowtham",
    username: "gowtham",
    password: "password123",
    name: "Gowtham P",
    role: "Garage Owner",
    createdAt: "2026-10-30T00:00:00.000Z"
  }
];

// Conversion Constants
const KM_TO_MILES = 0.621371;
const LITERS_TO_GALLONS = 0.264172;
const KML_TO_MPG = 2.35214583;

class FuelTrackerApp {
  constructor() {
    this.vehicles = [];
    this.users = [];
    this.currentUser = null;
    this.authMode = "signin"; // 'signin' or 'register'
    this.currentUnit = "metric"; // 'metric' (km, L, km/L) or 'imperial' (mi, gal, MPG)
    this.currentTheme = "dark";
    this.activeFilter = "all";
    this.searchQuery = "";
    this.sortBy = "range-desc";
    this.simulatedTripDistance = null; // in active unit
    this.activeRefuelVehicleId = null;
    this.activeParkingVehicleId = null;
    this.activeCameraVehicleId = null;
    this.activeMaintenanceVehicleId = null;
    this.cameraViewMode = "single"; // 'single' or 'multi'
    this.cameraClockTimer = null;
    this.webcamStream = null;

    this.init();
  }

  init() {
    this.initAuth();
    this.loadSettings();
    this.loadVehicles();
    this.bindEvents();
    this.bindAuthEvents();
    this.bindCameraEvents();
    this.bindMaintenanceEvents();
    this.updateUnitUI();
    this.render();
  }

  /* --------------------------------------------------------------------------
     Authentication & Session Logic
     -------------------------------------------------------------------------- */
  initAuth() {
    const savedUsers = localStorage.getItem("mygarage_users") || localStorage.getItem("fuelpulse_users");
    if (savedUsers) {
      try {
        this.users = JSON.parse(savedUsers);
      } catch (e) {
        this.users = [...DEFAULT_USERS];
      }
    } else {
      this.users = [...DEFAULT_USERS];
    }
    localStorage.setItem("mygarage_users", JSON.stringify(this.users));

    const savedSession = localStorage.getItem("mygarage_session") || localStorage.getItem("fuelpulse_session");
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        const match = this.users.find(u => u.username.toLowerCase() === (parsed.username || "").toLowerCase());
        this.currentUser = match || null;
      } catch (e) {
        this.currentUser = null;
      }
    }

    if (!this.currentUser) {
      this.showAuthModal();
    } else {
      this.hideAuthModal();
      this.updateUserHeaderUI();
    }
  }

  showAuthModal() {
    const portal = document.getElementById("authPortal");
    if (portal) portal.classList.remove("hidden");
    const alertEl = document.getElementById("authAlert");
    if (alertEl) alertEl.classList.add("hidden");
    const mainApp = document.getElementById("mainApp");
    if (mainApp) mainApp.classList.add("app-blurred");
    this.updateAuthFormUI();
  }

  hideAuthModal() {
    const portal = document.getElementById("authPortal");
    if (portal) portal.classList.add("hidden");
    const mainApp = document.getElementById("mainApp");
    if (mainApp) mainApp.classList.remove("app-blurred");
    this.updateUserHeaderUI();
  }

  bindAuthEvents() {
    const tabSignIn = document.getElementById("tabSignIn");
    const tabRegister = document.getElementById("tabRegister");

    tabSignIn.addEventListener("click", () => {
      this.authMode = "signin";
      tabSignIn.classList.add("active");
      tabRegister.classList.remove("active");
      this.updateAuthFormUI();
    });

    tabRegister.addEventListener("click", () => {
      this.authMode = "register";
      tabRegister.classList.add("active");
      tabSignIn.classList.remove("active");
      this.updateAuthFormUI();
    });

    // Password show/hide toggle
    document.getElementById("togglePasswordBtn").addEventListener("click", () => {
      const passInput = document.getElementById("authPassword");
      const eyeShow = document.querySelector(".eye-show");
      const eyeHide = document.querySelector(".eye-hide");

      if (passInput.type === "password") {
        passInput.type = "text";
        eyeShow.classList.add("hidden");
        eyeHide.classList.remove("hidden");
      } else {
        passInput.type = "password";
        eyeShow.classList.remove("hidden");
        eyeHide.classList.add("hidden");
      }
    });

    // Form submit
    document.getElementById("authForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("authUsername").value.trim().toLowerCase();
      const password = document.getElementById("authPassword").value;
      const remember = document.getElementById("authRememberMe").checked;

      if (this.authMode === "signin") {
        this.loginUser(username, password, remember);
      } else {
        const fullName = document.getElementById("authFullName").value.trim();
        const confirmPass = document.getElementById("authConfirmPassword").value;
        this.registerUser(fullName, username, password, confirmPass, remember);
      }
    });

    // User profile dropdown toggle
    const profileBtn = document.getElementById("userProfileBtn");
    const dropdownMenu = document.getElementById("userDropdownMenu");
    profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!this.currentUser) {
        this.showAuthModal();
        return;
      }
      dropdownMenu.classList.toggle("show");
    });

    // Header sign-in button
    const headerSignInBtn = document.getElementById("headerSignInBtn");
    if (headerSignInBtn) {
      headerSignInBtn.addEventListener("click", () => {
        dropdownMenu.classList.remove("show");
        this.showAuthModal();
      });
    }

    // Logout button
    document.getElementById("logoutBtn").addEventListener("click", () => {
      this.logoutUser();
    });

    // Outside click closes dropdown
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#userAuthArea")) {
        dropdownMenu.classList.remove("show");
      }
    });
  }

  updateAuthFormUI() {
    const isRegister = this.authMode === "register";
    document.getElementById("authTitle").textContent = isRegister ? "Create Garage Account" : "Sign In to My Garage";
    document.getElementById("authSubtitle").textContent = isRegister 
      ? "Choose a unique username to start your private garage" 
      : "Enter your unique username and password to access your vehicles";

    document.getElementById("groupFullName").classList.toggle("hidden", !isRegister);
    document.getElementById("groupConfirmPassword").classList.toggle("hidden", !isRegister);
    document.getElementById("rememberMeRow").classList.toggle("hidden", isRegister);
    const usernameHelp = document.getElementById("usernameHelp");
    if (usernameHelp) usernameHelp.classList.toggle("hidden", !isRegister);

    const submitBtn = document.getElementById("authSubmitBtn");
    submitBtn.querySelector("span").textContent = isRegister ? "Create Account & Start Garage" : "Sign In to Garage";
    document.getElementById("authAlert").classList.add("hidden");
  }

  loginUser(username, password, remember) {
    const cleanUsername = (username || "").trim().toLowerCase();
    const user = this.users.find(u => u.username.toLowerCase() === cleanUsername);

    if (!user || user.password !== password) {
      this.showAuthAlert("Invalid username or password. Please check your credentials.");
      return;
    }

    this.currentUser = user;
    if (remember) {
      localStorage.setItem("mygarage_session", JSON.stringify(user));
    }

    // Load THIS specific user's private vehicles
    this.loadVehicles();
    this.hideAuthModal();
    this.render();
    this.showToast(`Welcome back to your garage, ${user.name}!`, "success");
  }

  registerUser(fullName, username, password, confirmPassword, remember) {
    const cleanFullName = (fullName || "").trim();
    const cleanUsername = (username || "").trim().toLowerCase();

    if (!cleanFullName || !cleanUsername || !password) {
      this.showAuthAlert("Please fill in all required fields.");
      return;
    }

    if (cleanUsername.length < 3) {
      this.showAuthAlert("Username must be at least 3 characters long.");
      return;
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(cleanUsername)) {
      this.showAuthAlert("Username can only contain letters, numbers, underscores, and hyphens.");
      return;
    }

    if (password.length < 4) {
      this.showAuthAlert("Password must be at least 4 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      this.showAuthAlert("Passwords do not match. Please re-enter.");
      return;
    }

    // STRICT UNIQUE USERNAME CHECK: No two users can share a username
    const isTaken = this.users.some(u => u.username.toLowerCase() === cleanUsername);
    if (isTaken) {
      this.showAuthAlert(`Username "${cleanUsername}" is already taken! Every user must have a unique username. Please choose another.`);
      return;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      username: cleanUsername,
      name: cleanFullName,
      password: password,
      role: "Garage Owner",
      createdAt: new Date().toISOString()
    };

    // Save every user permanently
    this.users.push(newUser);
    localStorage.setItem("mygarage_users", JSON.stringify(this.users));

    // Every user starts with NO vehicles!
    localStorage.setItem(`mygarage_vehicles_${cleanUsername}`, JSON.stringify([]));

    this.currentUser = newUser;
    this.vehicles = [];

    if (remember) {
      localStorage.setItem("mygarage_session", JSON.stringify(newUser));
    }

    this.hideAuthModal();
    this.render();
    this.showToast(`Account created! Welcome to your garage, ${cleanFullName}. Add your first vehicle below!`, "success");
  }

  logoutUser() {
    this.currentUser = null;
    this.vehicles = [];
    localStorage.removeItem("mygarage_session");
    document.getElementById("userDropdownMenu").classList.remove("show");
    this.updateUserHeaderUI();
    this.render();
    this.showAuthModal();
    this.showToast("Signed out successfully.", "info");
  }

  updateUserHeaderUI() {
    const avatar = document.getElementById("headerUserAvatar");
    const nameEl = document.getElementById("headerUserName");
    const roleEl = document.getElementById("headerUserRole");
    const dropName = document.getElementById("dropdownFullName");
    const dropUser = document.getElementById("dropdownUsername");
    const logoutBtn = document.getElementById("logoutBtn");
    const signInBtn = document.getElementById("headerSignInBtn");

    if (this.currentUser) {
      const initial = (this.currentUser.name || this.currentUser.username).charAt(0).toUpperCase();
      if (avatar) avatar.textContent = initial;
      if (nameEl) nameEl.textContent = this.currentUser.name.split(" ")[0];
      if (roleEl) roleEl.textContent = this.currentUser.role || "Garage Owner";
      if (dropName) dropName.textContent = this.currentUser.name;
      if (dropUser) dropUser.textContent = `@${this.currentUser.username}`;
      if (logoutBtn) logoutBtn.classList.remove("hidden");
      if (signInBtn) signInBtn.classList.add("hidden");
    } else {
      if (avatar) avatar.textContent = "?";
      if (nameEl) nameEl.textContent = "Sign In";
      if (roleEl) roleEl.textContent = "Guest";
      if (dropName) dropName.textContent = "Guest User";
      if (dropUser) dropUser.textContent = "Not signed in";
      if (logoutBtn) logoutBtn.classList.add("hidden");
      if (signInBtn) signInBtn.classList.remove("hidden");
    }
  }

  showAuthAlert(message) {
    const alertEl = document.getElementById("authAlert");
    const textEl = document.getElementById("authAlertText");
    textEl.textContent = message;
    alertEl.classList.remove("hidden");
  }

  /* --------------------------------------------------------------------------
     Vehicle Camera & Photo Studio Logic
     -------------------------------------------------------------------------- */
  bindCameraEvents() {
    // Header global camera button
    const openGlobalCameraBtn = document.getElementById("openGlobalCameraBtn");
    if (openGlobalCameraBtn) {
      openGlobalCameraBtn.addEventListener("click", () => {
        const firstId = this.vehicles[0]?.id;
        this.openCameraModal(firstId);
      });
    }

    // Modal close
    document.getElementById("closeCameraModalBtn").addEventListener("click", () => this.closeCameraModal());

    // Vehicle target dropdown change
    const vehSelect = document.getElementById("cameraVehicleSelect");
    if (vehSelect) {
      vehSelect.addEventListener("change", (e) => {
        this.activeCameraTarget = e.target.value;
        const targetVeh = this.vehicles.find(v => v.id === this.activeCameraTarget);
        if (targetVeh) {
          const locInput = document.getElementById("camParkedLocationInput");
          if (locInput) locInput.value = targetVeh.lastParked || "";
        }
      });
    }

    // Shutter button
    const shutterBtn = document.getElementById("shutterBtn");
    if (shutterBtn) {
      shutterBtn.addEventListener("click", () => this.capturePhotoFromCamera());
    }

    // Flip camera (front / back)
    const flipBtn = document.getElementById("flipCameraBtn");
    if (flipBtn) {
      flipBtn.addEventListener("click", () => this.flipCamera());
    }

    // Retake button
    const retakeBtn = document.getElementById("retakePhotoBtn");
    if (retakeBtn) {
      retakeBtn.addEventListener("click", () => this.retakePhoto());
    }

    // Save captured photo button
    const savePhotoBtn = document.getElementById("saveCapturedPhotoBtn");
    if (savePhotoBtn) {
      savePhotoBtn.addEventListener("click", () => this.saveCapturedPhoto());
    }

    // Camera studio file upload
    const cameraFileInput = document.getElementById("cameraFileInput");
    if (cameraFileInput) {
      cameraFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) this.processPhotoFile(file, "studio");
      });
    }

    // Add Vehicle Form Camera & File upload buttons
    const formCamBtn = document.getElementById("formCameraBtn");
    if (formCamBtn) {
      formCamBtn.addEventListener("click", () => {
        this.openCameraModal("form", "form");
      });
    }

    const formFileInput = document.getElementById("formFileInput");
    if (formFileInput) {
      formFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) this.processPhotoFile(file, "form");
      });
    }

    // Listen to vehicle image text input changes in form to update thumbnail
    const formImageInput = document.getElementById("vehicleImage");
    if (formImageInput) {
      formImageInput.addEventListener("input", (e) => {
        const thumb = document.getElementById("formImageThumb");
        if (thumb && e.target.value.trim()) {
          thumb.src = e.target.value.trim();
        }
      });
    }
  }

  openCameraModal(targetId = null, context = "vehicle") {
    if (!targetId && this.vehicles.length > 0) {
      targetId = this.vehicles[0].id;
    }

    this.activeCameraTarget = targetId;
    this.capturedSnapshotDataUrl = null;

    // Populate Vehicle Dropdown
    const select = document.getElementById("cameraVehicleSelect");
    if (select) {
      select.innerHTML = "";
      if (context === "form" || targetId === "form") {
        const opt = document.createElement("option");
        opt.value = "form";
        opt.textContent = "📝 New Vehicle (Add Vehicle Form)";
        select.appendChild(opt);
      }

      this.vehicles.forEach(v => {
        const opt = document.createElement("option");
        opt.value = v.id;
        const icon = v.type === "motorcycle" ? "🏍️" : (v.fuelType === "Electric" ? "⚡" : (v.type === "truck" ? "🛻" : "🚗"));
        opt.textContent = `${icon} ${v.name} (${v.plate || 'No Plate'})`;
        if (v.id === targetId) opt.selected = true;
        select.appendChild(opt);
      });

      if (context !== "form" && targetId !== "form") {
        const opt = document.createElement("option");
        opt.value = "form";
        opt.textContent = "➕ Or Add to New Vehicle Form...";
        select.appendChild(opt);
      }
    }

    // Set parked location input
    const locInput = document.getElementById("camParkedLocationInput");
    if (locInput) {
      if (targetId === "form") {
        const formLoc = document.getElementById("vehicleLocation")?.value;
        locInput.value = formLoc || "";
      } else {
        const targetVeh = this.vehicles.find(v => v.id === targetId);
        locInput.value = targetVeh ? (targetVeh.lastParked || "") : "";
      }
    }

    // Reset UI to live shooting mode
    document.getElementById("cameraCapturedPreview").classList.add("hidden");
    document.getElementById("liveCameraControls").classList.remove("hidden");
    document.getElementById("reviewCameraControls").classList.add("hidden");

    const statusText = document.getElementById("cameraStatusText");
    if (statusText) {
      statusText.textContent = "Accessing Camera...";
    }

    document.getElementById("cameraModal").classList.remove("hidden");

    // Start video camera
    this.startDeviceCamera();
  }

  async startDeviceCamera() {
    const video = document.getElementById("deviceWebcam");
    const statusText = document.getElementById("cameraStatusText");

    // Stop existing stream if any
    if (this.webcamStream) {
      this.webcamStream.getTracks().forEach(t => t.stop());
      this.webcamStream = null;
    }

    try {
      let stream;
      // First attempt with preferred facing mode
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: this.cameraFacingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        });
      } catch (errFacing) {
        console.warn("Facing constraint failed, attempting fallback:", errFacing);
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      }

      this.webcamStream = stream;
      video.srcObject = stream;
      await video.play();

      if (statusText) statusText.textContent = "Camera Live";
      this.showToast("Camera active. Point at vehicle and press Capture Photo.", "info");
    } catch (err) {
      console.error("Camera access error:", err);
      if (statusText) statusText.textContent = "Camera Unavailable";
      this.showToast("Camera access unavailable. You can use 'Upload Photo' to select an image from your device.", "warning");
    }
  }

  async flipCamera() {
    this.cameraFacingMode = this.cameraFacingMode === "environment" ? "user" : "environment";
    const label = document.getElementById("flipCameraLabel");
    if (label) {
      label.textContent = this.cameraFacingMode === "environment" ? "Rear Camera" : "Front Camera";
    }
    await this.startDeviceCamera();
  }

  capturePhotoFromCamera() {
    const video = document.getElementById("deviceWebcam");
    const canvas = document.getElementById("cameraCanvas");
    if (!video || !canvas) return;

    // Shutter flash animation
    const flash = document.getElementById("cameraShutterFlash");
    if (flash) {
      flash.classList.remove("hidden");
      flash.classList.add("flash");
      setTimeout(() => {
        flash.classList.remove("flash");
        flash.classList.add("hidden");
      }, 150);
    }

    // Set dimensions (max 1200x800 for optimal quality and storage)
    let w = video.videoWidth || 1280;
    let h = video.videoHeight || 720;
    const maxDim = 1200;
    if (w > maxDim || h > maxDim) {
      if (w > h) {
        h = Math.round((h * maxDim) / w);
        w = maxDim;
      } else {
        w = Math.round((w * maxDim) / h);
        h = maxDim;
      }
    }

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
    this.capturedSnapshotDataUrl = dataUrl;

    // Show captured preview
    const previewImg = document.getElementById("capturedPhotoImg");
    if (previewImg) previewImg.src = dataUrl;

    document.getElementById("cameraCapturedPreview").classList.remove("hidden");
    document.getElementById("liveCameraControls").classList.add("hidden");
    document.getElementById("reviewCameraControls").classList.remove("hidden");

    const statusText = document.getElementById("cameraStatusText");
    if (statusText) statusText.textContent = "Photo Ready";

    this.showToast("Photo captured! Tap 'Save to Vehicle' to update your vehicle.", "success");
  }

  retakePhoto() {
    this.capturedSnapshotDataUrl = null;
    document.getElementById("cameraCapturedPreview").classList.add("hidden");
    document.getElementById("liveCameraControls").classList.remove("hidden");
    document.getElementById("reviewCameraControls").classList.add("hidden");

    const statusText = document.getElementById("cameraStatusText");
    if (statusText) statusText.textContent = "Camera Live";
  }

  saveCapturedPhoto() {
    if (!this.capturedSnapshotDataUrl) {
      this.showToast("No photo captured yet. Please take a photo first.", "warning");
      return;
    }

    const target = this.activeCameraTarget || document.getElementById("cameraVehicleSelect")?.value;
    const newLocation = document.getElementById("camParkedLocationInput")?.value.trim();

    if (target === "form") {
      // Pass to Add Vehicle Form
      const formImgInput = document.getElementById("vehicleImage");
      const formThumb = document.getElementById("formImageThumb");
      const formLocInput = document.getElementById("vehicleLocation");

      if (formImgInput) formImgInput.value = this.capturedSnapshotDataUrl;
      if (formThumb) formThumb.src = this.capturedSnapshotDataUrl;
      if (formLocInput && newLocation) formLocInput.value = newLocation;

      this.closeCameraModal();
      this.showToast("Captured photo attached to vehicle form!", "success");
      return;
    }

    // Save to existing vehicle in fleet
    const vehicle = this.vehicles.find(v => v.id === target);
    if (!vehicle) {
      this.showToast("Please select a valid vehicle to save this photo.", "warning");
      return;
    }

    vehicle.image = this.capturedSnapshotDataUrl;
    if (newLocation) {
      vehicle.lastParked = newLocation;
    }
    vehicle.parkedTime = "Photo updated just now";

    this.saveVehicles();
    this.render();
    this.closeCameraModal();
    this.showToast(`Updated photo for ${vehicle.name} successfully!`, "success");
  }

  processPhotoFile(file, context = "studio") {
    if (!file || !file.type.startsWith("image/")) {
      this.showToast("Please choose a valid image file.", "warning");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let w = img.width;
        let h = img.height;
        const maxDim = 1200;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);

        if (context === "form") {
          const formImgInput = document.getElementById("vehicleImage");
          const formThumb = document.getElementById("formImageThumb");
          if (formImgInput) formImgInput.value = compressedDataUrl;
          if (formThumb) formThumb.src = compressedDataUrl;
          this.showToast("Photo uploaded and attached to vehicle form!", "success");
        } else {
          this.capturedSnapshotDataUrl = compressedDataUrl;
          const previewImg = document.getElementById("capturedPhotoImg");
          if (previewImg) previewImg.src = compressedDataUrl;
          document.getElementById("cameraCapturedPreview").classList.remove("hidden");
          document.getElementById("liveCameraControls").classList.add("hidden");
          document.getElementById("reviewCameraControls").classList.remove("hidden");

          const statusText = document.getElementById("cameraStatusText");
          if (statusText) statusText.textContent = "Photo Loaded from File";
          this.showToast("Photo loaded from file. Tap 'Save to Vehicle' to apply.", "success");
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  }

  closeCameraModal() {
    if (this.webcamStream) {
      this.webcamStream.getTracks().forEach(track => track.stop());
      this.webcamStream = null;
    }
    this.capturedSnapshotDataUrl = null;
    document.getElementById("cameraModal").classList.add("hidden");
  }

  /* --------------------------------------------------------------------------
     Vehicle Health, Service Schedule & Repair Manager Logic
     -------------------------------------------------------------------------- */
  bindMaintenanceEvents() {
    const closeBtn = document.getElementById("closeMaintenanceModalBtn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeMaintenanceModal());
    const cancelBtn = document.getElementById("cancelMaintBtn");
    if (cancelBtn) cancelBtn.addEventListener("click", () => this.closeMaintenanceModal());

    const saveBtn = document.getElementById("saveMaintBtn");
    if (saveBtn) saveBtn.addEventListener("click", () => this.saveMaintenanceModal());

    const addRepairBtn = document.getElementById("addNewRepairBtn");
    if (addRepairBtn) {
      addRepairBtn.addEventListener("click", () => this.addNewRepairFromModal());
    }

    const slider = document.getElementById("maintScoreSlider");
    if (slider) {
      slider.addEventListener("input", (e) => {
        document.getElementById("maintScoreVal").textContent = `${e.target.value}%`;
        const condSelect = document.getElementById("maintConditionSelect");
        const val = parseInt(e.target.value);
        if (val >= 90) condSelect.value = "Excellent";
        else if (val >= 75) condSelect.value = "Good";
        else if (val >= 50) condSelect.value = "Fair";
        else condSelect.value = "Critical";
        this.updateModalConditionBadge(condSelect.value, val);
      });
    }

    const condSelect = document.getElementById("maintConditionSelect");
    if (condSelect) {
      condSelect.addEventListener("change", (e) => {
        const slider = document.getElementById("maintScoreSlider");
        let score = parseInt(slider.value);
        if (e.target.value === "Excellent" && score < 90) score = 95;
        else if (e.target.value === "Good" && (score < 75 || score >= 90)) score = 85;
        else if (e.target.value === "Fair" && (score < 50 || score >= 75)) score = 65;
        else if (e.target.value === "Critical" && score >= 50) score = 45;
        slider.value = score;
        document.getElementById("maintScoreVal").textContent = `${score}%`;
        this.updateModalConditionBadge(e.target.value, score);
      });
    }

    const dueDateInput = document.getElementById("maintDueDateInput");
    if (dueDateInput) {
      dueDateInput.addEventListener("input", (e) => {
        const pill = document.getElementById("maintServiceDuePill");
        const status = this.getServiceStatus(e.target.value);
        if (pill) {
          pill.className = `service-due-tag ${status.statusClass}`;
          pill.textContent = status.text;
        }
      });
    }

    const newRepairInput = document.getElementById("newRepairDescription");
    if (newRepairInput) {
      newRepairInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.addNewRepairFromModal();
        }
      });
    }
  }

  getServiceStatus(dueDateString) {
    if (!dueDateString) {
      return { text: "No date set", statusClass: "good", isOverdue: false, isDueSoon: false, days: 999 };
    }

    // Reference system date: 2026-10-29
    const today = new Date("2026-10-29T00:00:00");
    const due = new Date(dueDateString + "T00:00:00");
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      const daysOverdue = Math.abs(diffDays);
      return {
        text: `⚠️ Overdue by ${daysOverdue} day${daysOverdue === 1 ? '' : 's'}!`,
        statusClass: "critical",
        isOverdue: true,
        isDueSoon: true,
        days: diffDays
      };
    } else if (diffDays === 0) {
      return {
        text: "🚨 Due Today!",
        statusClass: "critical",
        isOverdue: false,
        isDueSoon: true,
        days: 0
      };
    } else if (diffDays <= 14) {
      return {
        text: `⏳ Due in ${diffDays} day${diffDays === 1 ? '' : 's'}`,
        statusClass: "warning",
        isOverdue: false,
        isDueSoon: true,
        days: diffDays
      };
    } else if (diffDays <= 30) {
      return {
        text: `📅 Due in ${diffDays} days`,
        statusClass: "info",
        isOverdue: false,
        isDueSoon: true,
        days: diffDays
      };
    } else {
      return {
        text: `✓ In ${diffDays} days`,
        statusClass: "good",
        isOverdue: false,
        isDueSoon: false,
        days: diffDays
      };
    }
  }

  getConditionBadge(condition, score = 85) {
    condition = condition || "Good";
    switch (condition.toLowerCase()) {
      case "excellent":
        return {
          icon: "💚",
          label: "Excellent",
          badgeClass: "cond-excellent",
          score: score || 95
        };
      case "fair":
        return {
          icon: "🟡",
          label: "Fair (Needs Attention)",
          badgeClass: "cond-fair",
          score: score || 68
        };
      case "critical":
        return {
          icon: "🚨",
          label: "Critical (Repairs Needed)",
          badgeClass: "cond-critical",
          score: score || 48
        };
      case "good":
      default:
        return {
          icon: "🔵",
          label: "Good",
          badgeClass: "cond-good",
          score: score || 85
        };
    }
  }

  updateModalConditionBadge(condition, score) {
    const badge = document.getElementById("maintConditionBadge");
    if (!badge) return;
    const info = this.getConditionBadge(condition, score);
    badge.className = `maint-condition-badge condition-badge ${info.badgeClass}`;
    badge.textContent = `${info.icon} ${condition} (${score}%)`;
  }

  openMaintenanceModal(vehicleId) {
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    this.activeMaintenanceVehicleId = vehicleId;

    document.getElementById("maintVehicleName").textContent = vehicle.name;
    document.getElementById("maintVehThumb").src = vehicle.image || "images/toyota-rav4.jpg";
    document.getElementById("maintVehiclePlate").textContent = vehicle.plate || "NO PLATE";
    document.getElementById("maintVehicleType").textContent = `${vehicle.type.toUpperCase()} • ${vehicle.fuelType}`;
    document.getElementById("maintVehicleSpot").textContent = vehicle.lastParked || "Main Garage";

    const cond = vehicle.condition || "Good";
    const score = vehicle.conditionScore || 85;
    document.getElementById("maintConditionSelect").value = cond;
    document.getElementById("maintScoreSlider").value = score;
    document.getElementById("maintScoreVal").textContent = `${score}%`;
    this.updateModalConditionBadge(cond, score);

    const dueDate = vehicle.serviceDueDate || "2026-11-15";
    document.getElementById("maintDueDateInput").value = dueDate;
    document.getElementById("maintLastServiceDateInput").value = vehicle.lastServiceDate || "";

    const status = this.getServiceStatus(dueDate);
    const pill = document.getElementById("maintServiceDuePill");
    if (pill) {
      pill.className = `service-due-tag ${status.statusClass}`;
      pill.textContent = status.text;
    }

    this.renderMaintenanceModalRepairs(vehicle);
    document.getElementById("maintenanceModal").classList.remove("hidden");
  }

  renderMaintenanceModalRepairs(vehicle) {
    const container = document.getElementById("maintRepairsList");
    const countBadge = document.getElementById("maintPendingCount");
    if (!container) return;

    const repairs = vehicle.repairs || [];
    const pendingCount = repairs.filter(r => r.status !== "completed").length;
    if (countBadge) {
      countBadge.className = `repairs-count-badge ${pendingCount > 0 ? 'has-repairs' : 'no-repairs'}`;
      countBadge.textContent = pendingCount > 0 ? `${pendingCount} Pending` : "✓ All Good";
    }

    if (repairs.length === 0) {
      container.innerHTML = `
        <div class="no-repairs-placeholder">
          ✓ No repairs recorded for this vehicle. Add any upcoming repairs or part replacements below.
        </div>
      `;
      return;
    }

    let html = "";
    repairs.forEach(r => {
      const isDone = r.status === "completed";
      const priorityClass = `priority-${r.priority || 'medium'}`;
      const priorityLabel = (r.priority || 'medium').toUpperCase();

      html += `
        <div class="maint-repair-row ${isDone ? 'completed' : ''}" data-repair-id="${r.id}">
          <label class="repair-check-wrap">
            <input type="checkbox" class="repair-checkbox" ${isDone ? 'checked' : ''} data-repair-id="${r.id}">
            <span class="repair-desc">${this.escapeHTML(r.description)}</span>
          </label>
          <div class="repair-actions-right">
            <span class="priority-tag ${priorityClass}">${priorityLabel}</span>
            <button type="button" class="btn-delete-repair" data-repair-id="${r.id}" title="Remove repair task">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll(".repair-checkbox").forEach(cb => {
      cb.addEventListener("change", (e) => {
        const repairId = cb.getAttribute("data-repair-id");
        this.toggleRepairStatus(vehicle.id, repairId);
      });
    });

    container.querySelectorAll(".btn-delete-repair").forEach(btn => {
      btn.addEventListener("click", () => {
        const repairId = btn.getAttribute("data-repair-id");
        this.deleteRepair(vehicle.id, repairId);
      });
    });
  }

  toggleRepairStatus(vehicleId, repairId) {
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (!vehicle || !vehicle.repairs) return;

    const rep = vehicle.repairs.find(r => r.id === repairId);
    if (rep) {
      rep.status = rep.status === "completed" ? "pending" : "completed";
      this.saveVehicles();
      this.renderMaintenanceModalRepairs(vehicle);
      this.render();
      this.showToast(`Repair "${rep.description}" marked as ${rep.status}`, "info");
    }
  }

  deleteRepair(vehicleId, repairId) {
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (!vehicle || !vehicle.repairs) return;

    const idx = vehicle.repairs.findIndex(r => r.id === repairId);
    if (idx !== -1) {
      const deletedDesc = vehicle.repairs[idx].description;
      vehicle.repairs.splice(idx, 1);
      this.saveVehicles();
      this.renderMaintenanceModalRepairs(vehicle);
      this.render();
      this.showToast(`Removed repair "${deletedDesc}"`, "info");
    }
  }

  addNewRepairFromModal() {
    if (!this.activeMaintenanceVehicleId) return;
    const vehicle = this.vehicles.find(v => v.id === this.activeMaintenanceVehicleId);
    if (!vehicle) return;

    const input = document.getElementById("newRepairDescription");
    const prioritySelect = document.getElementById("newRepairPriority");
    const desc = input.value.trim();

    if (!desc) {
      alert("Please describe the repair or maintenance task to be done.");
      return;
    }

    if (!vehicle.repairs) vehicle.repairs = [];

    const newRepair = {
      id: `rep-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      description: desc,
      priority: prioritySelect.value || "medium",
      status: "pending",
      dateAdded: new Date().toISOString().split("T")[0]
    };

    vehicle.repairs.push(newRepair);
    input.value = "";

    this.saveVehicles();
    this.renderMaintenanceModalRepairs(vehicle);
    this.render();
    this.showToast(`Added repair task: "${desc}"`, "success");
  }

  saveMaintenanceModal() {
    if (!this.activeMaintenanceVehicleId) return;
    const vehicle = this.vehicles.find(v => v.id === this.activeMaintenanceVehicleId);
    if (!vehicle) return;

    const condition = document.getElementById("maintConditionSelect").value;
    const score = parseInt(document.getElementById("maintScoreSlider").value) || 85;
    const dueDate = document.getElementById("maintDueDateInput").value;
    const lastDate = document.getElementById("maintLastServiceDateInput").value;

    if (!dueDate) {
      alert("Please select the next scheduled service due date.");
      return;
    }

    vehicle.condition = condition;
    vehicle.conditionScore = score;
    vehicle.serviceDueDate = dueDate;
    if (lastDate) vehicle.lastServiceDate = lastDate;

    this.saveVehicles();
    this.closeMaintenanceModal();
    this.render();
    this.showToast(`Updated health & service schedule for ${vehicle.name}!`, "success");
  }

  closeMaintenanceModal() {
    this.activeMaintenanceVehicleId = null;
    document.getElementById("maintenanceModal").classList.add("hidden");
  }

  /* --------------------------------------------------------------------------
     Settings & Fleet Data Handlers
     -------------------------------------------------------------------------- */
  loadSettings() {
    const savedTheme = localStorage.getItem("fuelpulse_theme");
    if (savedTheme) {
      this.currentTheme = savedTheme;
      document.documentElement.setAttribute("data-theme", savedTheme);
    }

    const savedUnit = localStorage.getItem("fuelpulse_unit");
    if (savedUnit && (savedUnit === "metric" || savedUnit === "imperial")) {
      this.currentUnit = savedUnit;
    }
  }

  loadVehicles() {
    if (!this.currentUser) {
      this.vehicles = [];
      return;
    }

    const userKey = `mygarage_vehicles_${this.currentUser.username.toLowerCase()}`;
    const saved = localStorage.getItem(userKey);
    if (saved) {
      try {
        this.vehicles = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse user vehicles, initializing empty", e);
        this.vehicles = [];
      }
    } else {
      // Every user starts with NO vehicles! They should add their cars manually.
      this.vehicles = [];
      localStorage.setItem(userKey, JSON.stringify([]));
    }
  }

  saveVehicles() {
    if (!this.currentUser) return;
    const userKey = `mygarage_vehicles_${this.currentUser.username.toLowerCase()}`;
    localStorage.setItem(userKey, JSON.stringify(this.vehicles));
  }

  bindEvents() {
    // Theme toggle
    document.getElementById("themeToggleBtn").addEventListener("click", () => {
      this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", this.currentTheme);
      localStorage.setItem("mygarage_theme", this.currentTheme);
    });

    // Unit toggle
    const unitBtns = document.querySelectorAll(".unit-btn");
    unitBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const selected = e.target.getAttribute("data-unit");
        if (selected !== this.currentUnit) {
          this.currentUnit = selected;
          localStorage.setItem("mygarage_unit", selected);
          this.updateUnitUI();
          this.render();
          this.showToast(`Switched units to ${selected === 'metric' ? 'Metric (km, Liters)' : 'Imperial (Miles, Gallons)'}`, 'info');
        }
      });
    });

    // Search
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", (e) => {
      this.searchQuery = e.target.value.trim().toLowerCase();
      this.renderVehiclesList();
    });

    // Filter pills
    const filterPills = document.querySelectorAll(".pill");
    filterPills.forEach(pill => {
      pill.addEventListener("click", (e) => {
        filterPills.forEach(p => p.classList.remove("active"));
        const target = e.currentTarget;
        target.classList.add("active");
        this.activeFilter = target.getAttribute("data-filter");
        this.renderVehiclesList();
      });
    });

    // Sort select
    document.getElementById("sortSelect").addEventListener("change", (e) => {
      this.sortBy = e.target.value;
      this.renderVehiclesList();
    });

    // Trip Range Simulator input
    const tripInput = document.getElementById("tripDistanceInput");
    tripInput.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      this.simulatedTripDistance = (!isNaN(val) && val > 0) ? val : null;
      this.updateTripSimulation();
      this.renderVehiclesList();
    });

    document.getElementById("clearTripBtn").addEventListener("click", () => {
      tripInput.value = "";
      this.simulatedTripDistance = null;
      this.updateTripSimulation();
      this.renderVehiclesList();
    });

    // Clear all vehicles button
    document.getElementById("resetDataBtn").addEventListener("click", () => {
      if (this.vehicles.length === 0) {
        this.showToast("Your garage is already empty. Add your vehicles first!", "info");
        return;
      }
      if (confirm("Are you sure you want to remove all vehicles from your garage? This action cannot be undone.")) {
        this.vehicles = [];
        this.saveVehicles();
        this.render();
        this.showToast("All vehicles cleared from your garage.", "info");
      }
    });

    // Add Vehicle modal triggers
    document.getElementById("openAddModalBtn").addEventListener("click", () => this.openAddModal());
    document.getElementById("emptyAddBtn").addEventListener("click", () => this.openAddModal());
    const emptyCamBtn = document.getElementById("emptyCamBtn");
    if (emptyCamBtn) emptyCamBtn.addEventListener("click", () => this.openCameraModal("form", "form"));
    document.getElementById("closeModalBtn").addEventListener("click", () => this.closeModal());
    document.getElementById("cancelModalBtn").addEventListener("click", () => this.closeModal());

    // Color picker
    const colorPicker = document.getElementById("vehicleColor");
    colorPicker.addEventListener("input", (e) => {
      document.getElementById("colorHexLabel").textContent = e.target.value;
    });

    // Fuel Type selector change updates modal labels
    document.getElementById("vehicleFuelType").addEventListener("change", (e) => {
      this.updateModalLabelsForFuelType(e.target.value);
    });

    // Modal Live Preview inputs
    ["vehicleCapacity", "vehicleCurrentFuel", "vehicleEfficiency", "vehicleFuelType"].forEach(id => {
      document.getElementById(id).addEventListener("input", () => this.updateModalPreview());
    });

    // Save Vehicle Form
    document.getElementById("vehicleForm").addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveVehicleFromForm();
    });

    // Quick Refuel Modal events
    document.getElementById("closeRefuelModalBtn").addEventListener("click", () => this.closeRefuelModal());
    document.getElementById("cancelRefuelBtn").addEventListener("click", () => this.closeRefuelModal());
    document.getElementById("confirmRefuelBtn").addEventListener("click", () => this.applyCustomRefuel());

    const quickAddBtns = document.querySelectorAll("#quickAddButtons button");
    quickAddBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const amount = e.target.getAttribute("data-amount");
        this.applyQuickRefuel(amount);
      });
    });

    // Parking Modal events
    document.getElementById("closeParkingModalBtn").addEventListener("click", () => this.closeParkingModal());
    document.getElementById("cancelParkingBtn").addEventListener("click", () => this.closeParkingModal());
    document.getElementById("saveParkingBtn").addEventListener("click", () => this.saveParkingLocation());

    // Close menus on outside click
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".card-actions-dropdown")) {
        document.querySelectorAll(".menu-dropdown.show").forEach(menu => menu.classList.remove("show"));
      }
    });
  }

  updateUnitUI() {
    const unitBtns = document.querySelectorAll(".unit-btn");
    unitBtns.forEach(btn => {
      if (btn.getAttribute("data-unit") === this.currentUnit) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    document.getElementById("tripUnitSuffix").textContent = this.currentUnit === "metric" ? "km" : "mi";
    this.updateModalLabelsForFuelType(document.getElementById("vehicleFuelType").value);
  }

  updateModalLabelsForFuelType(fuelType) {
    const isEV = fuelType === "Electric";
    const capLabel = document.getElementById("labelCapacity");
    const currLabel = document.getElementById("labelCurrentFuel");
    const effLabel = document.getElementById("labelEfficiency");

    if (isEV) {
      capLabel.textContent = "Battery Capacity (kWh) *";
      currLabel.textContent = "Current Battery Remaining (kWh) *";
      effLabel.textContent = this.currentUnit === "metric" ? "Efficiency (km/kWh) *" : "Efficiency (mi/kWh) *";
    } else {
      if (this.currentUnit === "metric") {
        capLabel.textContent = "Tank Capacity (Liters) *";
        currLabel.textContent = "Current Fuel Remaining (Liters) *";
        effLabel.textContent = "Fuel Efficiency (km/L) *";
      } else {
        capLabel.textContent = "Tank Capacity (Gallons) *";
        currLabel.textContent = "Current Fuel Remaining (Gallons) *";
        effLabel.textContent = "Fuel Efficiency (MPG) *";
      }
    }
  }

  updateModalPreview() {
    const capacity = parseFloat(document.getElementById("vehicleCapacity").value) || 0;
    const current = parseFloat(document.getElementById("vehicleCurrentFuel").value) || 0;
    const efficiency = parseFloat(document.getElementById("vehicleEfficiency").value) || 0;

    const percent = capacity > 0 ? Math.min(100, Math.round((current / capacity) * 100)) : 0;
    const range = current * efficiency;
    const distUnit = this.currentUnit === "metric" ? "km" : "mi";

    document.getElementById("previewPercentage").textContent = `${percent}%`;
    document.getElementById("previewRange").textContent = `${Math.round(range)} ${distUnit}`;
  }

  // Calculate range in current active unit
  computeVehicleRange(vehicle) {
    const isEV = vehicle.fuelType === "Electric";
    const currentFuelMetric = vehicle.currentFuel;
    const efficiencyMetric = vehicle.efficiency;

    // Range in km
    const rangeKm = currentFuelMetric * efficiencyMetric;

    if (this.currentUnit === "metric") {
      return {
        range: rangeKm,
        displayRange: Math.round(rangeKm),
        unit: "km",
        currentFuel: currentFuelMetric,
        capacity: vehicle.capacity,
        fuelUnit: isEV ? "kWh" : "L",
        efficiency: efficiencyMetric,
        efficiencyUnit: isEV ? "km/kWh" : "km/L",
        percent: Math.min(100, Math.round((vehicle.currentFuel / vehicle.capacity) * 100))
      };
    } else {
      // Imperial
      const rangeMiles = rangeKm * KM_TO_MILES;
      const currentFuelImp = isEV ? vehicle.currentFuel : (vehicle.currentFuel * LITERS_TO_GALLONS);
      const capacityImp = isEV ? vehicle.capacity : (vehicle.capacity * LITERS_TO_GALLONS);
      const efficiencyImp = isEV ? (vehicle.efficiency * KM_TO_MILES) : (vehicle.efficiency * KML_TO_MPG);

      return {
        range: rangeMiles,
        displayRange: Math.round(rangeMiles),
        unit: "mi",
        currentFuel: Number(currentFuelImp.toFixed(1)),
        capacity: Number(capacityImp.toFixed(1)),
        fuelUnit: isEV ? "kWh" : "gal",
        efficiency: Number(efficiencyImp.toFixed(1)),
        efficiencyUnit: isEV ? "mi/kWh" : "MPG",
        percent: Math.min(100, Math.round((vehicle.currentFuel / vehicle.capacity) * 100))
      };
    }
  }

  render() {
    this.updateFleetStats();
    this.updateTripSimulation();
    this.renderVehiclesList();
  }

  updateFleetStats() {
    const totalVehicles = this.vehicles.length;
    document.getElementById("statTotalVehicles").textContent = totalVehicles;

    if (totalVehicles === 0) {
      const distUnit = this.currentUnit === 'metric' ? 'km' : 'mi';
      document.getElementById("statTotalRange").innerHTML = `0 <small>${distUnit}</small>`;
      document.getElementById("statAvgRange").textContent = `Avg 0 ${distUnit}`;
      document.getElementById("statTypesBreakdown").textContent = "No active vehicles";
      document.getElementById("statAvgFuelLevel").textContent = "0%";
      document.getElementById("statFuelBar").style.width = "0%";
      document.getElementById("statLowFuelCount").textContent = "0";
      document.getElementById("statLowFuelMsg").textContent = "Garage is empty";
      const repairsEl = document.getElementById("statRepairsCount");
      const serviceDueMsg = document.getElementById("statServiceDueMsg");
      if (repairsEl) repairsEl.innerHTML = `0 <small>repairs</small>`;
      if (serviceDueMsg) serviceDueMsg.textContent = "All caught up";
      document.getElementById("countAll").textContent = "0";
      document.getElementById("countLowFuel").textContent = "0";
      const countServiceDueEl = document.getElementById("countServiceDue");
      if (countServiceDueEl) countServiceDueEl.textContent = "0";
      const countRepairsEl = document.getElementById("countRepairs");
      if (countRepairsEl) countRepairsEl.textContent = "0";
      return;
    }

    let totalRange = 0;
    let totalPercentage = 0;
    let lowFuelCount = 0;
    let totalPendingRepairs = 0;
    let serviceDueCount = 0;
    let vehiclesWithRepairsCount = 0;
    const typesSet = new Set();

    this.vehicles.forEach(v => {
      const stats = this.computeVehicleRange(v);
      totalRange += stats.range;
      totalPercentage += stats.percent;
      typesSet.add(v.type);

      if (stats.percent < 20) {
        lowFuelCount++;
      }

      // Maintenance stats
      const serviceStatus = this.getServiceStatus(v.serviceDueDate);
      if (serviceStatus.isDueSoon || serviceStatus.isOverdue) {
        serviceDueCount++;
      }

      const pending = (v.repairs || []).filter(r => r.status !== "completed");
      if (pending.length > 0) {
        totalPendingRepairs += pending.length;
        vehiclesWithRepairsCount++;
      }
    });

    const avgRange = Math.round(totalRange / totalVehicles);
    const avgFuelPercent = Math.round(totalPercentage / totalVehicles);
    const distUnit = this.currentUnit === "metric" ? "km" : "mi";

    document.getElementById("statTotalRange").innerHTML = `${Math.round(totalRange).toLocaleString()} <small>${distUnit}</small>`;
    document.getElementById("statAvgRange").textContent = `Avg ${avgRange.toLocaleString()} ${distUnit} per vehicle`;
    document.getElementById("statTypesBreakdown").textContent = `Across ${typesSet.size} categories`;

    document.getElementById("statAvgFuelLevel").textContent = `${avgFuelPercent}%`;
    document.getElementById("statFuelBar").style.width = `${avgFuelPercent}%`;

    const lowFuelEl = document.getElementById("statLowFuelCount");
    const lowFuelMsg = document.getElementById("statLowFuelMsg");
    const alertCard = document.getElementById("alertCard");

    lowFuelEl.textContent = lowFuelCount;
    if (lowFuelCount > 0) {
      lowFuelMsg.textContent = `${lowFuelCount} vehicle${lowFuelCount > 1 ? 's' : ''} require immediate refuel!`;
      alertCard.style.borderColor = "var(--danger)";
    } else {
      lowFuelMsg.textContent = "All vehicles sufficiently fueled";
      alertCard.style.borderColor = "var(--border-color)";
    }

    // Service & Repairs Stat Card
    const repairsEl = document.getElementById("statRepairsCount");
    const serviceDueMsg = document.getElementById("statServiceDueMsg");
    const maintAlertCard = document.getElementById("maintAlertCard");
    if (repairsEl && serviceDueMsg) {
      repairsEl.innerHTML = `${totalPendingRepairs} <small>repairs</small>`;
      serviceDueMsg.textContent = `${serviceDueCount} vehicle${serviceDueCount === 1 ? '' : 's'} service due`;
      if (maintAlertCard) {
        maintAlertCard.style.borderColor = (totalPendingRepairs > 0 || serviceDueCount > 0) ? "var(--warning)" : "var(--border-color)";
      }
    }

    // Update pill counts
    document.getElementById("countAll").textContent = totalVehicles;
    document.getElementById("countLowFuel").textContent = lowFuelCount;
    const countServiceDueEl = document.getElementById("countServiceDue");
    if (countServiceDueEl) countServiceDueEl.textContent = serviceDueCount;
    const countRepairsEl = document.getElementById("countRepairs");
    if (countRepairsEl) countRepairsEl.textContent = vehiclesWithRepairsCount;
  }

  updateTripSimulation() {
    const banner = document.getElementById("tripSummaryBanner");
    if (!this.simulatedTripDistance || this.vehicles.length === 0) {
      banner.classList.add("hidden");
      return;
    }

    const distUnit = this.currentUnit === "metric" ? "km" : "mi";
    let reachableCount = 0;

    this.vehicles.forEach(v => {
      const stats = this.computeVehicleRange(v);
      if (stats.range >= this.simulatedTripDistance) {
        reachableCount++;
      }
    });

    banner.classList.remove("hidden");
    if (reachableCount === this.vehicles.length) {
      banner.className = "trip-summary-banner can-reach";
      banner.innerHTML = `
        <strong>✓ All ${this.vehicles.length} vehicles can reach the ${this.simulatedTripDistance} ${distUnit} destination safely!</strong>
        <span>No refueling stops required on current tanks.</span>
      `;
    } else if (reachableCount > 0) {
      banner.className = "trip-summary-banner cannot-reach";
      banner.innerHTML = `
        <strong>${reachableCount} of ${this.vehicles.length} vehicles can complete the ${this.simulatedTripDistance} ${distUnit} trip directly.</strong>
        <span>${this.vehicles.length - reachableCount} vehicle(s) will require refueling along the way.</span>
      `;
    } else {
      banner.className = "trip-summary-banner cannot-reach";
      banner.innerHTML = `
        <strong>⚠ None of your vehicles currently have enough fuel for ${this.simulatedTripDistance} ${distUnit}.</strong>
        <span>All vehicles need to be refueled prior to departure.</span>
      `;
    }
  }

  renderVehiclesList() {
    const grid = document.getElementById("vehiclesGrid");
    const emptyState = document.getElementById("emptyState");

    // Filter
    let filtered = this.vehicles.filter(v => {
      // Search text
      if (this.searchQuery) {
        const matchesName = v.name.toLowerCase().includes(this.searchQuery);
        const matchesPlate = v.plate && v.plate.toLowerCase().includes(this.searchQuery);
        const matchesFuel = v.fuelType.toLowerCase().includes(this.searchQuery);
        const matchesLocation = v.lastParked && v.lastParked.toLowerCase().includes(this.searchQuery);
        const matchesCondition = v.condition && v.condition.toLowerCase().includes(this.searchQuery);
        if (!matchesName && !matchesPlate && !matchesFuel && !matchesLocation && !matchesCondition) return false;
      }

      // Filter pills
      if (this.activeFilter === "all") return true;
      if (this.activeFilter === "low-fuel") {
        const percent = (v.currentFuel / v.capacity) * 100;
        return percent < 20;
      }
      if (this.activeFilter === "service-due") {
        const s = this.getServiceStatus(v.serviceDueDate);
        return s.isDueSoon || s.isOverdue;
      }
      if (this.activeFilter === "repairs-needed") {
        const pending = (v.repairs || []).filter(r => r.status !== "completed");
        return pending.length > 0;
      }
      if (this.activeFilter === "ev") {
        return v.type === "ev" || v.fuelType === "Electric" || v.fuelType === "Hybrid";
      }
      return v.type === this.activeFilter;
    });

    // Sort
    filtered.sort((a, b) => {
      const statsA = this.computeVehicleRange(a);
      const statsB = this.computeVehicleRange(b);

      switch (this.sortBy) {
        case "range-desc":
          return statsB.range - statsA.range;
        case "range-asc":
          return statsA.range - statsB.range;
        case "fuel-asc":
          return statsA.percent - statsB.percent;
        case "fuel-desc":
          return statsB.percent - statsA.percent;
        case "name-asc":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    if (this.vehicles.length === 0) {
      grid.innerHTML = "";
      emptyState.classList.remove("hidden");
      const titleEl = document.getElementById("emptyStateTitle");
      const descEl = document.getElementById("emptyStateDesc");
      const userName = this.currentUser ? this.currentUser.name.split(' ')[0] : 'Driver';
      if (titleEl) titleEl.textContent = `Welcome to Your Garage, ${userName}!`;
      if (descEl) descEl.textContent = "You don't have any vehicles registered yet. Add your cars, motorcycles, or trucks manually to begin tracking remaining fuel, distance range, and maintenance!";
      return;
    }

    if (filtered.length === 0) {
      grid.innerHTML = "";
      emptyState.classList.remove("hidden");
      const titleEl = document.getElementById("emptyStateTitle");
      const descEl = document.getElementById("emptyStateDesc");
      if (titleEl) titleEl.textContent = "No matching vehicles found";
      if (descEl) descEl.textContent = "No vehicles match your active search filters. Try clearing your search query or filter pills.";
      return;
    }

    emptyState.classList.add("hidden");
    grid.innerHTML = filtered.map(v => this.createVehicleCardHTML(v)).join("");

    // Attach card event listeners
    this.attachCardEventListeners(filtered);
  }

  createVehicleCardHTML(vehicle) {
    const stats = this.computeVehicleRange(vehicle);
    const isLowFuel = stats.percent < 20;
    const isMediumFuel = stats.percent >= 20 && stats.percent < 50;
    const isBike = vehicle.type === "motorcycle";

    let statusClass = "good";
    if (isLowFuel) statusClass = "critical";
    else if (isMediumFuel) statusClass = "warning";

    // Trip badge if simulator active
    let tripBadgeHTML = "";
    if (this.simulatedTripDistance) {
      const canReach = stats.range >= this.simulatedTripDistance;
      const margin = Math.abs(Math.round(stats.range - this.simulatedTripDistance));
      const distUnit = this.currentUnit === "metric" ? "km" : "mi";

      if (canReach) {
        tripBadgeHTML = `
          <div class="trip-card-badge pass">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Can Reach Destination (+${margin} ${distUnit} margin)</span>
          </div>
        `;
      } else {
        tripBadgeHTML = `
          <div class="trip-card-badge fail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Needs Refuel (Short by ${margin} ${distUnit})</span>
          </div>
        `;
      }
    }

    const imageSrc = vehicle.image || "images/toyota-rav4.jpg";
    const lastParkedLocation = vehicle.lastParked || "Main Garage";
    const parkedTime = vehicle.parkedTime || "Recently";
    const parkedNotes = vehicle.parkedNotes || "";
    const mapsQueryUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lastParkedLocation)}`;

    const condInfo = this.getConditionBadge(vehicle.condition, vehicle.conditionScore);
    const servStatus = this.getServiceStatus(vehicle.serviceDueDate);
    const allRepairs = vehicle.repairs || [];
    const pendingRepairs = allRepairs.filter(r => r.status !== "completed");

    let repairsPreviewHTML = "";
    if (pendingRepairs.length > 0) {
      const topRepairs = pendingRepairs.slice(0, 2);
      const remainingCount = pendingRepairs.length - topRepairs.length;
      repairsPreviewHTML = `
        <div class="repairs-preview-box">
          <div class="repairs-header-row">
            <span class="repairs-header-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
              Repairs to be done
            </span>
            <span class="repairs-count-badge has-repairs">${pendingRepairs.length} Pending</span>
          </div>
          <ul class="mini-repairs-list">
            ${topRepairs.map(r => `
              <li class="mini-repair-item">
                <span class="mini-repair-text">• ${this.escapeHTML(r.description)}</span>
                <span class="priority-tag priority-${r.priority || 'medium'}">${(r.priority || 'medium').toUpperCase()}</span>
              </li>
            `).join("")}
          </ul>
          ${remainingCount > 0 ? `<div style="font-size: 0.7rem; color: var(--text-muted); margin-top: -0.2rem; margin-bottom: 0.3rem;">+${remainingCount} more repair task${remainingCount > 1 ? 's' : ''}</div>` : ''}
        </div>
      `;
    } else {
      repairsPreviewHTML = `
        <div class="repairs-preview-box">
          <div class="repairs-header-row">
            <span class="repairs-header-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
              Repair Status
            </span>
            <span class="repairs-count-badge no-repairs">✓ All Good</span>
          </div>
          <div style="font-size: 0.74rem; color: var(--text-muted); padding: 0.2rem 0;">No active repair issues reported.</div>
        </div>
      `;
    }

    return `
      <article class="vehicle-card" id="card-${vehicle.id}">
        <div class="card-top-accent" style="background-color: ${vehicle.color || '#3b82f6'};"></div>

        <!-- Vehicle Image Header -->
        <div class="card-media">
          <img 
            src="${imageSrc}" 
            alt="${this.escapeHTML(vehicle.name)}" 
            class="veh-img"
            loading="lazy"
            onerror="this.onerror=null; this.src='images/toyota-rav4.jpg';"
          >
          <div class="card-media-gradient"></div>

          <!-- Floating Camera Photo Button on Image -->
          <button class="card-cam-snap-btn live-cam-btn" data-id="${vehicle.id}" title="Open camera to take photo of this vehicle">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            <span>Take Photo</span>
          </button>

          <div class="media-tag-overlay">
            <span class="media-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              ${this.escapeHTML(parkedTime)}
            </span>
          </div>
        </div>

        ${tripBadgeHTML}

        <div class="card-header">
          <div class="veh-title-area">
            <h4 class="veh-name">${this.escapeHTML(vehicle.name)}</h4>
            <div class="veh-meta">
              <span class="veh-plate">${this.escapeHTML(vehicle.plate || 'NO PLATE')}</span>
              <span class="veh-type-tag ${vehicle.fuelType === 'Electric' ? 'electric' : ''}">${vehicle.fuelType}</span>
              ${vehicle.year ? `<span class="veh-plate">${vehicle.year}</span>` : ''}
            </div>
          </div>

          <div class="card-actions-dropdown">
            <button class="card-menu-btn" data-id="${vehicle.id}" title="Vehicle options" aria-label="Vehicle options">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
            <div class="menu-dropdown" id="menu-${vehicle.id}">
              <button class="menu-item manage-service-btn" data-id="${vehicle.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
                Service & Repair Log
              </button>
              <button class="menu-item open-cam-menu-btn" data-id="${vehicle.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                Take Photo with Camera
              </button>
              <button class="menu-item edit-parking-btn" data-id="${vehicle.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Change Parking Spot
              </button>
              <button class="menu-item edit-btn" data-id="${vehicle.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit Specs
              </button>
              <button class="menu-item delete-btn delete" data-id="${vehicle.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Delete Vehicle
              </button>
            </div>
          </div>
        </div>

        <!-- Where Parked Last Card -->
        <div class="parked-location-card">
          <div class="parked-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div class="parked-content">
            <div class="parked-label-row">
              <span class="parked-label">Last Parked Location</span>
              <span class="parked-time">${this.escapeHTML(parkedTime)}</span>
            </div>
            <div class="parked-name">${this.escapeHTML(lastParkedLocation)}</div>
            ${parkedNotes ? `<div class="parked-notes">${this.escapeHTML(parkedNotes)}</div>` : ''}
            <div>
              <button class="parked-action-link quick-park-btn" data-id="${vehicle.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Update Spot
              </button>
              &bull;
              <a href="${mapsQueryUrl}" target="_blank" rel="noopener noreferrer" class="parked-action-link">
                View on Map &rarr;
              </a>
            </div>
            <!-- Take Vehicle Photo with Camera Button -->
            <div>
              <button class="parked-camera-action-btn live-cam-btn" data-id="${vehicle.id}" title="Open device camera to take photo of ${this.escapeHTML(vehicle.name)}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <span>${isBike ? '📷 Take Bike Photo with Camera' : '📷 Take Vehicle Photo with Camera'}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Range Hero Display -->
        <div class="range-showcase">
          <span class="range-label">Estimated Driving Range</span>
          <div class="range-number">
            ${stats.displayRange.toLocaleString()} <span class="range-unit">${stats.unit}</span>
          </div>
          <span class="range-subtext">Distance it can travel on remaining fuel</span>
        </div>

        <!-- Fuel Gauge Bar -->
        <div class="fuel-gauge-section">
          <div class="gauge-header">
            <span class="gauge-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15">
                <path d="M3 22h12M4 9h10M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"></path>
              </svg>
              ${vehicle.fuelType === 'Electric' ? 'Battery Level' : 'Remaining Fuel'}
            </span>
            <span class="fuel-percent-badge ${statusClass}">${stats.percent}%</span>
          </div>

          <div class="gauge-bar-track">
            <div class="gauge-bar-fill ${statusClass}" style="width: ${stats.percent}%;"></div>
          </div>

          <div class="gauge-details">
            <span>Remaining: <strong>${stats.currentFuel} ${stats.fuelUnit}</strong></span>
            <span>Capacity: <strong>${stats.capacity} ${stats.fuelUnit}</strong></span>
          </div>

          <!-- Interactive Fuel Level Slider -->
          <div class="slider-container">
            <div class="slider-label">
              <span>Simulate / Adjust Fuel</span>
              <span id="slider-val-${vehicle.id}">${stats.currentFuel} ${stats.fuelUnit}</span>
            </div>
            <input 
              type="range" 
              class="fuel-slider" 
              data-id="${vehicle.id}" 
              min="0" 
              max="${stats.capacity}" 
              step="${stats.capacity > 30 ? '0.5' : '0.1'}" 
              value="${stats.currentFuel}"
              title="Drag to simulate fuel burn or refill"
            >
          </div>
        </div>

        <!-- Vehicle Specs -->
        <div class="card-specs-row">
          <div class="spec-item">
            <span class="spec-title">Efficiency</span>
            <span class="spec-val">${stats.efficiency} ${stats.efficiencyUnit}</span>
          </div>
          <div class="spec-item">
            <span class="spec-title">Status</span>
            <span class="spec-val" style="color: ${isLowFuel ? 'var(--danger)' : isMediumFuel ? 'var(--warning)' : 'var(--success)'};">
              ${isLowFuel ? '⚠ Refuel Urgent' : isMediumFuel ? 'Moderate Level' : '✓ Well Fueled'}
            </span>
          </div>
        </div>

        <!-- Vehicle Health Condition & Service Due Tracker -->
        <div class="card-condition-section">
          <div class="condition-top-row">
            <span class="condition-badge ${condInfo.badgeClass}" title="Vehicle condition score: ${condInfo.score}%">
              ${condInfo.icon} ${condInfo.label} (${condInfo.score}%)
            </span>
            <span class="service-due-tag ${servStatus.statusClass}">
              ${servStatus.text}
            </span>
          </div>

          <div class="service-date-row">
            <span>Next Service Due:</span>
            <span class="service-date-val">${vehicle.serviceDueDate || 'Not set'}</span>
          </div>

          ${repairsPreviewHTML}

          <button type="button" class="manage-service-btn" data-id="${vehicle.id}" title="Manage vehicle health, service due date, and repair tasks">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
            <span>Manage Health, Service &amp; Repairs</span>
          </button>
        </div>

        <!-- Footer Actions -->
        <div class="card-footer">
          <button class="btn btn-outline btn-sm quick-refuel-btn" data-id="${vehicle.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            <span>Quick Refuel</span>
          </button>
          <button class="btn btn-outline btn-sm manage-service-btn" data-id="${vehicle.id}" title="Manage Service & Repairs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
            <span>Service &amp; Repairs</span>
          </button>
        </div>
      </article>
    `;
  }

  attachCardEventListeners(filteredVehicles) {
    // Menu Dropdown toggle
    document.querySelectorAll(".card-menu-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        const menu = document.getElementById(`menu-${id}`);
        document.querySelectorAll(".menu-dropdown.show").forEach(m => {
          if (m !== menu) m.classList.remove("show");
        });
        menu.classList.toggle("show");
      });
    });

    // Slider real-time drag
    document.querySelectorAll(".fuel-slider").forEach(slider => {
      slider.addEventListener("input", (e) => {
        const id = e.target.getAttribute("data-id");
        const vehicle = this.vehicles.find(v => v.id === id);
        if (!vehicle) return;

        const valInActiveUnit = parseFloat(e.target.value);
        const isEV = vehicle.fuelType === "Electric";

        // Convert back to metric base for internal storage
        if (this.currentUnit === "metric" || isEV) {
          vehicle.currentFuel = valInActiveUnit;
        } else {
          // Imperial gallons to Liters
          vehicle.currentFuel = valInActiveUnit / LITERS_TO_GALLONS;
        }

        // Clamp
        vehicle.currentFuel = Math.max(0, Math.min(vehicle.capacity, vehicle.currentFuel));
        this.saveVehicles();

        // Update card smoothly
        this.updateCardDOM(vehicle);
        this.updateFleetStats();
        this.updateTripSimulation();
      });
    });

    // Quick refuel trigger
    document.querySelectorAll(".quick-refuel-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        this.openRefuelModal(id);
      });
    });

    // Quick Parking update trigger
    document.querySelectorAll(".quick-park-btn, .edit-parking-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        this.openParkingModal(id);
      });
    });

    // Live Parking Camera View trigger (from card button, badge, or dropdown)
    document.querySelectorAll(".live-cam-btn, .media-cam-badge, .open-cam-menu-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        this.openCameraModal(id, "single");
      });
    });

    // Edit button
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        this.openEditModal(id);
      });
    });

    // Maintenance & Service Manager trigger
    document.querySelectorAll(".manage-service-btn, .menu-maint-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        this.openMaintenanceModal(id);
      });
    });

    // Delete button
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        this.deleteVehicle(id);
      });
    });
  }

  // Smooth DOM update for a single card when slider moves
  updateCardDOM(vehicle) {
    const card = document.getElementById(`card-${vehicle.id}`);
    if (!card) return;

    const stats = this.computeVehicleRange(vehicle);
    const isLowFuel = stats.percent < 20;
    const isMediumFuel = stats.percent >= 20 && stats.percent < 50;

    let statusClass = "good";
    if (isLowFuel) statusClass = "critical";
    else if (isMediumFuel) statusClass = "warning";

    // Update range
    const rangeEl = card.querySelector(".range-number");
    if (rangeEl) {
      rangeEl.innerHTML = `${stats.displayRange.toLocaleString()} <span class="range-unit">${stats.unit}</span>`;
    }

    // Update badge
    const badge = card.querySelector(".fuel-percent-badge");
    if (badge) {
      badge.textContent = `${stats.percent}%`;
      badge.className = `fuel-percent-badge ${statusClass}`;
    }

    // Update bar fill
    const fill = card.querySelector(".gauge-bar-fill");
    if (fill) {
      fill.style.width = `${stats.percent}%`;
      fill.className = `gauge-bar-fill ${statusClass}`;
    }

    // Update gauge text
    const details = card.querySelector(".gauge-details");
    if (details) {
      details.innerHTML = `
        <span>Remaining: <strong>${stats.currentFuel} ${stats.fuelUnit}</strong></span>
        <span>Capacity: <strong>${stats.capacity} ${stats.fuelUnit}</strong></span>
      `;
    }

    // Update slider label
    const sliderVal = document.getElementById(`slider-val-${vehicle.id}`);
    if (sliderVal) {
      sliderVal.textContent = `${stats.currentFuel} ${stats.fuelUnit}`;
    }

    // Update trip badge if present
    if (this.simulatedTripDistance) {
      const canReach = stats.range >= this.simulatedTripDistance;
      const margin = Math.abs(Math.round(stats.range - this.simulatedTripDistance));
      const distUnit = this.currentUnit === "metric" ? "km" : "mi";
      let tripBadge = card.querySelector(".trip-card-badge");

      if (!tripBadge) {
        tripBadge = document.createElement("div");
        card.insertBefore(tripBadge, card.querySelector(".card-header"));
      }

      if (canReach) {
        tripBadge.className = "trip-card-badge pass";
        tripBadge.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Can Reach Destination (+${margin} ${distUnit} margin)</span>
        `;
      } else {
        tripBadge.className = "trip-card-badge fail";
        tripBadge.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>Needs Refuel (Short by ${margin} ${distUnit})</span>
        `;
      }
    }
  }

  // Parking Location Modal
  openParkingModal(vehicleId) {
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    this.activeParkingVehicleId = vehicleId;
    document.getElementById("parkingVehicleName").textContent = `Vehicle: ${vehicle.name}`;
    document.getElementById("newParkedLocation").value = vehicle.lastParked || "";
    document.getElementById("newParkedNotes").value = vehicle.parkedNotes || "";
    document.getElementById("parkingModal").classList.remove("hidden");
  }

  closeParkingModal() {
    this.activeParkingVehicleId = null;
    document.getElementById("parkingModal").classList.add("hidden");
  }

  saveParkingLocation() {
    if (!this.activeParkingVehicleId) return;
    const vehicle = this.vehicles.find(v => v.id === this.activeParkingVehicleId);
    if (!vehicle) return;

    const newLoc = document.getElementById("newParkedLocation").value.trim();
    const newNotes = document.getElementById("newParkedNotes").value.trim();

    if (!newLoc) {
      alert("Please enter a parking location.");
      return;
    }

    vehicle.lastParked = newLoc;
    vehicle.parkedNotes = newNotes;
    vehicle.parkedTime = "Updated just now";

    this.saveVehicles();
    this.closeParkingModal();
    this.render();
    this.showToast(`Updated parked location for ${vehicle.name}`, "success");
  }

  // Refuel Modal
  openRefuelModal(vehicleId) {
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    this.activeRefuelVehicleId = vehicleId;
    const stats = this.computeVehicleRange(vehicle);

    document.getElementById("refuelVehicleName").textContent = vehicle.name;
    document.getElementById("refuelCurrentLiters").textContent = `${stats.currentFuel} ${stats.fuelUnit}`;
    document.getElementById("refuelMaxLiters").textContent = `${stats.capacity} ${stats.fuelUnit}`;
    document.getElementById("refuelUnitSuffix").textContent = stats.fuelUnit;
    document.getElementById("customRefuelAmount").value = "";

    document.getElementById("refuelModal").classList.remove("hidden");
  }

  closeRefuelModal() {
    this.activeRefuelVehicleId = null;
    document.getElementById("refuelModal").classList.add("hidden");
  }

  applyQuickRefuel(amountKey) {
    if (!this.activeRefuelVehicleId) return;
    const vehicle = this.vehicles.find(v => v.id === this.activeRefuelVehicleId);
    if (!vehicle) return;

    if (amountKey === "full") {
      vehicle.currentFuel = vehicle.capacity;
    } else {
      const addedMetric = parseFloat(amountKey);
      vehicle.currentFuel = Math.min(vehicle.capacity, vehicle.currentFuel + addedMetric);
    }

    this.saveVehicles();
    this.closeRefuelModal();
    this.render();
    this.showToast(`Successfully refueled ${vehicle.name}!`, "success");
  }

  applyCustomRefuel() {
    if (!this.activeRefuelVehicleId) return;
    const vehicle = this.vehicles.find(v => v.id === this.activeRefuelVehicleId);
    if (!vehicle) return;

    const inputVal = parseFloat(document.getElementById("customRefuelAmount").value);
    if (isNaN(inputVal) || inputVal <= 0) {
      alert("Please enter a valid positive fuel amount.");
      return;
    }

    const isEV = vehicle.fuelType === "Electric";
    let amountInMetric = inputVal;
    if (this.currentUnit === "imperial" && !isEV) {
      amountInMetric = inputVal / LITERS_TO_GALLONS;
    }

    vehicle.currentFuel = Math.min(vehicle.capacity, vehicle.currentFuel + amountInMetric);
    this.saveVehicles();
    this.closeRefuelModal();
    this.render();
    this.showToast(`Added fuel to ${vehicle.name}`, "success");
  }

  // Add / Edit Modal
  openAddModal() {
    document.getElementById("vehicleId").value = "";
    document.getElementById("modalTitle").textContent = "Add New Vehicle";
    document.getElementById("vehicleName").value = "";
    document.getElementById("vehicleYear").value = new Date().getFullYear();
    document.getElementById("vehicleType").value = "car";
    document.getElementById("vehicleFuelType").value = "Petrol";
    document.getElementById("vehiclePlate").value = "";
    document.getElementById("vehicleCapacity").value = "";
    document.getElementById("vehicleCurrentFuel").value = "";
    document.getElementById("vehicleEfficiency").value = "";
    document.getElementById("vehicleLocation").value = "Home Garage";
    document.getElementById("vehicleImage").value = "images/toyota-rav4.jpg";
    const addThumb = document.getElementById("formImageThumb");
    if (addThumb) addThumb.src = "images/toyota-rav4.jpg";
    document.getElementById("vehicleColor").value = "#3b82f6";
    document.getElementById("colorHexLabel").textContent = "#3b82f6";
    document.getElementById("vehicleNotes").value = "";

    document.getElementById("vehicleCondition").value = "Good";
    document.getElementById("vehicleConditionScore").value = "88";
    document.getElementById("vehicleServiceDueDate").value = "2026-12-01";
    document.getElementById("vehiclePendingRepairs").value = "";

    this.updateModalLabelsForFuelType("Petrol");
    this.updateModalPreview();

    document.getElementById("vehicleModal").classList.remove("hidden");
  }

  openEditModal(id) {
    const v = this.vehicles.find(item => item.id === id);
    if (!v) return;

    document.getElementById("vehicleId").value = v.id;
    document.getElementById("modalTitle").textContent = "Edit Vehicle Specs";
    document.getElementById("vehicleName").value = v.name;
    document.getElementById("vehicleYear").value = v.year || "";
    document.getElementById("vehicleType").value = v.type;
    document.getElementById("vehicleFuelType").value = v.fuelType;
    document.getElementById("vehiclePlate").value = v.plate || "";
    document.getElementById("vehicleLocation").value = v.lastParked || "";
    document.getElementById("vehicleImage").value = v.image || "";
    const editThumb = document.getElementById("formImageThumb");
    if (editThumb) editThumb.src = v.image || "images/toyota-rav4.jpg";
    document.getElementById("vehicleColor").value = v.color || "#3b82f6";
    document.getElementById("colorHexLabel").textContent = v.color || "#3b82f6";
    document.getElementById("vehicleNotes").value = v.notes || "";

    document.getElementById("vehicleCondition").value = v.condition || "Good";
    document.getElementById("vehicleConditionScore").value = v.conditionScore !== undefined ? v.conditionScore : 85;
    document.getElementById("vehicleServiceDueDate").value = v.serviceDueDate || "2026-12-01";
    const pendingTasks = (v.repairs || []).filter(r => r.status !== "completed").map(r => r.description);
    document.getElementById("vehiclePendingRepairs").value = pendingTasks.join(", ");

    const isEV = v.fuelType === "Electric";
    if (this.currentUnit === "metric" || isEV) {
      document.getElementById("vehicleCapacity").value = v.capacity;
      document.getElementById("vehicleCurrentFuel").value = v.currentFuel;
      document.getElementById("vehicleEfficiency").value = v.efficiency;
    } else {
      document.getElementById("vehicleCapacity").value = Number((v.capacity * LITERS_TO_GALLONS).toFixed(1));
      document.getElementById("vehicleCurrentFuel").value = Number((v.currentFuel * LITERS_TO_GALLONS).toFixed(1));
      document.getElementById("vehicleEfficiency").value = Number((v.efficiency * KML_TO_MPG).toFixed(1));
    }

    this.updateModalLabelsForFuelType(v.fuelType);
    this.updateModalPreview();

    document.getElementById("vehicleModal").classList.remove("hidden");
  }

  closeModal() {
    document.getElementById("vehicleModal").classList.add("hidden");
  }

  saveVehicleFromForm() {
    const id = document.getElementById("vehicleId").value;
    const name = document.getElementById("vehicleName").value.trim();
    const year = parseInt(document.getElementById("vehicleYear").value) || null;
    const type = document.getElementById("vehicleType").value;
    const fuelType = document.getElementById("vehicleFuelType").value;
    const plate = document.getElementById("vehiclePlate").value.trim();
    const location = document.getElementById("vehicleLocation").value.trim() || "Main Garage";
    const image = document.getElementById("vehicleImage").value.trim() || "images/toyota-rav4.jpg";
    const color = document.getElementById("vehicleColor").value;
    const notes = document.getElementById("vehicleNotes").value.trim();

    const condition = document.getElementById("vehicleCondition").value || "Good";
    const conditionScore = parseInt(document.getElementById("vehicleConditionScore").value) || 85;
    const serviceDueDate = document.getElementById("vehicleServiceDueDate").value || "2026-12-01";
    const pendingRepairsInput = document.getElementById("vehiclePendingRepairs").value.trim();

    const inputCapacity = parseFloat(document.getElementById("vehicleCapacity").value);
    const inputCurrent = parseFloat(document.getElementById("vehicleCurrentFuel").value);
    const inputEfficiency = parseFloat(document.getElementById("vehicleEfficiency").value);

    if (!name || isNaN(inputCapacity) || isNaN(inputCurrent) || isNaN(inputEfficiency)) {
      alert("Please fill in all required fields with valid values.");
      return;
    }

    if (!serviceDueDate) {
      alert("Please select the scheduled service due date.");
      return;
    }

    const isEV = fuelType === "Electric";
    let capacityMetric = inputCapacity;
    let currentMetric = inputCurrent;
    let efficiencyMetric = inputEfficiency;

    // Convert from Imperial to metric if needed
    if (this.currentUnit === "imperial" && !isEV) {
      capacityMetric = inputCapacity / LITERS_TO_GALLONS;
      currentMetric = inputCurrent / LITERS_TO_GALLONS;
      efficiencyMetric = inputEfficiency / KML_TO_MPG;
    }

    if (currentMetric > capacityMetric) {
      alert("Current fuel level cannot exceed maximum tank capacity.");
      return;
    }

    if (id) {
      // Edit existing
      const index = this.vehicles.findIndex(v => v.id === id);
      if (index !== -1) {
        let existingRepairs = this.vehicles[index].repairs ? [...this.vehicles[index].repairs] : [];
        if (pendingRepairsInput) {
          const splitRepairs = pendingRepairsInput.split(",").map(s => s.trim()).filter(Boolean);
          splitRepairs.forEach(desc => {
            if (!existingRepairs.some(r => r.description.toLowerCase() === desc.toLowerCase())) {
              existingRepairs.push({
                id: `rep-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                description: desc,
                priority: "medium",
                status: "pending",
                dateAdded: new Date().toISOString().split("T")[0]
              });
            }
          });
        }

        this.vehicles[index] = {
          ...this.vehicles[index],
          name,
          year,
          type,
          fuelType,
          plate,
          lastParked: location,
          image,
          cctvImage: image,
          capacity: Number(capacityMetric.toFixed(2)),
          currentFuel: Number(currentMetric.toFixed(2)),
          efficiency: Number(efficiencyMetric.toFixed(2)),
          color,
          notes,
          condition,
          conditionScore,
          serviceDueDate,
          repairs: existingRepairs
        };
        this.showToast(`Updated specs for ${name}`, "success");
      }
    } else {
      // Add new
      let newRepairs = [];
      if (pendingRepairsInput) {
        newRepairs = pendingRepairsInput.split(",").map(s => s.trim()).filter(Boolean).map(desc => ({
          id: `rep-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          description: desc,
          priority: "medium",
          status: "pending",
          dateAdded: new Date().toISOString().split("T")[0]
        }));
      }

      const newVehicle = {
        id: `veh-${Date.now()}`,
        name,
        year,
        type,
        fuelType,
        plate,
        lastParked: location,
        parkedTime: "Just now",
        parkedNotes: "Newly added vehicle",
        image,
        cctvImage: image,
        cctvCamId: "CAM-01 • LOT A",
        cctvTarget: `AI OBJECT: ${name.toUpperCase()} [SECURE]`,
        capacity: Number(capacityMetric.toFixed(2)),
        currentFuel: Number(currentMetric.toFixed(2)),
        efficiency: Number(efficiencyMetric.toFixed(2)),
        color,
        notes,
        condition,
        conditionScore,
        serviceDueDate,
        lastServiceDate: "2026-05-01",
        repairs: newRepairs
      };
      this.vehicles.unshift(newVehicle);
      this.showToast(`Added new vehicle: ${name}`, "success");
    }

    this.saveVehicles();
    this.closeModal();
    this.render();
  }

  deleteVehicle(id) {
    const vehicle = this.vehicles.find(v => v.id === id);
    if (!vehicle) return;

    if (confirm(`Are you sure you want to delete ${vehicle.name} from your fleet?`)) {
      this.vehicles = this.vehicles.filter(v => v.id !== id);
      this.saveVehicles();
      this.render();
      this.showToast(`Deleted ${vehicle.name}`, "info");
    }
  }

  // Toast Notification
  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let iconSVG = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    `;
    if (type === "success") {
      iconSVG = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" color="#10b981">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
    }

    toast.innerHTML = `${iconSVG}<span>${this.escapeHTML(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(50px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  escapeHTML(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Initialize Application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new FuelTrackerApp();
});
