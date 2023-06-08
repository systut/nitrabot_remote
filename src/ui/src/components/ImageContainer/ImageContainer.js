import {
	LMap,
	LImageOverlay,
	LMarker,
	LPolyline
  } from "vue2-leaflet";
import { CRS, Icon } from "leaflet";
import RosService from "../../services/ros.service";

export default {
	name: 'ImageContainer',
	props: {
		image: {
			type: Object,
		},
	},
	components: {
		LMap,
		LMarker,
		LImageOverlay,
		LPolyline
	},
	watch: {
		image(currentImage) {
			this.layers.splice(-1, 1);
			console.log(currentImage);

			let layer = {
				url: currentImage.imageURI,
				bounds: [[currentImage.latitude1, currentImage.longitude1], [currentImage.latitude2, currentImage.longitude2]]	
			};

			let center = [(currentImage.latitude1+currentImage.latitude2)/2,(currentImage.longitude1+currentImage.longitude2)/2]

			this.layers.push(layer);
			
			this.goals = []

			this.paths = []
			
			this.$refs.map.mapObject.setView(center, 19);

			RosService.setRobotPositionCallback(this.onRobotPositionCallback)
		}
	},
	data() {
		return {
			bounds: [[34.72046, 137.45660], [34.72000, 137.45743]],
			minZoom: -1,
			crs: CRS.Simple,
			layers: [],
			goals: [],
			paths: [],
			robotStatus: "play",
			routes: [],
			robots: [],
			isSetRoute: false
		}
	},
	methods: {
		async onRobotPositionCallback(event) {
			let latitude = event.latitude;

			let longitude = event.longitude;
			
			var redIcon = new Icon({
				iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
				shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowSize: [41, 41]
			});

			let marker = {
				position: [latitude, longitude],
				icon: redIcon
			};

			this.robots = [marker];			
		},
		async onStopButtonClick() {
			let response = await RosService.stopRoute();

			console.log(response);

			this.robotStatus = "play"

		},
		async onRobotStatusButtonClick() {
			if (this.robotStatus == "play") {
				let routeId = 1;
				
				let response = await RosService.startRoute(routeId);

				console.log(response);

				this.robotStatus = "pause"

			} else if (this.robotStatus == "pause") {
				let response = await RosService.suspendRoute();

				console.log(response);

				this.robotStatus = "continue"
			} else {
				let response = await RosService.continueRoute();

				console.log(response);

				this.robotStatus = "pause"
			}
		},
		async onStartSettingRouteButtonClick() {
			this.isSetRoute = !this.isSetRoute
		},
		async onMapClick(event) {
			if (!this.isSetRoute) return;

			let marker = {
				position: [event.latlng.lat, event.latlng.lng],
			};

			this.goals.push(marker);
			
			this.routes.push({
				position: {
					x: event.latlng.lat,
					y: event.latlng.lng,
					z: 0
				},
				orientation: {
					x : 0,
					y : 0,
					z : 0,
					w : 1
				}
			})

			let routeId = 1;

			let response = await RosService.setRouteLatLon(this.routes, routeId)

			routeId = 2;
			
			let reverse = [...this.routes].reverse()

			response = await RosService.setRouteLatLon(reverse, routeId)
			
			console.log(response);

			if (Array.from(this.goals).length == 0) return;

			this.paths.push([event.latlng.lat, event.latlng.lng]);		
		}	
	}
}