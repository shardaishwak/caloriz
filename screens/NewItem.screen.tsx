import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Header from "../components/Header";
import ItemModal from "../widgets/NewItemScreen/Modal";
import SearchInput from "../widgets/NewItemScreen/Modal/SearchInput";
import FavouritesRender from "../widgets/NewItemScreen/RenderFavouritesList";
import SearchResultRender from "../widgets/NewItemScreen/RenderSearchResults";

import colors from "../colors";
import nutritionix from "../api/nutritionix";
import { useGlobal } from "../global/provider";
import { SearchCommonItem } from "../interface";

import {
  extract_data_from_date,
  get_week_of_date,
  todayDate,
  transform_month_to_string,
  transform_week_to_string,
} from "../time";

const NewItemScreen = (props) => {
  const {
    state: { app_date },
  } = useGlobal();

  const session = props.route.params.session || "breakfast";

  // Set the modal ID - Handles also the modal visibility
  const [modalItemID, setModalItemID] = useState<string>();
  const [results, setResults] = useState<Array<SearchCommonItem>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Search for 20 foods from the database for a particular query
   * The data is filtered to take only desired fields of interface SearchCommonItem
   */
  const Search = async (query) => {
    try {
      if (!query) return;
      setLoading(true);

      const response = (await nutritionix.search(query))?.common?.map(
        (a) =>
          ({
            // Choose only the interested fields
            food_name: a.food_name,
            calories: a.nf_calories,
            serving_unit: a.serving_unit,
            serving_qty: a.serving_qty,
          } as SearchCommonItem)
      ) as Array<SearchCommonItem>;

      setResults(response);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  /**
   * Triggers the close of the modal
   */
  const CloseModal = () => setModalItemID(null);

  /**
   * Triggers the opening of the modal and set's the current food_name
   * The food name is important for the furteher detailed fetch of the food
   * which is taken place in the modal component
   *
   */
  const OpenModal = (food_name) => setModalItemID(food_name);

  // Header date system
  const is_today = todayDate() === app_date;
  const decompose_date = extract_data_from_date(app_date);

  // Stringified week
  const week = transform_week_to_string(
    get_week_of_date(decompose_date[0], decompose_date[1], decompose_date[2])
  );

  // Check if the date month is current month
  const is_current_month = parseInt(decompose_date[1]) == new Date().getMonth();
  // Stringified month
  const month = transform_month_to_string(decompose_date[1]);

  // check if the date year is current year
  const is_current_year =
    parseInt(decompose_date[2]) === new Date().getFullYear();

  const year = decompose_date[2];

  const timing = is_today
    ? "Today"
    : week +
      " " +
      decompose_date[0] +
      ((!is_current_month && " " + month) || "") +
      ((!is_current_year && " " + year) || "");

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={props.navigation} page={session} small={timing} />

      <ScrollView>
        <SearchInput
          placeholder="Search for a product"
          onSearch={Search}
          loading={loading}
        />
        {results && results.length > 0 ? (
          <>
            <Text style={styles.smallText}>Results</Text>
            <SearchResultRender OpenModal={OpenModal} items={results} />
          </>
        ) : (
          <>
            <Text style={styles.smallText}>Your Favourites</Text>
            <FavouritesRender session={session} />
          </>
        )}
        {modalItemID && (
          <ItemModal
            visible={!!modalItemID}
            onDismiss={CloseModal}
            ID={modalItemID}
            session={session}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  smallText: {
    fontSize: 15,
    fontFamily: "Inter",
    color: colors.app.dark_300,
    marginHorizontal: 20,
    textAlign: "center",
  },
  gradient_button: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  foodCard_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.app.dark_100,
  },
});

export default NewItemScreen;
