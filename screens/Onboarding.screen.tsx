import React from "react";
import {
  GestureResponderEvent,
  Image,
  ImageProps,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import colors from "../colors";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import Svg, { Path } from "react-native-svg";

const CardContainer: React.FC<{
  onPress: (event: GestureResponderEvent) => void;
  imageSrc: ImageProps;
  color: string;
  title: string;
  desc: string;
  button_value: string;
  back?: boolean;
}> = (props) => {
  const router = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingHorizontal: 25,
        backgroundColor: "#fff",
      }}
    >
      <Image source={props.imageSrc} style={{ width: 250, height: 250 }} />
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            color: props.color,
            fontFamily: "Inter-Semibold",
            fontSize: 25,
            marginTop: 20,
            textAlign: "center",
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
            lineHeight: 21,
            fontSize: 15,
          }}
        >
          {props.desc}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        {props.back && (
          <TouchableNativeFeedback onPress={router.goBack}>
            <Text
              style={{
                backgroundColor: colors.app.dark_100,
                color: colors.app.dark_500,
                borderRadius: 999,
                paddingVertical: 15,
                fontSize: 17,
                width: "47.5%",
                fontFamily: "Inter-Medium",
                textAlign: "center",
              }}
            >
              Go Back
            </Text>
          </TouchableNativeFeedback>
        )}
        <TouchableNativeFeedback onPress={props.onPress}>
          <Text
            style={{
              backgroundColor: props.color,
              color: "#fff",
              borderRadius: 999,
              paddingVertical: 15,
              fontSize: 17,
              width: props.back ? "47.5%" : "100%",
              fontFamily: "Inter-Medium",
              textAlign: "center",
            }}
          >
            {props.button_value}
          </Text>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const WelcomePage = ({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingHorizontal: 25,
    }}
  >
    <Svg width="158" height="138" viewBox="0 0 458 438" fill="none">
      <Path
        d="M89.8594 390.664C85.1719 394.695 79.9219 397.789 74.1094 399.945C68.2969 402.102 62.2734 403.18 56.0391 403.18C51.2578 403.18 46.6406 402.547 42.1875 401.281C37.7812 400.062 33.6328 398.328 29.7422 396.078C25.8984 393.781 22.3828 391.039 19.1953 387.852C16.0078 384.664 13.2656 381.148 10.9688 377.305C8.71875 373.414 6.96094 369.266 5.69531 364.859C4.47656 360.406 3.86719 355.789 3.86719 351.008C3.86719 346.227 4.47656 341.609 5.69531 337.156C6.96094 332.703 8.71875 328.555 10.9688 324.711C13.2656 320.82 16.0078 317.281 19.1953 314.094C22.3828 310.906 25.8984 308.188 29.7422 305.938C33.6328 303.641 37.7812 301.883 42.1875 300.664C46.6406 299.398 51.2578 298.766 56.0391 298.766C62.2734 298.766 68.2969 299.844 74.1094 302C79.9219 304.109 85.1719 307.203 89.8594 311.281L79.1719 328.859C76.2188 325.672 72.7266 323.234 68.6953 321.547C64.6641 319.812 60.4453 318.945 56.0391 318.945C51.5859 318.945 47.4141 319.789 43.5234 321.477C39.6328 323.164 36.2344 325.461 33.3281 328.367C30.4219 331.227 28.125 334.625 26.4375 338.562C24.75 342.453 23.9062 346.602 23.9062 351.008C23.9062 355.414 24.75 359.562 26.4375 363.453C28.125 367.297 30.4219 370.672 33.3281 373.578C36.2344 376.484 39.6328 378.781 43.5234 380.469C47.4141 382.156 51.5859 383 56.0391 383C60.4453 383 64.6641 382.156 68.6953 380.469C72.7266 378.734 76.2188 376.273 79.1719 373.086L89.8594 390.664ZM169.805 401H165.164L157.711 390.664C155.883 392.305 153.938 393.852 151.875 395.305C149.859 396.711 147.727 397.953 145.477 399.031C143.227 400.062 140.906 400.883 138.516 401.492C136.172 402.102 133.781 402.406 131.344 402.406C126.047 402.406 121.055 401.516 116.367 399.734C111.727 397.953 107.648 395.375 104.133 392C100.664 388.578 97.9219 384.406 95.9062 379.484C93.8906 374.562 92.8828 368.961 92.8828 362.68C92.8828 356.82 93.8906 351.453 95.9062 346.578C97.9219 341.656 100.664 337.438 104.133 333.922C107.648 330.406 111.727 327.688 116.367 325.766C121.055 323.797 126.047 322.812 131.344 322.812C133.781 322.812 136.195 323.117 138.586 323.727C140.977 324.336 143.297 325.18 145.547 326.258C147.797 327.336 149.93 328.602 151.945 330.055C154.008 331.508 155.93 333.078 157.711 334.766L165.164 325.836H169.805V401ZM150.469 362.68C150.469 360.055 149.953 357.523 148.922 355.086C147.938 352.602 146.578 350.422 144.844 348.547C143.109 346.625 141.07 345.102 138.727 343.977C136.43 342.805 133.969 342.219 131.344 342.219C128.719 342.219 126.234 342.664 123.891 343.555C121.594 344.445 119.578 345.758 117.844 347.492C116.156 349.227 114.82 351.383 113.836 353.961C112.852 356.492 112.359 359.398 112.359 362.68C112.359 365.961 112.852 368.891 113.836 371.469C114.82 374 116.156 376.133 117.844 377.867C119.578 379.602 121.594 380.914 123.891 381.805C126.234 382.695 128.719 383.141 131.344 383.141C133.969 383.141 136.43 382.578 138.727 381.453C141.07 380.281 143.109 378.758 144.844 376.883C146.578 374.961 147.938 372.781 148.922 370.344C149.953 367.859 150.469 365.305 150.469 362.68ZM203.836 401H184.5V295.742H203.836V401ZM291.305 362.68C291.305 368.305 290.297 373.555 288.281 378.43C286.266 383.258 283.523 387.453 280.055 391.016C276.586 394.531 272.508 397.32 267.82 399.383C263.18 401.398 258.188 402.406 252.844 402.406C247.547 402.406 242.555 401.398 237.867 399.383C233.227 397.32 229.148 394.531 225.633 391.016C222.164 387.453 219.422 383.258 217.406 378.43C215.391 373.555 214.383 368.305 214.383 362.68C214.383 356.961 215.391 351.664 217.406 346.789C219.422 341.914 222.164 337.719 225.633 334.203C229.148 330.641 233.227 327.852 237.867 325.836C242.555 323.82 247.547 322.812 252.844 322.812C258.188 322.812 263.18 323.773 267.82 325.695C272.508 327.57 276.586 330.266 280.055 333.781C283.523 337.25 286.266 341.445 288.281 346.367C290.297 351.242 291.305 356.68 291.305 362.68ZM271.969 362.68C271.969 359.586 271.453 356.797 270.422 354.312C269.438 351.781 268.078 349.625 266.344 347.844C264.609 346.016 262.57 344.633 260.227 343.695C257.93 342.711 255.469 342.219 252.844 342.219C250.219 342.219 247.734 342.711 245.391 343.695C243.094 344.633 241.078 346.016 239.344 347.844C237.656 349.625 236.32 351.781 235.336 354.312C234.352 356.797 233.859 359.586 233.859 362.68C233.859 365.586 234.352 368.281 235.336 370.766C236.32 373.25 237.656 375.406 239.344 377.234C241.078 379.062 243.094 380.516 245.391 381.594C247.734 382.625 250.219 383.141 252.844 383.141C255.469 383.141 257.93 382.648 260.227 381.664C262.57 380.68 264.609 379.297 266.344 377.516C268.078 375.734 269.438 373.578 270.422 371.047C271.453 368.516 271.969 365.727 271.969 362.68ZM321.117 401H301.922V325.695H306.562L312.891 334.625C315.984 331.812 319.5 329.656 323.438 328.156C327.375 326.609 331.453 325.836 335.672 325.836H352.617V344.961H335.672C333.656 344.961 331.758 345.336 329.977 346.086C328.195 346.836 326.648 347.867 325.336 349.18C324.023 350.492 322.992 352.039 322.242 353.82C321.492 355.602 321.117 357.5 321.117 359.516V401ZM384.188 305.234C384.188 307.016 383.836 308.68 383.133 310.227C382.477 311.773 381.562 313.133 380.391 314.305C379.219 315.43 377.836 316.344 376.242 317.047C374.695 317.703 373.031 318.031 371.25 318.031C369.469 318.031 367.781 317.703 366.188 317.047C364.641 316.344 363.281 315.43 362.109 314.305C360.984 313.133 360.07 311.773 359.367 310.227C358.711 308.68 358.383 307.016 358.383 305.234C358.383 303.5 358.711 301.859 359.367 300.312C360.07 298.719 360.984 297.359 362.109 296.234C363.281 295.062 364.641 294.148 366.188 293.492C367.781 292.789 369.469 292.438 371.25 292.438C373.031 292.438 374.695 292.789 376.242 293.492C377.836 294.148 379.219 295.062 380.391 296.234C381.562 297.359 382.477 298.719 383.133 300.312C383.836 301.859 384.188 303.5 384.188 305.234ZM380.883 401H361.547V325.695H380.883V401ZM454.359 401H391.57L423.281 344.961H391.57V325.836H454.359L422.648 381.875H454.359V401Z"
        fill="black"
      />
      <Path
        d="M292.496 124.211C298.543 131.242 303.184 139.117 306.418 147.836C309.652 156.555 311.27 165.59 311.27 174.941C311.27 182.113 310.32 189.039 308.422 195.719C306.594 202.328 303.992 208.551 300.617 214.387C297.172 220.152 293.059 225.426 288.277 230.207C283.496 234.988 278.223 239.102 272.457 242.547C266.621 245.922 260.398 248.559 253.789 250.457C247.109 252.285 240.184 253.199 233.012 253.199C225.84 253.199 218.914 252.285 212.234 250.457C205.555 248.559 199.332 245.922 193.566 242.547C187.73 239.102 182.422 234.988 177.641 230.207C172.859 225.426 168.781 220.152 165.406 214.387C161.961 208.551 159.324 202.328 157.496 195.719C155.598 189.039 154.648 182.113 154.648 174.941C154.648 165.59 156.266 156.555 159.5 147.836C162.664 139.117 167.305 131.242 173.422 124.211L199.789 140.242C195.008 144.672 191.352 149.91 188.82 155.957C186.219 162.004 184.918 168.332 184.918 174.941C184.918 181.621 186.184 187.879 188.715 193.715C191.246 199.551 194.691 204.648 199.051 209.008C203.34 213.367 208.438 216.813 214.344 219.344C220.18 221.875 226.402 223.141 233.012 223.141C239.621 223.141 245.844 221.875 251.68 219.344C257.445 216.813 262.508 213.367 266.867 209.008C271.227 204.648 274.672 199.551 277.203 193.715C279.734 187.879 281 181.621 281 174.941C281 168.332 279.734 162.004 277.203 155.957C274.602 149.91 270.91 144.672 266.129 140.242L292.496 124.211Z"
        fill="black"
      />
      <Path
        d="M291 11.6602V18.6211L275.496 29.8008C277.957 32.543 280.277 35.4609 282.457 38.5547C284.566 41.5781 286.43 44.7773 288.047 48.1523C289.594 51.5273 290.824 55.0078 291.738 58.5938C292.652 62.1094 293.109 65.6953 293.109 69.3516C293.109 77.2969 291.773 84.7852 289.102 91.8164C286.43 98.7773 282.562 104.895 277.5 110.168C272.367 115.371 266.109 119.484 258.727 122.508C251.344 125.531 242.941 127.043 233.52 127.043C224.73 127.043 216.68 125.531 209.367 122.508C201.984 119.484 195.656 115.371 190.383 110.168C185.109 104.895 181.031 98.7773 178.148 91.8164C175.195 84.7852 173.719 77.2969 173.719 69.3516C173.719 65.6953 174.176 62.0742 175.09 58.4883C176.004 54.9023 177.27 51.4219 178.887 48.0469C180.504 44.6719 182.402 41.4727 184.582 38.4492C186.762 35.3555 189.117 32.4727 191.648 29.8008L178.254 18.6211V11.6602L291 11.6602ZM233.52 40.6641C229.582 40.6641 225.785 41.4375 222.129 42.9844C218.402 44.4609 215.133 46.5 212.32 49.1016C209.438 51.7031 207.152 54.7617 205.465 58.2773C203.707 61.7227 202.828 65.4141 202.828 69.3516C202.828 73.2891 203.496 77.0156 204.832 80.5313C206.168 83.9766 208.137 87 210.738 89.6016C213.34 92.1328 216.574 94.1367 220.441 95.6133C224.238 97.0898 228.598 97.8281 233.52 97.8281C238.441 97.8281 242.836 97.0898 246.703 95.6133C250.5 94.1367 253.699 92.1328 256.301 89.6016C258.902 87 260.871 83.9766 262.207 80.5313C263.543 77.0156 264.211 73.2891 264.211 69.3516C264.211 65.4141 263.367 61.7227 261.68 58.2773C259.922 54.7617 257.637 51.7031 254.824 49.1016C251.941 46.5 248.672 44.4609 245.016 42.9844C241.289 41.4375 237.457 40.6641 233.52 40.6641Z"
        fill="black"
      />
    </Svg>
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          color: "#212121",
          fontFamily: "Inter-Semibold",
          fontSize: 25,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        A Clamorous Welcome
      </Text>
      <Text
        style={{
          fontFamily: "Inter",
          color: colors.tailwind.gray._500,
          marginTop: 20,
          textAlign: "center",
          lineHeight: 21,
          fontSize: 15,
        }}
      >
        In the next slides, you will be given an idea of what is the main
        objective of the app.
      </Text>
    </View>
    <TouchableNativeFeedback onPress={() => navigation.navigate("onboard-1")}>
      <Text
        style={{
          backgroundColor: "#212121",
          color: "#fff",
          borderRadius: 999,
          paddingVertical: 15,
          fontSize: 17,
          width: "100%",
          fontFamily: "Inter-Medium",
          textAlign: "center",
        }}
      >
        Take the Tour
      </Text>
    </TouchableNativeFeedback>
  </View>
);

const OnboardingPage1 = ({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) => (
  <CardContainer
    onPress={() => navigation.navigate("onboard-2")}
    color={colors.app.blue_100}
    imageSrc={require("../assets/images/undraw_ice_cream.png")}
    title={"Count your calories"}
    desc={
      "Stay aware of the daily intaken calories, caterogrized by day routeines."
    }
    button_value={"Next"}
    back
  />
);

const OnboardingPage2 = ({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) => (
  <CardContainer
    onPress={() => navigation.navigate("onboard-3")}
    color={colors.app.orange_100}
    imageSrc={require("../assets/images/undraw_searching.png")}
    title={"Advanced search algorithm"}
    desc={
      "All the products in the database have been calibrated to assimilate to the real one. Every quantity is calculated with precision."
    }
    button_value={"Next"}
    back
  />
);

const OnboardingPage3 = ({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) => (
  <CardContainer
    onPress={() => navigation.navigate("onboard-4")}
    color={colors.tailwind.red._500}
    imageSrc={require("../assets/images/undraw_simple_target.png")}
    title={"A precise target in mind"}
    desc={
      "We have the aim to bring awareness in what products your consumed daily. Your health depends on it."
    }
    back
    button_value={"Next"}
  />
);

const OnboardingPage4 = ({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) => (
  <CardContainer
    onPress={() => navigation.navigate("settings:profile")}
    color={colors.tailwind.green._500}
    imageSrc={require("../assets/images/undraw_start.png")}
    title={"What are you waiting for?"}
    desc={
      "Start counting your calories and have healthy life.\n\nIn the next page, you will be presented with a form in which we require you to fill your personal details."
    }
    button_value={"Fill personal details"}
  />
);

const OnboardingStack = createStackNavigator();

const OnboardingScreen = () => {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="welcome" component={WelcomePage} />
      <OnboardingStack.Screen name="onboard-1" component={OnboardingPage1} />
      <OnboardingStack.Screen name="onboard-2" component={OnboardingPage2} />
      <OnboardingStack.Screen name="onboard-3" component={OnboardingPage3} />
      <OnboardingStack.Screen name="onboard-4" component={OnboardingPage4} />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingScreen;
