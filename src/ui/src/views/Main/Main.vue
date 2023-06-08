<template>
	<div class="header-container">
		<div class="header">
			<div class="col p-2">
                <h2>Nitra Robot</h2>
			</div>
		</div>
		<div class="body row no-gutters p-4">	
			<div class="container col-5">
				<CameraContainer/>
			</div>
			<div class="container col-5">
				<ImageContainer
					:image="image"
				/>
			</div>
			<div class="container col-2">
				<RouteListView/>
			</div>
		</div>
	</div>
</template>

<script src="./Main.js"></script>
<style src="./Main.css" scoped></style>
