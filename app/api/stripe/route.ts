export async function POST(request:Request){

    const body = await request.text()

    return Response.json(null, {status:200});

}
