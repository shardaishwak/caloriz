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
  id: string | number; // uuid
  serving_weight_grams: number;
  quantity: number;
}

export interface AppDate {
  breakfast: Array<CommonItem>; // | Array<BrandedItem>
  second_break_fast: Array<CommonItem>;
  lunch: Array<CommonItem>;
  snack: Array<CommonItem>;
  dinner: Array<CommonItem>;
  dessert: Array<CommonItem>;
  total_fat: number;
  total_calories: number;
  total_proteins: number;
  total_sugars: number;
  water: {
    cup_size: number;
    cup_qty: number;
  };
}

/**
 *
 * {
 *   [date]: {
 *    breakfast: [Item] ,
 *    lunch: [Item],
 *    dinner: [Item],
 *    total_calories: number,
 *    total
 *  }
 * }
 */
