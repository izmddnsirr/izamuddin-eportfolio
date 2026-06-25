import { NextRequest, NextResponse } from "next/server";
import { readPortfolioData, updateSection } from "@/lib/portfolio-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = readPortfolioData();
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const { section, value } = await request.json();

  if (!section || value === undefined) {
    return NextResponse.json(
      { error: "Missing section or value" },
      { status: 400 }
    );
  }

  const data = updateSection(section, value);
  return NextResponse.json(data);
}
