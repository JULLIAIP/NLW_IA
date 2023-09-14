import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { getAllPrompts } from '../routes/getAllPrompts'
import { uploadVideo } from '../routes/uploadVideo'
import { createTranscription } from '../routes/createTranscription'
import { generateAI } from '../routes/generateAI'

const app = fastify()

app.register(fastifyCors, {
    origin: '*'
})

//Routes
app.register(getAllPrompts)
app.register(uploadVideo)
app.register(createTranscription)
app.register(generateAI)

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server Running!')
})