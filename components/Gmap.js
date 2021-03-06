import React, {PropTypes, Component} from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'

export default class SimpleMapPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			lat: -2.1667,
			lng: -79.9000,
			animation: 1,
			opacity: 1,
			mapLat: -2.1667,
			mapLng: -79.9000
		}
	}

	setMarker(lat, lng){
		this.setState({
			lat : lat,
			lng: lng
		})
	}

	setMapCenter(lat, lng){
		this.setState({
			mapLat : lat,
			mapLng: lng
		})
	}

	handleCenterChanged(){
		var coords = this.refs.map.getCenter();
		this.setMarker(coords.lat(), coords.lng());
		this.setMapCenter(coords.lat(), coords.lng());
		this.setState({
			animation: 0,
			opacity: 0
		})
		this.props.fireChangeEvent(1);
	}

	handleIdle(){
		this.setState({
			animation: 1,
			opacity: 1
		})
		this.props.fireChangeEvent(0);
		var geocoder = new google.maps.Geocoder();
		var lat = this.state.lat;
		var lng = this.state.lng;
		var latlng = new google.maps.LatLng(lat, lng);
		geocoder.geocode({'latLng': latlng}, (results, status) => {
			if (status == google.maps.GeocoderStatus.OK){
				if (results[0]){
					this.props.updateGeoLocation(this.state.lat, this.state.lng, results[0].formatted_address);
				}else{
					this.props.updateGeoLocation(this.state.lat, this.state.lng, "Location");
				}
			}
			else{
				this.props.updateGeoLocation(this.state.lat, this.state.lng, "Location");
			}
		});
	}

	render() {
		return (
			<GoogleMapLoader ref="maploader" containerElement={
				<div {...this.props}
					style={{
						height: `100%`,
						width: `100%`,
						zIndex: 1000,
						overflow: `visible !important`,
					}}
			
					id="map-id"/>
				}
				googleMapElement={ <GoogleMap ref="map" onCenterChanged={this.handleCenterChanged.bind(this)}
				onIdle={this.handleIdle.bind(this)}
				defaultZoom={17}
				center={{lat: this.state.mapLat, lng: this.state.mapLng}}
				defaultOptions={{ streetViewControl: false, mapTypeControl: false, zoomControlOptions: {position: google.maps.ControlPosition.RIGHT_TOP} }}
				>
				<Marker position={{lat: this.state.lat, lng: this.state.lng}} ref="myMarker" animation={this.state.animation} opacity={this.state.opacity}/>
				</GoogleMap>
			}/>
		);
	}
}