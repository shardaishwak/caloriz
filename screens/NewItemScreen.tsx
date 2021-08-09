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
import { todayDate } from "../global/actions";
import {
  ADD_FOOD,
  REMOVE_FAVOURITE,
  REMOVE_FOOD,
  useGlobal,
} from "../global/provider";

const NewItemScreen = (props) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={props.navigation} page={session} small="Today" />

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
  // The state contains the ID of the added item
  const [isAdded, setIsAdded] = useState(null); // contains the new id of the added product
  const { food_name, serving_qty, serving_unit, calories, quantity } = item;

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
    });
    dispatch({
      type: ADD_FOOD,
      payload: {
        field: session,
        data: {
          ...item,
          id: ID,
          consumed_at: Date.now(),
        },
      },
    });
    setIsAdded(true);
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
      <View>
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
          }}
        >
          {quantity} x {serving_unit} ({serving_qty}) / {calories} kcal
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableWithoutFeedback onPress={isAdded ? removeItem : addItem}>
          {isAdded ? (
            <LinearGradient
              colors={[colors.tailwind.red._300, colors.tailwind.red._400]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient_button}
            >
              <FontAwesome5 name="times" size={15} color={"#fff"} />
            </LinearGradient>
          ) : (
            <LinearGradient
              colors={[colors.tailwind.green._300, colors.tailwind.green._400]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient_button}
            >
              <FontAwesome5 name="plus" size={15} color={"#fff"} />
            </LinearGradient>
          )}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={removeFavouriteItem}>
          <View style={{ marginLeft: 10 }}>
            <FontAwesome5
              name="trash-alt"
              size={18}
              color={colors.app.dark_200}
            />
          </View>
        </TouchableWithoutFeedback>
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
