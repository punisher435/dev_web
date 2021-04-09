import React,{useEffect} from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
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
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';


import "@reach/combobox/styles.css";

import useScript from '../hooks/usescript';
import { Link } from "react-router-dom";
import './css/App.css';

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100%",
 
  
};
const center = {
  lat: 20.5937,
  lng:  78.9629,
};




const useStyles = makeStyles(theme => ({
  windowclass:{
    width:'100%',
   
  },
  }));


export default function App({point,url}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
/*   const [markers, setMarkers] = React.useState([]); */
  const [selected, setSelected] = React.useState(null);

  const [marker,setmarkers] = React.useState([]);

  const theme = useTheme();
  const classes = useStyles();

 /*  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []); */

  useEffect(
    () => {
      setmarkers(point)
     
    },[point]
  )

  useScript('https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js');

console.log('markerss',marker);


    



  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const options1 = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  }

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

const mystyle1 = {
  width:'100%',
  height:100,

}
  return (
    <div className="zclassmap">
     

      <Locate panTo={panTo} />
      <Search panTo={panTo} mapRef={mapRef} />

      <GoogleMap
        id="map1"
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={center}

        onLoad={onMapLoad}


      >

        <MarkerClusterer options={options1}>
        {
        (clusterer) =>
        marker.map((marker) => (
          <Marker
          key={`${marker.properties.roomId}`}
            position={{ lat: marker.geometry.lat, lng: marker.geometry.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            clusterer={clusterer}
            icon={{
              url: `/location.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 35),
            }}
          />
        ))} 
        </MarkerClusterer>

        {selected ? 
          <InfoWindow
            position={{ lat: selected.geometry.lat, lng: selected.geometry.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
           
            className={classes.windowclass}
          >
            <div>
              <Link to={`/${url}/${selected.properties.roomId}`} target="_blank" style={{textDecoration:'none'}}>
              <Button>
              <Typography variant="h6">
              {selected.properties.title}{selected.category=='' ? null : ','}
                 {` ${selected.properties.category}`}
              </Typography>
              </Button>
              </Link>
            </div>
          </InfoWindow>
         : null}
      </GoogleMap>
    </div>
  );
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
      console.log(results)
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
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