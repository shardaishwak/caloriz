import React, { useEffect, useState } from "react";
import { View, Dimensions, StatusBar, StyleSheet } from "react-native";

import uuid from "react-native-uuid";
import Modal from "react-native-modal";

import Cards from "./Cards";
import Inputs from "./Inputs";
import TopNotch from "./TopNotch";
import SaveButton from "./SaveButton";

import db from "../../../global@deprecated/db";
import { CommonItem } from "../../../interface";
import nutritionix from "../../../api/nutritionix";

import { RootState, useRootDispatch } from "../../../store";
import { dateConsumptionSlice } from "../../../store/reducers/dateConsumption.reducer";
import { cacheSlice } from "../../../store/reducers/cache.reducer";
import { useSelector } from "react-redux";
import dateConsumptionAction from "../../../store/actions/dateConsumption.action";
import cacheAction from "../../../store/actions/cache.action";

/**
 * Main modal component for showing the detailed data of the searched item
 * The detailed data is fetching in the component
 * The session is required as it ads the data to the current session the page is opened
 */
const ItemModal = ({ ID, visible, onDismiss, session }) => {
  const dispatch = useRootDispatch();

  const [type, set_type] = useState<string>();
  const [result, set_result] = useState<any>();
  const [quantity, set_quantity] = useState<number>(1);
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
    setLoading(true);

    if (!ID) onDismiss();

    (async () => {
      await Search();
    })();

    setLoading(false);
  }, []);

  // The function fetched the main item for its details
  const Search = async () => {
    const result = await nutritionix.nutrients(ID);
    set_result(result);
  };

  // Push the current item to the consumed list
  const AddNewItem = async () => {
    setSaveItemLoading(true);

    await dispatch(dateConsumptionAction.AddItemToRecord(session, data));
    setSaveItemLoading(false);
    onDismiss();
  };

  // Add the item to the favourite list
  const setFavourite = async () => dispatch(cacheAction.AddFavouriteItem(data));

  if (loading || !data) return <></>;

  return (
    <Modal
      animationIn={"slideInUp"}
      swipeDirection="down"
      animationOut={"slideInDown"}
      onSwipeComplete={onDismiss}
      onBackButtonPress={onDismiss}
      onBackdropPress={onDismiss}
      onDismiss={onDismiss}
      isVisible={visible}
      style={{ margin: 0 }}
      customBackdrop={<View style={styles.backdrop}></View>}
      coverScreen
    >
      <View style={styles.overlay}>
        <StatusBar
          backgroundColor={"rgba(0,0,0,.3)"}
          animated
          barStyle="dark-content"
        />
        <View style={{ alignItems: "center", marginVertical: 5 }}>
          <View style={styles.empty_box}></View>
        </View>
        {result && (
          <View style={[styles.container]}>
            <View>
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
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    paddingTop: 30,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    paddingBottom: 10,
    justifyContent: "flex-end",
  },
  empty_box: {
    height: 4,
    width: 45,
    borderRadius: 10,
    backgroundColor: "#fff",
  }, // for spacing and centering
  backdrop: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: "rgba(0,0,0,.3)",
  },
});

export default ItemModal;
