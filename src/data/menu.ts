import { z } from "zod";
import type { MenuCategory } from "./types";

const price = (value: string, label?: string) => ({ value, label });

const rawMenu: MenuCategory[] = [
  {
    slug: "breakfast",
    title: "Breakfast Favorites",
    eyebrow: "Breakfast all day",
    items: [
      {
        name: "Breakfast Sandwich",
        description: "Choice of Kaiser roll or bagel with egg, sausage or bacon, and cheese.",
        prices: [price("$6.50")],
      },
      {
        name: "Breakfast Burrito",
        description: "Jalapeño egg, sausage, cheese, and salsa wrapped in a warm tortilla.",
        prices: [price("$8")],
      },
      {
        name: "Breakfast Crepe",
        description: "Turkey, egg, and Swiss folded in a warm crepe.",
        prices: [price("$8")],
      },
      {
        name: "Breakfast Panini",
        description: "Egg, ham, and cheese on artisan bread.",
        prices: [price("$8")],
      },
      {
        name: "Vaulted Croissant",
        description: "Jalapeño egg, Taylor ham, and melted cheddar cheese on a toasted croissant.",
        prices: [price("$9")],
        featured: true,
      },
    ],
  },
  {
    slug: "sweet-crepes",
    title: "Sweet Crepes",
    eyebrow: "Folded to order",
    items: [
      {
        name: "Classic",
        description: "Butter and honey with powdered sugar.",
        prices: [price("$6")],
      },
      {
        name: "Dulce de Leche",
        description: "Dulce de leche, banana, whipped cream, and powdered sugar.",
        prices: [price("$8")],
      },
      {
        name: "Fresh Strawberry & Nutella",
        description: "Fresh strawberries, Nutella, and powdered sugar.",
        prices: [price("$8")],
      },
      {
        name: "Vaulted",
        description: "Belgian chocolate, bananas, strawberries, whipped cream, and powdered sugar.",
        prices: [price("$8.50")],
        featured: true,
      },
    ],
  },
  {
    slug: "light-fresh",
    title: "Light & Fresh",
    eyebrow: "Whole Greek yogurt",
    items: [
      {
        name: "Smoothie",
        description: "Yogurt, two fruits, oat milk, and organic honey. Choose banana, strawberry, or blueberry.",
        prices: [price("$8")],
      },
      {
        name: "Parfait",
        description: "Greek yogurt, honey, granola, strawberries, and blueberries.",
        prices: [price("$8.50")],
      },
    ],
  },
  {
    slug: "lunch",
    title: "Lunch Favorites",
    eyebrow: "Hoagies & paninis",
    note: "Make any sandwich a combo for $3 with a 16 oz fountain soda and potato salad or chips.",
    items: [
      {
        name: "Chicken Pesto",
        description: "Roasted chicken, fresh basil pesto, sun-dried tomatoes, fontina cheese, and balsamic reduction on a toasted hoagie.",
        prices: [price("$10.50")],
        featured: true,
      },
      {
        name: "Vaulted Italian",
        description: "Hard salami, pepperoni, ham, capicola, provolone, lettuce, tomato, onion, and EVOO on an Italian hoagie.",
        prices: [price("$11.50")],
      },
      {
        name: "Cubano",
        description: "Roasted pork loin, Swiss, pickles, lettuce, mustard, and mayo on a toasted Italian hoagie.",
        prices: [price("$10.50")],
      },
      {
        name: "Turkey Club",
        description: "Roasted turkey, bacon, cheddar, lettuce, tomato, mayo, and mustard on a toasted Italian hoagie.",
        prices: [price("$10.50")],
      },
      {
        name: "Vaulted Grilled Cheese",
        description: "Pimento cheese, avocado, and bacon on sourdough bread.",
        prices: [price("$9.50")],
      },
    ],
  },
  {
    slug: "salads",
    title: "Salads",
    eyebrow: "Add grilled chicken +$3",
    items: [
      {
        name: "Mediterranean",
        description: "Mixed greens, feta, chickpeas, tomatoes, cucumber, and onion with house-made lemon vinaigrette.",
        prices: [price("$9")],
        featured: true,
      },
      {
        name: "Vaulted Strawberry",
        description: "Mixed greens, fresh strawberries, goat cheese, and pistachios with honey-lime vinaigrette.",
        prices: [price("$9")],
      },
      {
        name: "Caesar",
        description: "Chopped romaine, shaved parmesan, and croutons tossed in creamy Caesar dressing.",
        prices: [price("$8")],
      },
      {
        name: "Buffalo Chicken",
        description: "Romaine topped with crispy buffalo chicken tenders, tomatoes, onions, and bleu cheese dressing.",
        prices: [price("$12")],
      },
    ],
  },
  {
    slug: "lunch-crepes",
    title: "Lunch Crepes",
    eyebrow: "Savory crepes",
    items: [
      {
        name: "Ham & Cheese",
        description: "Ham and cheese folded in a savory crepe, topped with Vaulted aioli.",
        prices: [price("$8.50")],
      },
      {
        name: "Turkey, Bacon & Swiss",
        description: "Turkey, bacon, Swiss, and garlic-parmesan aioli folded in a savory crepe.",
        prices: [price("$9.50")],
      },
      {
        name: "Birria",
        description: "Homemade birria, fontina, cilantro, and onion folded in a savory crepe. Also available as a rice bowl.",
        prices: [price("$11")],
        featured: true,
      },
      {
        name: "Chicken Tikka",
        description: "Homemade chicken tikka masala, fontina, cilantro, and onion folded in a savory crepe. Also available as a rice bowl.",
        prices: [price("$11")],
      },
    ],
  },
  {
    slug: "coffee-tea",
    title: "Coffee & Tea",
    eyebrow: "Crafted with care",
    items: [
      {
        name: "Drip Coffee",
        description: "Freshly brewed hot or served over ice.",
        prices: [price("$2.50", "Hot reg"), price("$3", "Hot large"), price("$3.50", "Iced reg"), price("$4.50", "Iced large")],
      },
      {
        name: "Chai",
        description: "Warmly spiced chai, hot or iced.",
        prices: [price("$6", "Hot large"), price("$6", "Iced large")],
      },
      {
        name: "Latte",
        description: "Espresso and milk, made hot or iced.",
        prices: [price("$4.75", "Hot reg"), price("$6", "Hot large"), price("$5", "Iced reg"), price("$6.50", "Iced large")],
      },
      {
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam.",
        prices: [price("$4.75", "Regular"), price("$6", "Large")],
      },
      {
        name: "Americano",
        description: "Espresso lengthened with water, hot or iced.",
        prices: [price("$3", "Hot reg"), price("$5", "Hot large"), price("$5", "Iced reg")],
      },
      {
        name: "Cold Brew",
        description: "Slow-steeped and served over ice.",
        prices: [price("$4.50", "Regular"), price("$6", "Large")],
        featured: true,
      },
      {
        name: "Cortado",
        description: "Espresso balanced with warm milk.",
        prices: [price("$6", "Regular"), price("$7.50", "Large")],
      },
      {
        name: "Green or Black Tea",
        description: "Your choice of green or black tea, hot or iced.",
        prices: [price("$1.50", "Hot reg"), price("$2.50", "Hot large"), price("$3", "Iced reg"), price("$5", "Iced large")],
      },
      {
        name: "Lemon Refresher",
        description: "Bright citrus refresher served over ice.",
        prices: [price("$4", "Regular"), price("$6", "Large")],
      },
    ],
  },
  {
    slug: "craft-creations",
    title: "Craft Creations",
    eyebrow: "Signature coffee",
    note: "Choose hot latte ($5.50/$7), iced latte ($7/$9), cold brew ($6/$7.50), or specialty cortado ($7). Cold brews and iced lattes include cold foam.",
    items: [
      {
        name: "Crème Brûlée",
        description: "Dark roast coffee with caramel sauce, vanilla, and toasted marshmallow syrup, topped with half & half.",
        prices: [price("From $5.50")],
        featured: true,
      },
      {
        name: "Toasted Treasure",
        description: "Dark roast with toasted marshmallow, spiced brown sugar, pistachio, and hazelnut syrups, crafted with almond milk.",
        prices: [price("From $5.50")],
      },
      {
        name: "Midnight Mocha",
        description: "Dark roast with chocolate sauce and vanilla syrup, crafted with whole milk.",
        prices: [price("From $5.50")],
      },
      {
        name: "Honey Harvest",
        description: "Dark roast with house-made honey-cinnamon, crafted with oat milk.",
        prices: [price("From $5.50")],
      },
      {
        name: "Golden Key",
        description: "Dark roast with an extra shot of espresso and vanilla syrup, crafted with whole milk.",
        prices: [price("From $5.50")],
      },
    ],
  },
  {
    slug: "vault-fizz",
    title: "Vault Fizz",
    eyebrow: "24 oz · $5 each",
    items: [
      {
        name: "Cherry Tree",
        description: "Cherry and vanilla syrup in your choice of fountain soda, topped with cherry cold foam. House favorite: Sprite.",
        prices: [price("$5")],
      },
      {
        name: "Strawberry Fields",
        description: "Strawberry and vanilla syrup in your choice of fountain soda, topped with vanilla cold foam. House favorite: Sprite.",
        prices: [price("$5")],
      },
      {
        name: "Papa Pibb",
        description: "Classic Mr. Pibb with vanilla cold foam.",
        prices: [price("$5")],
      },
      {
        name: "Root Beer Royale",
        description: "Classic Barq’s Root Beer with vanilla cold foam.",
        prices: [price("$5")],
      },
      {
        name: "Choco Cola",
        description: "Melted Belgian chocolate in your choice of fountain soda, topped with chocolate cold foam. House favorite: Coke.",
        prices: [price("$5")],
      },
    ],
  },
  {
    slug: "juices-sodas",
    title: "Juices & Sodas",
    eyebrow: "Crisp & refreshing",
    items: [
      {
        name: "Fountain Soda",
        description: "Sprite, Sprite Zero, Coke, Coke Zero, Diet Coke, or Mr. Pibb.",
        prices: [price("$1.50", "16 oz"), price("$2", "24 oz"), price("$2.50", "32 oz")],
      },
      {
        name: "Lemon Spritz",
        description: "Bright lemon spritz over ice.",
        prices: [price("$4", "Regular"), price("$6", "Large")],
      },
      {
        name: "Orange Spritz",
        description: "Citrusy orange spritz over ice.",
        prices: [price("$4", "Regular"), price("$6", "Large")],
      },
      {
        name: "Grapefruit Spritz",
        description: "Tart grapefruit spritz over ice.",
        prices: [price("$5", "Regular"), price("$7", "Large")],
      },
      {
        name: "Orange or Grapefruit Juice",
        description: "Ask about today’s size and price.",
        prices: [price("Price varies")],
      },
    ],
  },
  {
    slug: "flatbread",
    title: "Flatbread Pizza",
    eyebrow: "Crispy artisan flatbread",
    items: [
      {
        name: "Build Your Own",
        description: "Signature pizza sauce and melted mozzarella with one topping: pepperoni, extra cheese, banana peppers, sun-dried tomatoes, bacon, salami, fresh tomato, or Italian sausage crumbles.",
        prices: [price("$9")],
      },
      {
        name: "Vaulted Pizza",
        description: "Mozzarella, fresh tomato, basil, garlic, banana peppers, and balsamic reduction.",
        prices: [price("$11")],
        featured: true,
      },
    ],
  },
  {
    slug: "add-ons",
    title: "Add-ons & Modifiers",
    eyebrow: "Make it yours",
    items: [
      {
        name: "Breakfast Extras",
        description: "Extra fruit or syrup $1 each. Add or substitute Taylor ham for $1.",
        prices: [price("From $1")],
      },
      {
        name: "Coffee Flavors",
        description: "Vanilla, sugar-free vanilla, caramel, sugar-free caramel, hazelnut, toasted marshmallow, brown sugar cinnamon, cherry, strawberry, raspberry, and more.",
        prices: [price("$0.25", "Per pump")],
      },
      {
        name: "Milk & Coffee Extras",
        description: "Oat or almond +$0.50; half & half +$1; heavy cream +$2; extra espresso +$1.50; cold foam +$1.25; house-made syrup +$1; whipped cream +$0.75; drizzle +$0.75.",
        prices: [price("From $0.50")],
      },
      {
        name: "Extra Pizza Toppings",
        description: "Grilled chicken +$3; pepperoni or Italian sausage +$2; banana peppers, sun-dried tomatoes, fresh tomato, or onion +$1.",
        prices: [price("From $1")],
      },
    ],
  },
];

const menuSchema = z.array(
  z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().min(1),
    eyebrow: z.string().min(1),
    note: z.string().optional(),
    items: z.array(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        prices: z.array(z.object({ label: z.string().optional(), value: z.string().min(1) })).min(1),
        featured: z.boolean().optional(),
      }),
    ).min(1),
  }),
).superRefine((categories, context) => {
  const slugs = new Set<string>();
  categories.forEach((category, index) => {
    if (slugs.has(category.slug)) {
      context.addIssue({ code: "custom", message: `Duplicate category slug: ${category.slug}`, path: [index, "slug"] });
    }
    slugs.add(category.slug);
  });
});

export const menu = menuSchema.parse(rawMenu) as MenuCategory[];
