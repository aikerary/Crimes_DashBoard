import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CrimeMap = () => {
  const [selectedCrimeType, setSelectedCrimeType] = useState('');
  const [crimeLocations, setCrimeLocations] = useState([]);

  useEffect(() => {
    fetchCrimeLocations();
  }, [selectedCrimeType]);

  const fetchCrimeLocations = async () => {
    try {
      if (!selectedCrimeType) return;

      const response = await fetch(`http://localhost:5000/get_crime_location/${selectedCrimeType}`);
      const data = await response.json();
      setCrimeLocations(data);
    } catch (error) {
      console.error('Error fetching crime locations:', error);
    }
  };

  const handleCrimeTypeSelect = (crimeType) => {
    setSelectedCrimeType(crimeType);
  };

  return (
    <div>
      <div>
        <label htmlFor="crimeType">Select Crime Type:</label>
        <select id="crimeType" value={selectedCrimeType} onChange={(e) => handleCrimeTypeSelect(e.target.value)}>
          <option value="ASSAULT WITH DEADLY WEAPON, AGGRAVATED ASSAULT">AGRESIÓN CON ARMA MORTAL, AGRESIÓN AGRAVADA</option>
          <option value="ATTEMPTED ROBBERY">INTENTO DE ROBO</option>
          <option value="BATTERY - SIMPLE ASSAULT">AGRESIÓN - AGRESIÓN SIMPLE</option>
          <option value="BATTERY ON A FIREFIGHTER">AGRESIÓN A UN BOMBERO</option>
          <option value="BATTERY POLICE (SIMPLE)">AGRESIÓN A LA POLICÍA (SIMPLE)</option>
          <option value="BATTERY WITH SEXUAL CONTACT">AGRESIÓN CON CONTACTO SEXUAL</option>
          <option value="BEASTIALITY, CRIME AGAINST NATURE SEXUAL ASSLT WITH ANIM">BESTIALIDAD, DELITO CONTRA LA NATURALEZA SEXUAL CON ANIMALES</option>
          <option value="BIGAMY">BIGAMIA</option>
          <option value="BIKE - ATTEMPTED STOLEN">INTENTO DE ROBO DE BICICLETA</option>
          <option value="BIKE - STOLEN">ROBO DE BICICLETA</option>
          <option value="BLOCKING DOOR INDUCTION CENTER">OBSTRUCCIÓN DEL CENTRO DE INDUCCIÓN</option>
          <option value="BOAT - STOLEN">ROBO DE EMBARCACIÓN</option>
          <option value="BOMB SCARE">AMENAZA DE BOMBA</option>
          <option value="BRANDISH WEAPON">OSTENTACIÓN DE ARMA</option>
          <option value="BRIBERY">SOBORNO</option>
          <option value="BUNCO, ATTEMPT">ESTAFA, INTENTO</option>
          <option value="BUNCO, GRAND THEFT">ESTAFA, GRAN ROBO</option>
          <option value="BUNCO, PETTY THEFT">ESTAFA, ROBO MENOR</option>
          <option value="BURGLARY">ALLANAMIENTO DE MORADA</option>
          <option value="BURGLARY FROM VEHICLE">ROBO EN VEHÍCULO</option>
          <option value="BURGLARY FROM VEHICLE, ATTEMPTED">ROBO EN VEHÍCULO, INTENTO</option>
          <option value="BURGLARY, ATTEMPTED">ALLANAMIENTO DE MORADA, INTENTO</option>
          <option value="CHILD ABANDONMENT">ABANDONO DE MENORES</option>
          <option value="CHILD ABUSE (PHYSICAL) - AGGRAVATED ASSAULT">ABUSO INFANTIL (FÍSICO) - AGRESIÓN AGRAVADA</option>
          <option value="CHILD ABUSE (PHYSICAL) - SIMPLE ASSAULT">ABUSO INFANTIL (FÍSICO) - AGRESIÓN SIMPLE</option>
          <option value="CHILD ANNOYING (17YRS & UNDER)">MOLESTIA A MENORES (17 AÑOS O MENOS)</option>
          <option value="CHILD NEGLECT (SEE 300 W.I.C.)">DESCUIDO DE MENORES (VER 300 W.I.C.)</option>
          <option value="CHILD PORNOGRAPHY">PORNOGRAFÍA INFANTIL</option>
          <option value="CHILD STEALING">SECUESTRO DE MENORES</option>
          <option value="CONSPIRACY">CONSPIRACIÓN</option>
          <option value="CONTEMPT OF COURT">DESACATO AL TRIBUNAL</option>
          <option value="CONTRIBUTING">CONTRIBUCIÓN</option>
          <option value="COUNTERFEIT">FALSIFICACIÓN</option>
          <option value="CREDIT CARDS, FRAUD USE ($950 & UNDER)">TARJETAS DE CRÉDITO, USO FRAUDULENTO ($950 Y MENOS)</option>
          <option value="CREDIT CARDS, FRAUD USE ($950.01 & OVER)">TARJETAS DE CRÉDITO, USO FRAUDULENTO ($950.01 O MÁS)</option>
          <option value="CRIMINAL HOMICIDE">HOMICIDIO</option>
          <option value="CRIMINAL THREATS - NO WEAPON DISPLAYED">AMENAZAS CRIMINALES - SIN EXHIBICIÓN DE ARMAS</option>
          <option value="CRM AGNST CHLD (13 OR UNDER) (14-15 & SUSP 10 YRS OLDER)">CRIMEN CONTRA MENORES (13 AÑOS O MENOS) (14-15 Y SUSP 10 AÑOS MAYOR)</option>
          <option value="CRUELTY TO ANIMALS">CRUELDAD ANIMAL</option>
          <option value="DEFRAUDING INNKEEPER/THEFT OF SERVICES, $950 & UNDER">DEFRAUDACIÓN AL POSADERO/ROBO DE SERVICIOS, $950 Y MENOS</option>
          <option value="DEFRAUDING INNKEEPER/THEFT OF SERVICES, OVER $950.01">DEFRAUDACIÓN AL POSADERO/ROBO DE SERVICIOS, MÁS DE $950.01</option>
          <option value="DISCHARGE FIREARMS/SHOTS FIRED">DESCARGA DE ARMAS/ DISPAROS REALIZADOS</option>
          <option value="DISHONEST EMPLOYEE - GRAND THEFT">EMPLEADO DESHONESTO - GRAN ROBO</option>
          <option value="DISHONEST EMPLOYEE - PETTY THEFT">EMPLEADO DESHONESTO - ROBO MENOR</option>
          <option value="DISHONEST EMPLOYEE ATTEMPTED THEFT">EMPLEADO DESHONESTO - INTENTO DE ROBO</option>
          <option value="DISRUPT SCHOOL">PERTURBACIÓN ESCOLAR</option>
          <option value="DISTURBING THE PEACE">ALTERACIÓN DEL ORDEN PÚBLICO</option>
          <option value="DOCUMENT FORGERY / STOLEN FELONY">FALSIFICACIÓN DE DOCUMENTOS/DELITO DE ROBO</option>
          <option value="DOCUMENT WORTHLESS ($200 & UNDER)">DOCUMENTO SIN VALOR ($200 Y MENOS)</option>
          <option value="DOCUMENT WORTHLESS ($200.01 & OVER)">DOCUMENTO SIN VALOR ($200.01 O MÁS)</option>
          <option value="DRIVING WITHOUT OWNER CONSENT (DWOC)">CONDUCCIÓN SIN CONSENTIMIENTO DEL PROPIETARIO</option>
          <option value="DRUGS, TO A MINOR">DROGAS, A UN MENOR</option>
          <option value="DRUNK ROLL">ROBO A UNA PERSONA EBRIO</option>
          <option value="EMBEZZLEMENT, GRAND THEFT ($950.01 & OVER)">APROPIACIÓN INDEBIDA, GRAN ROBO ($950.01 O MÁS)</option>
          <option value="EMBEZZLEMENT, PETTY THEFT ($950 & UNDER)">APROPIACIÓN INDEBIDA, ROBO MENOR ($950 Y MENOS)</option>
          <option value="EXTORTION">EXTORSIÓN</option>
          <option value="FAILURE TO DISPERSE">OMISIÓN DE DISIPAR</option>
          <option value="FAILURE TO YIELD">OMISIÓN DE CEDER EL PASO</option>
          <option value="FALSE IMPRISONMENT">ENCARCELAMIENTO FALSO</option>
          <option value="FALSE POLICE REPORT">DENUNCIA POLICIAL FALSA</option>
          <option value="FIREARMS EMERGENCY PROTECTIVE ORDER (FIREARMS EPO)">ORDEN DE PROTECCIÓN DE EMERGENCIA DE ARMAS DE FUEGO (FIREARMS EPO)</option>
          <option value="FIREARMS RESTRAINING ORDER (FIREARMS RO)">ORDEN DE RESTRICCIÓN DE ARMAS DE FUEGO (FIREARMS RO)</option>
          <option value="GRAND THEFT / AUTO REPAIR">GRAN ROBO/REPARACIÓN DE AUTOMÓVILES</option>
          <option value="GRAND THEFT / INSURANCE FRAUD">GRAN ROBO/FRAUDE DE SEGUROS</option>
          <option value="HUMAN TRAFFICKING - COMMERCIAL SEX ACTS">TRATA DE PERSONAS - ACTOS SEXUALES COMERCIALES</option>
          <option value="HUMAN TRAFFICKING - INVOLUNTARY SERVITUDE">TRATA DE PERSONAS - SERVIDUMBRE INVOLUNTARIA</option>
          <option value="ILLEGAL DUMPING">VERTIDO ILEGAL</option>
          <option value="INCEST (SEXUAL ACTS BETWEEN BLOOD RELATIVES)">INCESTO (ACTOS SEXUALES ENTRE PARIENTES SANGUÍNEOS)</option>
          <option value="INCITING A RIOT">INCITACIÓN A UN MOTÍN</option>
          <option value="INDECENT EXPOSURE">EXPOSICIÓN INDECENTE</option>
          <option value="INTIMATE PARTNER - AGGRAVATED ASSAULT">PAREJA ÍNTIMA - AGRESIÓN AGRAVADA</option>
          <option value="INTIMATE PARTNER - SIMPLE ASSAULT">PAREJA ÍNTIMA - AGRESIÓN SIMPLE</option>
          <option value="KIDNAPPING">SECUESTRO</option>
          <option value="KIDNAPPING - GRAND ATTEMPT">SECUESTRO - INTENTO GRAVE</option>
          <option value="LETTERS, LEWD  -  TELEPHONE CALLS, LEWD">CARTAS INDECENTES - LLAMADAS TELEFÓNICAS INDECENTES</option>
          <option value="LEWD CONDUCT">CONDUCTA INDECENTE</option>
          <option value="LEWD/LASCIVIOUS ACTS WITH CHILD">ACTOS LASCIVOS/INDECENTES CON UN MENOR</option>
          <option value="LYNCHING">LINCHAMIENTO</option>
          <option value="LYNCHING - ATTEMPTED">LINCHAMIENTO - INTENTO</option>
          <option value="MANSLAUGHTER, NEGLIGENT">HOMICIDIO INVOLUNTARIO POR NEGLIGENCIA</option>
          <option value="ORAL COPULATION">COPULACIÓN ORAL</option>
          <option value="OTHER ASSAULT">OTRA AGRESIÓN</option>
          <option value="OTHER MISCELLANEOUS CRIME">OTRO DELITO MISCELÁNEO</option>
          <option value="PANDERING">PANDERÍA</option>
          <option value="PEEPING TOM">MIRÓN</option>
          <option value="PETTY THEFT - AUTO REPAIR">ROBO MENOR - REPARACIÓN DE AUTOMÓVILES</option>
          <option value="PICKPOCKET">CARTERISTA</option>
          <option value="PICKPOCKET, ATTEMPT">CARTERISTA, INTENTO</option>
          <option value="PIMPING">PROXENETISMO</option>
          <option value="PROWLER">MERODEADOR</option>
          <option value="PURSE SNATCHING">ARRANCO DE BOLSO</option>
          <option value="PURSE SNATCHING - ATTEMPT">ARRANCO DE BOLSO, INTENTO</option>
          <option value="RAPE, ATTEMPTED">VIOLACIÓN, INTENTO</option>
          <option value="RAPE, FORCIBLE">VIOLACIÓN, FORZADA</option>
          <option value="RECKLESS DRIVING">CONDUCCIÓN IMPRUDENTE</option>
          <option value="REPLICA FIREARMS(SALE,DISPLAY,MANUFACTURE OR DISTRIBUTE)">ARMAS DE FUEGO FALSAS (VENTA, EXHIBICIÓN, FABRICACIÓN O DISTRIBUCIÓN)</option>
          <option value="RESISTING ARREST">RESISTENCIA AL ARRESTO</option>
          <option value="ROBBERY">ROBO</option>
          <option value="SEX OFFENDER REGISTRANT OUT OF COMPLIANCE">REGISTRADOR DE DELITOS SEXUALES FUERA DE CUMPLIMIENTO</option>
          <option value="SEX,UNLAWFUL(INC MUTUAL CONSENT, PENETRATION W/ FRGN OBJ">SEXO, ILEGAL (INCLUYE CONSENTIMIENTO MUTUO, PENETRACIÓN CON OBJETO EXTRAÑO)</option>
          <option value="SEXUAL PENETRATION W/FOREIGN OBJECT">PENETRACIÓN SEXUAL CON OBJETO EXTRAÑO</option>
          <option value="SHOPLIFTING - ATTEMPT">ROBO EN TIENDA, INTENTO</option>
          <option value="SHOPLIFTING - PETTY THEFT ($950 & UNDER)">ROBO EN TIENDA - ROBO MENOR ($950 Y MENOS)</option>
          <option value="SHOPLIFTING-GRAND THEFT ($950.01 & OVER)">ROBO EN TIENDA - GRAN ROBO ($950.01 O MÁS)</option>
          <option value="SHOTS FIRED AT INHABITED DWELLING">DISPAROS REALIZADOS A UNA VIVIENDA HABITADA</option>
          <option value="SHOTS FIRED AT MOVING VEHICLE, TRAIN OR AIRCRAFT">DISPAROS REALIZADOS A UN VEHÍCULO EN MOVIMIENTO, TREN O AERONAVE</option>
          <option value="SODOMY/SEXUAL CONTACT B/W PENIS OF ONE PERS TO ANUS OTH">SODOMÍA/CONTACTO SEXUAL ENTRE EL PENE DE UNA PERSONA Y EL ANO DE OTRA</option>
          <option value="STALKING">ACECHO</option>
          <option value="TELEPHONE PROPERTY - DAMAGE">DAÑO A LA PROPIEDAD TELEFÓNICA</option>
          <option value="THEFT FROM MOTOR VEHICLE - ATTEMPT">ROBO DE VEHÍCULO - INTENTO</option>
          <option value="THEFT FROM MOTOR VEHICLE - GRAND ($950.01 AND OVER)">ROBO DE VEHÍCULO - GRAN ROBO ($950.01 O MÁS)</option>
          <option value="THEFT FROM MOTOR VEHICLE - PETTY ($950 & UNDER)">ROBO DE VEHÍCULO - ROBO MENOR ($950 Y MENOS)</option>
          <option value="THEFT FROM PERSON - ATTEMPT">ROBO A PERSONA - INTENTO</option>
          <option value="THEFT OF IDENTITY">ROBO DE IDENTIDAD</option>
          <option value="THEFT PLAIN - ATTEMPT">ROBO SIMPLE - INTENTO</option>
          <option value="THEFT PLAIN - PETTY ($950 & UNDER)">ROBO SIMPLE - ROBO MENOR ($950 Y MENOS)</option>
          <option value="THEFT, COIN MACHINE - ATTEMPT">ROBO, MÁQUINA EXPENDEDORA - INTENTO</option>
          <option value="THEFT, COIN MACHINE - GRAND ($950.01 & OVER)">ROBO, MÁQUINA EXPENDEDORA - GRAN ROBO ($950.01 O MÁS)</option>
          <option value="THEFT, COIN MACHINE - PETTY ($950 & UNDER)">ROBO, MÁQUINA EXPENDEDORA - ROBO MENOR ($950 Y MENOS)</option>
          <option value="THEFT, PERSON">ROBO A PERSONA</option>
          <option value="THEFT-GRAND ($950.01 & OVER)EXCPT,GUNS,FOWL,LIVESTK,PROD">ROBO GRANDE ($950.01 O MÁS) EXCEPTO ARMAS, AVES, GANADO, PRODUCTOS</option>
          <option value="THREATENING PHONE CALLS/LETTERS">LLAMADAS/ CARTAS AMENAZANTES</option>
          <option value="THROWING OBJECT AT MOVING VEHICLE">LANZAMIENTO DE OBJETOS A UN VEHÍCULO EN MOVIMIENTO</option>
          <option value="TILL TAP - GRAND THEFT ($950.01 & OVER)">EXPLOTACIÓN DE CAJA REGISTRADORA - GRAN ROBO ($950.01 O MÁS)</option>
          <option value="TILL TAP - PETTY ($950 & UNDER)">EXPLOTACIÓN DE CAJA REGISTRADORA - ROBO MENOR ($950 Y MENOS)</option>
          <option value="TRAIN WRECKING">DESCARRILAMIENTO DE TRENES</option>
          <option value="TRESPASSING">INTRUSIÓN</option>
          <option value="UNAUTHORIZED COMPUTER ACCESS">ACCESO NO AUTORIZADO A COMPUTADORAS</option>
          <option value="VANDALISM - FELONY ($400 & OVER, ALL CHURCH VANDALISMS)">VANDALISMO - DELITO GRAVE ($400 O MÁS, TODOS LOS VANDALISMOS A IGLESIAS)</option>
          <option value="VANDALISM - MISDEAMEANOR ($399 OR UNDER)">VANDALISMO - DELITO MENOR ($399 O MENOS)</option>
          <option value="VEHICLE - ATTEMPT STOLEN">VEHÍCULO - INTENTO DE ROBO</option>
          <option value="VEHICLE - STOLEN">VEHÍCULO - ROBADO</option>
          <option value="VEHICLE, STOLEN - OTHER (MOTORIZED SCOOTERS, BIKES, ETC)">VEHÍCULO - ROBADO - OTRO (PATINETES MOTORIZADOS, BICICLETAS, ETC)</option>
          <option value="VIOLATION OF COURT ORDER">VIOLACIÓN DE ORDEN JUDICIAL</option>
          <option value="VIOLATION OF RESTRAINING ORDER">VIOLACIÓN DE ORDEN DE RESTRICCIÓN</option>
          <option value="VIOLATION OF TEMPORARY RESTRAINING ORDER">VIOLACIÓN DE ORDEN DE RESTRICCIÓN TEMPORAL</option>
          <option value="WEAPONS POSSESSION/BOMBING">POSESIÓN DE ARMAS/ATENTADO CON BOMBA</option>
        </select>
      </div>
      <div style={{ height: '500px' }}>
        <MapContainer center={[34.0522, -118.2437]} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            id="mapbox/streets-v11"
            accessToken="pk.eyJ1IjoibXlzdGljMjMiLCJhIjoiY2x2aG11OTFwMTdvNTJpb3ppdGgyenRnNCJ9.3tmaMtmoEHwZtX_mEztE8Q"
          />
          {crimeLocations.map((crimeLocation, index) => (
            <Marker key={index} position={[parseFloat(crimeLocation.LAT), parseFloat(crimeLocation.LON)]}>
              <Popup>
                <div>
                  <h3>Crime Location</h3>
                  <p>Latitude: {crimeLocation.LAT}</p>
                  <p>Longitude: {crimeLocation.LON}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CrimeMap;
