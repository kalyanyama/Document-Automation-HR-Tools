import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), "credentials", "service-account.json"),
  scopes: SCOPES,
});
const sheets = google.sheets({ version: "v4", auth });

const SHEET_NAME = "Sheet1"; // Change if needed

export async function POST(req: NextRequest) {
  try {
    const { values, spreadsheetId } = await req.json();
    const authClient = await auth.getClient();

    const append = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "USER_ENTERED",
      auth: authClient,
      requestBody: {
        values: [
          [
            values.name,
            values.position,
            values.address,
            values.salaryPackage,
            values.dateOfJoining,
            new Date().toLocaleDateString(),
          ],
        ],
      },
    });

    return NextResponse.json({ success: true, data: append.data });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const spreadsheetId = searchParams.get("spreadsheetId");
    const authClient = await auth.getClient();

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId!,
      range: `${SHEET_NAME}!A1:Z1000`,
      auth: authClient,
    });

    return NextResponse.json({ data: result.data.values || [] });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { spreadsheetId, rowIndex, updatedValues } = await req.json();
    const authClient = await auth.getClient();

    const result = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${SHEET_NAME}!A${rowIndex + 1}`,
      valueInputOption: "USER_ENTERED",
      auth: authClient,
      requestBody: {
        values: [updatedValues],
      },
    });

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { spreadsheetId, rowIndex } = await req.json();
    const authClient = await auth.getClient();

    // Clear the row (we can't "delete" row directly in Sheets API)
    const clear = await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: `${SHEET_NAME}!A${rowIndex + 1}`,
      auth: authClient,
    });

    return NextResponse.json({ success: true, data: clear.data });
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error: unknown) {
  console.error("Sheets API error:", error);
  return NextResponse.json(
    {
      error: "Google Sheets operation failed",
      details: error instanceof Error ? error.message : "Unknown error",
    },
    { status: 500 }
  );
}
