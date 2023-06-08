<template>
	<div class="annotation-tool-container border border-dark col">
		<div class="row border-bottom border-dark col m-0">
			<div class="editor">
				<div class="label m-2">
					Camera View
				</div>
			</div>
		</div>
		<div class="image-container row m-0 video-fill" ref="container">
			<video width="480" controls muted autoplay loop>
				<source src="https://vod-progressive.akamaized.net/exp=1686251234~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1624%2F13%2F333124549%2F1312987045.mp4~hmac=a742052d2927300a4ff65bf7a4dab156a860254341d70a6e7eb95fac8c5d082b/vimeo-prod-skyfire-std-us/01/1624/13/333124549/1312987045.mp4" />
				Your browser doesn't support HTML5 video tag.
			</video>
		</div>
	</div>
</template>

<script src="./CameraContainer.js"></script>
<style src="./CameraContainer.css" scoped></style>