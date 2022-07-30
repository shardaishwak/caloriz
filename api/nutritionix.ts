import Fetch from ".";

const InstantSearch = async (query) => {
  try {
    const data = await Fetch(
      "https://trackapi.nutritionix.com/v2/search/instant",
      {
        method: "POST",
        headers: {
          "x-app-id": process.env.NUTR_APP_ID,
          "x-app-key": process.env.NUTR_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      }
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const NutrientSearch = async (query) => {
  try {
    const data = (
      await Fetch("https://trackapi.nutritionix.com/v2/natural/nutrients/", {
        method: "POST",
        headers: {
          "x-app-id": process.env.NUTR_APP_ID,
          "x-app-key": process.env.NUTR_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      })
    ).foods[0];

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  search: InstantSearch,
  nutrients: NutrientSearch,
};
