import { fastify } from 'fastify'
import { getAllPrompts } from '../routes/getAllPrompts'
import { uploadVideo } from '../routes/uploadVideo'

const app = fastify()
//Routes
app.register(getAllPrompts)
app.register(uploadVideo)

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server Running!')
})