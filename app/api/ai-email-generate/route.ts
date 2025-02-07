import { GenerateEmailTemplate } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt, tid } = await req.json();

  try {
    const result = await GenerateEmailTemplate.sendMessage(prompt);
    const aiResponse = result.response.text();
    console.log(aiResponse);

    return NextResponse.json(aiResponse);
  } catch (error) {
    return NextResponse.json({error});


  }

 
}
