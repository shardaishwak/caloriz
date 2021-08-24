import React, { ReactChild } from "react";

import {
  View,
  Text,
  Dimensions,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  ImageProps,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import colors from "../colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { GestureResponderEvent } from "react-native-modal";

export default class Onboarding extends React.Component<
  { onClose: (event: GestureResponderEvent) => void },
  { activeIndex: number }
> {
  state = { activeIndex: 0 };
  carousel;
  _renderItem = ({ item }) => item.component;
  render() {
    const data = [
      {
        id: 1,
        component: (
          <CardContainer
            onPress={this.props.onClose}
            color={colors.app.blue_100}
            imageSrc={require("../assets/undraw_ice_cream.png")}
            title={"Count your calories"}
            desc={
              "Stay aware of the daily intaken calories, caterogrized by day routeines."
            }
          >
            <>
              <View>
                <Text style={{ color: colors.app.dark_300, marginTop: 20 }}>
                  Swipe right
                </Text>
              </View>
            </>
          </CardContainer>
        ),
      },
      {
        id: 2,
        component: (
          <CardContainer
            onPress={this.props.onClose}
            color={colors.app.orange_100}
            imageSrc={require("../assets/undraw_searching.png")}
            title={"Advanced search and data"}
            desc={
              "All the products in the database have been calibrated to assimilate to the real one. Every quantity is calculated with precision."
            }
          >
            <>
              <View>
                <Text style={{ color: colors.app.dark_300, marginTop: 20 }}>
                  Swipe right
                </Text>
              </View>
            </>
          </CardContainer>
        ),
      },
      {
        id: 3,
        component: (
          <CardContainer
            onPress={this.props.onClose}
            color={colors.tailwind.red._500}
            imageSrc={require("../assets/undraw_simple_target.png")}
            title={"A precise target in mind"}
            desc={
              "We have the aim to bring awareness in what products your consumed daily. Your health depends on it."
            }
          >
            <>
              <View>
                <Text style={{ color: colors.app.dark_300, marginTop: 20 }}>
                  Swipe right
                </Text>
              </View>
            </>
          </CardContainer>
        ),
      },
      {
        id: 4,
        component: (
          <CardContainer
            onPress={this.props.onClose}
            color={colors.tailwind.green._500}
            imageSrc={require("../assets/undraw_start.png")}
            title={"What are you waiting for?"}
            desc={"Start counting your calories and have an healthy life."}
          >
            <>
              <TouchableNativeFeedback onPress={this.props.onClose}>
                <Text
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    paddingVertical: 10,
                    marginTop: 30,
                    color: "#fff",

                    textAlign: "center",
                    fontFamily: "Inter-Medium",
                    backgroundColor: colors.tailwind.green._500,
                  }}
                >
                  Get started
                </Text>
              </TouchableNativeFeedback>
            </>
          </CardContainer>
        ),
      },
    ];
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          height: Dimensions.get("window").height,
          width: "100%",
          backgroundColor: "#eeeeee90",
          zIndex: 2,
        }}
      >
        <StatusBar backgroundColor={"#eeeeee90"} />
        <Carousel
          layout={"default"}
          ref={(ref) => (this.carousel = ref)}
          data={data}
          sliderWidth={Dimensions.get("screen").width}
          itemWidth={Dimensions.get("screen").width}
          renderItem={this._renderItem}

          //onSnapToItem={(index) => this.LOAD_NEW_DATE(dates[index])}
        />
      </View>
    );
  }
}

const CardContainer: React.FC<{
  onPress: (event: GestureResponderEvent) => void;
  children: ReactChild;
  imageSrc: ImageProps;
  color: string;
  title: string;
  desc: string;
}> = (props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "100%",
        }}
      >
        <View
          style={{
            marginHorizontal: 40,
            borderRadius: 15,
            padding: 20,
            alignItems: "center",
            backgroundColor: "#ffffff",
            paddingVertical: 40,
          }}
        >
          <TouchableWithoutFeedback onPress={props.onPress}>
            <View
              style={{
                position: "absolute",
                marginTop: 20,
                zIndex: 2,
                width: "100%",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 25,
                  height: 25,
                  borderRadius: 999,
                  backgroundColor: "rgba(0,0,0,.1)",
                }}
              >
                <FontAwesome5 name="times" size={14} color="#fff" />
              </View>
            </View>
          </TouchableWithoutFeedback>

          <Image source={props.imageSrc} style={{ width: 200, height: 200 }} />
          <Text
            style={{
              color: props.color,
              fontFamily: "Inter-Semibold",
              fontSize: 20,
              marginTop: 20,
            }}
          >
            {props.title}
          </Text>
          <Text
            style={{
              fontFamily: "Inter",
              color: colors.tailwind.gray._500,
              marginTop: 20,
              textAlign: "center",
            }}
          >
            {props.desc}
          </Text>
          {props.children}
        </View>
      </View>
    </View>
  );
};
