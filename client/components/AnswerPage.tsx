import { useState, ChangeEvent, FormEvent } from 'react'
import { Answer } from '../../shared/types'
import { scoreAnswer } from '../utilities/api'

const initialAnswer: Answer = {
  viewpoint: '',
  topic: '',
  text: '',
}

export default function UserAnswerPage() {
  const [answer, setAnswer] = useState<Answer>(initialAnswer)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...answer, [name]: value }
    setAnswer(newForm)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const userAnswerScore = await scoreAnswer(answer)
      console.log(userAnswerScore)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Viewpoint">
          Viewpoint:
          <input
            onChange={(event) => handleChange(event)}
            value={answer.viewpoint}
            name="viewpoint"
          />
        </label>
        <label htmlFor="topic">
          Topic:
          <input
            onChange={(event) => handleChange(event)}
            value={answer.topic}
            name="topic"
          />
        </label>
        <label htmlFor="text">
          Text:
          <input
            onChange={(event) => handleChange(event)}
            value={answer.text}
            name="text"
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  )
}
