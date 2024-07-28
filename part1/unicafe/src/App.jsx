import { useState } from 'react'


const Feedback = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}


const StatisticLine = (props) => {
  return (
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}

const Statistics = (props) => {
  const sum = (props.good + props.neutral + props.bad)

  if (sum === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <tr>
            <td><StatisticLine text="good" /></td>
            <td><StatisticLine value={props.good} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="neutral" /></td>
            <td><StatisticLine value={props.neutral} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="bad" /></td>
            <td><StatisticLine value={props.bad} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="all" /></td>
            <td><StatisticLine value={sum} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="average" /></td>
            <td><StatisticLine value={((props.good - props.bad) / sum).toFixed(2)} /></td>
          </tr>
          <tr>
            <td><StatisticLine text="positive" /></td>
            <td><StatisticLine value={`${(100 * props.good / sum).toFixed(2)} %`} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (

    <div>
      <Feedback text="Give Feedback" />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}


export default App