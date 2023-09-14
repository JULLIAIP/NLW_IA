import { FastifyInstance } from "fastify";
import { fastifyMultipart } from "@fastify/multipart"; //https://github.com/fastify/fastify-multipart

//pacotes nativos do node
import path from "path";
import fs from 'fs'
import { randomUUID } from "crypto";
import { pipeline } from "stream";
import { promisify } from "util";
import { prisma } from "../lib/prisma";

const pump = promisify(pipeline)

export async function uploadVideo(app: FastifyInstance) {
    app.register(fastifyMultipart, {
        limits: {
            fieldSize: 1_048_476 * 25 //25mb
        }
    })
    app.post('/videos', async (request, response) => {

        const data = await request.file()

        if (!data) {
            return response.status(400).send({ error: "Missinf file input." })
        }

        const extension = path.extname(data.filename)

        if (extension !== '.mp3') {
            return response.status(400).send({ error: 'Invalid input type, please upload a MP3.' })
        }

        const fileBaseName = path.basename(data.filename, extension)
        const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
        const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName)

        await pump(data.file, fs.createWriteStream(uploadDestination))

        const video = await prisma.video.create({
            data: {
                name: data.filename,
                path: uploadDestination
            }
        })


        return response.send(video)


    })

}