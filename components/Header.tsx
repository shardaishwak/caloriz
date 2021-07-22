import React from "react";
import { Text, TouchableNativeFeedback, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import colors from "../colors";
import Svg, { Path } from "react-native-svg";

const Header = (props: {
  navigation: StackNavigationHelpers;
  page?: string;
  small?: string;
  rightIcon?: React.FC;
}) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 70,
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      {props.navigation.canGoBack() ? (
        <TouchableNativeFeedback onPress={props.navigation.goBack}>
          <Ionicons size={25} name="chevron-back" />
        </TouchableNativeFeedback>
      ) : (
        <View style={{ width: 25, height: 25 }}></View>
      )}
      {props.page && props.small ? (
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 19,
              fontFamily: "Inter",
              color: colors.app.dark_600,
            }}
          >
            {props.page}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Inter",
              color: colors.app.dark_300,
              marginTop: -2,
            }}
          >
            {props.small}
          </Text>
        </View>
      ) : (
        <Svg width="110" height="50" viewBox="0 0 753 259" fill="none">
          <Path
            d="M384.859 162.664C380.172 166.695 374.922 169.789 369.109 171.945C363.297 174.102 357.273 175.18 351.039 175.18C346.258 175.18 341.641 174.547 337.188 173.281C332.781 172.062 328.633 170.328 324.742 168.078C320.898 165.781 317.383 163.039 314.195 159.852C311.008 156.664 308.266 153.148 305.969 149.305C303.719 145.414 301.961 141.266 300.695 136.859C299.477 132.406 298.867 127.789 298.867 123.008C298.867 118.227 299.477 113.609 300.695 109.156C301.961 104.703 303.719 100.555 305.969 96.7109C308.266 92.8203 311.008 89.2812 314.195 86.0938C317.383 82.9062 320.898 80.1875 324.742 77.9375C328.633 75.6406 332.781 73.8828 337.188 72.6641C341.641 71.3984 346.258 70.7656 351.039 70.7656C357.273 70.7656 363.297 71.8438 369.109 74C374.922 76.1094 380.172 79.2031 384.859 83.2812L374.172 100.859C371.219 97.6719 367.727 95.2344 363.695 93.5469C359.664 91.8125 355.445 90.9453 351.039 90.9453C346.586 90.9453 342.414 91.7891 338.523 93.4766C334.633 95.1641 331.234 97.4609 328.328 100.367C325.422 103.227 323.125 106.625 321.438 110.562C319.75 114.453 318.906 118.602 318.906 123.008C318.906 127.414 319.75 131.562 321.438 135.453C323.125 139.297 325.422 142.672 328.328 145.578C331.234 148.484 334.633 150.781 338.523 152.469C342.414 154.156 346.586 155 351.039 155C355.445 155 359.664 154.156 363.695 152.469C367.727 150.734 371.219 148.273 374.172 145.086L384.859 162.664ZM464.805 173H460.164L452.711 162.664C450.883 164.305 448.938 165.852 446.875 167.305C444.859 168.711 442.727 169.953 440.477 171.031C438.227 172.062 435.906 172.883 433.516 173.492C431.172 174.102 428.781 174.406 426.344 174.406C421.047 174.406 416.055 173.516 411.367 171.734C406.727 169.953 402.648 167.375 399.133 164C395.664 160.578 392.922 156.406 390.906 151.484C388.891 146.562 387.883 140.961 387.883 134.68C387.883 128.82 388.891 123.453 390.906 118.578C392.922 113.656 395.664 109.438 399.133 105.922C402.648 102.406 406.727 99.6875 411.367 97.7656C416.055 95.7969 421.047 94.8125 426.344 94.8125C428.781 94.8125 431.195 95.1172 433.586 95.7266C435.977 96.3359 438.297 97.1797 440.547 98.2578C442.797 99.3359 444.93 100.602 446.945 102.055C449.008 103.508 450.93 105.078 452.711 106.766L460.164 97.8359H464.805V173ZM445.469 134.68C445.469 132.055 444.953 129.523 443.922 127.086C442.938 124.602 441.578 122.422 439.844 120.547C438.109 118.625 436.07 117.102 433.727 115.977C431.43 114.805 428.969 114.219 426.344 114.219C423.719 114.219 421.234 114.664 418.891 115.555C416.594 116.445 414.578 117.758 412.844 119.492C411.156 121.227 409.82 123.383 408.836 125.961C407.852 128.492 407.359 131.398 407.359 134.68C407.359 137.961 407.852 140.891 408.836 143.469C409.82 146 411.156 148.133 412.844 149.867C414.578 151.602 416.594 152.914 418.891 153.805C421.234 154.695 423.719 155.141 426.344 155.141C428.969 155.141 431.43 154.578 433.727 153.453C436.07 152.281 438.109 150.758 439.844 148.883C441.578 146.961 442.938 144.781 443.922 142.344C444.953 139.859 445.469 137.305 445.469 134.68ZM498.836 173H479.5V67.7422H498.836V173ZM586.305 134.68C586.305 140.305 585.297 145.555 583.281 150.43C581.266 155.258 578.523 159.453 575.055 163.016C571.586 166.531 567.508 169.32 562.82 171.383C558.18 173.398 553.188 174.406 547.844 174.406C542.547 174.406 537.555 173.398 532.867 171.383C528.227 169.32 524.148 166.531 520.633 163.016C517.164 159.453 514.422 155.258 512.406 150.43C510.391 145.555 509.383 140.305 509.383 134.68C509.383 128.961 510.391 123.664 512.406 118.789C514.422 113.914 517.164 109.719 520.633 106.203C524.148 102.641 528.227 99.8516 532.867 97.8359C537.555 95.8203 542.547 94.8125 547.844 94.8125C553.188 94.8125 558.18 95.7734 562.82 97.6953C567.508 99.5703 571.586 102.266 575.055 105.781C578.523 109.25 581.266 113.445 583.281 118.367C585.297 123.242 586.305 128.68 586.305 134.68ZM566.969 134.68C566.969 131.586 566.453 128.797 565.422 126.312C564.438 123.781 563.078 121.625 561.344 119.844C559.609 118.016 557.57 116.633 555.227 115.695C552.93 114.711 550.469 114.219 547.844 114.219C545.219 114.219 542.734 114.711 540.391 115.695C538.094 116.633 536.078 118.016 534.344 119.844C532.656 121.625 531.32 123.781 530.336 126.312C529.352 128.797 528.859 131.586 528.859 134.68C528.859 137.586 529.352 140.281 530.336 142.766C531.32 145.25 532.656 147.406 534.344 149.234C536.078 151.062 538.094 152.516 540.391 153.594C542.734 154.625 545.219 155.141 547.844 155.141C550.469 155.141 552.93 154.648 555.227 153.664C557.57 152.68 559.609 151.297 561.344 149.516C563.078 147.734 564.438 145.578 565.422 143.047C566.453 140.516 566.969 137.727 566.969 134.68ZM616.117 173H596.922V97.6953H601.562L607.891 106.625C610.984 103.812 614.5 101.656 618.438 100.156C622.375 98.6094 626.453 97.8359 630.672 97.8359H647.617V116.961H630.672C628.656 116.961 626.758 117.336 624.977 118.086C623.195 118.836 621.648 119.867 620.336 121.18C619.023 122.492 617.992 124.039 617.242 125.82C616.492 127.602 616.117 129.5 616.117 131.516V173ZM679.188 77.2344C679.188 79.0156 678.836 80.6797 678.133 82.2266C677.477 83.7734 676.562 85.1328 675.391 86.3047C674.219 87.4297 672.836 88.3438 671.242 89.0469C669.695 89.7031 668.031 90.0312 666.25 90.0312C664.469 90.0312 662.781 89.7031 661.188 89.0469C659.641 88.3438 658.281 87.4297 657.109 86.3047C655.984 85.1328 655.07 83.7734 654.367 82.2266C653.711 80.6797 653.383 79.0156 653.383 77.2344C653.383 75.5 653.711 73.8594 654.367 72.3125C655.07 70.7188 655.984 69.3594 657.109 68.2344C658.281 67.0625 659.641 66.1484 661.188 65.4922C662.781 64.7891 664.469 64.4375 666.25 64.4375C668.031 64.4375 669.695 64.7891 671.242 65.4922C672.836 66.1484 674.219 67.0625 675.391 68.2344C676.562 69.3594 677.477 70.7188 678.133 72.3125C678.836 73.8594 679.188 75.5 679.188 77.2344ZM675.883 173H656.547V97.6953H675.883V173ZM749.359 173H686.57L718.281 116.961H686.57V97.8359H749.359L717.648 153.875H749.359V173Z"
            fill={colors.tailwind.gray._600}
          />
          <Path
            d="M221.496 124.211C227.543 131.242 232.184 139.117 235.418 147.836C238.652 156.555 240.27 165.59 240.27 174.941C240.27 182.113 239.32 189.039 237.422 195.719C235.594 202.328 232.992 208.551 229.617 214.387C226.172 220.152 222.059 225.426 217.277 230.207C212.496 234.988 207.223 239.102 201.457 242.547C195.621 245.922 189.398 248.559 182.789 250.457C176.109 252.285 169.184 253.199 162.012 253.199C154.84 253.199 147.914 252.285 141.234 250.457C134.555 248.559 128.332 245.922 122.566 242.547C116.73 239.102 111.422 234.988 106.641 230.207C101.859 225.426 97.7813 220.152 94.4063 214.387C90.9609 208.551 88.3242 202.328 86.4961 195.719C84.5977 189.039 83.6484 182.113 83.6484 174.941C83.6484 165.59 85.2656 156.555 88.5 147.836C91.6641 139.117 96.3047 131.242 102.422 124.211L128.789 140.242C124.008 144.672 120.352 149.91 117.82 155.957C115.219 162.004 113.918 168.332 113.918 174.941C113.918 181.621 115.184 187.879 117.715 193.715C120.246 199.551 123.691 204.648 128.051 209.008C132.34 213.367 137.438 216.813 143.344 219.344C149.18 221.875 155.402 223.141 162.012 223.141C168.621 223.141 174.844 221.875 180.68 219.344C186.445 216.813 191.508 213.367 195.867 209.008C200.227 204.648 203.672 199.551 206.203 193.715C208.734 187.879 210 181.621 210 174.941C210 168.332 208.734 162.004 206.203 155.957C203.602 149.91 199.91 144.672 195.129 140.242L221.496 124.211Z"
            fill={colors.tailwind.gray._600}
          />
          <Path
            d="M220 11.6602V18.6211L204.496 29.8008C206.957 32.543 209.277 35.4609 211.457 38.5547C213.566 41.5781 215.43 44.7773 217.047 48.1523C218.594 51.5273 219.824 55.0078 220.738 58.5938C221.652 62.1094 222.109 65.6953 222.109 69.3516C222.109 77.2969 220.773 84.7852 218.102 91.8164C215.43 98.7773 211.562 104.895 206.5 110.168C201.367 115.371 195.109 119.484 187.727 122.508C180.344 125.531 171.941 127.043 162.52 127.043C153.73 127.043 145.68 125.531 138.367 122.508C130.984 119.484 124.656 115.371 119.383 110.168C114.109 104.895 110.031 98.7773 107.148 91.8164C104.195 84.7852 102.719 77.2969 102.719 69.3516C102.719 65.6953 103.176 62.0742 104.09 58.4883C105.004 54.9023 106.27 51.4219 107.887 48.0469C109.504 44.6719 111.402 41.4727 113.582 38.4492C115.762 35.3555 118.117 32.4727 120.648 29.8008L107.254 18.6211V11.6602L220 11.6602ZM162.52 40.6641C158.582 40.6641 154.785 41.4375 151.129 42.9844C147.402 44.4609 144.133 46.5 141.32 49.1016C138.438 51.7031 136.152 54.7617 134.465 58.2773C132.707 61.7227 131.828 65.4141 131.828 69.3516C131.828 73.2891 132.496 77.0156 133.832 80.5313C135.168 83.9766 137.137 87 139.738 89.6016C142.34 92.1328 145.574 94.1367 149.441 95.6133C153.238 97.0898 157.598 97.8281 162.52 97.8281C167.441 97.8281 171.836 97.0898 175.703 95.6133C179.5 94.1367 182.699 92.1328 185.301 89.6016C187.902 87 189.871 83.9766 191.207 80.5313C192.543 77.0156 193.211 73.2891 193.211 69.3516C193.211 65.4141 192.367 61.7227 190.68 58.2773C188.922 54.7617 186.637 51.7031 183.824 49.1016C180.941 46.5 177.672 44.4609 174.016 42.9844C170.289 41.4375 166.457 40.6641 162.52 40.6641Z"
            fill={colors.tailwind.gray._600}
          />
        </Svg>
      )}
      <View style={{ height: 25, width: 25 }}>{props.rightIcon}</View>
    </View>
  );
};

export default Header;
