import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import ItemCard from "../components/ItemCard";
import Searching_Svg from "../components/Searching_svg";
import ItemModal from "../components/ItemModal";

import { useGlobal } from "../global/provider";
import nutritionix from "../api/nutritionix";
import colors from "../colors";
import { SearchCommonItem } from "../interface";

const NewItemScreen = (props) => {
  const { dispatch } = useGlobal();
  const [results, setResults] = useState<Array<SearchCommonItem>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [modal, setModal] = useState<boolean>(false);
  const [modalItemID, setModalItemID] = useState<string>();

  const Search = async (query) => {
    try {
      if (!query) return;
      setLoading(true);
      const response = (await nutritionix.search(query))?.common?.map(
        (a) =>
          ({
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

  const CloseModal = () => {
    setModal(false);
    setModalItemID("");
  };
  // Use cacheing for storing data and then retrieve the same data fastly using the asyncstorage
  const OpenModal = (food_name) => {
    setModalItemID(food_name);
    setModal(true);
  };

  // console.log(results); All the search items
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        //paddingTop: Platform.OS === "android" ? 25 : 0,
      }}
    >
      <Header navigation={props.navigation} page="Breakfast" small="Today" />

      <ScrollView>
        <SearchInput
          placeholder="Search for a product"
          onSearch={Search}
          loading={loading}
        />
        {results.length > 0 && (
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Inter",
              color: colors.app.dark_300,
              marginHorizontal: 20,
              textAlign: "center",
            }}
          >
            Results
          </Text>
        )}
        {results.length > 0 ? (
          <View
            style={{
              margin: 20,
            }}
          >
            {results.map((data) => (
              <ItemCard
                data={data}
                key={data.food_name}
                onPress={() => OpenModal(data.food_name)}
              />
            ))}
          </View>
        ) : (
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
        )}
        {modal && modalItemID && (
          <ItemModal visible={modal} onDismiss={CloseModal} ID={modalItemID} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewItemScreen;
