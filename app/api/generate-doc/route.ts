import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { values, templateID } = body;

    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), "credentials", "service-account.json"),
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/documents",
      ],
    });

    const authClient = await auth.getClient();
    const docs = google.docs({ version: "v1", auth: authClient });
    const drive = google.drive({ version: "v3", auth: authClient });

    // Step 1: Copy the template
    const copyResponse = await drive.files.copy({
      fileId: templateID,
      requestBody: {
        name: `Offer Letter - ${values.name}`,
      },
    });

    const newDocId = copyResponse.data.id!;
    const docLink = `https://docs.google.com/document/d/${newDocId}/edit`;

    // Step 2: Replace placeholders
    const requests = Object.entries(values).map(([key, val]) => ({
      replaceAllText: {
        containsText: { text: `{{${key}}}`, matchCase: true },
        replaceText: val,
      },
    }));

    await docs.documents.batchUpdate({
      documentId: newDocId,
      requestBody: { requests },
    });

    await drive.permissions.create({
      fileId: newDocId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Step 3: Export as PDF
    const pdfRes = await drive.files.export(
      {
        fileId: newDocId,
        mimeType: "application/pdf",
      },
      { responseType: "arraybuffer" }
    );

    const pdfBuffer = Buffer.from(pdfRes.data);
    const base64Pdf = pdfBuffer.toString("base64");

    // return NextResponse.json({
    //   success: true,
    //   docLink,
    //   pdf: base64Pdf, 
    // });

    return new NextResponse(Buffer.from(pdfRes.data), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${values.name}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating document:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 }
    );
  }
}
