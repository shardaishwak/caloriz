import AsyncStorage from "@react-native-async-storage/async-storage";

const getDataByDate = async (date) =>
  JSON.parse(await AsyncStorage.getItem(date));

const addItem = async (state, date, field, data) =>
  await AsyncStorage.setItem(
    date,
    JSON.stringify({
      ...state.data[date],
      breakfast: [...state.data[date][field], { ...data }],
    })
  );

const deleteItem = async (state, date, field, id) => {
  const field_data = state.data[date][field];
  const index = field_data.findIndex((a) => a.id === id);
  field_data.splice(index, 1);
  await AsyncStorage.setItem(
    date,
    JSON.stringify({
      ...state.data[date],
      breakfast: field_data,
    })
  );
};

export default {
  addItem,
  deleteItem,
  getDataByDate,
};
