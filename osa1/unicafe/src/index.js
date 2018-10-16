// @format

import React from 'react'
import ReactDOM from 'react-dom'

const feedbackTypes = {
  '-1': 'huono',
  '0': 'neutraali',
  '1': 'hyvä'
}

class App extends React.Component {
  state = {
    statistics: Object.keys(feedbackTypes).reduce((obj, type) => ({ ...obj, [type]: 0 }), {})
  }

  render = () => (
    <React.Fragment>
      <h1>anna palautetta</h1>
      {Object.keys(this.state.statistics).map(type => (
        <Button type={type} onClick={this.setFeedback(type)} key={type} />
      ))}
      <Statistics stats={this.state.statistics} />
    </React.Fragment>
  )

  setFeedback = type => () =>
    this.setState(state => {
      state.statistics[type]++
      return state
    })
}

const Button = ({ type, ...rest }) => <button children={feedbackTypes[type]} {...rest} />

// It's great we componentize our app, but maybe this "Statistic" component doesn't
// provide any additional value compared to directly outputted JSX
const Statistic = ({ type, mean, score, count, stats, ...rest }) =>
  mean ? (
    <tr>
      <td>keskiarvo</td>
      <td>{(score / count).toFixed(2)}</td>
    </tr>
  ) : (
    <tr>
      <td>{feedbackTypes[type]}</td>
      <td>
        {stats[type]} ({((stats[type] / count) * 100).toFixed(1) + ' %'})
      </td>
    </tr>
  )

const Statistics = ({ stats }) =>
  calculateStats(stats)(
    ({ score, count }) =>
      count === 0 ? (
        <p>ei yhtään palautetta annettu</p>
      ) : (
        <React.Fragment>
          <h1>statistiikka</h1>
          <table>
            <tbody>
              {Object.keys(stats).map(type => (
                <Statistic type={type} stats={stats} score={score} count={count} key={type} />
              ))}
              <Statistic mean score={score} count={count} />
            </tbody>
          </table>
        </React.Fragment>
      )
  )

const calculateStats = stats => callback =>
  callback(
    Object.keys(stats).reduce(
      ({ count, score }, type) => ({
        score: score + stats[type] * type,
        count: count + stats[type]
      }),
      {
        count: 0,
        score: 0
      }
    )
  )

ReactDOM.render(<App />, document.getElementById('root'))
