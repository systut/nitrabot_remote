<template>
	<div class="annotation-tool-container border border-dark col">
		<div class="row border-bottom border-dark col m-0">
			<div class="editor">
				<div class="label m-2">
					Map View
				</div>
				<div class="toolbar d-flex flex-row-reverse">
					<b-icon 
						class="m-1 toolbar__button" 
						icon="trash" 
						font-scale="1.3"
					>
					</b-icon>
					<b-icon 
						class="m-1 toolbar__button" 
						icon="geo-alt-fill" 
						:variant="isSetRoute ? 'success' : 'dark'"
						font-scale="1.3"
						@click="onStartSettingRouteButtonClick"
					>
					</b-icon>
					<b-icon 
						class="m-1 toolbar__button" 
						icon="stop" 
						font-scale="1.5"
						@click="onStopButtonClick"
					>
					</b-icon>
					<b-icon 
						class="m-1 toolbar__button" 
						:icon="robotStatus == 'pause' ? 'pause' : 'play'" 
						font-scale="1.5"
						@click="onRobotStatusButtonClick"
					>
					</b-icon>
				</div>
			</div>
		</div>
		<div class="image-container row m-0" ref="container">
			<l-map
				ref="map"
				class="image"
				:min-zoom="minZoom"
				:crs="crs"
				@click="onMapClick"
			>
				<l-image-overlay v-for="(layer, index) in layers" :key="index" :url="layer.url" :bounds="layer.bounds"></l-image-overlay>

				<l-marker v-for="goal in goals" :key="goal.id"
					:lat-lng="goal.position"
				></l-marker>

				<l-marker v-for="robot in robots" :key="robot.id"
					:lat-lng="robot.position" :icon="robot.icon"
				></l-marker>

				<l-polyline :lat-lngs="paths" :color="'blue'"></l-polyline>
			</l-map>				
		</div>
		<div class="separator row m-0">

		</div>
		<div class="row m-0">
			<div class="col">
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text" id="addon-wrapping">#1</span>
					</div>
					<input 
						type="number" 
						class="form-control" 
						aria-describedby="addon-wrapping"
					>
					<input 
						type="number" 
						class="form-control" 
						aria-describedby="addon-wrapping"
					>
				</div>
			</div>
		</div>
		<div class="separator row m-0">

		</div>
		<div class="row m-0">
			<div class="col">
				<div class="input-group">
					<div class="input-group-prepend">
						<span class="input-group-text" id="addon-wrapping">#2</span>
					</div>
					<input 
						type="number" 
						class="form-control" 
						aria-describedby="addon-wrapping"
					>
					<input 
						type="number" 
						class="form-control" 
						aria-describedby="addon-wrapping"
					>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./ImageContainer.js"></script>
<style src="./ImageContainer.css" scoped></style>