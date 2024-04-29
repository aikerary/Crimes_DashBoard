// App.js
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Map from "./components/Map/Map";
import Query1 from "./components/Query_1/Query_1";
import Query2 from "./components/Query_2/Query_2";
import Query3 from "./components/Query_3/Query_3";
import Query5 from "./components/Query_5/Query_5";
import Query6 from "./components/Query_6/Query_6";
import Numero from "./components/Numero/numero";
import AreaTotal from "./components/AreaTotal/Area_Total";
import Prop from "./components/Prop/Prop";
import Card from "./components/Card/Card";
import "./App.css";
import Cantidad_Crimenes from "./components/Cantidad_Crimenes/Cantidad_Crimenes"; // Nuevo componente

function App() {
  return (
    <>
      <Header />
      <Card>
        <Prop />
      </Card>
      <Card>
        <Numero />
      </Card>
      <main>
        <Card header="Crimes Mapping by Area" description="
        This plot shows a mapping of the crimes by selected area
        ">
          <Map/>
        </Card>
        <Card header="Victims by Descent and Area" description="
        This plot shows a mapping of the crimes by selected area
        ">
          <Query5/>
        </Card>
        <Card header="Sex Victims By Date" description="
        This plot shows a mapping of the crimes by selected area
        ">
          <Query2/>
        </Card>
        <Card header="Sex Victims By Date" description="
        This plot shows a mapping of the crimes by selected area
        ">
          <Query6/>
        </Card>
      </main>
      <Footer />
    </>
  );
}
export default App;
