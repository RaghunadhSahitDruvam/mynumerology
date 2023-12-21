import Item from "@/models/item";
import connect from "./db";

export default async function getDataForCheckout() {
  try {
    await connect();
    const item = await Item.find({});
    return {
      item,
    };
  } catch (error) {
    console.log(error);
  }
}
