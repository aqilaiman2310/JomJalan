// Fixed per-person estimates keep recommendations consistent between sessions.
const travelDestinations = [
  {
    name: "Langkawi, Malaysia", location: "Malaysia", types: ["Beach", "Relaxation", "Adventure"],
    description: "Island beaches, a scenic cable car and relaxed coastal days.",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 150, food: 55, transport: 130, activity: 65 },
    places: ["Pantai Cenang", "Kilim Geoforest Park", "Langkawi SkyCab"],
    outdoor: "Explore the shoreline and take a boat trip through the mangroves",
    indoor: "Visit the aquarium or enjoy a relaxed cafe and local food"
  },
  {
    name: "Kota Kinabalu, Malaysia", location: "Malaysia", types: ["Beach", "Nature", "Adventure"],
    description: "A lively waterfront beside rainforest, islands and mountain views.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 145, food: 50, transport: 150, activity: 75 },
    places: ["Tanjung Aru Beach", "Tunku Abdul Rahman Marine Park", "Signal Hill"],
    outdoor: "Take an island visit or enjoy a coastal walk",
    indoor: "Explore the Sabah State Museum and a covered local market"
  },
  {
    name: "Perhentian Islands, Malaysia", location: "Malaysia", types: ["Beach", "Relaxation", "Adventure"],
    description: "Clear-water islands known for quiet beaches and marine life.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 165, food: 50, transport: 180, activity: 75 },
    places: ["Long Beach", "Turtle Point", "Coral Bay"],
    outdoor: "Snorkel a nearby reef or unwind by the beach",
    indoor: "Enjoy a sheltered meal and a relaxed resort activity"
  },
  {
    name: "Cameron Highlands, Malaysia", location: "Malaysia", types: ["Nature", "Relaxation"],
    description: "Cool highland air, tea gardens and easy countryside walks.",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 135, food: 45, transport: 120, activity: 50 },
    places: ["Boh Tea Plantation", "Tanah Rata", "Cameron Valley"],
    outdoor: "Walk through a tea garden and visit a highland farm",
    indoor: "Try a tea tasting and explore a covered local attraction"
  },
  {
    name: "Taman Negara, Malaysia", location: "Malaysia", types: ["Nature", "Adventure"],
    description: "A rainforest escape with wildlife, river scenery and forest trails.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 125, food: 45, transport: 150, activity: 70 },
    places: ["Kuala Tahan", "Canopy Walkway", "Tembeling River"],
    outdoor: "Join a guided forest walk or a river excursion",
    indoor: "Visit the interpretation centre and relax at your lodge"
  },
  {
    name: "Penang, Malaysia", location: "Malaysia", types: ["City", "Relaxation"],
    description: "Heritage streets, local food and a lively island atmosphere.",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 140, food: 50, transport: 95, activity: 55 },
    places: ["George Town", "Penang Hill", "Clan Jetties"],
    outdoor: "Take a heritage walk and sample local street food",
    indoor: "Visit a Penang museum or explore a covered food market"
  },
  {
    name: "Kuala Lumpur, Malaysia", location: "Malaysia", types: ["City", "Adventure"],
    description: "A modern city break with landmark views, parks and food markets.",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 155, food: 55, transport: 85, activity: 60 },
    places: ["KLCC Park", "Central Market", "Batu Caves"],
    outdoor: "Walk around KLCC Park and visit the Batu Caves",
    indoor: "Explore a city museum or the covered Central Market"
  },
  {
    name: "Melaka, Malaysia", location: "Malaysia", types: ["City", "Relaxation"],
    description: "A compact historic city with riverside walks and heritage sites.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 120, food: 45, transport: 90, activity: 45 },
    places: ["Dutch Square", "Jonker Street", "Melaka River"],
    outdoor: "Take a riverside walk and explore the heritage district",
    indoor: "Visit the Baba Nyonya Heritage Museum and local galleries"
  },
  {
    name: "Bali, Indonesia", location: "International", types: ["Beach", "Nature", "Relaxation"],
    description: "Island beaches, rice terraces and cultural experiences.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 230, food: 75, transport: 320, activity: 95 },
    places: ["Ubud", "Sanur Beach", "Tegallalang Rice Terraces"],
    outdoor: "Visit a rice terrace or enjoy a beach day",
    indoor: "Try a Balinese cooking class or visit an art gallery"
  },
  {
    name: "Phuket, Thailand", location: "International", types: ["Beach", "Relaxation", "Adventure"],
    description: "Warm beaches, island scenery and relaxed evening markets.",
    image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 220, food: 70, transport: 300, activity: 90 },
    places: ["Patong Beach", "Phuket Old Town", "Kata Viewpoint"],
    outdoor: "Enjoy a beach day or take a local island tour",
    indoor: "Explore Phuket Old Town and a covered food market"
  },
  {
    name: "Krabi, Thailand", location: "International", types: ["Beach", "Nature", "Adventure"],
    description: "Limestone cliffs, tropical beaches and scenic coastal trails.",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 210, food: 68, transport: 295, activity: 88 },
    places: ["Railay Beach", "Ao Nang", "Emerald Pool"],
    outdoor: "Explore a beach trail or take a local island excursion",
    indoor: "Visit a local gallery or join a Thai cooking class"
  },
  {
    name: "Bangkok, Thailand", location: "International", types: ["City", "Relaxation"],
    description: "Temples, river views and energetic neighbourhood food scenes.",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 210, food: 70, transport: 290, activity: 85 },
    places: ["Wat Pho", "Chao Phraya River", "Chatuchak Market"],
    outdoor: "Visit a riverside temple or explore a lively market",
    indoor: "Explore a Bangkok museum or a covered shopping centre"
  },
  {
    name: "Singapore", location: "International", types: ["City", "Adventure"],
    description: "Easy city connections, garden attractions and diverse food.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 360, food: 105, transport: 420, activity: 130 },
    places: ["Gardens by the Bay", "Marina Bay", "Chinatown"],
    outdoor: "Walk the Marina Bay waterfront and visit the gardens",
    indoor: "Explore the ArtScience Museum or a covered food centre"
  },
  {
    name: "Tokyo, Japan", location: "International", types: ["City", "Adventure"],
    description: "A mix of modern neighbourhoods, gardens and local culture.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 390, food: 120, transport: 480, activity: 145 },
    places: ["Asakusa", "Ueno Park", "Shibuya"],
    outdoor: "Explore a neighbourhood on foot and visit a city garden",
    indoor: "Visit a Tokyo museum or enjoy an indoor cultural activity"
  },
  {
    name: "Kathmandu, Nepal", location: "International", types: ["Nature", "Adventure"],
    description: "Historic squares and mountain scenery at the edge of the Himalayas.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 200, food: 65, transport: 360, activity: 100 },
    places: ["Boudhanath Stupa", "Patan Durbar Square", "Garden of Dreams"],
    outdoor: "Visit a historic square or take a guided valley walk",
    indoor: "Explore a local museum or join a traditional craft workshop"
  },
  {
    name: "Queenstown, New Zealand", location: "International", types: ["Nature", "Adventure"],
    description: "Lakeside scenery and outdoor adventures surrounded by mountains.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    costs: { accommodation: 420, food: 125, transport: 620, activity: 180 },
    places: ["Lake Wakatipu", "Queenstown Gardens", "Bob's Peak"],
    outdoor: "Take a lakeside walk or ride the gondola for mountain views",
    indoor: "Visit a local gallery or enjoy a relaxed indoor tasting"
  }
];

const smartPlannerForm = document.getElementById("smartPlannerForm");
const smartBudget = document.getElementById("smartBudget");
const smartTravellers = document.getElementById("smartTravellers");
const smartDuration = document.getElementById("smartDuration");
const smartType = document.getElementById("smartType");
const smartLocation = document.getElementById("smartLocation");
const smartMessage = document.getElementById("smartMessage");
const recommendationSection = document.getElementById("recommendationSection");
const recommendationSummary = document.getElementById("recommendationSummary");
const recommendationList = document.getElementById("recommendationList");
const packagePanel = document.getElementById("packagePanel");
const packageTitle = document.getElementById("packageTitle");
const packageTotal = document.getElementById("packageTotal");
const packageWeather = document.getElementById("packageWeather");
const packageBreakdown = document.getElementById("packageBreakdown");
const itineraryList = document.getElementById("itineraryList");
const savePackageButton = document.getElementById("savePackageButton");
const cancelPackageEditButton = document.getElementById("cancelPackageEditButton");
const packageMessage = document.getElementById("packageMessage");
let currentRecommendations = [];
let currentPackage = null;
let editingPackageId = null;
let recommendationRequestId = 0;

function estimateDestination(destination, preferences) {
  const travellers = preferences.travellers;
  const duration = preferences.duration;
  // Accommodation, food and activities scale by days; transport scales by travellers.
  const accommodationCents = Math.round(destination.costs.accommodation * 100) * travellers * duration;
  const foodCents = Math.round(destination.costs.food * 100) * travellers * duration;
  const transportCents = Math.round(destination.costs.transport * 100) * travellers;
  const activityCents = Math.round(destination.costs.activity * 100) * travellers * duration;
  const totalCents = accommodationCents + foodCents + transportCents + activityCents;

  return {
    destination: destination,
    preferences: preferences,
    accommodation: accommodationCents / 100,
    food: foodCents / 100,
    transport: transportCents / 100,
    activity: activityCents / 100,
    totalCents: totalCents,
    total: totalCents / 100,
    remaining: (Math.round(preferences.budget * 100) - totalCents) / 100,
    weather: null
  };
}

function weatherActivity(destination, weather) {
  if (!weather) return destination.outdoor;
  const code = weather.weather_code;
  // Rain, snow and storms use the destination's indoor alternative.
  if ((code >= 51 && code <= 67) || (code >= 71 && code <= 77) ||
      (code >= 80 && code <= 82) || (code >= 85 && code <= 86) ||
      (code >= 95 && code <= 99)) {
    return destination.indoor;
  }
  return destination.outdoor;
}

async function getDestinationWeather(placeName) {
  const geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" +
    encodeURIComponent(placeName) + "&count=1&language=en&format=json";
  const geoResponse = await fetch(geoUrl);
  if (!geoResponse.ok) throw new Error("Could not find the destination for a weather check.");

  const geoData = await geoResponse.json();
  const place = geoData && Array.isArray(geoData.results) && geoData.results[0];
  if (!place || !Number.isFinite(place.latitude) || !Number.isFinite(place.longitude)) {
    throw new Error("No weather location was found for " + placeName + ".");
  }

  const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" +
    place.latitude + "&longitude=" + place.longitude +
    "&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto";
  const weatherResponse = await fetch(weatherUrl);
  if (!weatherResponse.ok) throw new Error("Could not retrieve current weather.");

  const weatherData = await weatherResponse.json();
  const current = weatherData && weatherData.current;
  if (!current || !Number.isFinite(current.temperature_2m) ||
      !Number.isFinite(current.wind_speed_10m) || !Number.isFinite(current.weather_code)) {
    throw new Error("The weather service returned incomplete data.");
  }
  return current;
}

function renderRecommendations() {
  recommendationList.innerHTML = "";
  currentRecommendations.forEach(function(recommendation) {
    const destination = recommendation.destination;
    const card = document.createElement("article");
    card.className = "destination-card";

    const image = document.createElement("img");
    image.className = "destination-image";
    image.src = destination.image;
    image.alt = destination.name + " destination";
    image.addEventListener("error", function() {
      image.classList.add("image-unavailable");
    });

    const content = document.createElement("div");
    content.className = "destination-content";
    const titleRow = document.createElement("div");
    titleRow.className = "destination-title-row";
    const title = document.createElement("h3");
    title.textContent = destination.name;
    const badge = document.createElement("span");
    const withinBudget = recommendation.totalCents <= Math.round(recommendation.preferences.budget * 100);
    badge.className = withinBudget ? "budget-badge" : "alternative-badge";
    badge.textContent = withinBudget ? "Within budget" : "Alternative";
    titleRow.appendChild(title);
    titleRow.appendChild(badge);

    const description = document.createElement("p");
    description.textContent = destination.description;
    const weather = document.createElement("p");
    weather.className = "weather-note";
    weather.textContent = recommendation.weather
      ? "Current weather: " + getWeatherDescription(recommendation.weather.weather_code) +
        ", " + recommendation.weather.temperature_2m + "°C. Suggested: " +
        weatherActivity(destination, recommendation.weather) + "."
      : "Weather unavailable. Suggested activity: " + destination.outdoor + ".";

    const priceList = document.createElement("dl");
    priceList.className = "price-breakdown";
    [
      ["Accommodation estimate", recommendation.accommodation],
      ["Food estimate", recommendation.food],
      ["Transportation estimate", recommendation.transport],
      ["Activity estimate", recommendation.activity],
      ["Total estimated cost", recommendation.total]
    ].forEach(function(item) {
      const row = document.createElement("div");
      const label = document.createElement("dt");
      const value = document.createElement("dd");
      label.textContent = item[0];
      value.textContent = formatRM(item[1]);
      row.appendChild(label);
      row.appendChild(value);
      priceList.appendChild(row);
    });
    const remaining = document.createElement("p");
    remaining.className = withinBudget ? "budget-remaining" : "budget-shortfall";
    remaining.textContent = withinBudget
      ? "Remaining budget: " + formatRM(recommendation.remaining)
      : "Over budget by: " + formatRM(Math.abs(recommendation.remaining));

    const chooseButton = document.createElement("button");
    chooseButton.type = "button";
    chooseButton.className = "primary-button";
    chooseButton.textContent = "Build this travel package";
    chooseButton.disabled = smartMessage.textContent.includes("Checking current weather");
    chooseButton.addEventListener("click", function() {
      buildTravelPackage(recommendation);
    });

    content.appendChild(titleRow);
    content.appendChild(description);
    content.appendChild(weather);
    content.appendChild(priceList);
    content.appendChild(remaining);
    content.appendChild(chooseButton);
    card.appendChild(image);
    card.appendChild(content);
    recommendationList.appendChild(card);
  });
}

async function findRecommendations() {
  const budget = Number(smartBudget.value);
  const travellers = Number(smartTravellers.value);
  const duration = Number(smartDuration.value);
  if (!Number.isFinite(budget) || budget <= 0 || budget > 10000000 ||
      !Number.isSafeInteger(Math.round(budget * 100)) ||
      Math.abs(budget * 100 - Math.round(budget * 100)) > 0.000001 ||
      !Number.isInteger(travellers) || travellers < 1 || travellers > 20 ||
      !Number.isInteger(duration) || duration < 1 || duration > 30 ||
      !["Beach", "Nature", "City", "Adventure", "Relaxation"].includes(smartType.value) ||
      !["Malaysia", "International"].includes(smartLocation.value)) {
    smartMessage.textContent = "Enter a valid budget with up to two decimals, 1–20 travellers, 1–30 days, and choose a travel type and location.";
    return;
  }

  const requestId = ++recommendationRequestId;
  const preferences = {
    budget: budget,
    travellers: travellers,
    duration: duration,
    type: smartType.value,
    location: smartLocation.value
  };
  const matches = travelDestinations.filter(function(destination) {
    return destination.location === preferences.location && destination.types.includes(preferences.type);
  }).map(function(destination) {
    return estimateDestination(destination, preferences);
  });

  // Put affordable choices first, then show the cheapest alternatives.
  matches.sort(function(first, second) {
    const firstFits = first.totalCents <= Math.round(budget * 100);
    const secondFits = second.totalCents <= Math.round(budget * 100);
    if (firstFits !== secondFits) return firstFits ? -1 : 1;
    return first.totalCents - second.totalCents;
  });
  currentRecommendations = matches.slice(0, 3);
  currentPackage = null;
  packagePanel.classList.add("hidden");
  recommendationSection.classList.remove("hidden");

  if (matches.length === 0) {
    recommendationSummary.textContent = "No destinations match those preferences. Try a different travel type or location.";
    recommendationList.innerHTML = "";
    smartMessage.textContent = "No matching destinations were found.";
    return;
  }

  const underBudgetCount = matches.filter(function(item) {
    return item.totalCents <= Math.round(budget * 100);
  }).length;
  if (underBudgetCount === 0) {
    recommendationSummary.textContent = "Your budget is below the lowest estimate for these preferences. Here are the least expensive alternatives; consider fewer travellers, fewer days, or a higher budget. The lowest estimate is " +
      formatRM(matches[0].total) + ".";
  } else if (underBudgetCount < 3) {
    recommendationSummary.textContent = underBudgetCount + " destination(s) fit your budget. The other card(s) are alternatives if you can increase it slightly.";
  } else {
    recommendationSummary.textContent = "These destinations match your preferences and fit your total budget. Estimates are for " +
      travellers + " traveller(s) over " + duration + " day(s).";
  }

  smartMessage.textContent = "Checking current weather for the recommended destinations...";
  renderRecommendations();
  const weatherResults = await Promise.all(currentRecommendations.map(async function(recommendation) {
    try {
      recommendation.weather = await getDestinationWeather(recommendation.destination.name);
      return true;
    } catch (error) {
      console.error("Could not load recommendation weather:", error);
      recommendation.weather = null;
      return false;
    }
  }));
  if (requestId !== recommendationRequestId) return;

  smartMessage.textContent = weatherResults.every(Boolean)
    ? "Recommendations updated with current weather."
    : "Recommendations are ready. Current weather could not be loaded for every destination; curated activities are shown instead.";
  renderRecommendations();
}

smartPlannerForm.addEventListener("submit", function(event) {
  event.preventDefault();
  return findRecommendations();
});

function buildTravelPackage(recommendation) {
  const destination = recommendation.destination;
  const days = recommendation.preferences.duration;
  const totalActivityCents = Math.round(recommendation.activity * 100);
  const dailyActivityCents = Math.floor(totalActivityCents / days);
  const remainderCents = totalActivityCents % days;
  const activity = weatherActivity(destination, recommendation.weather);
  const itinerary = [];

  // Divide costs into whole cents so daily estimates add up to the package total.
  for (let day = 1; day <= days; day += 1) {
    const place = destination.places[(day - 1) % destination.places.length];
    const activityCents = dailyActivityCents + (day <= remainderCents ? 1 : 0);
    itinerary.push({
      day: day,
      place: place,
      activity: activity,
      estimatedCost: activityCents / 100
    });
  }

  currentPackage = {
    destination: destination.name,
    description: destination.description,
    preferences: recommendation.preferences,
    accommodation: recommendation.accommodation,
    food: recommendation.food,
    transport: recommendation.transport,
    activity: recommendation.activity,
    total: recommendation.total,
    remaining: recommendation.remaining,
    weather: recommendation.weather,
    itinerary: itinerary
  };

  packageTitle.textContent = destination.name + " — " + days + "-day plan";
  packageTotal.textContent = "Estimated total: " + formatRM(recommendation.total);
  packageWeather.textContent = recommendation.weather
    ? "Current weather: " + getWeatherDescription(recommendation.weather.weather_code) +
      ", " + recommendation.weather.temperature_2m + "°C. Activities are adjusted for these conditions."
    : "Live weather is unavailable. This itinerary uses curated outdoor activity suggestions.";
  packageBreakdown.textContent = "Estimates — Accommodation: " + formatRM(recommendation.accommodation) +
    " · Food: " + formatRM(recommendation.food) +
    " · Transportation: " + formatRM(recommendation.transport) +
    " · Activities: " + formatRM(recommendation.activity) +
    " · Remaining budget: " + formatRM(recommendation.remaining);
  itineraryList.innerHTML = "";
  itinerary.forEach(function(item) {
    const dayCard = document.createElement("article");
    dayCard.className = "itinerary-card";
    const heading = document.createElement("h3");
    heading.textContent = "Day " + item.day + ": " + item.place;
    const activityText = document.createElement("p");
    activityText.textContent = item.activity;
    const cost = document.createElement("strong");
    cost.textContent = "Estimated activity cost: " + formatRM(item.estimatedCost);
    dayCard.appendChild(heading);
    dayCard.appendChild(activityText);
    dayCard.appendChild(cost);
    itineraryList.appendChild(dayCard);
  });

  packageMessage.textContent = recommendation.remaining >= 0
    ? "Estimated remaining budget: " + formatRM(recommendation.remaining)
    : "This alternative is over your budget by " + formatRM(Math.abs(recommendation.remaining)) + ".";
  packagePanel.classList.remove("hidden");
  packagePanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

savePackageButton.addEventListener("click", function() {
  if (!currentPackage) {
    packageMessage.textContent = "Choose a destination first to create a travel package.";
    return;
  }

  const existingPlan = editingPackageId === null
    ? null
    : travelPlans.find(function(plan) { return plan.id === editingPackageId; });
  const plan = {
    id: existingPlan ? existingPlan.id : Date.now(),
    destination: currentPackage.destination,
    date: existingPlan ? existingPlan.date : new Date().toISOString().slice(0, 10),
    transport: currentPackage.transport,
    hotel: currentPackage.accommodation,
    food: currentPackage.food,
    activity: currentPackage.activity,
    budget: currentPackage.preferences.budget,
    status: existingPlan ? existingPlan.status : "Planned",
    packageData: currentPackage
  };
  const updatedPlans = existingPlan
    ? travelPlans.map(function(item) { return item.id === existingPlan.id ? plan : item; })
    : travelPlans.concat(plan);
  if (!savePlans(updatedPlans, packageMessage)) return;

  travelPlans = updatedPlans;
  renderPlans();
  packageMessage.textContent = existingPlan
    ? "Travel package updated and saved on this device."
    : "Travel package saved on this device.";
  editingPackageId = null;
  savePackageButton.textContent = "Save travel package";
  cancelPackageEditButton.classList.add("hidden");
});

function editSmartPackage(plan) {
  const preferences = plan.packageData.preferences;
  if (!preferences) {
    packageMessage.textContent = "This saved package does not contain editable preferences.";
    return;
  }
  editingPackageId = plan.id;
  smartBudget.value = preferences.budget;
  smartTravellers.value = preferences.travellers;
  smartDuration.value = preferences.duration;
  smartType.value = preferences.type;
  smartLocation.value = preferences.location;
  packagePanel.classList.add("hidden");
  document.querySelector('[data-page="explorePage"]').click();
  smartMessage.textContent = "Choose a destination and build a package to update this saved plan.";
  smartPlannerForm.requestSubmit();
  savePackageButton.textContent = "Update saved package";
  cancelPackageEditButton.classList.remove("hidden");
}

cancelPackageEditButton.addEventListener("click", function() {
  editingPackageId = null;
  cancelPackageEditButton.classList.add("hidden");
  savePackageButton.textContent = "Save travel package";
  packageMessage.textContent = "Package edit cancelled.";
});
