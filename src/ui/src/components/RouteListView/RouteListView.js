export default {
	name: 'ImageListView',
	props: {
		imageList: {
			type: Array,
		},
		maxIdx: {
			type: Number,
		},
	},
	data() {
		return {
			selectedImageId: undefined,
		};
	},
	methods: {
		//======================================================================
		// Event handler function
		//======================================================================

		/**
		 * Result display event handler
		 * @param {*} selectedImage
		 */
		onDisplayResult(selectedImage) {
			//if (selectedImage.imageURI == '') return;

			if (this.selectedImageId != undefined) {
				this.imageList[this.selectedImageId].isSelected = false;
			}

			this.selectedImageId = selectedImage.id;

			this.imageList[this.selectedImageId].isSelected = true;

			this.$emit('on-select', selectedImage);
		},
		/**
		 * Delete button click event handler
		 * @param {*} modelId
		 */
		async onDeleteButtonClick(modelId) {
			console.log(modelId);
		},
		/**
		 * Download button click event handler
		 * @param {*} modelId
		 */
		async onDownloadButtonClick(modelId) {
			console.log(modelId);
		},
		/**
		 * Upload button click event handler
		 * @param {*} modelId
		 */
		async onUploadButtonClick(modelId) {
			console.log(modelId);
		},
		/**
		 * Retrieve models to render list view
		 * @param {*} modelId
		 */
		async retrieveModelList() {},
	},
	created() {
		this.retrieveModelList();
	},
};
