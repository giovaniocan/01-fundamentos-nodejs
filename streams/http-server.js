import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}
const server = http.createServer(async(req, res) => {
    const buffer = []

    // percorre cada chunk da stream, e só acaba quando todos estiverem sido carregador
    for await (const chunk of req){
        buffer.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffer).toString()

    console.log(fullStreamContent)
    return res.end(fullStreamContent)

})

server.listen(3334)