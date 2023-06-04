import { backendServices } from "@/backend/services/services";
import { HOST_URL } from "@/shared/constants/config";
import { sendRoadmap } from "@/shared/helper/discord";
import openAiInstance from "@/shared/helper/openai";

export default async function handler(req, res) {
  const title = req.query.title;
  const token = req.query.token;
  // config
  const maxItems = 30
  const minItems = 15
  const minLevels = 5
  const debug = true
  if (!title) {
    return res.status(400).json({
      ok: false,
      message: "bad request params"
    })
  }
  let isFinished = false
  const cats = await backendServices.getCategories();
  const categoriesList = cats.items.map(item => item.title).join(" | ")

  const findCatId = (title) => cats.items.find(item => item.title == title.trim()).id
  //  make minimum ${eachLevelItemsCount} items in first ${maximumLevels} levels
  const basePrompt = `based on my prompt , make up to date roadmap
important response rules :
- collapse response in one line , remove space and new lines 

common rules:
- when you finished send @finish in end of prompt result , not json response
- all should has a parent
- root parent is 0
- root item level should be 0
- no null title
- short and efficient titles
- don't extra description

- response json should be single layer not nested items in items

- choose most related / similar category from here ( based on prompt ):
${categoriesList}
- choose Other Category if you not found right category

- sample response:
{ "category":"...","roadmap:[{"id": 1,"level":1,"parent":5or0,"title":"..."}] }

important items and levels rules:
- minimum ${minLevels} levels
- level 1 should has minimum 3 items
- minimum ${minItems} items
- maximum ${maxItems} items
- items should be less than ${maxItems}
- fill only requested fields
- no duplicate subjects

prompt: 
${title}`
  const openai = openAiInstance(token)
  const messages = [];

  messages.push({
    "role": "user",
    "content": basePrompt,

  })
  var startTime = performance.now()
  let i = 0;
  const maxSteps = 3
  while (!isFinished) {
    try {
      const openai_res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.4,
        messages,
        max_tokens: 1100 // max 35~  items
      });
      // console.log(i, "debug", JSON.stringify(openai_res.data.choices, undefined, 1));
      if (openai_res.data.choices.length) {
        const text = openai_res.data.choices[0].message.content.trim();
        // sometimes result is not correct and has @finish in the outset , so thats should be ignore
        if (text.match('@finish')) {
          // we should close loop when gpt has @finish in the end
          if (text != "@finish") {
            isFinished = true
          }
        }
        const newRes = text.replace(/\@finish/, '').replace(/\n/, '')
        messages.push({
          "role": "assistant",
          "content": newRes
        })
        if (debug) {
          console.log(`step ${i}: ${newRes}`);
        }
      }
    } catch (e) {
      isFinished = true
      if (debug) {
        console.log(e);
        console.log(e?.response?.data);
      }
      return res.status(500).json({
        ok: false,
        message: e?.message
      })
    }
    if (i >= maxSteps) {
      if (debug) {
        console.log("max steps reached");
      }
      isFinished = true
    }
    i++;
  }

  messages.shift(); // first item is prompt

  let ai_res = ''
  for (const message of messages) {
    ai_res += message.content;
  }

  // normalize json result
  ai_res = ai_res.replace(/\n$/g, '');
  ai_res = ai_res.trim()

  if (ai_res.at(-1) != "}") {
    ai_res += '}'
  }
  try {
    let obj = JSON.parse(ai_res);

    const categoryTitle = obj.category;
    const catId = findCatId(categoryTitle);
    let roadmap = obj.roadmap
    // sometimes gpt not giving root item , so we add it manually
    const rootIndex = roadmap.findIndex(item => item.id == 0);
    if (rootIndex == -1) {
      roadmap.push({
        id: 0,
        level: 0
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
    const code = (Math.random() + 1).toString(36).substring(5)

    var endTime = performance.now()

    const saveRes = await backendServices.saveRoadmap({
      category: catId,
      code,
      title,
      data: JSON.stringify(roadmap),
      prompt: basePrompt,
      generate_time: Math.floor((endTime - startTime) / 1000) // save seconds
    })

    try {
      sendRoadmap(`🚀 New Roadmap Created:\n◽️ ${title} \n${HOST_URL}roadmap/${code}`);
    } catch (e) {
      console.log(e);
    }
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
      console.log(e);
    }
    res.status(500).json({
      ok: false,
      message: e.message
    })
  }
}
