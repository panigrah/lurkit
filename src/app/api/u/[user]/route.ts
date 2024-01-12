import { NextResponse } from "next/server";

//for testing retrieve saved feed json.
export async function GET(
  request: Request,
  { params }: { params: { user: string } }
) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("after");
  const count = searchParams.get("count") || 25;
  //Find the absolute path of the json directory
  const results = await fetch(
    `https://old.reddit.com/u/${params.user}.json?after=${page}&count=${count}`
  );
  const json = await results.json();
  //Return the content of the data file in json format
  return NextResponse.json(json);
}
