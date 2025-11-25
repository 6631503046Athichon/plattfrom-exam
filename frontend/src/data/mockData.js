export const mockUsers = [
  {
    id: 1,
    name: "Chef John",
    email: "chef.john@example.com",
    role: "user",
    created_at: "2024-01-15T10:00:00.000Z"
  },
  {
    id: 2,
    name: "Sarah Baker",
    email: "sarah.baker@example.com",
    role: "user",
    created_at: "2024-01-20T14:30:00.000Z"
  },
  {
    id: 3,
    name: "Mike Chef",
    email: "mike.chef@example.com",
    role: "user",
    created_at: "2024-02-01T09:15:00.000Z"
  },
  {
    id: 4,
    name: "Admin User",
    email: "admin@gmali.com",
    role: "admin",
    created_at: "2024-01-01T00:00:00.000Z"
  }
];

export const mockRecipes = [
  {
    id: 1,
    title: "Classic Spaghetti Carbonara",
    ingredients: `• 400g spaghetti
• 200g pancetta or guanciale
• 4 large eggs
• 100g Pecorino Romano cheese, grated
• Black pepper to taste
• Salt for pasta water`,
    instructions: `1. Bring a large pot of salted water to boil and cook spaghetti according to package directions.
2. While pasta cooks, cut pancetta into small cubes and fry in a large pan until crispy.
3. In a bowl, whisk together eggs, grated cheese, and black pepper.
4. Drain pasta, reserving 1 cup of pasta water.
5. Add hot pasta to the pan with pancetta and remove from heat.
6. Quickly stir in egg mixture, adding pasta water as needed to create a creamy sauce.
7. Serve immediately with extra cheese and black pepper.`,
    image_url: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&h=600&fit=crop",
    user_id: 1,
    user_name: "Chef John",
    average_rating: 4.8,
    rating_count: 12,
    created_at: "2024-03-01T10:30:00.000Z",
    updated_at: "2024-03-01T10:30:00.000Z"
  },
  {
    id: 2,
    title: "Thai Pad Thai",
    ingredients: `• 200g rice noodles
• 200g shrimp, peeled
• 2 eggs
• 100g bean sprouts
• 3 tbsp fish sauce
• 2 tbsp tamarind paste
• 2 tbsp palm sugar
• 3 cloves garlic
• 2 tbsp roasted peanuts, crushed
• Lime wedges
• Green onions`,
    instructions: `1. Soak rice noodles in warm water for 30 minutes until soft, then drain.
2. Heat oil in a wok over high heat. Add garlic and cook until fragrant.
3. Add shrimp and cook until pink, about 2-3 minutes.
4. Push ingredients to the side, crack eggs into the wok and scramble.
5. Add noodles, fish sauce, tamarind paste, and palm sugar. Toss everything together.
6. Add bean sprouts and green onions. Cook for 1-2 minutes.
7. Serve hot with crushed peanuts and lime wedges.`,
    image_url: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop",
    user_id: 2,
    user_name: "Sarah Baker",
    average_rating: 4.9,
    rating_count: 18,
    created_at: "2024-03-05T14:20:00.000Z",
    updated_at: "2024-03-05T14:20:00.000Z"
  },
  {
    id: 3,
    title: "Homemade Margherita Pizza",
    ingredients: `• 500g pizza dough
• 400g crushed tomatoes
• 250g fresh mozzarella
• Fresh basil leaves
• 2 cloves garlic
• 2 tbsp olive oil
• Salt and pepper
• Cornmeal for dusting`,
    instructions: `1. Preheat oven to 475°F (245°C) with pizza stone inside.
2. Mix crushed tomatoes with minced garlic, olive oil, salt, and pepper for sauce.
3. Roll out dough on a floured surface into a 12-inch circle.
4. Transfer to a cornmeal-dusted pizza peel or baking sheet.
5. Spread sauce over dough, leaving a 1-inch border.
6. Tear mozzarella and distribute evenly over sauce.
7. Slide pizza onto hot stone and bake for 10-12 minutes until crust is golden.
8. Remove from oven, top with fresh basil leaves, and drizzle with olive oil.`,
    image_url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop",
    user_id: 1,
    user_name: "Chef John",
    average_rating: 4.7,
    rating_count: 9,
    created_at: "2024-03-10T16:45:00.000Z",
    updated_at: "2024-03-10T16:45:00.000Z"
  },
  {
    id: 4,
    title: "Chicken Tikka Masala",
    ingredients: `• 600g chicken breast, cubed
• 1 cup yogurt
• 3 tbsp tikka masala spice blend
• 1 can (400ml) coconut cream
• 400g crushed tomatoes
• 1 onion, diced
• 3 cloves garlic
• 1 inch ginger, minced
• Fresh cilantro
• Basmati rice for serving`,
    instructions: `1. Marinate chicken in yogurt and 2 tbsp tikka masala spice for 30 minutes.
2. Heat oil in a large pan and cook chicken until browned. Set aside.
3. In the same pan, sauté onion, garlic, and ginger until soft.
4. Add remaining spice blend and cook for 1 minute.
5. Add crushed tomatoes and coconut cream. Simmer for 10 minutes.
6. Return chicken to pan and cook for another 10 minutes.
7. Garnish with cilantro and serve over basmati rice.`,
    image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
    user_id: 3,
    user_name: "Mike Chef",
    average_rating: 5.0,
    rating_count: 15,
    created_at: "2024-03-12T11:00:00.000Z",
    updated_at: "2024-03-12T11:00:00.000Z"
  },
  {
    id: 5,
    title: "Classic Beef Burger",
    ingredients: `• 500g ground beef (80/20)
• 4 burger buns
• 4 slices cheddar cheese
• Lettuce leaves
• Tomato slices
• Red onion slices
• Pickles
• Ketchup and mustard
• Salt and pepper`,
    instructions: `1. Divide beef into 4 equal portions and form into patties.
2. Season generously with salt and pepper on both sides.
3. Heat a grill or cast iron pan to high heat.
4. Cook patties for 3-4 minutes per side for medium doneness.
5. Add cheese slices in the last minute of cooking and cover to melt.
6. Toast burger buns on the grill.
7. Assemble burgers with lettuce, tomato, patty with cheese, onion, pickles, and condiments.`,
    image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
    user_id: 2,
    user_name: "Sarah Baker",
    average_rating: 4.6,
    rating_count: 11,
    created_at: "2024-03-15T13:30:00.000Z",
    updated_at: "2024-03-15T13:30:00.000Z"
  },
  {
    id: 6,
    title: "Caesar Salad",
    ingredients: `• 1 head romaine lettuce
• 1 cup croutons
• 1/2 cup Parmesan cheese, shaved
• 2 anchovy fillets
• 2 cloves garlic
• 1 egg yolk
• 2 tbsp lemon juice
• 1 tsp Dijon mustard
• 1/2 cup olive oil
• Salt and pepper`,
    instructions: `1. Wash and chop romaine lettuce into bite-sized pieces.
2. For dressing: blend anchovies, garlic, egg yolk, lemon juice, and mustard.
3. Slowly drizzle in olive oil while blending until emulsified.
4. Season with salt and pepper to taste.
5. Toss lettuce with dressing until well coated.
6. Top with croutons and Parmesan shavings.
7. Serve immediately.`,
    image_url: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop",
    user_id: 1,
    user_name: "Chef John",
    average_rating: 4.4,
    rating_count: 7,
    created_at: "2024-03-18T09:15:00.000Z",
    updated_at: "2024-03-18T09:15:00.000Z"
  }
];

export const mockRatings = [
  {
    id: 1,
    recipe_id: 1,
    user_id: 2,
    user_name: "Sarah Baker",
    rating: 5,
    comment: "Best carbonara recipe I've tried! The sauce was perfectly creamy.",
    created_at: "2024-03-02T15:20:00.000Z"
  },
  {
    id: 2,
    recipe_id: 1,
    user_id: 3,
    user_name: "Mike Chef",
    rating: 5,
    comment: "Authentic Italian taste! My family loved it.",
    created_at: "2024-03-03T19:45:00.000Z"
  },
  {
    id: 3,
    recipe_id: 1,
    user_id: 1,
    user_name: "Chef John",
    rating: 4,
    comment: "Great recipe, though I prefer more pepper.",
    created_at: "2024-03-04T12:00:00.000Z"
  },
  {
    id: 4,
    recipe_id: 2,
    user_id: 1,
    user_name: "Chef John",
    rating: 5,
    comment: "Amazing Pad Thai! Just like from my favorite Thai restaurant.",
    created_at: "2024-03-06T14:30:00.000Z"
  },
  {
    id: 5,
    recipe_id: 2,
    user_id: 3,
    user_name: "Mike Chef",
    rating: 5,
    comment: "Perfect balance of flavors. The tamarind makes it special!",
    created_at: "2024-03-07T11:15:00.000Z"
  },
  {
    id: 6,
    recipe_id: 3,
    user_id: 2,
    user_name: "Sarah Baker",
    rating: 5,
    comment: "Best homemade pizza I've ever made. The crust was perfect!",
    created_at: "2024-03-11T18:20:00.000Z"
  },
  {
    id: 7,
    recipe_id: 4,
    user_id: 1,
    user_name: "Chef John",
    rating: 5,
    comment: "Restaurant quality! The spices are well-balanced.",
    created_at: "2024-03-13T16:00:00.000Z"
  },
  {
    id: 8,
    recipe_id: 4,
    user_id: 2,
    user_name: "Sarah Baker",
    rating: 5,
    comment: "My kids absolutely loved this! Will make again.",
    created_at: "2024-03-14T19:30:00.000Z"
  },
  {
    id: 9,
    recipe_id: 5,
    user_id: 1,
    user_name: "Chef John",
    rating: 4,
    comment: "Juicy burger! Next time I'll try it with bacon.",
    created_at: "2024-03-16T12:45:00.000Z"
  },
  {
    id: 10,
    recipe_id: 5,
    user_id: 3,
    user_name: "Mike Chef",
    rating: 5,
    comment: "Simple but delicious. Can't beat a classic beef burger!",
    created_at: "2024-03-17T14:00:00.000Z"
  }
];

export const currentUser = {
  id: 1,
  name: "Chef John",
  email: "chef.john@example.com",
  role: "user"
};

export const getRecipesWithRatings = () => {
  return mockRecipes.map(recipe => {
    const recipeRatings = mockRatings.filter(r => r.recipe_id === recipe.id);
    const avgRating = recipeRatings.length > 0
      ? recipeRatings.reduce((sum, r) => sum + r.rating, 0) / recipeRatings.length
      : 0;

    return {
      ...recipe,
      average_rating: avgRating,
      rating_count: recipeRatings.length
    };
  });
};

export const getRatingsForRecipe = (recipeId) => {
  return mockRatings.filter(r => r.recipe_id === parseInt(recipeId));
};

export const getRecipeById = (recipeId) => {
  const recipe = mockRecipes.find(r => r.id === parseInt(recipeId));
  if (!recipe) return null;

  const ratings = getRatingsForRecipe(recipeId);
  const avgRating = ratings.length > 0
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
    : 0;

  return {
    ...recipe,
    average_rating: avgRating,
    rating_count: ratings.length
  };
};

export const searchRecipes = (query) => {
  if (!query) return getRecipesWithRatings();

  const lowerQuery = query.toLowerCase();
  return getRecipesWithRatings().filter(recipe =>
    recipe.title.toLowerCase().includes(lowerQuery) ||
    recipe.ingredients.toLowerCase().includes(lowerQuery)
  );
};

export const getUserRecipes = (userId) => {
  return getRecipesWithRatings().filter(r => r.user_id === userId);
};
