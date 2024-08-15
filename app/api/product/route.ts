import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req) => {
  const formData = await req.formData();
  const file = formData.get("file");
  console.log(file);
  
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const extension = file.name.split(".").pop();
  const filename = `${uuidv4()}.${extension}`; // Removed space after dot
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
