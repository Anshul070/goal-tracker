import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const doc = await db.collection("progress").findOne({ userId: "default_user" });

    if (!doc) {
      return NextResponse.json({ completed: {}, activity: {}, notes: {} });
    }

    return NextResponse.json({
      completed: doc.completed || {},
      activity: doc.activity || {},
      notes: doc.notes || {},
    });
  } catch (error) {
    console.error("MongoDB GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { completed, activity, notes } = await req.json();

    const client = await clientPromise;
    const db = client.db();

    await db.collection("progress").updateOne(
      { userId: "default_user" },
      {
        $set: {
          completed: completed || {},
          activity: activity || {},
          notes: notes || {},
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MongoDB POST Error:", error);
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
  }
}
