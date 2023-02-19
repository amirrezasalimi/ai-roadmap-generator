import openAiInstance from "@/shared/helper/openai";
import pocketbaseInstance from "@/shared/helper/pocketbase";

export default async function handler(req, res) {
  const title = req.query.title;
  const token = req.query.token;
  // config
  const eachLevelItemsCount = req.query.items ?? 10;
  const maxItems = 40
  const minItems = 25
  const minLevels = 5
  const debug = false
  if (!title) {
    return res.status(400).json({
      ok: false,
      message: "bad request params"
    })
  }
  let isFinished = false
  //  make minimum ${eachLevelItemsCount} items in first ${maximumLevels} levels
  const basePrompt = `create a roadmap for '${title}', minimum ${minLevels} level, level 1 should has minimum 3 items , minimum ${minItems} items , when you finished send @finish in end , all should has a parent , root parent is 0, in full details ,no null title, nested ,  in valid json:
  [{
   "id": 1,
   "level":1,
   "parent":  5 or 0,
   "title": "..."
  }]
`
  let prompt = basePrompt
  const openai = openAiInstance(token)

  var startTime = performance.now()
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
        // sometimes result is not correct and has @finish in the outset , so thats should be ignore
        if (text.match('@finish')) {
          // we should close loop when gpt has @finish in the end
          if (text != "@finish") {
            isFinished = true
          }
        }
        prompt += text.replace(/\@finish/, '').replace(/\n/, '')
        if (debug) {
          console.log(`step ${i}: ${prompt}`);
        }
      }
      i++;
    } catch (e) {
      isFinished = true
      return res.status(500).json({
        ok: false,
        message: e?.message
      })
    }

  }

  // normalize json result
  let ai_res = prompt.replace(basePrompt, '').trim()
  ai_res = ai_res.replace(/\n$/g, '');
  if (ai_res.at(-1) != "]") {
    ai_res += ']'
  }
  try {
    let roadmap = JSON.parse(ai_res);
    // sometimes gpt not giving root item , so we add it manually
    const rootIndex = roadmap.findIndex(item => item.id == 1);
    if (rootIndex >= 0) {
      roadmap.push({
        id: 1,
        title
      })
    } else {
      if (roadmap[rootIndex]?.title?.trim() == "Root") {
        roadmap[rootIndex].title = title
      }
    }
    // remove null titles
    roadmap = roadmap.filter(item => item?.title && item?.title != '')

    // end

    // save roadmap
    const pocket = pocketbaseInstance()
    const code = (Math.random() + 1).toString(36).substring(5)

    var endTime = performance.now()

    const saveRes = await pocket.collection('roadmaps').create({
      code,
      title,
      data: JSON.stringify(roadmap),
      prompt: basePrompt,
      generate_time: Math.floor((endTime - startTime) / 1000) // save seconds
    })

    return res.status(200).json({
      ok: true,
      data: {
        roadmap,
        code,
      }
    })
  } catch (e) {
    if (debug) {
      console.log(ai_res);
    }
    res.status(500).json({
      ok: false,
      message: e.message
    })
  }
}
