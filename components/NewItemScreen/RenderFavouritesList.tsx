import React from "react";
import { View } from "react-native";

import FavouriteCard from "./FavouriteCard";
import { useGlobal } from "../../global/provider";
import Searching_Svg from "./Searching_svg";

// Nice illustration for empty favourites

const Illustration = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      marginTop: 75,
    }}
  >
    <Searching_Svg />
  </View>
);

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
      {favourites.length > 0 ? (
        favourites.map((favourite) => (
          <FavouriteCard
            key={favourite.id as number}
            item={favourite}
            session={session}
          />
        ))
      ) : (
        <Illustration />
      )}
    </View>
  );
};

export default FavouritesRender;
