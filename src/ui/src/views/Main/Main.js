import CameraContainer from '../../components/CameraContainer/CameraContainer.vue';
import ImageContainer from '../../components/ImageContainer/ImageContainer.vue';
import RouteListView from '../../components/RouteListView/RouteListView.vue';


export default {
	name: 'Home',
	components: {
		CameraContainer,
		ImageContainer,
		RouteListView
	},
	data() {
		return {
			image: {}
		};
	},
	methods: {
		onDisplayMap(image) {
			this.image = image;
		}
	}
}