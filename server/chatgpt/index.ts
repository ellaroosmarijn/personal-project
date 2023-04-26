import { Configuration, OpenAIApi } from 'openai'
import { Score } from '../../shared/types'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

// take chatGPT prompt and return chatGPT response
function processPrompt(prompt: string) {
  return openai
    .createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0,
      max_tokens: 500,
      top_p: 1.0,
      frequency_penalty: 0.2,
      presence_penalty: 0.0,
      stop: ['\n'],
    })
    .then((response) => {
      const choice = response.data.choices[0]
      if (choice) {
        return choice.text
      } else {
        return null
      }
    })
    .catch((err) => {
      console.dir(err, { depth: null })
    })
}

// take user input and return a chatGPT prompt
function getPrompt(viewpoint: string, topic: string, text: string) {
  return `You are ImpartialGPT. Your job is to remain impartial and nonpolitical.
  You judge the accuracy and impartiality of text given to you.
  Your response will begin with a rating out of 5 of the accuracy of the text in describing the viewpoint. The second will be a paragraph describing the reason for your rating and how to improve the answer.
  You will be rating text written either from a conservative or liberal viewpoint. The text may be about any topic. The topic and viewpoint will be provided to you.
  
  Viewpoint: Liberal
  Topic: Abortion
  Text: The liberal position on abortion generally supports a woman's right to make decisions regarding her own body and reproductive health, including the right to choose to have an abortion. Liberals often argue that the government should not have the power to restrict a woman's access to safe and legal abortion services, and that reproductive healthcare should be affordable and accessible to all. Additionally, liberals may advocate for comprehensive sex education and access to contraception to reduce the need for abortions, but ultimately believe that the decision to have an abortion should be left up to the individual.
  ImpartialGPT: 4/5. The description captures the key elements of the liberal position on abortion, including the emphasis on individual autonomy and the belief that the government should not restrict access to abortion services. However, it could be further improved by acknowledging that there may be some nuances and variations within the liberal position on abortion, such as debates around late-term abortions or differing opinions on the extent of government funding for abortion services. Additionally, the description could benefit from providing specific examples of policies or legislation that reflect the liberal position on abortion.
  
  Viewpoint: Conservative
  Topic: Abortion
  Text: The conservative viewpoint generally opposes abortion and advocates for the protection of the fetus as a human life. Conservatives often argue that abortion is morally wrong and should be illegal, with some exceptions such as cases of rape, incest, or to save the life of the mother. They may also argue that the government should not fund or support abortion services, and instead prioritize support for adoption and other alternatives to abortion. Additionally, conservatives may advocate for policies that promote abstinence-only education and restrictions on access to contraception. Overall, the conservative position on abortion is centered around the protection of fetal life and the belief that abortion is a grave moral issue.
  ImpartialGPT: 4/5. The text accurately captures the key tenets of the conservative position, including the emphasis on protecting fetal life and opposing abortion except in limited circumstances. However, there is some room for improvement in the description. For example, the language used to describe the conservative stance on contraception may be overly broad - while some conservatives may advocate for restrictions on access to contraception, others may support wider availability of certain forms of birth control. Additionally, it could be helpful to provide some additional context around the political and social factors that have influenced the development of the conservative position on abortion, such as the influence of religious beliefs or the history of the pro-life movement.
  
  
  Viewpoint: ${viewpoint}
  Topic: ${topic}
  Text: ${text}
  ImpartialGPT:`
}

// take chatGPT response string, validate, and return ChatGptResponse object
const gptResponseRegex = /([0-5])\/5\. (.+)/gm
function parseResponse(response: string): Score | null {
  const match = gptResponseRegex.exec(response)
  if (match) {
    return { rating: Number(match[1]), justification: match[2] }
  }
  return null
}

// take user input, process with chatGPT, return ChatGptResponse object
export async function rateUserInput(
  viewpoint: string,
  topic: string,
  text: string
): Promise<Score | null> {
  const prompt = getPrompt(viewpoint, topic, text)
  const response = await processPrompt(prompt)
  if (!response) {
    throw Error(
      'The AI is unsure how to respond. Please edit your answer and try again.'
    )
  }
  return parseResponse(response)
}
