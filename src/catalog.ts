export type FlavorId = 'mango' | 'strawberry' | 'blueberry' | 'banana' | 'kiwi' | 'tomato';

export type Flavor = {
  id: FlavorId;
  name: string;
  category: string;
  description: string;
  ingredients: string;
  color: string;
  label: string;
  backgroundWord: string;
  availability: 'coming-soon';
  // A future commerce adapter can associate a Shopify variant with this ID.
  commerceId?: string;
};

export const flavors: Flavor[] = [
  { id: 'mango', name: 'MANGO', category: 'THE SUNSHINE ONE', description: 'Tropical, sweet, ridiculously crunchy.', ingredients: 'Mango', color: '#F4BA49', label: 'TROPICAL', backgroundWord: 'SUNSHINE', availability: 'coming-soon' },
  { id: 'strawberry', name: 'STRAWBERRY', category: 'THE BERRY BOLD ONE', description: 'Sweet. Bright. Impossible to ignore.', ingredients: 'Strawberry · Fresa', color: '#EF745D', label: 'BERRY BOLD', backgroundWord: 'BERRY', availability: 'coming-soon' },
  { id: 'blueberry', name: 'BLUEBERRY', category: 'THE LITTLE LEGEND', description: 'Small berry. Big crunch energy.', ingredients: 'Blueberry · Arándano', color: '#BCA9D2', label: 'BERRY GOOD', backgroundWord: 'BOLD.', availability: 'coming-soon' },
  { id: 'banana', name: 'BANANA', category: 'THE GOLDEN FAVORITE', description: 'A familiar favorite. A whole new crunch.', ingredients: 'Banana', color: '#E9CF66', label: 'GO BANANAS', backgroundWord: 'GOLDEN', availability: 'coming-soon' },
  { id: 'kiwi', name: 'KIWI', category: 'THE WILD CARD', description: 'Bright, tangy, a little wild.', ingredients: 'Kiwi', color: '#B1C997', label: 'STAY CURIOUS', backgroundWord: 'WILD.', availability: 'coming-soon' },
  { id: 'tomato', name: 'TOMATO', category: 'THE UNEXPECTED ONE', description: 'Savory. Unexpected. Made to crunch.', ingredients: 'Tomato · Tomate', color: '#EE8A62', label: 'PLOT TWIST', backgroundWord: 'TWIST.', availability: 'coming-soon' },
];
