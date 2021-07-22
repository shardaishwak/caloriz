import Fetch from ".";
import unsplash from "./unsplash";

const nutrients = [
  1003, 1004, 1005, 1008, 2000, 1087, 1089, 1093, 1104, 1162, 1253, 1110,
];

export const FcdSearch = async (
  query: string,
  size: number = 5,
  page: number
) => {
  try {
    const data = await Fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=B9tl81LpnLqv5HZOG8iTTQMK49uLWeMJkeOqkNcL&query=${query}&pageSize=${size}`
    );

    const image = await unsplash.search(query, size);

    // sanitise data
    const filtered = data.foods.map((food, index) => ({
      id: food.fdcId,
      description: food.description,
      image: image[index] || null,
      lowercaseDescription: food.lowercaseDescription,
      foodNutrients: food.foodNutrients.filter((n) =>
        nutrients.includes(n.nutrientId)
      ),
    }));
    return filtered;
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  search: FcdSearch,
};
