<template>
	<div class="clinic-services-wrapper">

		<div v-if="!showAddServiceWrapper">
			<div class="clinic-services-header-container">
				<h4>Here is the List of all Services</h4>
				<button class="btn-add-service" @click="btnAddService()">Add Service</button>
			</div>
			
			<div class="service-details-wrapper">
				<div class="service-details">
					<div>
						<img :src="'../assets/img/clinic/ico_Profile.svg'">
						<span>consultation</span>
					</div>
					<div>
						<span>30 mins</span>
					</div>
					<div>
						<span>10</span>
					</div>
					<div>
						<span>Span & Pay Page</span>
						<label class="switch">
		          <input type="checkbox">
		          <span class="slider">
		            <span class="off">Hide</span>
		            <span class="on">Show</span>
		          </span>
	        	</label>
					</div>
				</div>
			</div>
		</div>

		<div v-if="showAddServiceWrapper" class="add-service-wrapper">
			<div class="clinic-services-header-container">
				<h4>Add Service</h4>
				<div class="right-btn-container">
					<button class="btn-save">Save</button>
					<button class="btn-cancel" @click="btnCancel">Cancel</button>
				</div>
			</div>

			<div class="add-service-container">
				<div>
					<div class="add-service-input-wrapper">
						<div>
							<img :src="'../assets/img/clinic/ico_Profile.svg'">
						</div>
						<div>
							<input type="text" placeholder="Enter Service Name">
						</div>
					</div>
					<div class="add-service-input-wrapper">
						<div>
							<span>Service Cost</span>
						</div>
						<div>
							<input type="text" placeholder="0">
						</div>
					</div>
					<div class="add-service-input-wrapper">
						<div>
							<span>Service Time (mins)</span>
						</div>
						<div>
							<input type="text" placeholder="0">
						</div>
					</div>
					<div class="add-service-input-wrapper">
						<div>
							<span>Service Time (mins)</span>
						</div>
						<div>
							<input type="text" placeholder="0">
						</div>
					</div>
					<div class="add-service-input-wrapper">
						<div>
							<span>Service Description</span>
						</div>
						<div>
							<input type="text" placeholder="Enter Service Description">
						</div>
					</div>
				</div>

				<div class="provide-service-container">
					<span>Who can provide the Service</span>
					<div>
						<input type="checkbox">
						<label>Select All Doctors</label>
					</div>
					<div>
						<input type="checkbox">
						<label>gp@gmail.com</label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import clinicServices from "@/components/clinic/settings/clinic-services";

export default clinicServices;
</script>