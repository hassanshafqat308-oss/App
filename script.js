
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged,
  updateProfile,
  signOut
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

/* =====================================
   1. FIREBASE CONFIGURATION
===================================== */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const firebaseConfigured =
  firebaseConfig.apiKey !== "YOUR_API_KEY" &&
  firebaseConfig.projectId !== "YOUR_PROJECT_ID";

let auth = null;

if (firebaseConfigured) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  auth.useDeviceLanguage();
}

/* =====================================
   2. FOOD DATABASE - 30 ITEMS
===================================== */

const foods = [
  {id:1,name:"Margherita Pizza",category:"Pizza",restaurant:"Pizza Palace",price:850,image:"https://images.unsplash.com/photo-1579751626657-72bc17010498"},
  {id:2,name:"Pepperoni Pizza",category:"Pizza",restaurant:"Pizza Palace",price:1100,image:"https://images.unsplash.com/photo-1628840042765-356cda07504e"},
  {id:3,name:"Cheese Pizza",category:"Pizza",restaurant:"Italian Kitchen",price:950,image:"https://images.unsplash.com/photo-1513104890138-7c749659a591"},
  {id:4,name:"BBQ Chicken Pizza",category:"Pizza",restaurant:"Italian Kitchen",price:1250,image:"https://images.unsplash.com/photo-1594007654729-407eedc4be65"},
  {id:5,name:"Vegetable Pizza",category:"Pizza",restaurant:"Pizza Palace",price:900,image:"https://images.unsplash.com/photo-1571407970349-bc81e7e96d47"},

  {id:6,name:"Classic Beef Burger",category:"Burgers",restaurant:"Burger House",price:650,image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"},
  {id:7,name:"Cheese Burger",category:"Burgers",restaurant:"Burger House",price:750,image:"https://images.unsplash.com/photo-1550547660-d9450f859349"},
  {id:8,name:"Chicken Burger",category:"Burgers",restaurant:"Grill Station",price:600,image:"https://images.unsplash.com/photo-1606755962773-d324e0a13086"},
  {id:9,name:"Double Beef Burger",category:"Burgers",restaurant:"Grill Station",price:950,image:"https://images.unsplash.com/photo-1571091718767-18b5b1457add"},
  {id:10,name:"Zinger Burger",category:"Burgers",restaurant:"Burger House",price:700,image:"https://images.unsplash.com/photo-1606755962773-d324e0a13086"},

  {id:11,name:"Fried Chicken",category:"Chicken",restaurant:"Chicken Corner",price:550,image:"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec"},
  {id:12,name:"Chicken Wings",category:"Chicken",restaurant:"Chicken Corner",price:650,image:"https://images.unsplash.com/photo-1527477396000-e27163b481c2"},
  {id:13,name:"Chicken Nuggets",category:"Chicken",restaurant:"Grill Station",price:500,image:"https://images.unsplash.com/photo-1562967914-608f82629710"},
  {id:14,name:"Chicken Tikka",category:"Chicken",restaurant:"Chicken Corner",price:800,image:"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0"},
  {id:15,name:"Grilled Chicken",category:"Chicken",restaurant:"Grill Station",price:950,image:"https://images.unsplash.com/photo-1532550907401-a500c9a57435"},

  {id:16,name:"Chicken Chow Mein",category:"Chinese",restaurant:"Chinese Express",price:750,image:"https://images.unsplash.com/photo-1585032226651-759b368d7246"},
  {id:17,name:"Fried Rice",category:"Chinese",restaurant:"Chinese Express",price:600,image:"https://images.unsplash.com/photo-1603133872878-684f208fb84b"},
  {id:18,name:"Chicken Manchurian",category:"Chinese",restaurant:"Asian Kitchen",price:850,image:"https://images.unsplash.com/photo-1512058564366-18510be2db19"},
  {id:19,name:"Spring Rolls",category:"Chinese",restaurant:"Asian Kitchen",price:450,image:"https://images.unsplash.com/photo-1544025162-d76694265947"},
  {id:20,name:"Sweet and Sour Chicken",category:"Chinese",restaurant:"Chinese Express",price:900,image:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"},

  {id:21,name:"Chocolate Cake",category:"Desserts",restaurant:"Sweet Treats",price:450,image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587"},
  {id:22,name:"Ice Cream",category:"Desserts",restaurant:"Sweet Treats",price:250,image:"https://images.unsplash.com/photo-1501446529957-6226bd447c46"},
  {id:23,name:"Chocolate Brownie",category:"Desserts",restaurant:"Sweet Treats",price:350,image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c"},
  {id:24,name:"Cheesecake",category:"Desserts",restaurant:"Sweet Treats",price:500,image:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad"},
  {id:25,name:"Donuts",category:"Desserts",restaurant:"Sweet Treats",price:300,image:"https://images.unsplash.com/photo-1551024506-0bccd828d307"},

  {id:26,name:"Fresh Orange Juice",category:"Drinks",restaurant:"Fresh Drinks",price:250,image:"https://images.unsplash.com/photo-1600271886742-f049cd451bba"},
  {id:27,name:"Cold Coffee",category:"Drinks",restaurant:"Fresh Drinks",price:350,image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735"},
  {id:28,name:"Strawberry Milkshake",category:"Drinks",restaurant:"Fresh Drinks",price:400,image:"https://images.unsplash.com/photo-1572490122747-3968b75cc699"},
  {id:29,name:"Lemonade",category:"Drinks",restaurant:"Fresh Drinks",price:200,image:"https://images.unsplash.com/photo-1513558161293-cdaf765edfd4"},
  {id:30,name:"Mango Smoothie",category:"Drinks",restaurant:"Fresh Drinks",price:380,image:"https://images.unsplash.com/photo-1505252585461-04db1eb84625"}
];

/* =====================================
   3. GENERAL HELPERS
===================================== */

const $ = id => document.getElementById(id);

let cart = [];
let selectedCity = "";
let selectedAddress = "";
let confirmationResult = null;
let recaptchaVerifier = null;
let currentUser = null;
let authMode = "login";

const deliveryFee = 150;

function notify(message) {
  const box = $("notification");
  box.textContent = message;
  box.classList.add("show");

  setTimeout(() => box.classList.remove("show"), 3000);
}

function openDialog(id) {
  $(id).showModal();
}

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => {
    $(button.dataset.close).close();
  });
});

/* =====================================
   4. FOOD DISPLAY AND FILTERING
===================================== */

function displayFoods() {
  const search = $("foodSearch").value.toLowerCase();
  const category = $("categoryFilter").value;
  const sort = $("sortFilter").value;

  let results = foods.filter(food => {
    const matchesSearch =
      food.name.toLowerCase().includes(search) ||
      food.restaurant.toLowerCase().includes(search);

    const matchesCategory =
      category === "All" || food.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sort === "low") {
    results.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    results.sort((a, b) => b.price - a.price);
  }

  $("foodGrid").innerHTML = results.length
    ? results.map(food => `
      <article class="food-card">
        <img src="${food.image}" alt="${food.name}" loading="lazy">
        <div class="food-info">
          <h3>${food.name}</h3>
          <p>${food.restaurant} · ${food.category}</p>
          <div class="food-bottom">
            <span class="food-price">Rs. ${food.price}</span>
            <button class="add-btn" data-add="${food.id}">
              Add +
            </button>
          </div>
        </div>
      </article>
    `).join("")
    : "<p>No food items found.</p>";
}

$("foodGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  addToCart(Number(button.dataset.add));
});

$("foodSearch").addEventListener("input", displayFoods);
$("categoryFilter").addEventListener("change", displayFoods);
$("sortFilter").addEventListener("change", displayFoods);

/* =====================================
   5. CART SYSTEM
===================================== */

function addToCart(id) {
  const item = cart.find(item => item.id === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({id, quantity:1});
  }

  updateCart();
  notify("Item added to your cart.");
}

function getSubtotal() {
  return cart.reduce((sum, item) => {
    const food = foods.find(food => food.id === item.id);
    return sum + food.price * item.quantity;
  }, 0);
}

function updateCart() {
  const count = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  $("cartCount").textContent = count;

  if (!cart.length) {
    $("cartItems").innerHTML = "<p>Your cart is empty.</p>";
    $("cartSummary").innerHTML = "";
    $("checkoutSummary").innerHTML = "";
    return;
  }

  $("cartItems").innerHTML = cart.map(item => {
    const food = foods.find(food => food.id === item.id);

    return `
      <div class="cart-row">
        <div>
          <strong>${food.name}</strong>
          <p>Rs. ${food.price * item.quantity}</p>
        </div>

        <div class="quantity-controls">
          <button data-change="${item.id}" data-amount="-1">−</button>
          <span>${item.quantity}</span>
          <button data-change="${item.id}" data-amount="1">+</button>
        </div>
      </div>
    `;
  }).join("");

  const subtotal = getSubtotal();

  const summary = `
    <div class="summary-line">
      <span>Subtotal</span>
      <span>Rs. ${subtotal}</span>
    </div>
    <div class="summary-line">
      <span>Delivery fee</span>
      <span>Rs. ${deliveryFee}</span>
    </div>
    <div class="summary-line total-line">
      <span>Total</span>
      <span>Rs. ${subtotal + deliveryFee}</span>
    </div>
  `;

  $("cartSummary").innerHTML = summary;
  $("checkoutSummary").innerHTML = summary;
}

$("cartItems").addEventListener("click", event => {
  const button = event.target.closest("[data-change]");
  if (!button) return;

  const id = Number(button.dataset.change);
  const amount = Number(button.dataset.amount);
  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  updateCart();
});

$("cartBtn").addEventListener("click", () => {
  updateCart();
  openDialog("cartDialog");
});

/* =====================================
   6. WORLDWIDE LOCATION SEARCH
===================================== */

let cityTimer;
let addressTimer;
let heroTimer;

async function searchPlaces(query) {
  const url =
    "https://photon.komoot.io/api/?q=" +
    encodeURIComponent(query) +
    "&limit=20";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Location search failed");
  }

  const data = await response.json();
  return data.features || [];
}

function placeName(place) {
  const p = place.properties;

  return [
    p.name,
    p.street,
    p.city || p.town || p.village,
    p.state,
    p.country
  ].filter(Boolean).filter(
    (value, index, array) => array.indexOf(value) === index
  ).join(", ");
}

function showSuggestions(
  container,
  places,
  onSelect,
  cityOnly = false
) {
  const filtered = cityOnly
    ? places.filter(place => {
        const type = place.properties.type;

        return [
          "city",
          "town",
          "village",
          "municipality",
          "district"
        ].includes(type);
      })
    : places;

  container.innerHTML = "";

  if (!filtered.length) {
    container.innerHTML =
      '<div class="suggestion-item">No locations found. Try another search.</div>';
    return;
  }

  filtered.forEach(place => {
    const item = document.createElement("div");

    item.className = "suggestion-item";
    item.textContent = placeName(place);

    item.addEventListener("click", () => {
      onSelect(place);
      container.innerHTML = "";
    });

    container.appendChild(item);
  });
}

$("openLocation").addEventListener("click", () => {
  openDialog("locationDialog");
});

$("cityInput").addEventListener("input", () => {
  clearTimeout(cityTimer);

  const query = $("cityInput").value.trim();

  if (query.length < 2) {
    $("citySuggestions").innerHTML = "";
    return;
  }

  cityTimer = setTimeout(async () => {
    try {
      const places = await searchPlaces(query);

      showSuggestions(
        $("citySuggestions"),
        places,
        place => {
          const p = place.properties;

          selectedCity = [
            p.name,
            p.state,
            p.country
          ].filter(Boolean).join(", ");

          $("cityInput").value = selectedCity;

          $("selectedCityText").textContent =
            "Selected city: " + selectedCity;
        },
        true
      );
    } catch {
      notify("Could not search for cities. Try again.");
    }
  }, 350);
});

$("addressInput").addEventListener("input", () => {
  clearTimeout(addressTimer);

  const query = $("addressInput").value.trim();

  if (query.length < 3) {
    $("addressSuggestions").innerHTML = "";
    return;
  }

  addressTimer = setTimeout(async () => {
    try {
      const searchQuery = selectedCity
        ? query + " " + selectedCity
        : query;

      const places = await searchPlaces(searchQuery);

      showSuggestions(
        $("addressSuggestions"),
        places,
        place => {
          selectedAddress = placeName(place);
          $("addressInput").value = selectedAddress;
        }
      );
    } catch {
      notify("Address search is temporarily unavailable.");
    }
  }, 350);
});

$("heroAddress").addEventListener("input", () => {
  clearTimeout(heroTimer);

  const query = $("heroAddress").value.trim();

  if (query.length < 3) {
    $("heroSuggestions").innerHTML = "";
    return;
  }

  heroTimer = setTimeout(async () => {
    try {
      const places = await searchPlaces(query);

      showSuggestions(
        $("heroSuggestions"),
        places,
        place => {
          selectedAddress = placeName(place);

          const p = place.properties;

          selectedCity = [
            p.city || p.town || p.village,
            p.state,
            p.country
          ].filter(Boolean).join(", ");

          $("heroAddress").value = selectedAddress;
          $("cityInput").value = selectedCity;
          $("addressInput").value = selectedAddress;
        }
      );
    } catch {
      notify("Location search is unavailable.");
    }
  }, 350);
});

$("heroSearchBtn").addEventListener("click", () => {
  const address = $("heroAddress").value.trim();

  if (!address) {
    notify("Please enter a city or delivery address.");
    return;
  }

  selectedAddress = address;

  notify("Delivery location selected.");
  $("heroSuggestions").innerHTML = "";

  document.querySelector(".food-section").scrollIntoView({
    behavior: "smooth"
  });
});

$("saveLocation").addEventListener("click", () => {
  const city = $("cityInput").value.trim();
  const address = $("addressInput").value.trim();

  if (!city || !address) {
    notify("Please select a city and enter an address.");
    return;
  }

  selectedCity = city;
  selectedAddress = address;

  $("openLocation").textContent = city;
  $("heroAddress").value = address;

  $("locationDialog").close();
  notify("Delivery location saved.");
});

/* =====================================
   7. AUTOMATIC COUNTRY DETECTION
===================================== */

function getBrowserCountry() {
  const language = navigator.language || "en-US";
  const match = language.match(/-([A-Z]{2})$/);

  return match ? match[1].toLowerCase() : "us";
}

function countryLookup(callback) {
  fetch("https://ipapi.co/json/")
    .then(response => {
      if (!response.ok) throw new Error("Country lookup failed");
      return response.json();
    })
    .then(data => {
      callback((data.country_code || getBrowserCountry()).toLowerCase());
    })
    .catch(() => {
      callback(getBrowserCountry());
    });
}

const phoneOptions = {
  initialCountry: "auto",
  geoIpLookup: countryLookup,
  separateDialCode: true,
  nationalMode: true,
  allowDropdown: true,
  showFlags: true,
  preferredCountries: ["pk", "us", "gb", "ae", "sa", "in"]
};

const phoneWidget = window.intlTelInput(
  $("authPhone"),
  {...phoneOptions}
);

const checkoutPhoneWidget = window.intlTelInput(
  $("customerPhone"),
  {...phoneOptions}
);

/* =====================================
   8. LOGIN AND SIGNUP
===================================== */

function openAuth(mode) {
  authMode = mode;

  $("authTitle").textContent =
    mode === "signup" ? "Create your account" : "Login";

  $("nameGroup").classList.toggle(
    "hidden",
    mode !== "signup"
  );

  $("authName").value = "";
  $("authPhone").value = "";
  $("otpInput").value = "";
  $("otpSection").classList.add("hidden");

  $("authMessage").textContent = "";

  confirmationResult = null;

  openDialog("authDialog");
}

$("loginBtn").addEventListener("click", () => {
  openAuth("login");
});

$("signupBtn").addEventListener("click", () => {
  if (currentUser) {
    signOut(auth).catch(error => {
      console.error(error);
      notify("Could not log out.");
    });
  } else {
    openAuth("signup");
  }
});

function setAuthMessage(message, error = false) {
  $("authMessage").textContent = message;

  $("authMessage").style.color = error
    ? "#d12a5c"
    : "#218838";
}

/* =====================================
   9. FIREBASE SMS OTP VERIFICATION
===================================== */

async function resetRecaptcha() {
  if (recaptchaVerifier) {
    try {
      await recaptchaVerifier.clear();
    } catch {}

    recaptchaVerifier = null;
  }

  $("recaptcha-container").innerHTML = "";
}

async function setupRecaptcha() {
  await resetRecaptcha();

  recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "normal"
    }
  );

  await recaptchaVerifier.render();
}

$("sendOtpBtn").addEventListener("click", async () => {
  if (!auth) {
    setAuthMessage(
      "Please configure Firebase in script.js before using SMS login.",
      true
    );
    return;
  }

  if (!phoneWidget.isValidNumber()) {
    setAuthMessage(
      "Please enter a valid phone number.",
      true
    );
    return;
  }

  if (
    authMode === "signup" &&
    !$("authName").value.trim()
  ) {
    setAuthMessage("Please enter your name.", true);
    return;
  }

  const phoneNumber = phoneWidget.getNumber();

  $("sendOtpBtn").disabled = true;
  setAuthMessage("Preparing verification...");

  try {
    await setupRecaptcha();

    confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );

    $("otpSection").classList.remove("hidden");

    setAuthMessage(
      "Verification code sent. Please check your phone."
    );

  } catch (error) {
    console.error(error);

    setAuthMessage(
      error.code === "auth/too-many-requests"
        ? "Too many attempts. Please try again later."
        : "Could not send the code. Check your number and Firebase settings.",
      true
    );

    await resetRecaptcha();

  } finally {
    $("sendOtpBtn").disabled = false;
  }
});

$("verifyOtpBtn").addEventListener("click", async () => {
  const code = $("otpInput").value.trim();

  if (!confirmationResult) {
    setAuthMessage(
      "Please request a verification code first.",
      true
    );
    return;
  }

  if (!/^\d{6}$/.test(code)) {
    setAuthMessage(
      "Enter the 6-digit verification code.",
      true
    );
    return;
  }

  $("verifyOtpBtn").disabled = true;

  try {
    const credential = await confirmationResult.confirm(code);

    const name = $("authName").value.trim();

    if (name && !credential.user.displayName) {
      await updateProfile(credential.user, {
        displayName: name
      });
    }

    currentUser = credential.user;

    setAuthMessage("Your phone number has been verified!");

    notify("You are now logged in.");

    setTimeout(() => {
      $("authDialog").close();
      updateLoginDisplay();
    }, 1000);

  } catch (error) {
    console.error(error);

    setAuthMessage(
      "Incorrect or expired verification code.",
      true
    );

  } finally {
    $("verifyOtpBtn").disabled = false;
  }
});

/* =====================================
   10. ACCOUNT DISPLAY
===================================== */

function updateLoginDisplay() {
  if (currentUser) {
    $("loginBtn").textContent =
      currentUser.displayName || "My account";

    $("signupBtn").textContent = "Logout";

  } else {
    $("loginBtn").textContent = "Login";
    $("signupBtn").textContent = "Sign up";
  }
}

if (auth) {
  onAuthStateChanged(auth, user => {
    currentUser = user;

    updateLoginDisplay();

    if (user && user.phoneNumber) {
      checkoutPhoneWidget.setNumber(user.phoneNumber);
    }
  });
}

/* =====================================
   11. CHECKOUT
===================================== */

$("checkoutBtn").addEventListener("click", () => {
  if (!cart.length) {
    notify("Your cart is empty.");
    return;
  }

  $("cartDialog").close();

  if (currentUser) {
    $("customerName").value =
      currentUser.displayName || "";

    if (currentUser.phoneNumber) {
      checkoutPhoneWidget.setNumber(
        currentUser.phoneNumber
      );
    }
  }

  if (selectedAddress) {
    $("customerAddress").value = selectedAddress;
  }

  updateCart();
  openDialog("checkoutDialog");
});

$("placeOrderBtn").addEventListener("click", () => {
  const name = $("customerName").value.trim();
  const phone = checkoutPhoneWidget.getNumber();
  const address = $("customerAddress").value.trim();

  if (!name || !address ||
      !checkoutPhoneWidget.isValidNumber()) {
    $("orderMessage").textContent =
      "Please enter your name, valid phone number and delivery address.";
    return;
  }

  if (!currentUser) {
    $("orderMessage").textContent =
      "Please login and verify your phone number before ordering.";
    return;
  }

  const orderNumber =
    "FE" + Date.now().toString().slice(-8);

  const order = {
    orderNumber,
    customerName: name,
    customerPhone: phone,
    customerAddress: address,
    paymentMethod: $("paymentMethod").value,

    items: cart.map(item => {
      const food = foods.find(food => food.id === item.id);

      return {
        name: food.name,
        quantity: item.quantity,
        price: food.price
      };
    }),

    subtotal: getSubtotal(),
    deliveryFee,
    total: getSubtotal() + deliveryFee,
    createdAt: new Date().toISOString()
  };

  // Demo only: not saved to a real ordering server.
  console.log("Demo order:", order);

  $("orderMessage").textContent =
    "Demo order " + orderNumber +
    " prepared. No real restaurant or rider has received it.";

  cart = [];
  updateCart();

  notify("Demo checkout completed.");

  setTimeout(() => {
    $("checkoutDialog").close();
  }, 3500);
});

/* =====================================
   12. INITIALIZE WEBSITE
===================================== */

displayFoods();
updateCart();
updateLoginDisplay();
