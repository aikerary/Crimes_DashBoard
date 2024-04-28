import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Map from './components/Map/Map';
import Query_6 from './components/Query_6/Query_6';
import Query_2 from './components/Query_2/Query_2';
import Query_3 from './components/Query_3/Query_3';
import Query_1 from './components/Query_1/Query_1';
import Prop from './components/Prop/Prop';

function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
        <Prop />
      </div>
      <div className="main-content">
        <div className="query-cards-container">
          <div className="query-card">
            <Query_2 />
          </div>
          <div className="query-card">
            <Query_1 />
          </div>
          <div className="query-card">
            <Query_3 />
          </div>
        </div>
        <div className="query-card">
          <Map />
        </div>
        <div className="query-card">
          <Query_6 />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
