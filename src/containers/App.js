import React, { Component } from 'react';
import './App.css';
import L from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import issImage from '../assets/International_Space_Station.svg.png';

class App extends Component {
    constructor() {
        super()
        this.state = {
            issLocation: {
                lat: 0,
                lng: 0,
                },
            zoom: 2
            }
    }

    async componentDidMount() {
        const url = 'https://api.wheretheiss.at/v1/satellites/25544'
        const response = await fetch(url);
        const data = await response.json();
        const { latitude, longitude } = data;
        this.setState({
            issLocation: {
                lat: latitude,
                lng: longitude
            }
        })
    }
    
    issIcon = L.icon({
        iconUrl: issImage,
        iconSize:     [50, 32], // size of the icon
        iconAnchor:   [25, 26], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76]
      });

    render() {
        const positionIssIcon = [this.state.issLocation.lat, this.state.issLocation.lng];
        return (
            <React.Fragment className="container">
                <Map className="map" center={positionIssIcon} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={positionIssIcon} icon={this.issIcon}>
                        <Popup>
                            I am the International Space Station
                        </Popup>
                    </Marker>
                </Map>
            </React.Fragment>
        );
    }
}

export default App;