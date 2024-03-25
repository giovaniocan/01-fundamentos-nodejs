export async function json(req, res) {
    const buffer = []

    // percorre cada chunk da stream, e só acaba quando todos estiverem sido carregador
    for await (const chunk of req){
        buffer.push(chunk)
    }

    try{
        req.body = JSON.parse(Buffer.concat(buffer).toString())
    } catch{
        req.body = null
    }

    res.setHeader('Content-Type', 'application/json')
       
}