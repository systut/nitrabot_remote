import ROSLIB from "roslib"

const ros = new ROSLIB.Ros();

ros.on('error', function(error) {
	console.log(error)
});

ros.on('connection', function() {
	console.log('Connection made!');
});

ros.on('close', function() {
	console.log('Connection closed.');
});

ros.connect('ws://localhost:8081');

const RosService = {

	async setRoute(route, routeId) {
		return await this.callService('/SetRoute', 'agribot_action/SetRoute', {
			route: route,
			route_number : routeId
		});
	},

	async setRouteLatLon(route, routeId) {
		return await this.callService('/SetRouteLatLon', 'agribot_action/SetRoute', {
			route: route,
			route_number : routeId
		});
	},

	async startRoute(routeId) {
		return await this.callService('/StartRoute', 'agribot_action/StartRoute', {route_number : routeId});
	},

	async suspendRoute() {
		return await this.callService('/SuspendRoute', 'agribot_action/SuspendRoute', {});
	},

	async continueRoute() {
		return await this.callService('/ContinueRoute', 'agribot_action/ContinueRoute', {});
	},

	async stopRoute() {
		return await this.callService('/StopRoute', 'agribot_action/StopRoute', {});
	},

	async startSimulation(simulationId) {
		return await this.callService('/StartSimulation', 'agribot_launch/StartSimulation', {simulation_number: simulationId});
	},

	async stopSimulation() {
		return await this.callService('/StopSimulation', 'agribot_launch/StopSimulation', {});
	},

	async callService(name, serviceType, params) {
		let client = new ROSLIB.Service({
			ros : ros,
			name : name,
			serviceType : serviceType
		});
	
		let request = new ROSLIB.ServiceRequest(params);
	
		return await client.callService(request);
	},

	setRobotPositionCallback(callback){
		let listener = new ROSLIB.Topic({
			ros : ros,
			name : '/gps/fix',
			messageType : 'sensor_msgs/NavSatFix'
		});
	
		listener.subscribe(callback);
	}
}

export default RosService;