import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View, Modal, Text } from "react-native";
import uuid from "react-native-uuid";

import SaveButton from "./SaveButton";
import Cards from "./Cards";
import Inputs from "./Inputs";
import TopNotch from "./TopNotch";
import { ADD_FOOD, SET_FAVOURITE, useGlobal } from "../../../global/provider";
import nutritionix from "../../../api/nutritionix";
import { CommonItem } from "../../../interface";
import { todayDate } from "../../../global/actions";
import db from "../../../global/db";

/**
 * Main modal component for showing the detailed data of the searched item
 * The detailed data is fetching in the component
 * The session is required as it ads the data to the current session the page is opened
 */
const ItemModal = ({ ID, visible, onDismiss, session }) => {
  const { dispatch, state } = useGlobal();
  const date = todayDate();

  const [type, set_type] = useState<string>();
  const [result, set_result] = useState<any>();
  const [quantity, set_quantity] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [saveItemLoading, setSaveItemLoading] = useState<boolean>(false);

  // All the data that is fetched is then filteerd to fit the CommonItem interface
  const data: CommonItem = result && {
    calories: result.nf_calories || 0,
    carbohydrates: result.nf_total_carbohydrate || 0,
    fat: result.nf_total_fat || 0,
    consumed_at: Date.now(),
    food_name: result.food_name,
    id: uuid.v4(),
    potassium: result.nf_potassium || 0,
    protein: result.nf_protein || 0,
    saturated_fat: result.nf_saturated_fat || 0,
    serving_qty: result.serving_qty || 0,
    serving_unit: result.serving_unit || 0,
    serving_weight_grams: result.serving_weight_grams || 0,
    sodium: result.nf_sodium || 0,
    sugars: result.nf_sugars || 0,
    cholesterol: result.nf_cholesterol || 0,
    dietary_fiber: result.nf_dietary_fiber || 0,
    quantity: quantity || 1,
  };

  // The Search function is ran to get the main item
  useEffect(() => {
    if (!ID) onDismiss();
    (async () => {
      await Search();
    })();
  }, []);

  // The function fetched the main item for its details
  const Search = async () => {
    setLoading(true);
    const result = await nutritionix.nutrients(ID);
    set_result(result);
    setLoading(false);
  };

  // Push the current item to the consumed list
  const AddNewItem = async () => {
    setSaveItemLoading(true);

    // Save to the database
    await db.addItem(state, date, session, data);
    // Save to local state
    dispatch({
      type: ADD_FOOD,
      payload: { date, field: session, data },
    });
    setSaveItemLoading(false);
    onDismiss();
  };

  // Add the item to the favourite list
  const setFavourite = async () => {
    await db.addFavourite(data);
    dispatch({ type: SET_FAVOURITE, item: data });
  };
  if (loading) return <Text></Text>;
  return (
    <Modal
      animated
      animationType="slide"
      visible={visible}
      transparent
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View style={{ alignItems: "center", marginVertical: 5 }}>
          <View style={styles.empty_box}></View>
        </View>
        {result && (
          <View style={[styles.container]}>
            <View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/**Children data */}
                <TopNotch
                  food_name={data.food_name}
                  onStarClick={setFavourite}
                  calories={data.calories}
                />
                <Inputs
                  onQuantityChange={(e) => set_quantity(e)}
                  onTypeChange={(e) => set_type(e)}
                  quantity={quantity}
                  type={result.serving_unit as string}
                />
                <Cards data={result} />
                <SaveButton onSave={AddNewItem} loading={saveItemLoading} />
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    paddingTop: 30,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    justifyContent: "flex-end",
  },
  empty_box: {
    height: 4,
    width: 45,
    borderRadius: 10,
    backgroundColor: "#fff",
  }, // for spacing and centering
});

export default ItemModal;
