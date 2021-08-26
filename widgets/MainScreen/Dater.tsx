import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";

import colors from "../../colors";
import { LoadData } from "../../cache";
import { State } from "../../interface";
import { withGlobal } from "../../global/provider";
import { NEW_DATE_LOADING } from "../../global/constraints";

import {
  daysInMonth,
  extract_data_from_date,
  formatted_get_week_of_date,
  get_next_month_date,
  get_prevous_month_date,
  todayDate,
  transform_date_to_string,
  transform_week_to_string,
} from "../../time";

/**
 * Top dates per month snapper
 */
class Dater extends React.Component<{ dispatch: any; state: State }> {
  carousel;

  // Load a new date data
  LOAD_NEW_DATE = async (date) => {
    this.props.dispatch({ type: NEW_DATE_LOADING, payload: true });

    await LoadData(date, this.props.dispatch);

    this.props.dispatch({ type: NEW_DATE_LOADING, payload: false });
  };

  LOAD_PREVOUS_MONTH = async (date) => {
    const previous_date = get_prevous_month_date(date);
    const format_date = transform_date_to_string(
      previous_date.date,
      previous_date.month,
      previous_date.year
    );
    this.LOAD_NEW_DATE(format_date);
  };

  LOAD_NEXT_MONTH = async (date) => {
    const next_date = get_next_month_date(date);
    const format_date = transform_date_to_string(
      next_date.date,
      next_date.month,
      next_date.year
    );
    this.LOAD_NEW_DATE(format_date);
  };

  _renderItem = ({ item }) => {
    let date = item;

    // Stringified week for the slider
    const week = transform_week_to_string(
      formatted_get_week_of_date(date)
    ).slice(0, 3);

    const is_current_date = date === this.props.state.app_date;

    const today_date = todayDate();

    return (
      <TouchableWithoutFeedback onPress={() => this.LOAD_NEW_DATE(date)}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: is_current_date
                ? colors.tailwind.green._500
                : "#fff",
            },
          ]}
        >
          <Text
            style={[
              styles.week,
              { color: is_current_date ? "#fff" : colors.app.dark_300 },
            ]}
          >
            {week}
          </Text>
          <View style={styles.date_container}>
            <Text
              style={{
                color: is_current_date
                  ? colors.tailwind.green._500
                  : colors.app.dark_500,
                fontFamily: "Inter-Medium",
              }}
            >
              {extract_data_from_date(date)[0]}
            </Text>
          </View>
          {today_date === date && !is_current_date && (
            <View style={styles.point}></View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };
  render() {
    const { app_date } = this.props.state;

    const unformatted_app_date = extract_data_from_date(app_date);
    const dates = daysInMonth(unformatted_app_date[1], unformatted_app_date[2]);
    console.log(unformatted_app_date[0]);
    return (
      <Carousel
        firstItem={parseInt(unformatted_app_date[0]) - 1}
        layout={"default"}
        ref={(ref) => (this.carousel = ref)}
        data={dates}
        sliderWidth={Dimensions.get("screen").width}
        itemWidth={50}
        renderItem={this._renderItem}
        initialNumToRender={dates.length}
        //onSnapToItem={(index) => this.LOAD_NEW_DATE(dates[index])}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 999,
    width: 45,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  week: {
    textTransform: "capitalize",
    fontFamily: "Inter-Semibold",
    marginBottom: 5,
    marginTop: 5,
  },
  date_container: {
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  point: {
    backgroundColor: colors.tailwind.green._500,
    width: 5,
    height: 5,
    borderRadius: 999,
  },
});

export default withGlobal(Dater);
