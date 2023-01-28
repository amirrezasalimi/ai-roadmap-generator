import { Configuration, OpenAIApi } from "openai"
import { OPEN_AI_TOKEN } from "../constants/config"

export default function openAiInstance(apiKey = OPEN_AI_TOKEN) {
    const openai_config = new Configuration({
        apiKey
    })
    return new OpenAIApi(openai_config)
}