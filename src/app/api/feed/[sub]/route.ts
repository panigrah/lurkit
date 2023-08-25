import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';

//for testing retrieve saved feed json.
export async function GET(request: Request, { params }: { params: { sub: string } }) {
  if (process.env.TEST_MODE) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    //Find the absolute path of the json directory
    const jsonDirectory = process.cwd()
    console.log('getting next page', page)
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/test.json', 'utf8');
    //Return the content of the data file in json format
    return NextResponse.json(JSON.parse(fileContents));
  } else {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    //Find the absolute path of the json directory
    const results = await fetch(`https://old.reddit.com/r/${params.sub}.json?after=${page}`)
    const json = await results.json()
    //Return the content of the data file in json format
    return NextResponse.json(json);
  }
}