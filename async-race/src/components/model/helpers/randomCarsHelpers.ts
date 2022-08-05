const brands = [
  'Porsche',
  'Hummer',
  'Jeep',
  'UAZ',
  'Pontiac',
  'Ford',
  'Chevrolet',
  'Lancia',
  'Subaru',
  'Pagani',
  'McLaren',
  'Ferrari',
  'Shelby',
  'Audi',
];
const models = [
  '911 turbo',
  'Macan',
  'Cayman',
  'H1',
  'Wrangler',
  'Patriot',
  'GTO',
  'Mustang',
  'GT40',
  'Corvette',
  'Delta Integrale',
  'WRX STI',
  'Zonda',
  'F1',
  'F-40',
  'Cobra',
  'Quattro',
];

const getRandomBrand = () => {
  const idx = Math.floor(Math.random() * brands.length);
  return brands[idx];
};

const getRandomModel = () => {
  const idx = Math.floor(Math.random() * models.length);
  return models[idx];
};

const getRandomName = () => `${getRandomBrand()} ${getRandomModel()}`;

const getRandomColor = () => {
  const values = '0123456789ABCDEF';
  const getRandomValue = () => {
    const idx = Math.floor(Math.random() * values.length);
    return values[idx];
  };
  const color = Array(6)
    .fill(1)
    .map(() => getRandomValue())
    .join('');

  return `#${color}`;
};

export const getRandomCarsArr = (count: number) =>
  Array(count)
    .fill(1)
    .map(() => ({
      name: getRandomName(),
      color: getRandomColor(),
    }));
