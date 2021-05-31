import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,

} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import Load1 from './Spinner';



import "@reach/combobox/styles.css";
import './css/App.css'
import my from '../my.png'

const libraries = ["places"];




var center = {
  lat: 20.5937,
  lng: 78.9629,
};

export default function App({value,setvalue}) {
  const [width,setwidth] = React.useState(false);
  const [markers, setMarkers] = React.useState([]);
React.useEffect(() => {
  let map = document.getElementById('mapcontainer1').clientWidth;
  if(value)
  {
    setMarkers((current) => [
    
      {
        lat: parseFloat(value.latitude),
        lng: parseFloat(value.longitude),
       
      },
    ]);
  }
  setwidth(map)
},[])

const mapContainerStyle = {
  height: "50vh",
  minHeight:500,
  width: width-5,
};

  

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
 
  const [selected, setSelected] = React.useState(null);



  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
    
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
    setvalue('longitude',e.latLng.lng())
    setvalue('latitude',e.latLng.lat())
    
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  

  if (loadError) return "Error while loading map";
  if (!isLoaded) return <Load1 loading={true} />;
 



  if(value.latitude && value.longitude && width)
  {
    return (
      <div>
        
  
        <Locate panTo={panTo} />
        <Search panTo={panTo} mapRef={mapRef}/>
  
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={{
            lat: parseFloat(value.latitude),
            lng: parseFloat(value.longitude),
          }}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >

       
          
         
          {markers.map((marker) => (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
              
            />
          ))}
  
          
        </GoogleMap>
      </div>
    );
  }


  else{
  return (
    <div>
      

      <Locate panTo={panTo} />
      <Search panTo={panTo} mapRef={mapRef}/>

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
       
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
           
          />
        ))}

        
      </GoogleMap>
    </div>
  );}
}

function Locate({ panTo }) {

  const mystyle = {
    width: 60,
    height:60,
  }

  
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src={my} alt="my location" style={mystyle}/>
    </button>
  );
}


function Search({ panTo,mapRef }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => mapRef.current.center.lat(), lng: () => mapRef.current.center.lng() },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
     
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}