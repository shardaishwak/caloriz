import React from "react";

import { Text, View } from "react-native";
import LoadCache from "./cache";
import GlobalProvider from "./global/provider";
import Navigation from "./navigation";

// Main navigation roots

class App extends React.Component {
  state = {
    _cacheLoaded: false,
    _error: null,
  };
  async componentDidMount() {
    try {
      await LoadCache();
      this.setState({ _error: null, _cacheLoaded: true });
    } catch (error) {
      this.setState({ _error: error.message, _cacheLoaded: true });
    }
  }
  render() {
    if (!this.state._cacheLoaded)
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#313638",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "600", color: "#fff" }}>
            Caloriz
          </Text>
        </View>
      );
    return (
      <GlobalProvider>
        <Navigation />
      </GlobalProvider>
    );
  }
}

export default App;
