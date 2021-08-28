export interface SearchCommonItem {
  calories: FoodNutrients["calories"];
  food_name: string;
  serving_qty: number;
  serving_unit: string;
}

export interface FoodNutrients {
  calories: number;
  cholesterol?: number;
  dietary_fiber?: number;
  potassium: number;
  protein: number;
  saturated_fat: number;
  sodium: number;
  sugars: number;
  carbohydrates: number;
  fat: number;
}

export interface CommonItem extends SearchCommonItem, FoodNutrients {
  consumed_at: Date | string | number;
  id: string | number | number[]; // uuid
  serving_weight_grams: number;
  quantity: number;
}

export interface AppDate {
  breakfast: Array<CommonItem>; // | Array<BrandedItem>
  second_breakfast: Array<CommonItem>;
  lunch: Array<CommonItem>;
  snack: Array<CommonItem>;
  dinner: Array<CommonItem>;
  dessert: Array<CommonItem>;
  extra: Array<CommonItem>;

  water: {
    cup_size: number;
    cup_qty: number;
  };
}

export enum Session {
  breakfast = "breakfast",
  second_breakfast = "second_breakfast",
  lunch = "lunch",
  snack = "snack",
  dinner = "dinner",
  dessert = "dessert",
  extra = "extra",
}

export interface State {
  app_date: string;
  data: AppDate;
  new_date_loading: boolean;
  favourites: Array<CommonItem>;
  profile: Profile;
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export interface Profile {
  name: string;
  username: string;
  date_of_birth: { value: Date | string; age: number };
  new_user: boolean;
  version: string | number;

  mass: number;
  height: number;
  calories_target: number;
  gender: Gender;
}
