<template>
	<div class="image-list-view-container">
		<div class="list-container border border-dark">
			<div class="editor">
				<div class="label m-2">
					Workspaces
				</div>
				<div class="toolbar d-flex flex-row-reverse">
					<input
						ref="importSingleFile"
						name="importSingleFile"
						type="file"
						hidden
						@change="onImportSingleFile"
					/>
					<b-icon 
						class="m-1 toolbar__button" 
						icon="file-plus" 
						font-scale="1.3"
						@click="onImportSingleFileButtonClick"
						>
					</b-icon>
					
				</div>
			</div>
			<div class="list border border-dark">
				<!-- A compact view smaller photos and titles -->
				<div
					v-for="(item, index) in imageList"
					:key="index"
					class="list-views-container row border border-dark"
					:class="item.isSelected ? 'selected' : 'unselected'"
				>
					<div
						class="row"
					>
						<div 
							class="col-2 d-flex align-items-center"
						>
							<img
								class="image-container"
								v-bind:src="item.imageURI"
							/>
						</div>
						<p class="col g-0 ml-3" @click="onDisplayResult(item, index)">
							{{ item.fileName }}
						</p>
						<div class="col-3 g-0 d-flex align-items-center flex-row-reverse">
							<b-icon
								class="m-2 toolbar__button"
								icon="trash"
								font-scale="1.5"
								@click="onDeleteButtonClick(item.id)"
							>
							</b-icon>			
							<b-icon
								class="m-2 toolbar__button"
								icon="arrow-counterclockwise"
								font-scale="1.5"
								@click="onDeleteButtonClick(item.id)"
							>
							</b-icon>
							<b-icon
								class="m-2 toolbar__button"
								icon="joystick"
								font-scale="1.5"
								:variant="item.simulation ? 'success' : 'dark'"
								@click="onStartSimulationButtonClick(index)"
							>
							</b-icon>
							
						</div>
					</div>
					<div
						class="row"
					>
						<div
							class="col"
						>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text" id="addon-wrapping">#1</span>
								</div>
								<input 
									type="number" 
									class="form-control" 
									v-model="item.latitude1"
									aria-describedby="addon-wrapping"
								>
								<input 
									type="number" 
									class="form-control" 
									v-model="item.longitude1"
									aria-describedby="addon-wrapping"
								>
							</div>
						</div>
					</div>
					<div
						class="row"
					>
						<div
							class="col"
						>
							<div class="input-group">
								<div class="input-group-prepend">
									<span class="input-group-text" id="addon-wrapping">#2</span>
								</div>
								<input 
									type="number" 
									class="form-control" 
									v-model="item.latitude2"
									aria-describedby="addon-wrapping"
								>
								<input 
									type="number" 
									class="form-control" 
									v-model="item.longitude2"
									aria-describedby="addon-wrapping"
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./ImageListView.js"></script>
<style src="./ImageListView.css" scoped></style>
