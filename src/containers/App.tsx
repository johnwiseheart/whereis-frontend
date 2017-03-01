/// <reference path="../../node_modules/@types/whatwg-fetch/index.d.ts"/>

import React from 'react'
import 'whatwg-fetch'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import moment from 'moment-timezone'

interface AppState {
	location: string
	latitude: number
	longitude: number,
	time: string
}

export default class App extends React.Component<{}, AppState> {
	state = {
		location: null,
		latitude: null,
		longitude: null,
		time: null
	}

	componentWillMount() {
		fetch('https://whereis.dynamic.jcaw.me')
			.then((resp: Response) => resp.json() as Promise<Array<any>>)
			.then((devices: Array<any>) => {
				
				const order = ["iPhone", "MacBook Pro", "iPad"]

				const device = devices.sort((a, b) => {
					if (order.indexOf(a.name) > order.indexOf(b.name)) return 1
					if (order.indexOf(a.name) < order.indexOf(b.name)) return -1
					return 0
				})[0]

				this.getLocation(device)
				this.getTimezone(device)

			})
	}

	getLocation = (device) => {
		const {latitude, longitude} = device
		fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude.toString() + "," + longitude.toString() + "&key=AIzaSyADeOu61YuoI_TnvHHcbdKmy-HCoP5DkJw")
			.then((resp: Response) => resp.json() as Promise<any>)
			.then((resp: any) => {
				const {lat, lng} = resp.results[1].geometry.location
				const location = resp.results[resp.results.length-3].formatted_address
				this.setState({latitude: lat, longitude: lng, location})
			})
	}

	getTimezone = (device) => {
		const {latitude, longitude} = device
		const timestamp = (new Date).getTime() / 1000
		fetch("https://maps.googleapis.com/maps/api/timezone/json?location=" + latitude.toString() + "," + longitude.toString() + "&timestamp=" + timestamp.toString() + "&key=AIzaSyDh8u8vZe0j0le1ZSnhfGjCkzZyBbWs4VI")
			.then((resp: Response) => resp.json() as Promise<any>)
			.then((resp: any) => {
				this.startTimezone(resp.timeZoneId)
			})
	}

	startTimezone = (timezone) => {
		const update = () => {
			console.log("doing i", moment().tz(timezone).format('h:mm A'))
			this.setState({time: new moment().tz(timezone).format('h:mm A')})
		}
		setInterval(() => update(), 1000)
	}

	render(): JSX.Element {
		const position = [this.state.latitude, this.state.longitude];
		const map = (
			<Map style={{flex: 1}} center={position} zoom={10} dragging={false} scrollWheelZoom={false} zoomControl={false}>
				<TileLayer
				url='http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png'
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
			</Map>
		)

		const styles = {
			flexWrapper: {
				display: 'flex',
				margin: '0 auto',
				flexDirection: 'column',
				height: '100vh',
				textAlign: 'center'
			},
			flexItem: {
				background: '#f5f5f5',
				zIndex: 500
			},
			flexItemInner: {
				padding: 10
			}
		}

		return (
			<div style={styles.flexWrapper}>
				<div style={styles.flexItem}>
					<div style={styles.flexItemInner}>
						<h1>Where is John at?</h1>
					</div>
				</div>

				<div style={{flex: '1 1', display: 'flex'}}>
					{this.state.latitude && map}
				</div>

				{this.state.time && <div style={styles.flexItem}>
					<div style={styles.flexItemInner}>
						John is currently in
						<h2>{this.state.location}</h2>
						where the time is {this.state.time}.
					</div>
				</div>}

				
			</div>
		)
	}
}
