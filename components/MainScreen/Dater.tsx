import React from "react";
import { Dimensions, Text, TouchableWithoutFeedback, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { LoadData } from "../../cache";
import colors from "../../colors";
import { NEW_DATE_LOADING, useGlobal, withGlobal } from "../../global/provider";
import { State } from "../../interface";
import {
  daysInMonth,
  extract_data_from_date,
  formatted_get_week_of_date,
  todayDate,
  transform_week_to_string,
} from "../../time";

/**
 * Top dates per month snapper
 */
class Dater extends React.Component<{ dispatch: any; state: State }> {
  LOAD_NEW_DATE = async (date) => {
    this.props.dispatch({ type: NEW_DATE_LOADING, payload: true });
    await LoadData(date, this.props.dispatch);
    this.props.dispatch({ type: NEW_DATE_LOADING, payload: false });
  };
  carousel;
  _renderItem = ({ item }) => {
    let date = item;
    const week = transform_week_to_string(
      formatted_get_week_of_date(date)
    ).slice(0, 3);
    const is_current_date = date === this.props.state.app_date;
    const today_date = todayDate();
    return (
      <TouchableWithoutFeedback onPress={() => this.LOAD_NEW_DATE(date)}>
        <View
          style={{
            alignItems: "center",
            borderRadius: 999,
            width: 45,
            paddingVertical: 10,
            backgroundColor: is_current_date ? colors.app.green_100 : "#fff",
            marginHorizontal: 5,
          }}
        >
          <Text
            style={{
              textTransform: "capitalize",
              fontFamily: "Inter-Semibold",
              color: is_current_date ? "#fff" : colors.app.dark_300,
              marginBottom: 5,
              marginTop: 5,
            }}
          >
            {week}
          </Text>
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: "#fff",
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: is_current_date
                  ? colors.app.green_100
                  : colors.app.dark_500,
                fontFamily: "Inter-Medium",
              }}
            >
              {extract_data_from_date(date)[0]}
            </Text>
          </View>
          {today_date === date && !is_current_date && (
            <View
              style={{
                backgroundColor: colors.app.green_100,
                width: 5,
                height: 5,
                borderRadius: 999,
              }}
            ></View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };
  render() {
    const { app_date } = this.props.state;
    const unformatted_app_date = extract_data_from_date(app_date);
    const dates = daysInMonth(unformatted_app_date[1], unformatted_app_date[2]);
    return (
      <Carousel
        firstItem={parseInt(unformatted_app_date[0]) - 1}
        layout={"default"}
        ref={(ref) => (this.carousel = ref)}
        data={dates}
        sliderWidth={Dimensions.get("screen").width}
        itemWidth={50}
        renderItem={this._renderItem}
      />
    );
  }
}

export default withGlobal(Dater);