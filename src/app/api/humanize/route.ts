import { NextResponse } from "next/server";
import { z } from "zod";
import { humanizeLinkedInText } from "@/lib/humanizer";

const RequestSchema = z.object({
  text: z.string().min(1, "Please provide text to humanize"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "Invalid request body" },
        { status: 400 }
      );
    }

    const result = humanizeLinkedInText(parsed.data.text);
    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to humanize text" },
      { status: 500 }
    );
  }
}
