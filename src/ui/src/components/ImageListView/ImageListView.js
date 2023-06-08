import RosService from "../../services/ros.service";

let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
	name: 'ImageListView',
	props: {
		maxIdx: {
			type: Number,
		},
	},
	data() {
		return {
			selectedImageId: undefined,
			selectedSimulationId: undefined,
			imageList: [{
				fileName: "Sinfornia Technology",
				isSelected: false,
				imageURI: "https://i.ibb.co/16ngWxB/sinfonia.png",
				latitude1: 34.72046,
				longitude1: 137.45660,
				latitude2: 34.72000,
				longitude2: 137.45743,
				simulation: false
			},{
				fileName: "Tomato Garden",
				isSelected: false,
				imageURI: "https://i.ibb.co/7GzkZPK/tomato-garden.png",
				latitude1: 34.83533715524644,
				longitude1: 137.4803320275017,
				latitude2: 34.83426950353362,
				longitude2: 137.48111050369315,
				simulation: false
			}]
		};
	},
	methods: {
		//======================================================================
		// Event handler function
		//======================================================================
		/**
		 * Import from folder button click event handler
		 */
		onImportFromFolderButtonClick() {
			this.$refs.importFromFolder.click();
		},
		/**
		 * Import from s3 button click event handler
		 */
		onImportFromS3ButtonClick() {
			this.$refs.importFromS3.click();
		},
		/**
		 * Import single file button click event handler
		 */
		onImportSingleFileButtonClick() {
			this.$refs.importSingleFile.click();
		},
		/**
		 * Learning multiple files from folder upload event handler
		 * @param {*} event
		 */
		async onImportFromFolder(event) {
			const types = ['jpg', 'png', 'jpeg'];

			const files = event.target.files;
			for (let i = 0; i < files.length; i++) {
				await this.uploadImage(files[i], types);

				await sleep(1000);
			}
		},
		/**
		 *  Class definition import event handler
		 * @param {*} event trigger event
		 */
		async onImportSingleFile(event) {
			const types = ['jpg', 'png', 'jpeg'];

			const file = event.target.files;

			await this.uploadImage(file[0], types);
		},
		/**
		 * Upload imported image file to detection server
		 * @param {*} file image file need uploading
		 * @param {*} types image file types array
		 */
		async uploadImage(file, types) {
			let fileName = file.name;

			let extension = fileName.split('.').pop();

			if (!types.includes(extension)) return;

			const content = await this.uploadFile(file);

			this.imageList.push({
				fileName: fileName,
				isSelected: false,
				imageURI: content,
				latitude1: undefined,
				longitude1: undefined,
				latitude2: undefined,
				longitude2: undefined,
				simulation: false
			})
		},
		/**
		 * Upload file synchronously
		 * @param {*} file image file need uploading
		 */
		uploadFile(file) {
			return new Promise(function (resolve) {
				let reader = new FileReader();

				reader.readAsDataURL(file);
				reader.onload = function () {
					resolve(this.result);
				};
			});
		},
		/**
		 * Result display event handler
		 * @param {*} selectedImage
		 */
		onDisplayResult(image, index) {

			if (this.selectedImageId != undefined) {
				this.imageList[this.selectedImageId].isSelected = false;
			}

			this.selectedImageId = index

			this.imageList[index].isSelected = true;

			this.$emit('on-select', image);
		},
		/**
		 * Start simulation button click event handler
		 */
		async onStartSimulationButtonClick(id) {
			
			let response = await RosService.stopSimulation();

			console.log(response);

			if (this.selectedSimulationId != undefined) {
				this.imageList[this.selectedSimulationId].simulation = false;
			}
			
			if (this.selectedSimulationId != id) {
				this.selectedSimulationId = id;

				this.imageList[id].simulation = true;

				let response = await RosService.startSimulation(id);
				
				console.log(response);
				
			} else {
				this.selectedSimulationId = undefined;

			}	

		},
	}
};
