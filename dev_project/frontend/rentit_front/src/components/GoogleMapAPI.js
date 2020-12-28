import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '43%',
  height: '40%'
};

export class MapContainer extends Component {
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

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC0TZuTOPy4nrxmuSyjeH_D20Pc4eEZBys'
})(MapContainer);