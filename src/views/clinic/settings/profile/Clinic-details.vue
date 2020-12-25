<template>
	<div class="medicloud-booking-wrapper">
		<div class="clinic-profile-header">
			<h4>Configure Your Medicloud Booking Page</h4>
		</div>
		<div class="medicloud-booking-body">
			<form>
				<div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>Logo / Photo</span>
						</div>
						<div>
							<img :src="'https://res.cloudinary.com/dzh9uhsqr/image/upload/v1549795986/up0ebkyrragfte9bany7.jpg'">
						</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>Clinic Name</span>
						</div>
						<div>
							<input placeholder="Clinic Name">
						</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>Speciality</span>
						</div>
						<div>
							<input placeholder="General Practitioner">
						</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>MRT</span>
						</div>
						<div class="mrt-selector-container">
							<button @click="showMrtSlector = !showMrtSlector">{{clinicDetails.mrt || 'Select MRT'}} <i class="fa fa-caret-down"></i></button>
							<ul v-if="showMrtSlector" class="dropdown-menu">
								<li v-for="list in mrt" :key="list"> 
									<a @click="btnMrtSelector(list)">{{list}}</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>Address</span>
						</div>
						<div>
							<input placeholder="Address">
						</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<label>Street</label>
						</div>
						<div>
							<input placeholder="Street">
						</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>State</span>
						</div>
						<div>
							<input placeholder="State">
						</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>District</span>
						</div>
						<div>
							<input placeholder="District">
						</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>Postal Code</span>
						</div>
						<div>
							<input placeholder="Postal Code">
						</div>
					</div>
				</div>
				<div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>Country</span>
						</div>
						<div>
							<input placeholder="Country">
						</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>Latitude</span>
						</div>
						<div>
							<input placeholder="Latitude">
						</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>Longtitude</span>
						</div>
						<div>
							<input placeholder="Longtitude">
						</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>Description</span>
						</div>
						<div>
							<textarea placeholder="Description"></textarea>
						</div>
					</div>
					<div class="clinic-row-container">
						<div class="phone-number-input-wrapper">
							<div class="text-label">
								<span>Phone</span>
							</div>
						</div>
						<div class="phone-number-input-wrapper">
							<vue-tel-input ref="areaCode" v-bind="telProps" @input="setAreaCode"></vue-tel-input>
						</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>Communication Email</span>
						</div>
						<div>
								<input placeholder="Communication Email">
							</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>Website</span>
						</div>
						<div>
								<input placeholder="Website">
							</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>Personalized heading</span>
						</div>
						<div>
							<input placeholder="Personalized heading">
						</div>
					</div>
					<div class="clinic-row-container">
						<div class="text-label">
							<span>Personalized Message</span>
						</div>
						<div>
							<textarea placeholder="Personalized Message"></textarea>
						</div>
					</div>
				</div>
			</form>
			<div class="clinic-row-container">
				<div></div>
				<button class="btn-update-changes">Update Changes</button>
			</div>
		</div>
	</div>
</template>

<script>
import clinicDetails from "@/components/clinic/settings/profile/clinic-details";

export default clinicDetails;
</script>