import { Button } from "./components/ui/button"
import { Github, FileVideo, Upload, Wand2 } from 'lucide-react'
import { Separator } from "./components/ui/separator"
import { Textarea } from "./components/ui/textarea"
import { Label } from "./components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Slider } from "./components/ui/slider"

function App() {
  return (

    <div className=" min-h-screen flex flex-col">
      <div className=" px-6  py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Desenvolvido no último NLW de 2023</span>
          <Separator orientation="vertical" className="h-6" />
          <Button>
            <Github className=" w-4 h-4 mr-2" />
            Github</Button>

        </div>
      </div>

      <main className=" flex-1 p-6  flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-5 leading-relaxed"
              placeholder="Inclua o prompt para a IA ...">
            </Textarea>
            <Textarea
              className="resize-none p-5 leading-relaxed"
              placeholder="Resultado gerado pela IA"
              readOnly>

            </Textarea>

          </div>
          <p>Lembre-se: você pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adcinioar o conteúdo</p>

        </div>


        <aside className="w-80 space-y-6">

          <form className=" space-y-6">

            <label
              className="border flex aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/20"
              htmlFor="video">
              <FileVideo className="w-4 h-4" />
              Escolher vídeo
            </label>

            <input
              className="sr-only"
              type="file"
              id='video'
              accept="video/mp4" />

            <Separator />

            <div className="space-y-2">
              <Label
                htmlFor="transcription-prompt"
              >
                Prompt de transcrição
              </Label>
              <Textarea
                id="transcription-prompt"
                className=" h-20 leading-relaxed"
                placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula"
              />
              <Button type="submit" className="w-full gap-2">
                <Upload className="w-4 h-4" />
                Carregar vídeo
              </Button>

            </div>
          </form>
          <Separator />

          <form className=" space-y-6">
            <div className=" space-y-2">
              <Label>Prompt</Label>
              <Select>

                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='title'>Título do you tube</SelectItem>
                  <SelectItem value='description'>Descrição do you tube</SelectItem>
                </SelectContent>

              </Select>

            </div>
            <div className=" space-y-2">
              <Label>Modelo</Label>
              <Select >

                <SelectTrigger>
                  <SelectValue defautValue='gpt3.5' />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='gpt3.5'>GPT 3.5-turbo</SelectItem>
                </SelectContent>

              </Select>
              <p className="text-xs italic">Você poderá customizar essa opção em breve.</p>
            </div>
            <Separator />

            <div className=" space-y-4">
              <Label>Temperatura</Label>
              <Slider
                min={0}
                max={1}
                step={0.1} />

              <p className="text-xs italic leading-relaxed">Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.</p>
            </div>
            <Separator />

            <Button type="submit" className="w-full">
              <Wand2 className="w-4 h-4 mr-2" />
              Executar</Button>

          </form>

        </aside>

      </main>

    </div>
  )
}

export default App
