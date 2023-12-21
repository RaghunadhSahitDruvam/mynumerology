import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Item from "@/models/item";
export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  try {
    await connect();
    const body = await req.json();
    const {
      chaldean,
      pythogorous,
      tot_letters,
      g2tot,
      g3tot,
      g2vtot,
      g3vtot,
      g2nettot,
      g3nettot,
    } = body;

    await new Item({
      chaldean,
      pythogorous,
      tot_letters,
      g2tot,
      g3tot,
      g2vtot,
      g3vtot,
      g2nettot,
      g3nettot,
    }).save();
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error: any) {
    return new NextResponse(`${error}`, {
      status: 500,
      statusText: error.message,
    });
  }
};
export const GET = async () => {
  try {
    await connect();
    const item = await Item.find();
    return NextResponse.json(item, { status: 200 });

    // return item;
  } catch (error) {
    console.log(error);
  }
};
export const DELETE = async (req: NextRequest) => {
  try {
    await connect();
    const body = await req.json();
    const { id } = body;
  } catch (error) {}
};
