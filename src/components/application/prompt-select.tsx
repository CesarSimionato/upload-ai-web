import { useEffect, useState } from "react"

import { api } from "@/lib/axios"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type Prompt = {
  id: string
  title: string
  template: string
}

type Props = {
  onPromptSelect: (template: string) => void
}

export const PromptSelect: React.FC<Props> = ({ onPromptSelect }) => {

  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  const handlePromptSelected = (promptId: string) => {
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

    if (!selectedPrompt) {
      return
    }

    onPromptSelect(selectedPrompt.template)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/prompts")
      setPrompts(response.data)
    }
    fetchData()
  }, [])

  return (
    <Select onValueChange={handlePromptSelected} >
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {
          prompts?.map(prompt => (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}