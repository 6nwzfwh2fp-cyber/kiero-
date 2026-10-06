export type Flavor = {
  id: string;
  name: string;
  category: string;
  description: string;
  ingredients: string;
  color: string;
  label: string;
  availability: 'coming-soon';
  // A future commerce adapter can associate a Shopify variant with this ID.
  commerceId?: string;
};

export const flavors: Flavor[] = [
  { id: 'island-crush', name: 'ISLAND CRUSH', category: 'THE TROPICAL ONE', description: 'Tropical, sweet, ridiculously crunchy.', ingredients: 'Banana, apple & pineapple', color: '#F4BA49', label: 'TROPICAL', availability: 'coming-soon' },
  { id: 'hot-mess', name: 'HOT MESS', category: 'THE ONE WITH A KICK', description: 'Sweet. Spicy. Addictive.', ingredients: 'Tomato, sweet corn & onion · chili-lime', color: '#EF745D', label: 'SWEET + SPICY', availability: 'coming-soon' },
  { id: 'new-flavor', name: 'MYSTERY FLAVOR', category: 'THE NEXT OBSESSION', description: 'A little mystery. A lot of crunch.', ingredients: 'Still under wraps. Stay curious.', color: '#BCA9D2', label: 'COMING SOON', availability: 'coming-soon' },
];
