import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View, Modal, Text } from "react-native";
import uuid from "react-native-uuid";

import SaveButton from "./SaveButton";
import Cards from "./Cards";
import Inputs from "./Inputs";
import TopNotch from "./TopNotch";
import { ADD_FOOD, SET_FAVOURITE, useGlobal } from "../../global/provider";
import nutritionix from "../../api/nutritionix";
import { CommonItem } from "../../interface";
import { todayDate } from "../../global/actions";
import db from "../../global/db";

const ItemModal = ({ ID, visible, onDismiss, session }) => {
  const { dispatch, state } = useGlobal();
  const [quantity, set_quantity] = useState<number>(0);
  const [type, set_type] = useState<string>();

  const [loading, setLoading] = useState<boolean>(false);
  const [result, set_result] = useState<any>();
  const [saveItemLoading, setSaveItemLoading] = useState<boolean>(false);
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

  useEffect(() => {
    if (!ID) onDismiss();
    (async () => {
      await Search();
    })();
  }, []);

  const Search = async () => {
    setLoading(true);
    const result = await nutritionix.nutrients(ID);
    set_result(result);
    setLoading(false);
  };

  const AddNewItem = async () => {
    setSaveItemLoading(true);

    // Save to the database
    await db.addItem(state, todayDate(), session, data);
    // Save to local state
    dispatch({
      type: ADD_FOOD,
      payload: { date: todayDate(), field: session, data },
    });
    setSaveItemLoading(false);
    onDismiss();
  };

  const setFavourite = async () => {
    await db.addFavourite(result);
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
          <View
            style={{
              height: 4,
              width: 45,
              borderRadius: 10,
              backgroundColor: "#fff",
            }}
          ></View>
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
});

export default ItemModal;
