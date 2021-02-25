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
  height: "40vh",
  width: "40vw",
  position:'relative',
};



export default function App({value}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  

  

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  console.log(value)
 


  if(value.latitude && value.longitude)
  {
    return (
      <div>
  
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={8}
          center={{
            lat: parseFloat(value.latitude),
            lng: parseFloat(value.longitude),
          }}
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
          
        </GoogleMap>
      </div>
    );
  }


 
}