import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Map from './components/Map/Map'
import Query_6 from './components/Query_6/Query_6'
import Query_2 from './components/Query_2/Query_2'
import Query_3 from './components/Query_3/Query_3'
import Query_1 from './components/Query_1/Query_1'
import Prop from './components/Prop/Prop'

function App() {
  return (
    <div className="app-container">
      <div className="purpose-card">
        <Prop></Prop>
      </div>
      <div className="query2-card">
        <Query_2></Query_2>
      </div>
      <div className="query1-card">
        <Query_1></Query_1>
      </div>
      <div className="query3-card">
        <Query_3></Query_3>
      </div>
      <div className="query4-card">
        <Map></Map>
      </div>
      <div className="query6-card">
        <Query_6></Query_6>
      </div>

    </div>
  );
}

export default App
