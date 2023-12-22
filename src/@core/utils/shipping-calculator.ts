const dimensionCategories = [
  {
    price: 1,
    range: [0, 0.5],
  },
  {
    price: 2,
    range: [0.6, 1],
  },
  {
    price: 3,
    range: [2, 3],
  },
  {
    price: 4,
    range: [4, 5],
  },
  {
    price: 5,
    range: [6, 10],
  },
  {
    price: 6,
    range: [11, 25],
  },
]

const distanceCategories = [
  {
    price: 10,
    range: [0, 50],
  },
  {
    price: 15,
    range: [51, 300],
  },
  {
    price: 18,
    range: [301, 500],
  },
  {
    price: 20,
    range: [501, 1000],
  },
  {
    price: 25,
    range: [1001, 1500],
  },
  {
    price: 30,
    range: [1501, 10000],
  },
]

const isInRange = (value, [min, max]) => value >= min && value <= max

const calculatePriceForCategory = (categories) => {
  const [priceForMax, maxCat] = categories.reduce(
    ([maxPrice, maxWeight], category) => {
      const [min, max] = category.range
      if (min < 0 || max < 0 || min === max || min > max)
        throw new Error(`Invalid range: [${min}, ${max}]`)

      return max > maxWeight ? [category.price, max] : [maxPrice, maxWeight]
    },
    [Infinity, -Infinity]
  )

  return [priceForMax, maxCat]
}

const getPrice = (category, value) => {
  const currentCat = category.find((cat) => isInRange(value, cat.range))

  return currentCat.price
}

export const getDimensionCategory = (dimension) => {
  const [priceForMaxDimension, maxDimension] =
    calculatePriceForCategory(dimensionCategories)

  if (dimension > maxDimension)
    return priceForMaxDimension + getDimensionCategory(dimension - maxDimension)

  return getPrice(dimensionCategories, dimension)
}

export const getDistanceCategory = (distance) => {
  const [priceForMaxDistance, maxDistance] =
    calculatePriceForCategory(distanceCategories)

  if (distance > maxDistance)
    return priceForMaxDistance + getDistanceCategory(distance - maxDistance)

  return getPrice(distanceCategories, distance)
}
