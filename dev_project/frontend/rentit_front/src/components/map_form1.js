import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
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
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import './css/App.css'

const libraries = ["places"];
const mapContainerStyle = {
  height: "50vh",
  width: "38vw",
};

const mapContainerStyle1 = {
  height: "50vh",
  width: "60vw",
};

var center = {
  lat: 20.5937,
  lng: 78.9629,
};

export default function App({value,setvalue}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);



  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
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

  

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
 
 


  if(value.latitude && value.longitude)
  {
    return (
      <div>
        
  
        <Locate panTo={panTo} />
        <Search panTo={panTo} mapRef={mapRef}/>
  
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle1}
          zoom={8}
          center={{
            lat: parseFloat(value.latitude),
            lng: parseFloat(value.longitude),
          }}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >

          <Marker
              key={`${parseFloat(value.latitude)}-${parseFloat(value.longitude)}`}
              position={{ lat: parseFloat(value.latitude), lng:parseFloat(value.longitude) }}
             
              icon={{
                url: `/location.png`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 35),
              }}
            />
          
         
          {markers.map((marker) => (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
              icon={{
                url: `/location.png`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 35),
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
            icon={{
              url: `/location.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 35),
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
      <img src="/my.png" alt="my location" style={mystyle}/>
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