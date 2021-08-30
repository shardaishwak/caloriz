import React, { useState } from "react";

import uuid from "react-native-uuid";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import { useGlobal } from "../../global/provider";
import db from "../../global/db";
import colors from "../../colors";
import {
  ADD_FOOD,
  REMOVE_FAVOURITE,
  REMOVE_FOOD,
} from "../../global/constraints";
import store from "../../store";
import { dateConsumptionSlice } from "../../store/reducers/dateConsumption.reducer";
import { CommonItem, Session } from "../../interface";
import { cacheSlice } from "../../store/reducers/cache.reducer";

/**
 * Favourite card design component
 * @requires item (CommonItem)
 * @requires session (Fields)
 */
const FavouriteCard = ({
  item,
  session,
}: {
  item: CommonItem;
  session: Session;
}) => {
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
    // Create a unique id for the new item
    const ID = uuid.v4();
    const data: CommonItem = {
      ...item,
      id: ID,
      consumed_at: Date.now(),
      quantity: number || 1,
    };

    // update the id, consumed_date and quantity for making a new element
    // The actions is required as all the items in the consumed array
    // need to be of unique ids for search
    await db.addItem(state.app_date, session, data);

    dispatch({
      type: ADD_FOOD,
      payload: {
        field: session,
        data,
      },
    });

    store.dispatch(
      dateConsumptionSlice.actions.addNewItemToRecord({
        field: session,
        data,
      })
    );

    // The item has been added, change the state and show the remove button
    setIsAdded(ID);
    setNumber(0);
  };

  /**
   *
   * Remove an item from the consumed list.
   */
  const removeItem = async () => {
    // isAdded is the ID of the item which got stored through the addItem function above
    await db.deleteItem(state.app_date, session, isAdded);
    dispatch({
      type: REMOVE_FOOD,
      payload: { field: session, id: isAdded },
    });
    store.dispatch(
      dateConsumptionSlice.actions.removeItemFromRecord({
        field: session,
        id: isAdded as string,
      })
    );
    setIsAdded(null);
  };

  /**
   * Remove current favourite item from the list
   */
  const removeFavouriteItem = async () => {
    await db.removeFavourite(item.food_name, item.calories);
    dispatch({
      type: REMOVE_FAVOURITE,
      food_name: item.food_name,
      calories: item.calories,
    });
    store.dispatch(
      cacheSlice.actions.removeFavouriteItem({
        food_name: item.food_name,
        calories: item.calories,
      })
    );
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
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 30 }}
      >
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
              <View
                style={{
                  paddingRight: 10,
                  height: 25,
                  justifyContent: "center",
                }}
              >
                <FontAwesome5
                  name="minus"
                  size={15}
                  color={number > 0 ? colors.app.dark_300 : colors.app.dark_200}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text
              style={{
                color: number === 0 ? colors.app.dark_200 : colors.app.dark_400,
                fontFamily: "Inter-Medium",
                height: 25,
                justifyContent: "center",
              }}
            >
              {number}
            </Text>
            <TouchableWithoutFeedback onPress={() => setNumber(number + 1)}>
              <View
                style={{
                  paddingLeft: 10,
                  height: 25,
                  justifyContent: "center",
                }}
              >
                <FontAwesome5
                  name="plus"
                  size={15}
                  color={colors.app.dark_300}
                />
              </View>
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

export default FavouriteCard;
