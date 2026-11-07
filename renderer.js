const navButtons = document.querySelectorAll(".nav-button");
const pages = document.querySelectorAll(".page");

navButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    navButtons.forEach(function(item) {
      item.classList.remove("active");
    });

    pages.forEach(function(page) {
      page.classList.remove("active-page");
    });

    button.classList.add("active");
    document.getElementById(button.dataset.page).classList.add("active-page");
  });
});

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const apiMessage = document.getElementById("apiMessage");
const weatherCard = document.getElementById("weatherCard");
const weatherCity = document.getElementById("weatherCity");
const weatherDescription = document.getElementById("weatherDescription");
const temperatureValue = document.getElementById("temperatureValue");
const windValue = document.getElementById("windValue");
const suggestionText = document.getElementById("suggestionText");
const destinationInfo = document.getElementById("destinationInfo");
const suggestedActivity = document.getElementById("suggestedActivity");
const favouriteButton = document.getElementById("favouriteButton");
const suggestionMessage = document.getElementById("suggestionMessage");
const favouritesList = document.getElementById("favouritesList");
const favouritesEmpty = document.getElementById("favouritesEmpty");

const SUGGESTIONS_KEY = "jomjalanSuggestions";
const FAVOURITES_KEY = "jomjalanFavouriteActivities";
let currentSuggestion = null;
let favouriteActivities = readStorage(FAVOURITES_KEY, []);
let savedSuggestions = readStorage(SUGGESTIONS_KEY, []);

function readStorage(key, defaultValue) {
  try {
    const savedValue = JSON.parse(localStorage.getItem(key) || "null");
    return Array.isArray(savedValue) ? savedValue : defaultValue;
  } catch (error) {
    console.error("Could not read saved data:", error);
    return defaultValue;
  }
}

function writeStorage(key, value, messageElement) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Could not save data:", error);
    if (messageElement) {
      messageElement.textContent = "Could not save changes on this device. Check available storage and try again.";
    }
    return false;
  }
}

function isValidMoneyInput(input) {
  const amount = Number(input.value);
  return input.value !== "" &&
    Number.isFinite(amount) &&
    amount >= 0 &&
    Number.isSafeInteger(Math.round(amount * 100));
}

function getWeatherDescription(code) {
  if (code === 0) {
    return "Clear sky";
  } else if (code === 1 || code === 2) {
    return "Mostly clear or partly cloudy";
  } else if (code === 3) {
    return "Cloudy";
  } else if (code === 45 || code === 48) {
    return "Foggy";
  } else if (code >= 51 && code <= 67) {
    return "Drizzle or rain";
  } else if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    return "Snow";
  } else if (code >= 80 && code <= 82) {
    return "Rain showers";
  } else if (code >= 95 && code <= 99) {
    return "Thunderstorm";
  } else {
    return "Mixed weather conditions";
  }
}

function suggestActivity(destination, code) {
  const place = destination.name.toLowerCase();
  let activityType = "";
  let activityName = "";

  if (code === 0 || code === 1 || code === 2) {
    activityType = "outdoor";
    if (place.includes("penang")) {
      activityName = "Walk through George Town's heritage streets";
    } else if (place.includes("kuala lumpur")) {
      activityName = "Explore the KLCC park and city centre";
    } else {
      activityName = "Take a walking tour of " + destination.name;
    }
  } else if ((code >= 51 && code <= 67) || (code >= 71 && code <= 77) ||
      (code >= 80 && code <= 82) || (code >= 85 && code <= 86) ||
      (code >= 95 && code <= 99)) {
    activityType = "indoor";
    if (place.includes("penang")) {
      activityName = "Visit a Penang museum or indoor food market";
    } else if (place.includes("kuala lumpur")) {
      activityName = "Explore a Kuala Lumpur museum or shopping centre";
    } else {
      activityName = "Visit a museum or indoor attraction in " + destination.name;
    }
  } else if (code === 3 || code === 45 || code === 48) {
    activityType = "flexible";
    activityName = "Choose a nearby cafe or indoor attraction in " + destination.name;
  } else {
    return null;
  }

  return { destination: destination.name, type: activityType, name: activityName };
}

searchForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") {
    apiMessage.textContent = "Please enter a destination.";
    return;
  }

  apiMessage.textContent = "Searching for destination and weather...";
  weatherCard.classList.add("hidden");
  currentSuggestion = null;
  suggestedActivity.textContent = "";
  favouriteButton.classList.add("hidden");

  try {
    // API 1: Find the destination coordinates using Open-Meteo Geocoding API.
    const geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" +
      encodeURIComponent(city) + "&count=1&language=en&format=json";

    const geoResponse = await fetch(geoUrl);

    if (!geoResponse.ok) {
      throw new Error("Could not contact the destination service.");
    }

    const geoData = await geoResponse.json();

    if (!geoData || !Array.isArray(geoData.results) || geoData.results.length === 0) {
      apiMessage.textContent = "No destination found. Try another city name.";
      suggestionText.textContent = "No suggestion is available because the destination was not found.";
      suggestionMessage.textContent = "Search for another destination to get an activity suggestion.";
      return;
    }

    const destination = geoData.results[0];
    if (!destination.name || !Number.isFinite(destination.latitude) ||
        !Number.isFinite(destination.longitude)) {
      throw new Error("The destination service returned invalid location data.");
    }

    // API 2: Get current weather using the coordinates from the first API.
    const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" +
      destination.latitude + "&longitude=" + destination.longitude +
      "&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto";

    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
      throw new Error("Could not retrieve weather information.");
    }

    const weatherData = await weatherResponse.json();
    const current = weatherData && weatherData.current;

    if (!current || !Number.isFinite(current.temperature_2m) ||
        !Number.isFinite(current.wind_speed_10m) || !Number.isFinite(current.weather_code)) {
      throw new Error("Weather information is not available for this destination.");
    }

    weatherCity.textContent = destination.name +
      (destination.country ? ", " + destination.country : "");
    weatherDescription.textContent = getWeatherDescription(current.weather_code);
    temperatureValue.textContent = current.temperature_2m + "°C";
    windValue.textContent = "Wind: " + current.wind_speed_10m + " km/h";
    destinationInfo.textContent = [destination.admin1, destination.timezone].filter(Boolean).join(" · ");

    currentSuggestion = suggestActivity(destination, current.weather_code);
    if (currentSuggestion) {
      suggestionText.textContent = "Based on the weather in " + destination.name + ", try this " + currentSuggestion.type + " activity:";
      suggestedActivity.textContent = currentSuggestion.name;
      favouriteButton.classList.remove("hidden");
      favouriteButton.textContent = isFavourite(currentSuggestion) ? "★ Remove favourite" : "☆ Add favourite";
      suggestionMessage.textContent = "Suggestion saved in this device when the weather search completes.";
      const updatedSuggestions = [
        { ...currentSuggestion, createdAt: new Date().toISOString() },
        ...savedSuggestions
      ].slice(0, 20);
      if (writeStorage(SUGGESTIONS_KEY, updatedSuggestions, suggestionMessage)) {
        savedSuggestions = updatedSuggestions;
        suggestionMessage.textContent = "Suggestion saved on this device.";
      }
    } else {
      suggestionText.textContent = "No suggestion is available for this weather condition.";
      suggestedActivity.textContent = "";
      favouriteButton.classList.add("hidden");
      suggestionMessage.textContent = "Try another destination or check the weather again later.";
    }

    weatherCard.classList.remove("hidden");
    renderFavourites();
    apiMessage.textContent = "Weather information loaded successfully.";
  } catch (error) {
    apiMessage.textContent = error instanceof Error
      ? "Could not load destination or weather: " + error.message
      : "Could not load destination or weather. Check your internet connection and try again.";
    suggestionText.textContent = "No suggestion is available until weather information can be loaded.";
    suggestedActivity.textContent = "";
    favouriteButton.classList.add("hidden");
    console.error(error);
  }
});

function isFavourite(activity) {
  return favouriteActivities.some(function(item) {
    return item.name === activity.name && item.destination === activity.destination;
  });
}

function renderFavourites() {
  favouritesList.innerHTML = "";
  favouriteActivities.forEach(function(activity) {
    const row = document.createElement("div");
    row.className = "favourite-item";
    const text = document.createElement("span");
    text.textContent = activity.name + " · " + activity.destination;
    const removeButton = document.createElement("button");
    removeButton.className = "secondary-button";
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function() {
      const updatedFavourites = favouriteActivities.filter(function(item) {
        return item.name !== activity.name || item.destination !== activity.destination;
      });
      if (!writeStorage(FAVOURITES_KEY, updatedFavourites, suggestionMessage)) return;
      favouriteActivities = updatedFavourites;
      renderFavourites();
      if (currentSuggestion && currentSuggestion.name === activity.name &&
          currentSuggestion.destination === activity.destination) {
        favouriteButton.textContent = "☆ Add favourite";
      }
    });
    row.appendChild(text);
    row.appendChild(removeButton);
    favouritesList.appendChild(row);
  });
  favouritesEmpty.classList.toggle("hidden", favouriteActivities.length > 0);
}

favouriteButton.addEventListener("click", function() {
  if (!currentSuggestion) return;
  let updatedFavourites;
  if (isFavourite(currentSuggestion)) {
    updatedFavourites = favouriteActivities.filter(function(item) {
      return item.name !== currentSuggestion.name || item.destination !== currentSuggestion.destination;
    });
  } else {
    updatedFavourites = favouriteActivities.concat(currentSuggestion);
  }
  if (!writeStorage(FAVOURITES_KEY, updatedFavourites, suggestionMessage)) return;
  favouriteActivities = updatedFavourites;
  const saved = isFavourite(currentSuggestion);
  suggestionMessage.textContent = saved ? "Activity added to your favourites." : "Favourite removed.";
  favouriteButton.textContent = saved ? "★ Remove favourite" : "☆ Add favourite";
  renderFavourites();
});

// CRUD data is saved in Local Storage so it remains after reopening the app.
const STORAGE_KEY = "jomjalanTravelPlans";
let travelPlans = readStorage(STORAGE_KEY, []).map(function(plan) {
  return {
    ...plan,
    activity: Number(plan.activity || 0),
    budget: Number(plan.budget || 0),
    status: ["Planned", "Ongoing", "Completed"].includes(plan.status) ? plan.status : "Planned"
  };
});

const planForm = document.getElementById("planForm");
const editId = document.getElementById("editId");
const planDestination = document.getElementById("planDestination");
const travelDate = document.getElementById("travelDate");
const transportCost = document.getElementById("transportCost");
const hotelCost = document.getElementById("hotelCost");
const foodCost = document.getElementById("foodCost");
const activityCost = document.getElementById("activityCost");
const planBudget = document.getElementById("planBudget");
const formTitle = document.getElementById("formTitle");
const saveButton = document.getElementById("saveButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const formMessage = document.getElementById("formMessage");
const plansList = document.getElementById("plansList");
const emptyMessage = document.getElementById("emptyMessage");
const planCount = document.getElementById("planCount");
const budgetTotal = document.getElementById("budgetTotal");
const planSearch = document.getElementById("planSearch");
const statusFilter = document.getElementById("statusFilter");
const noResultsMessage = document.getElementById("noResultsMessage");

function savePlans(plans, messageElement) {
  return writeStorage(STORAGE_KEY, plans, messageElement || formMessage);
}

function calculatePlanBudget(plan) {
  const totalCents = [plan.transport, plan.hotel, plan.food, plan.activity || 0]
    .reduce(function(total, amount) {
      return total + Math.round(Number(amount) * 100);
    }, 0);
  return totalCents / 100;
}

function formatRM(amount) {
  return "RM " + amount.toFixed(2);
}

function renderPlans() {
  plansList.innerHTML = "";
  let totalBudgetCents = 0;
  const searchText = planSearch.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;
  const filteredPlans = travelPlans.filter(function(plan) {
    const matchesDestination = plan.destination.toLowerCase().includes(searchText);
    const matchesStatus = selectedStatus === "all" || plan.status === selectedStatus;
    return matchesDestination && matchesStatus;
  });

  travelPlans.forEach(function(plan) {
    totalBudgetCents += Math.round(Number(plan.budget || 0) * 100);
  });

  filteredPlans.forEach(function(plan) {
    const card = document.createElement("div");
    card.className = "plan-card";

    const details = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = plan.destination;

    const date = document.createElement("p");
    date.textContent = "Travel date: " + plan.date;

    const budget = document.createElement("p");
    budget.textContent = "Estimated costs: " + formatRM(calculatePlanBudget(plan)) + " / Budget: " + formatRM(Number(plan.budget || 0));

    const status = document.createElement("p");
    status.textContent = "Status: " + plan.status;

    details.appendChild(title);
    details.appendChild(date);
    details.appendChild(budget);
    details.appendChild(status);

    if (plan.packageData && Array.isArray(plan.packageData.itinerary)) {
      const packageDetails = document.createElement("details");
      packageDetails.className = "saved-package-details";
      const summary = document.createElement("summary");
      summary.textContent = "View saved itinerary and cost breakdown";
      packageDetails.appendChild(summary);

      const description = document.createElement("p");
      description.textContent = plan.packageData.description || "";
      packageDetails.appendChild(description);
      const total = document.createElement("p");
      total.textContent = "Total estimated cost: " + formatRM(calculatePlanBudget(plan)) +
        " · Remaining budget: " + formatRM(Number(plan.budget || 0) - calculatePlanBudget(plan));
      packageDetails.appendChild(total);
      const breakdown = document.createElement("p");
      breakdown.textContent = "Estimates — Accommodation: " + formatRM(Number(plan.hotel || 0)) +
        ", Food: " + formatRM(Number(plan.food || 0)) +
        ", Transportation: " + formatRM(Number(plan.transport || 0)) +
        ", Activities: " + formatRM(Number(plan.activity || 0));
      packageDetails.appendChild(breakdown);

      const itinerary = document.createElement("ol");
      plan.packageData.itinerary.forEach(function(day) {
        const item = document.createElement("li");
        item.textContent = "Day " + day.day + ": " + day.place + " — " + day.activity +
          " (estimated activity cost: " + formatRM(Number(day.estimatedCost || 0)) + ")";
        itinerary.appendChild(item);
      });
      packageDetails.appendChild(itinerary);
      details.appendChild(packageDetails);
    }

    const actions = document.createElement("div");
    actions.className = "plan-actions";

    const editButton = document.createElement("button");
    editButton.className = "secondary-button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function() {
      startEdit(plan.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
      deletePlan(plan.id);
    });

    const statusSelect = document.createElement("select");
    statusSelect.setAttribute("aria-label", "Trip status for " + plan.destination);
    ["Planned", "Ongoing", "Completed"].forEach(function(statusName) {
      const option = document.createElement("option");
      option.value = statusName;
      option.textContent = statusName;
      option.selected = plan.status === statusName;
      statusSelect.appendChild(option);
    });
    statusSelect.addEventListener("change", function() {
      const updatedPlans = travelPlans.map(function(item) {
        return item.id === plan.id ? { ...item, status: statusSelect.value } : item;
      });
      if (!savePlans(updatedPlans)) {
        renderPlans();
        return;
      }
      travelPlans = updatedPlans;
      renderPlans();
    });

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    actions.appendChild(statusSelect);
    card.appendChild(details);
    card.appendChild(actions);
    plansList.appendChild(card);
  });

  planCount.textContent = travelPlans.length;
  budgetTotal.textContent = formatRM(totalBudgetCents / 100);
  emptyMessage.classList.toggle("hidden", travelPlans.length > 0);
  noResultsMessage.classList.toggle("hidden", travelPlans.length === 0 || filteredPlans.length > 0);
}

planSearch.addEventListener("input", renderPlans);
statusFilter.addEventListener("change", renderPlans);

planForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const destination = planDestination.value.trim();
  const date = travelDate.value;
  const transport = Number(transportCost.value);
  const hotel = Number(hotelCost.value);
  const food = Number(foodCost.value);
  const activity = Number(activityCost.value);
  const budget = Number(planBudget.value);

  if (destination === "" || date === "") {
    formMessage.textContent = "Please enter a destination and travel date.";
    return;
  }

  const costInputs = [transportCost, hotelCost, foodCost, activityCost, planBudget];
  if (costInputs.some(function(input) {
    return !isValidMoneyInput(input);
  })) {
    formMessage.textContent = "Enter valid amounts with up to two decimal places for every cost and budget.";
    return;
  }

  const planData = {
    destination: destination,
    date: date,
    transport: transport,
    hotel: hotel,
    food: food,
    activity: activity,
    budget: budget
  };

  if (editId.value !== "") {
    const id = Number(editId.value);
    const updatedPlans = travelPlans.map(function(plan) {
      if (plan.id === id) {
        return { ...plan, id: id, ...planData };
      }
      return plan;
    });
    if (!savePlans(updatedPlans)) return;
    travelPlans = updatedPlans;
    formMessage.textContent = "Travel plan updated successfully.";
  } else {
    const newPlan = {
      id: Date.now(),
      ...planData
    };
    const updatedPlans = travelPlans.concat(newPlan);
    if (!savePlans(updatedPlans)) return;
    travelPlans = updatedPlans;
    formMessage.textContent = "Travel plan saved successfully.";
  }

  renderPlans();
  resetForm();
});

function startEdit(id) {
  const plan = travelPlans.find(function(item) {
    return item.id === id;
  });

  if (!plan) {
    formMessage.textContent = "This travel plan could not be found.";
    return;
  }

  if (plan.packageData) {
    editSmartPackage(plan);
    return;
  }

  editId.value = plan.id;
  planDestination.value = plan.destination;
  travelDate.value = plan.date;
  transportCost.value = plan.transport;
  hotelCost.value = plan.hotel;
  foodCost.value = plan.food;
  activityCost.value = plan.activity || 0;
  planBudget.value = plan.budget || 0;

  formTitle.textContent = "Edit a travel plan";
  saveButton.textContent = "Update plan";
  cancelEditButton.classList.remove("hidden");
  formMessage.textContent = "Edit the details, then select Update plan.";

  document.querySelector('[data-page="plansPage"]').click();
  planDestination.focus();
}

function deletePlan(id) {
  const confirmed = confirm("Are you sure you want to delete this travel plan?");

  if (!confirmed) return;

  const updatedPlans = travelPlans.filter(function(plan) {
    return plan.id !== id;
  });

  if (!savePlans(updatedPlans)) return;
  travelPlans = updatedPlans;
  renderPlans();
  formMessage.textContent = "Travel plan deleted.";
  if (Number(editId.value) === id) resetForm();
}

function resetForm() {
  planForm.reset();
  editId.value = "";
  formTitle.textContent = "Add a travel plan";
  saveButton.textContent = "Save plan";
  cancelEditButton.classList.add("hidden");
}

cancelEditButton.addEventListener("click", function() {
  resetForm();
  formMessage.textContent = "Edit cancelled.";
});

const budgetForm = document.getElementById("budgetForm");
const budgetMessage = document.getElementById("budgetMessage");
const budgetResult = document.getElementById("budgetResult");

budgetForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const fields = [
    document.getElementById("calcHotel"),
    document.getElementById("calcFood"),
    document.getElementById("calcTransport"),
    document.getElementById("calcActivity"),
    document.getElementById("calcBudget")
  ];
  const amounts = fields.map(function(field) {
    return Number(field.value);
  });

  if (fields.some(function(field, index) {
    return !isValidMoneyInput(field);
  })) {
    budgetMessage.textContent = "Enter valid amounts with up to two decimal places in every field.";
    budgetResult.textContent = "";
    return;
  }

  const costCents = amounts.slice(0, 4).reduce(function(total, amount) {
    return total + Math.round(amount * 100);
  }, 0);
  const budgetCents = Math.round(amounts[4] * 100);
  const total = costCents / 100;
  const remaining = (budgetCents - costCents) / 100;
  budgetMessage.textContent = "Total travel expenses: " + formatRM(total);
  budgetResult.textContent = remaining >= 0
    ? "Remaining budget: " + formatRM(remaining)
    : "Over budget by " + formatRM(Math.abs(remaining));
});

renderPlans();
renderFavourites();
