import Fetch from ".";

const InstantSearch = async (query) => {
  try {
    const data = await Fetch(
      "https://trackapi.nutritionix.com/v2/search/instant",
      {
        method: "POST",
        headers: {
          "x-app-id": "77c2b237",
          "x-app-key": "55674eb848929c7c92aa69e02131cb64",
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
          "x-app-id": "77c2b237",
          "x-app-key": "55674eb848929c7c92aa69e02131cb64",
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
