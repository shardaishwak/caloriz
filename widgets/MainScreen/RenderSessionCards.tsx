import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-snap-carousel";

import Card from "./Card";

import db from "../../global@deprecated/db";
import colors from "../../colors";

import { DateConsumption, CommonItem, Session } from "../../interface";
import { RootState, useRootDispatch } from "../../store";
import { dateConsumptionSlice } from "../../store/reducers/dateConsumption.reducer";
import { useSelector } from "react-redux";
import dateConsumptionAction from "../../store/actions/dateConsumption.action";

/**
 * REnder the session cards
 * The component takes an array of the sessions we want to render on the main page(breakfast, lunch, etc.)
 * The data is retreived form the state and extrated based on the date and the session
 * The sessions are looped to show all the cards of each session
 * The <Card /> component is rendered to give design
 * For each card, the items that are consumed on that date and session are displayed using the <Item /> component
 */
class RenderSessionCards extends React.PureComponent<
  { sessions: Array<Session>; date_data: DateConsumption; navigation: any },
  { activeIndex: number }
> {
  state = {
    activeIndex: time_based_cards(),
  };
  carousel;
  _renderItem = ({ item, index }) => {
    const session = item;

    let total_calories = 0;
    let total_fat = 0;
    let total_protein = 0;
    let total_sugar = 0;

    // Load a particular session data
    const session_data = this.props.date_data[session];

    // Sum up all the nutrients consumed in a particular session
    session_data?.forEach((item: CommonItem) => {
      total_calories += item.calories * item.quantity;
      total_fat += item.fat * item.quantity;
      total_protein += item.protein * item.quantity;
      total_sugar += item.sugars * item.quantity;
    });

    return (
      <Card
        title={session}
        t_kcal={total_calories}
        t_p={total_fat}
        t_c={total_protein}
        t_f={total_sugar}
        key={session}
        session={session}
        navigation={this.props.navigation}
      >
        {session_data.map((item: CommonItem) => (
          <Item
            food_name={item.food_name}
            calories={item.calories}
            fat={item.fat}
            sugar={item.sugars}
            protein={item.protein}
            id={item.id}
            session={session}
            key={item.id as string}
            quantity={item.quantity}
          />
        ))}
      </Card>
    );
  };
  render() {
    const { sessions } = this.props;
    return (
      <View>
        <Text style={styles_main.top_text}>Daily consumption</Text>
        <Pagination
          activeDotIndex={this.state.activeIndex}
          dotsLength={sessions.length}
          dotStyle={{
            margin: 0,
            padding: 0,
            width: 5,
            height: 5,
            marginHorizontal: 0,
            borderRadius: 999,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          dotContainerStyle={{ width: 0, height: 0 }}
        />
        <Carousel
          layout={"default"}
          ref={(ref) => (this.carousel = ref)}
          data={sessions}
          sliderWidth={Dimensions.get("screen").width}
          itemWidth={Dimensions.get("window").width}
          renderItem={this._renderItem}
          firstItem={time_based_cards()}
          initialNumToRender={sessions.length}
          onSnapToItem={(index) => this.setState({ activeIndex: index })}
        />
      </View>
    );
  }
}

const time_based_cards = () => {
  const date = new Date();
  const hours = date.getHours();

  if (hours >= 5 && hours <= 9) return 0;
  else if (hours > 9 && hours <= 12) return 1;
  else if (hours > 12 && hours <= 14) return 2;
  else if (hours > 14 && hours <= 18) return 3;
  else if (hours > 18 && hours <= 21) return 4;
  else if (hours > 21 && hours <= 22) return 5;
  else return 6;
};

const styles_main = StyleSheet.create({
  top_text: {
    fontSize: 15,
    fontFamily: "Inter",
    color: colors.app.dark_300,
    textAlign: "center",
  },
});

/**
 * Component for diplaying all the items eaten in specific date and session
 * Delete consumed food item is created
 */
const Item = ({
  food_name,
  id,
  session,
  calories,
  sugar,
  protein,
  fat,
  quantity,
}: {
  food_name: string;
  id: string | number | number[];
  session: Session;
  calories: number;
  sugar: number;
  protein: number;
  fat: number;
  quantity: number;
}) => {
  const dispatch = useRootDispatch();

  const deleteItem = async () => {
    await dispatch(dateConsumptionAction.RemoveItemFromRecord(session, id));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.food_name}>
        {food_name} <Text style={styles.food_name_span}>({quantity})</Text>
      </Text>
      <View style={styles.detail_container}>
        <View style={styles.detail_wrapper}>
          <Text style={styles.info}>{calories}kcal</Text>
          <Text style={styles.info}>{protein}g</Text>
          <Text style={styles.info}>{sugar}g</Text>
          <Text style={{ color: colors.app.dark_300, fontSize: 12 }}>
            {fat}g
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={deleteItem}>
          <Ionicons name="close" size={20} color={colors.app.dark_300} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  food_name: {
    fontFamily: "Inter-Medium",
    fontSize: 17,
    textTransform: "capitalize",
    color: colors.app.dark_500,
  },
  food_name_span: { fontSize: 10, fontFamily: "Inter" },
  container: { marginVertical: 10 },
  detail_container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7.5,
  },
  detail_wrapper: { flexDirection: "row", alignItems: "center" },
  info: {
    color: colors.app.dark_300,
    fontSize: 12,
    marginRight: 15,
  },
});

export default RenderSessionCards;
