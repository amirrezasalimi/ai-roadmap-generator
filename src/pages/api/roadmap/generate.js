import openAiInstance from "@/shared/helper/openai";
import pocketbaseInstance from "@/shared/helper/pocketbase";

export default async function handler(req, res) {
  const title = req.query.title;
  const token = req.query.token;
  const itemsCount = req.query.items ?? 10;
  const maximumItems = 20
  const maximumLevels = 3
  if (!title || !token) {
    return res.status(400).json({
      ok: false,
      message: "bad request params"
    })
  }
  let isFinished = false
  const basePrompt = `create a roadmap for '${title}', make minimum ${itemsCount} items in first ${maximumLevels} levels , maximum ${maximumItems} at items, when you finished send @finish in end , all should has a parent , root parent is 0, in full details, in this valid json format:
  [{
   "id": 1,
   "level":1,
   "parent":  5 or 0,
   "title": '...'
  }]
`
  let prompt = basePrompt
  const openai = openAiInstance(token)

  let i = 0;
  while (!isFinished) {
    try {
      const openai_res = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0.5,
        prompt: `${prompt}`,
        max_tokens: 1024
      });
      if (openai_res.data.choices.length) {
        const text = openai_res.data.choices[0].text.trim();
        if (text.match('@finish')) {
          if (text != "@finish") {
            isFinished = true
          }
        }
        prompt += text.replace(/\@finish/, '').replace(/\n/, '')
        console.log(`step ${i}: ${prompt}`);

      }
    } catch (e) {
      isFinished = true
      return res.status(400).json({
        ok: false,
        message: e.response
      })
    }
  }
  let ai_res = prompt.replace(basePrompt, '').trim()
  ai_res = ai_res.replace(/\n$/g, '');
  if (ai_res.at(-1) != "]") {
    ai_res += ']'
  }
  try {
    const roadmap = JSON.parse(ai_res);
    const pocket = pocketbaseInstance()
    const code = (Math.random() + 1).toString(36).substring(5)
    const saveRes=await pocket.collection('roadmaps').create({
      code,
      title,
      data: JSON.stringify(roadmap)
    })

    return res.status(400).json({
      ok: true,
      data: {
        roadmap,
        code
      }
    })
  } catch (e) {
    console.log(ai_res);
    res.status(400).json({
      ok: false,
      message: e.message
    })
  }
}
