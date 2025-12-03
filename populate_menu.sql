-- Clear existing data
TRUNCATE TABLE menu_items RESTART IDENTITY CASCADE;

-- Insert all menu items
INSERT INTO menu_items (name, description, price, category, image, allergens, options) VALUES
('Classic Wagyu Burger', 'Premium Wagyu beef patty with cheddar, lettuce, tomato, and secret sauce.', 18.90, 'Burgers', 'burger2.jpg', ARRAY['Gluten', 'Dairy'], ARRAY['No Cheese', 'No Sauce']),
('Truffle Mushroom Pizza', 'Wild mushrooms, truffle oil, mozzarella, and thyme on a thin crust.', 22.50, 'Pizza', 'pizza.jpg', ARRAY['Gluten', 'Dairy'], ARRAY['Extra Truffle Oil (+$2)']),
('Spicy Chicken Wings', 'Crispy wings tossed in our signature spicy buffalo sauce.', 12.00, 'Starters', 'wings.jpg', ARRAY['Gluten'], ARRAY['Extra Spicy', 'Sauce on Side']),
('Caesar Salad', 'Fresh romaine, parmesan, croutons, and grilled chicken breast.', 14.50, 'Salads', 'salad.jpg', ARRAY['Dairy', 'Gluten', 'Eggs'], ARRAY['No Croutons', 'No Cheese']),
('Berry Bliss Smoothie', 'Mixed berries, yogurt, and honey blended to perfection.', 8.50, 'Drinks', 'smoothie.jpg', ARRAY['Dairy'], ARRAY['Extra Berries', 'No Honey']),
('Double Cheese Burger', 'Two beef patties, double cheddar cheese, pickles, and onions.', 16.90, 'Burgers', 'burger.jpg', ARRAY['Gluten', 'Dairy'], ARRAY['No Pickles', 'Extra Cheese']),
('Premium Sushi Platter', 'Assorted fresh sashimi and sushi rolls with wasabi.', 32.00, 'Japanese', 'sushi.jpg', ARRAY['Fish', 'Soy'], ARRAY['No Wasabi', 'Extra Ginger']),
('Butter Chicken & Naan', 'Tender chicken in a rich tomato butter sauce.', 18.50, 'Indian', 'butter_chicken.jpg', ARRAY['Dairy', 'Gluten', 'Nuts'], ARRAY['Extra Naan (+$2)', 'Mild Spice']),
('Street Tacos Trio', 'Three soft tacos with carne asada, cilantro, and lime.', 15.00, 'Mexican', 'tacos.jpg', ARRAY['Gluten'], ARRAY['Extra Salsa', 'No Cilantro']),
('Dim Sum Basket', 'Steamed dumplings including har gow and siew mai.', 13.50, 'Chinese', 'dimsum.jpg', ARRAY['Gluten', 'Shellfish', 'Soy'], ARRAY['Chili Oil on Side']),
('Pasta Carbonara', 'Spaghetti with pancetta, egg yolk, pecorino cheese, and black pepper.', 19.00, 'Italian', 'carbonara.jpg', ARRAY['Gluten', 'Dairy', 'Eggs', 'Pork'], ARRAY['No Pepper', 'Extra Cheese']),
('Falafel Wrap', 'Crispy falafel, hummus, veggies, and tahini in a warm pita.', 11.50, 'Mediterranean', 'falafel.jpg', ARRAY['Gluten', 'Sesame'], ARRAY['No Onions', 'Extra Tahini']),
('Pad Thai', 'Stir-fried rice noodles with shrimp, peanuts, egg, and bean sprouts.', 16.50, 'Thai', 'pad_thai.jpg', ARRAY['Shellfish', 'Peanuts', 'Eggs', 'Soy'], ARRAY['No Peanuts', 'Extra Lime', 'Vegetarian (No Shrimp)']),
('Steak Frites', 'Grilled ribeye steak served with herb butter and crispy french fries.', 28.00, 'Western', 'steak.jpg', ARRAY['Dairy'], ARRAY['Medium Rare', 'Medium', 'Well Done', 'No Butter']),
('Classic Tiramisu', 'Espresso-soaked ladyfingers layered with mascarpone cream and cocoa.', 9.50, 'Desserts', 'tiramisu.jpg', ARRAY['Dairy', 'Gluten', 'Eggs', 'Caffeine'], ARRAY[]::text[]),
('NY Cheesecake', 'Rich and creamy cheesecake topped with fresh strawberry glaze.', 8.90, 'Desserts', 'cheesecake.jpg', ARRAY['Dairy', 'Gluten', 'Eggs'], ARRAY['No Glaze']),
('Iced Matcha Latte', 'Premium Japanese matcha whisked with milk and served over ice.', 7.50, 'Drinks', 'matcha.jpg', ARRAY['Dairy', 'Caffeine'], ARRAY['Oat Milk (+$1)', 'Less Sweet']);
