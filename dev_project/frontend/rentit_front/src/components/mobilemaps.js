import React, { Component } from 'react';
import { Map,Marker } from 'google-maps-react';
import {GoogleApiWrapper as GoogleApiWrapper1} from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
  position:'relative',
  overflow: 'hidden',
 
};

export class MapContainer1 extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: -1.2884,
            lng: 36.8233
          }
        }
      >
          <Marker position={{
                lat: -1.2884,
                lng: 36.8233
            }} />
    </Map>
    );
  }
}

export default GoogleApiWrapper1({
  apiKey: 'AIzaSyC0TZuTOPy4nrxmuSyjeH_D20Pc4eEZBys'
})(MapContainer1);