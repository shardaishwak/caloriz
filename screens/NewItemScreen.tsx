import React from "react";
import { useState } from "react";
import { SafeAreaView, Platform, View, Text } from "react-native";
import Header from "../components/Header";
import { useGlobal } from "../global/provider";
import SearchInput from "../components/SearchInput";
import fcd from "../api/fcd";
import ItemCard from "../components/ItemCard";
import { ScrollView } from "react-native-gesture-handler";

const NewItemScreen = (props) => {
  const { dispatch } = useGlobal();
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const Search = async (query) => {
    if (!query) return;
    setLoading(true);
    const response = await fcd.search(query, 5, 0);
    setResults(response);
    setLoading(false);
  };

  console.log(results);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? 25 : 0,
      }}
    >
      <Header navigation={props.navigation} page="Breakfast" small="Today" />

      <ScrollView style={{}}>
        <SearchInput
          placeholder="Enter a name"
          onSearch={Search}
          loading={loading}
        />
        <Text
          style={{
            fontFamily: "Inter-Medium",
            marginHorizontal: 20,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Results
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 20,
            marginHorizontal: 20,
            borderRadius: 25,
          }}
        >
          {results.length > 0 &&
            results &&
            results.map((data) => <ItemCard data={data} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewItemScreen;
