TRUNCATE TABLE posts, places, categories RESTART IDENTITY CASCADE;

-- 1. Categories
INSERT INTO categories (name) VALUES
('Cafe'),
('Park'),
('Restaurant'),
('Grooming'),
('Pet Store');

-- 2. Places
INSERT INTO places (name, address, latitude, longitude, category_id) VALUES
('Mozart''s Coffee', '3825 Lake Austin Blvd, Austin, TX', 30.296700, -97.784100, 1),

('Zilker Park', '2100 Barton Springs Rd, Austin, TX', 30.266900, -97.772500, 2),

('Shake Shack Madison Square Park', 'Madison Ave & E 23rd St, New York, NY', 40.741600, -73.988100, 3),

('Mud Bay Pet Store', '5315 Ballard Ave NW, Seattle, WA', 47.666400, -122.383300, 5),

('Wag Hotels', '25 14th St, San Francisco, CA', 37.768900, -122.414800, 4),

('Runyon Canyon Park', '2000 N Fuller Ave, Los Angeles, CA', 34.110500, -118.350600, 2),

('Blue Bottle Coffee', '66 Mint St, San Francisco, CA', 37.782200, -122.408500, 1),

('The Dog Bakery', '2905 Main St, Santa Monica, CA', 34.007400, -118.489800, 5),

('Dogpatch Saloon', '2496 3rd St, San Francisco, CA', 37.757600, -122.388000, 3),

('Central Park (Dog Area)', 'Central Park, New York, NY', 40.785100, -73.968300, 2);

-- 3. Posts
INSERT INTO posts (place_id, title, author, content, pet_friendly_rating) VALUES
(
    (SELECT id FROM places WHERE name = 'Mozart''s Coffee'),
    'Must try Mozart’s special coffee!',
    'Alice Johnson',
    'This place is so cute — perfect for hanging out with a friend, your dog, or just enjoying some time alone. I loved the vibe, and the desserts and coffee were delicious. The service was also super friendly and kind. Highly recommend!',
    5
),
(
    (SELECT id FROM places WHERE name = 'Zilker Park'),
    'The Ultimate Review of Zilker Park, Austin, Texas',
    'Frank Miller',
    $$
    A dog‑lover’s paradise, an open‑sky sanctuary, and the beating green heart of Austin.

    If you’re searching for the best park in Austin, Zilker Park is the crown jewel. This iconic 350‑acre green space blends wide‑open fields, towering shade trees, and unmatched skyline views, creating a sanctuary where dogs, families, locals, and travelers all find their rhythm. It’s the kind of place that reminds you how good it feels to breathe.

    🐾 A Dog Lover’s Dream Come True

    Zilker Park is one of the most dog‑friendly parks in Texas, and it shows the moment you step onto the Great Lawn. Dogs of every size and personality sprint, sniff, explore, and socialize in a setting that feels like freedom.

    • Massive open fields perfect for fetch
    • Plenty of shade for cooling off
    • A friendly, respectful dog community
    • Natural terrain that keeps pups stimulated

    If your dog loves open space, Zilker is pure joy.

    🌳 Endless Open Space and Pure Austin Energy

    What makes Zilker truly special is the expansiveness. You can stretch out, relax, and exist without crowding. Whether you’re picnicking, tossing a frisbee, practicing yoga, or grounding yourself in the grass, the park gives you room to be human again.

    And the view of downtown Austin rising behind the treeline? Absolutely iconic.

    🌞 Adventure, Relaxation, and Everything In Between

    Zilker Park isn’t just a park — it’s a cultural hub. Within minutes you can access:

    • Barton Springs Pool
    • Lady Bird Lake trails
    • Kayaking and paddleboarding
    • Zilker Botanical Garden
    • The Great Lawn
    • ACL Festival grounds

    It’s the rare place where you can spend an hour or an entire day and feel like you lived a full chapter.

    🧡 Why Zilker Park Deserves Five Stars Every Time

    Zilker Park embodies everything people love about Austin: freedom, creativity, community, and nature. It’s a sanctuary for dogs, a playground for families, and a grounding space for anyone who needs a moment under the Texas sky.

    Whether you’re visiting Austin or lucky enough to live here, Zilker Park is a must‑experience destination. Bring your dog, bring your friends, or just bring yourself. The park will meet you exactly where you are.
    $$,
    5
),
(
    (SELECT id FROM places WHERE name = 'Shake Shack Madison Square Park'),
    'Do not waste your time with this place',
    'Carol Lee',
    'I brought my dog because I knew this was a pet-friendly establishment. I was asked if he was a service dog. He is of course, not a service dog and because of "food and health codes" was asked to make him wait outside. There are dog food items on the menu. If service dogs are allowed, how does that not break "food and health codes"?',
    1
),
(
    (SELECT id FROM places WHERE name = 'Shake Shack Madison Square Park'),
    'Love this place!',
    'Grace Chen',
    $$
    Shake Shack is expensive but I love that this location is an outdoor counter serve. I often come with my dog after he's done playing in nearby dog run. 
    It's great to be able to grab a meal without having to take him back home first.
    $$,
    5
),
(
    (SELECT id FROM places WHERE name = 'Mud Bay Pet Store'),
    'Love Mudbay!',
    'Emma Davis',
    'This is a fantastic pet store located in downtown Seattle. We stopped by this establishment to kill some time before a dinner reservation and ended up walking out with a handful of dog treats and toys for our pup. This store has it all!',
    5
),
(
    (SELECT id FROM places WHERE name = 'Wag Hotels'),
    'Definitely Recommand this place',
    'Henry Walker',
    $$
    I’ve been using Wag for 8 years.  The experience is consistent, professional, and most importantly I feel confident my boy is being taken care of properly.

    My boy loves seeing his adopted human family at Wag.  He genuinely looks at them as part of his pack.  He never gives me any look of worry or anxiety when I bring him.  He actually makes me roll down the window when we’re about a mile out so he can get all the sniffs in.  He only does this when he knows we’re going somewhere he likes.

    I travel for work.  When I’ve had delays or cancelations I’m always told “not to worry”. I can honestly say I’m never worried when I leave him there.  I know he feels safe, which makes me feel r safe and secure that he’s in good hands when I’m on the road.
    $$,
    5
),
(
    (SELECT id FROM places WHERE name = 'Runyon Canyon Park'),
    'Dog Friendly Park',
    'Isabella Martinez',
    'Runyon Canyon is a great place for all age groups and is dog friendly. I would rate the difficulty a 5/10 depending on how often you workout. This trail is kept clean and the views make it worth it. I live in the city but being able to see it from a different angle is always a pleasure. Most of the dogs were off leash but all trained so I definitely will be bringing my two dogs for next time. There are different routes you can hike and depending on which route you take just make sure you bring the proper shoes. This hike took less than an hour to complete for my sister and I. We definitely will be returning.',
    5
),
(
    (SELECT id FROM places WHERE name = 'The Dog Bakery'),
    'The cake was hard like a rock',
    'Jack Thompson',
    'DO NOT BUY the little cakes they have in the fridge, if you care for your dog, first of all, those cakes are HARD LIKE ROCKS  and they made my Frenchy very sick. She had diarrhea and horrible gas all night long shame on these people for selling old nasty cakes. I wonder what they put on there, but they should be ashamed of themselves for selling things like that to our fur babies.',
    1
),
(
    (SELECT id FROM places WHERE name = 'Central Park (Dog Area)'),
    'Great park',
    'Henry Walker',
    $$
    Central Park trail and stairs are the best! Love it 😀 
    if you are a local it is the best place to exercise outdoors. Clean bathrooms and dog parks as well as cross country tracks.  Summers they have concerts at the park.  Great clean park.
    $$,
    5
),
(
    (SELECT id FROM places WHERE name = 'Dogpatch Saloon'),
    'Dog friendly with a great drink menu',
    'Frank Miller',
    $$
    Wow, I can't believe it took me this long to finally come here, considering I live some five blocks away. Under renovation when I first moved in to the neighborhood, these folks finally re-opened earlier this year, with a new look that's still very befitting the saloon namesake - there's even a piano towards the back!

    But, contrary to what I expected, they serve up a pretty solid menu of fancy cocktails, with... well, a lot of liquors I hadn't even heard of before. I ended up trying their Grey Whale, which was okay, and their Whiskey Snap, which was fantastic.

    So, hey. Fancy $10 cocktails (the price is right), dog-friendly, and within walking distance of my home, so I can stumble back in a drunken haze? AWESOME.

    ***Accessibility Info***

    Venue - I've never seen this place super packed, so, given that, the venue is spacious enough that it shouldn't be too hard to get around. Most of their seating is either counter seating, or couch seating, so those of us in wheelchairs can just slide in to the sides that don't have any seating at all. The bar itself, of course, is the usual counter height, so you'll face the usual difficulties there.
    $$,
    4
);