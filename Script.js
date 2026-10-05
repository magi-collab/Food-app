
const IMG = (id, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

const categories = [
  { name: "Biryani & Rice", img: IMG("photo-1563379091339-03b21ab4a4f8") },
  { name: "Pizza", img: IMG("photo-1565299624946-b28f40a0ae38") },
  { name: "Grill & Tandoor", img: IMG("photo-1555939594-58d7cb561ad1") },
  { name: "Fresh Salads", img: IMG("photo-1512621776951-a57141f2eefd") },
  { name: "Desserts", img: IMG("photo-1551024601-bec78aea704b") }
];

const recipes = [
  {
    title: "Paneer Butter Masala", type: "veg", time: "35 min",
    caption: "Soft paneer in a creamy tomato gravy. Pairs well with naan.",
    img: IMG("photo-1631452180519-c014fe946bc7"),
    ingredients: ["250 g paneer, cubed", "3 tomatoes, pureed", "2 tbsp butter", "1/2 cup cream", "1 tsp garam masala", "Salt to taste"],
    steps: ["Melt butter and saute the tomato puree for 8 minutes.", "Add garam masala and salt.", "Stir in the cream and simmer for 3 minutes.", "Add paneer and cook for 5 minutes. Serve hot."]
  },
  {
    title: "Veg Hakka Noodles", type: "veg", time: "20 min",
    caption: "Quick street-style noodles with crunchy vegetables.",
    img: IMG("photo-1585032226651-759b368d7246"),
    ingredients: ["200 g noodles", "1 carrot, 1 capsicum, 1/2 cabbage (sliced)", "2 tbsp soy sauce", "1 tbsp vinegar", "Garlic, oil, pepper"],
    steps: ["Boil noodles, drain and toss with a little oil.", "Stir-fry garlic and vegetables on high heat for 3 minutes.", "Add soy sauce, vinegar and pepper.", "Mix in the noodles and toss for 2 minutes."]
  },
  {
    title: "Chicken Biryani", type: "non-veg", time: "75 min",
    caption: "Layered rice and marinated chicken, slow cooked on dum.",
    img: IMG("photo-1563379091339-03b21ab4a4f8"),
    ingredients: ["500 g chicken", "2 cups basmati rice", "1 cup curd", "2 onions, fried", "Biryani masala, mint, saffron milk"],
    steps: ["Marinate chicken with curd and masala for 30 minutes.", "Par-boil rice with whole spices.", "Layer chicken, rice, fried onions, mint and saffron milk.", "Seal the pot and cook on low heat for 25 minutes."]
  },
  {
    title: "Butter Garlic Prawns", type: "non-veg", time: "15 min",
    caption: "Juicy prawns tossed in garlic butter. Ready in minutes.",
    img: IMG("photo-1565680018434-b513d5e5fd47"),
    ingredients: ["300 g prawns, cleaned", "4 garlic cloves, minced", "2 tbsp butter", "Lemon juice", "Chilli flakes, salt, parsley"],
    steps: ["Melt butter and cook garlic for 30 seconds.", "Add prawns and cook 2 minutes per side.", "Season with salt and chilli flakes.", "Finish with lemon juice and parsley."]
  },
  {
    title: "Masala Dosa", type: "veg", time: "40 min",
    caption: "Crisp golden dosa filled with spiced potato.",
    img: IMG("photo-1668236543090-82eba5ee5976"),
    ingredients: ["2 cups dosa batter", "3 potatoes, boiled", "1 onion, sliced", "Mustard seeds, curry leaves, turmeric", "Oil or ghee"],
    steps: ["Temper mustard seeds and curry leaves, then cook the onion.", "Add turmeric, salt and mashed potatoes.", "Spread the batter thin on a hot tawa and drizzle ghee.", "Fill with the potato masala and fold."]
  },
  {
    title: "Tandoori Chicken", type: "non-veg", time: "50 min",
    caption: "Smoky, spiced chicken with a char-grilled finish.",
    img: IMG("photo-1555939594-58d7cb561ad1"),
    ingredients: ["6 chicken legs", "1 cup thick curd", "2 tbsp tandoori masala", "Ginger-garlic paste", "Lemon juice, oil"],
    steps: ["Score the chicken and rub with lemon and salt.", "Marinate in curd, masala and paste for 4 hours.", "Bake at 220 C for 25 minutes.", "Brush with oil, turn and bake 10 more minutes."]
  }
];

// ---------- Helpers ----------
const $ = (s) => document.querySelector(s);
// If an image fails to load, hide it so the card still looks fine
const hideBroken = (img) => img.addEventListener("error", () => (img.style.visibility = "hidden"));

// ---------- Categories ----------
$("#catGrid").innerHTML = categories
  .map((c) => `<a class="cat" href="#tutorials"><img src="${c.img}" alt="" loading="lazy"><span>${c.name}</span></a>`)
  .join("");

// ---------- Recipes ----------
function renderRecipes(filter = "all") {
  const list = recipes
    .map((r, i) => ({ ...r, i }))
    .filter((r) => filter === "all" || r.type === filter);

  $("#recipeGrid").innerHTML = list
    .map(
      (r) => `
    <article class="recipe">
      <img src="${r.img}" alt="${r.title}" loading="lazy">
      <div class="recipe-body">
        <h3><span class="dot ${r.type === "veg" ? "veg" : "nonveg"}" title="${r.type}"></span>${r.title}</h3>
        <p class="caption">${r.caption}</p>
        <p class="meta">${r.time} &middot; ${r.type === "veg" ? "Veg" : "Non-veg"}</p>
        <button data-i="${r.i}">View recipe</button>
      </div>
    </article>`
    )
    .join("");

  document.querySelectorAll(".recipe img").forEach(hideBroken);
}

document.querySelectorAll(".chip").forEach((chip) =>
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    renderRecipes(chip.dataset.filter);
  })
);

// ---------- Recipe dialog ----------
const dialog = $("#recipeDialog");
$("#recipeGrid").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-i]");
  if (!btn) return;
  const r = recipes[btn.dataset.i];
  $("#dTitle").textContent = r.title;
  $("#dCaption").textContent = r.caption;
  $("#dIngredients").innerHTML = r.ingredients.map((x) => `<li>${x}</li>`).join("");
  $("#dSteps").innerHTML = r.steps.map((x) => `<li>${x}</li>`).join("");
  dialog.showModal();
});
$("#closeDialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

// ---------- Delivery check ----------
const MAX_KM = 20;
$("#distForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const out = $("#distResult");
  const km = parseFloat($("#distance").value);
  out.className = "result";
  if (isNaN(km) || km < 0) {
    out.textContent = "Enter a distance in kilometres, like 8 or 12.5.";
    out.classList.add("no");
  } else if (km <= MAX_KM) {
    out.textContent = `Yes, we deliver to you. Expect your food in about 30 minutes.`;
    out.classList.add("ok");
  } else {
    out.textContent = `Sorry, ${km} km is outside our ${MAX_KM} km delivery area. You can still pick up from our shop.`;
    out.classList.add("no");
  }
});

// ---------- Mobile menu ----------
const menuBtn = $("#menuBtn"), navLinks = $("#navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", false);
});

// ---------- Init ----------
document.querySelectorAll(".cat img").forEach(hideBroken);
renderRecipes();
$("#year").textContent = new Date().getFullYear();
