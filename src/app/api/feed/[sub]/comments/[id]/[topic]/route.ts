import { NextResponse } from "next/server";
import { promises as fs } from "fs";

/*
export async function GETx(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page')
  const permalink  = searchParams.get('permalink')
  //Find the absolute path of the json directory
  const jsonDirectory = process.cwd()
  console.log('getting next page', page, permalink)
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/comments-test.json', 'utf8');
  //Return the content of the data file in json format
  return NextResponse.json(JSON.parse(fileContents));
}
*/

export async function GET(
  request: Request,
  { params }: { params: { sub: string; id: string; topic: string } }
) {
  const { sub, id, topic } = params;
  const results = await fetch(
    `https://old.reddit.com/r/${sub}/comments/${id}/${topic}`
  );
  const json = await results.json();
  //Return the content of the data file in json format
  return NextResponse.json(json);
}
