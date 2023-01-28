import { Configuration, OpenAIApi } from "openai"

export default function openAiInstance(apiKey) {
    const openai_config = new Configuration({
        apiKey
    })
    return new OpenAIApi(openai_config)
}