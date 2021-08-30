import AsyncStorage from "@react-native-async-storage/async-storage";
import db from "../global@deprecated/db";
import { date, field, item, item_2 } from "../__mocks__/dumb.ignore";

describe("Test routeine record functions", () => {
  it("Initialize the routeine", async () => {
    // action
    await db.initializeRouteine(date);

    // check
    const a = await AsyncStorage.getAllKeys();
    expect(a).toContain(date);

    const b = await db.retrieveRouteine(date);
    expect(b).toBeDefined();
    expect(b[field]).toBeDefined();
  });

  it("Insert a routeine record", async () => {
    // action
    await db.addItem(date, field, item);

    // check
    const _ = await db.retrieveRouteine(date);
    const index = _[field].findIndex((a) => a.id === item.id);
    expect(index).toBeGreaterThanOrEqual(0);
  });

  it("Insert another record", async () => {
    // action
    await db.addItem(date, field, item_2);

    // check
    const _ = await db.retrieveRouteine(date);
    const index = _[field].findIndex((a) => a.id === item_2.id);
    expect(index).toBeGreaterThanOrEqual(0);
  });

  it("Delete first routeine record", async () => {
    // action
    await db.deleteItem(date, field, item.id);

    // check
    const _ = await db.retrieveRouteine(date);
    const index = _[field].findIndex((a) => a.id === item.id);
    expect(index).toBe(-1);

    // second check
    const index_2 = _[field].findIndex((a) => a.id === item_2.id);
    expect(index_2).toBeGreaterThanOrEqual(0);
  });
});

describe("Test favorouite food functions", () => {
  it("Insert a record in the favourite list", async () => {
    // action
    await db.addFavourite(item);

    // check
    const _ = await db.getFavourites();
    expect(_).toBeDefined();

    const index = _.findIndex((a) => a.id === item.id);
    expect(index).toBeGreaterThanOrEqual(0);
  });
  it("Insert another record in the favourite list", async () => {
    // action
    await db.addFavourite(item_2);

    // check
    const _ = await db.getFavourites();
    expect(_).toBeDefined();

    const index = _.findIndex((a) => a.id === item_2.id);
    expect(index).toBeGreaterThanOrEqual(0);
  });
  it("Delete a record from favourite list", async () => {
    // action
    await db.removeFavourite(item.food_name, item.calories);

    // check
    const _ = await db.getFavourites();

    const index = _.findIndex((a) => a.id === item.id);
    expect(index).toBe(-1);
  });
  it("Clear the favourite list", async () => {
    // action
    await db.clearFavourites();

    // check
    const _ = await db.getFavourites();
    expect(_.length).toBe(0);
  });
});
