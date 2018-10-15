// @format

import React from 'react'
import ReactDOM from 'react-dom'

const kurssi = {
  nimi: 'Half Stack -sovelluskehitys',
  osat: [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]
}

const App = () => (
  <div>
    <Otsikko kurssi={kurssi} />
    <Sisalto kurssi={kurssi} />
    <Yhteensa kurssi={kurssi} />
  </div>
)

const Otsikko = ({ kurssi }) => <h1>{kurssi.nimi}</h1>

const Sisalto = ({ kurssi }) => kurssi.osat.map(osa => <Osa osa={osa} />)

const Osa = ({ osa }) => (
  <p>
    {osa.nimi} &mdash; {osa.tehtavia} tehtävää
  </p>
)

const Yhteensa = ({ kurssi }) => (
  <p style={{ fontWeight: 'bold' }}>
    yhteensä {kurssi.osat.reduce((tehtavaLkm, osa) => tehtavaLkm + osa.tehtavia, 0)} tehtävää
  </p>
)

ReactDOM.render(<App />, document.getElementById('root'))
