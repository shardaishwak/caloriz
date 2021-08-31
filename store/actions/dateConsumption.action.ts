import { RootDispatch, RootState } from "..";
import db from "../../global@deprecated/db";
import { CommonItem, Session } from "../../interface";
import { dateConsumptionSlice } from "../reducers/dateConsumption.reducer";

const AddItemToRecord =
  (session?: Session, item?: CommonItem) =>
  async (dispatch: RootDispatch, getState: () => RootState) => {
    try {
      const state = getState();
      await db.addItem(state.general.app_date, session, item);
      dispatch(
        dateConsumptionSlice.actions.addNewItemToRecord({
          field: session,
          data: item,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

const RemoveItemFromRecord =
  (session: Session, id: any) =>
  async (dispatch: RootDispatch, getState: () => RootState) => {
    try {
      const state = getState();
      await db.deleteItem(state.general.app_date, session, id);
      dispatch(
        dateConsumptionSlice.actions.removeItemFromRecord({
          field: session,
          id: id,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

export default {
  AddItemToRecord,
  RemoveItemFromRecord,
};
