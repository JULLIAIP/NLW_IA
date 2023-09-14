import { FastifyInstance } from "fastify"
import { z } from 'zod'
import { prisma } from "../lib/prisma"

//node
import { createReadStream } from "fs"
import { openai } from "../lib/openai"

export async function createTranscription(app: FastifyInstance) {

    app.post('/videos/:idVideo/transcription', async (request, response) => {

        //valida o tipo do objeto req
        const paramsSchema = z.object({
            idVideo: z.string().uuid(),
        })

        //valida o tipo do objeto body
        const bodySchema = z.object({
            prompt: z.string(),

        })

        const { idVideo } = paramsSchema.parse(request.params)
        const { prompt } = bodySchema.parse(request.body)


        const video = await prisma.video.findUniqueOrThrow({
            where: {
                id: idVideo
            }
        })

        const videoPath = video.path
        const audioReadStream = createReadStream(videoPath)

        //transcrição
        const transcription = await openai.audio.transcriptions.create({
            file: audioReadStream,
            model: "whisper-1",
            language: "pt",
            response_format: "json",
            temperature: 0,
            prompt,
        })



        return transcription.text

    })

}