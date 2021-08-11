import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import uuid from "react-native-uuid";

import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";

import Header from "../components/Header";
import SearchInput from "../components/NewItemScreen/Modal/SearchInput";
import ItemCard from "../components/NewItemScreen/ItemCard";
import Searching_Svg from "../components/NewItemScreen/Searching_svg";
import ItemModal from "../components/NewItemScreen/Modal";

import colors from "../colors";
import nutritionix from "../api/nutritionix";
import { SearchCommonItem } from "../interface";

import db from "../global/db";
import {
  ADD_FOOD,
  REMOVE_FAVOURITE,
  REMOVE_FOOD,
  useGlobal,
} from "../global/provider";
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
  const [results, setResults] = useState<Array<SearchCommonItem>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [modal, setModal] = useState<boolean>(false);
  const [modalItemID, setModalItemID] = useState<string>();

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
  const CloseModal = () => {
    setModal(false);
    setModalItemID("");
  };
  /**
   * Triggers the opening of the modal and set's the current food_name
   * The food name is important for the furteher detailed fetch of the food
   * which is taken place in the modal component
   *
   */
  const OpenModal = (food_name) => {
    setModalItemID(food_name);
    setModal(true);
  };

  // Header date system
  const is_today = todayDate() === app_date;
  const decompose_date = extract_data_from_date(app_date);

  const week = transform_week_to_string(
    get_week_of_date(decompose_date[0], decompose_date[1], decompose_date[2])
  );

  const is_current_month = parseInt(decompose_date[1]) == new Date().getMonth();
  const month = transform_month_to_string(decompose_date[1]);

  const is_current_year =
    parseInt(decompose_date[2]) === new Date().getFullYear();
  const year = decompose_date[2];

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={props.navigation}
        page={session}
        small={
          is_today
            ? "Today"
            : week +
              " " +
              decompose_date[0] +
              ((!is_current_month && " " + month) || "") +
              ((!is_current_year && " " + year) || "")
        }
      />

      <ScrollView>
        <SearchInput
          placeholder="Search for a product"
          onSearch={Search}
          loading={loading}
        />
        {results && results.length > 0 ? (
          <Text style={styles.smallText}>Results</Text>
        ) : (
          <Text style={styles.smallText}>Your Favourites</Text>
        )}
        {results && results.length > 0 ? (
          <SearchResultRender OpenModal={OpenModal} items={results} />
        ) : (
          <FavouritesRender session={session} /> // render the favourite list here.
        )}
        {modal && modalItemID && (
          <ItemModal
            visible={modal}
            onDismiss={CloseModal}
            ID={modalItemID}
            session={session}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const Illustration = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      marginTop: 100,
    }}
  >
    <Searching_Svg />
  </View>
);

/**
 *
 * Render all the search items as card dsing
 */
const SearchResultRender = ({
  items,
  OpenModal,
}: {
  items: Array<any>;
  OpenModal: Function;
}) => {
  return (
    <View
      style={{
        margin: 20,
      }}
    >
      {items.map((data) => (
        <ItemCard
          data={data}
          key={data.food_name}
          onPress={() => OpenModal(data.food_name)}
        />
      ))}
    </View>
  );
};

/**
 * Render the favourite item list
 * The data is taken from the loca state
 */
const FavouritesRender = ({ session }) => {
  const {
    state: { favourites },
  } = useGlobal();
  return (
    <View style={{ margin: 20 }}>
      {favourites.map((favourite) => (
        <FavouriteCard
          key={favourite.id as number}
          item={favourite}
          session={session}
        />
      ))}
    </View>
  );
};

/**
 * Favourite card design component
 * @requires item (CommonItem)
 * @requires session (Fields)
 */
const FavouriteCard = ({ item, session }) => {
  const { state, dispatch } = useGlobal();
  const { food_name, serving_qty, serving_unit, calories, quantity } = item;

  // The state contains the ID of the added item
  const [isAdded, setIsAdded] = useState(null); // contains the new id of the added product
  const [number, setNumber] = useState(0);

  /**
   * Add a new item to the daily list
   * The data is stored on mobile and local state
   * The id of the element is changed so to not create a conflict. That's
   * beacuse all the consumed items have a unique id
   */
  const addItem = async () => {
    const ID = uuid.v4();
    await db.addItem(state.app_date, session, {
      ...item,
      id: ID,
      consumed_at: Date.now(),
      quantity: number || 1,
    });
    dispatch({
      type: ADD_FOOD,
      payload: {
        field: session,
        data: {
          ...item,
          id: ID,
          consumed_at: Date.now(),
          quantity: number || 1,
        },
      },
    });
    setIsAdded(ID);
    setNumber(0);
  };

  /**
   *
   * Remove an item from the consumed list.
   */
  const removeItem = async () => {
    await db.deleteItem(state.app_date, session, isAdded);
    dispatch({
      type: REMOVE_FOOD,
      payload: { field: session, id: isAdded },
    });
    setIsAdded(null);
  };

  const removeFavouriteItem = async () => {
    await db.removeFavourite(item.food_name, item.calories);
    dispatch({
      type: REMOVE_FAVOURITE,
      food_name: item.food_name,
      calories: item.calories,
    });
  };
  return (
    <View style={styles.foodCard_container}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: colors.app.dark_600,
            fontFamily: "Inter-Semibold",
            fontSize: 17,
            textTransform: "capitalize",
          }}
        >
          {food_name}
        </Text>
        <Text
          style={{
            marginTop: 2,
            color: colors.app.dark_300,
            fontFamily: "Inter",
            flexWrap: "wrap",
          }}
        >
          {quantity} x {serving_unit} ({serving_qty}) / {calories} kcal
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {isAdded ? (
          <TouchableWithoutFeedback onPress={removeItem}>
            <View style={{ marginLeft: 10 }}>
              <LinearGradient
                colors={[colors.tailwind.red._300, colors.tailwind.red._400]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient_button}
              >
                <FontAwesome5 name="minus" size={13} color={"#fff"} />
              </LinearGradient>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableWithoutFeedback
              onPress={(number > 0 && (() => setNumber(number - 1))) || null}
            >
              <FontAwesome5
                name="minus"
                size={15}
                color={number > 0 ? colors.app.dark_300 : colors.app.dark_200}
              />
            </TouchableWithoutFeedback>
            <Text
              style={{
                color: number === 0 ? colors.app.dark_200 : colors.app.dark_400,
                fontFamily: "Inter-Medium",
                marginHorizontal: 7.5,
              }}
            >
              {number}
            </Text>
            <TouchableWithoutFeedback onPress={() => setNumber(number + 1)}>
              <FontAwesome5 name="plus" size={15} color={colors.app.dark_300} />
            </TouchableWithoutFeedback>
          </View>
        )}
        {number > 0 ? (
          <TouchableWithoutFeedback onPress={addItem}>
            <View style={{ marginLeft: 10 }}>
              <LinearGradient
                colors={[
                  colors.tailwind.green._300,
                  colors.tailwind.green._400,
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient_button}
              >
                <FontAwesome5 name="plus" size={15} color={"#fff"} />
              </LinearGradient>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={removeFavouriteItem}>
            <View style={{ marginLeft: 10 }}>
              <LinearGradient
                colors={[colors.tailwind.red._300, colors.tailwind.red._400]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient_button}
              >
                <FontAwesome5 name="trash-alt" size={13} color={"#fff"} />
              </LinearGradient>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //paddingTop: Platform.OS === "android" ? 25 : 0,
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
