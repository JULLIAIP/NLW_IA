import { FastifyInstance } from 'fastify';
import { z } from 'zod'
import { prisma } from '../lib/prisma';
import { openai } from '../lib/openai';

export async function generateAI(app: FastifyInstance) {

    app.post('/ai/complete', async (request, response) => {

        //valida o tipo do objeto body
        const bodySchema = z.object({
            videoId: z.string(),
            template: z.string(),
            temperature: z.number().min(0).max(1).default(0.5)
        })

        const { videoId, template, temperature } = bodySchema.parse(request.body)

        const video = await prisma.video.findUniqueOrThrow({
            where: {
                id: videoId,
            }
        })

        if (!video.trasncription) {
            return response.status(400).send({ error: "Video trasncription was not generated yet " })
        }

        const promptMessage = template.replace('{transcription}', video.trasncription)
        const result = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k",
            temperature,
            messages: [
                {
                    role: "user", content: promptMessage
                }
            ]


        })

        return response.status(200).send({ result })
    })
}