import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file");
  console.log(file);
  
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await (file as Blob).arrayBuffer());
  const extension = (file as File).name.split(".").pop();
  const filename = `${uuidv4()}.${extension}`;
  try {
    await writeFile(
      path.join(process.cwd(), "public/" + filename),
      buffer
    );
    return NextResponse.json({
      message: "Success",
      status: 201,
      filePath: `/${filename}`,
    });
  } catch (error) {
    console.log("Error occurred ", error);
    return NextResponse.json({ message: "Failed", status: 500 });
  }
};