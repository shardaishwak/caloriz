import React from "react";
import { useState } from "react";
import { SafeAreaView, Platform, View, Text } from "react-native";
import Header from "../components/Header";
import { useGlobal } from "../global/provider";
import SearchInput from "../components/SearchInput";
import fcd from "../api/fcd";
import ItemCard from "../components/ItemCard";
import { ScrollView } from "react-native-gesture-handler";
import nutritionix from "../api/nutritionix";
import colors from "../colors";
import Svg, { Path, Rect } from "react-native-svg";
import Searching_Svg from "../components/Searching_svg";

const NewItemScreen = (props) => {
  const { dispatch } = useGlobal();
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const Search = async (query) => {
    if (!query) return;
    setLoading(true);
    const response = await nutritionix.search(query);
    console.log(response);
    setResults(response);
    setLoading(false);
  };

  console.log(results);
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
              <ItemCard data={data} />
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewItemScreen;
