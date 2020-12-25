<template>
	<div class="clinic-profile-wrapper">
		<div class="profile-side-list" id="profile-side-wrapper">

			<div>
				<i @click="closeLeftContainer()" class="fa fa-times"></i>
			</div>

			<div class="configure-container">
				<span>Configure</span>
				<div v-bind:class="{'active': ($route.name == 'ClinicDetails')}">
					<router-link to="/clinic/settings/profile/clinic-details">
						<img :src="'../assets/img/clinic/Clinic Details.png'">
						<span>CLINIC DETAILS</span>
					</router-link>
				</div>
				<div v-bind:class="{'active': ($route.name == 'BusinessHours')}">
					<router-link to="/clinic/settings/profile/business-hours">
						<img :src="'../assets/img/clinic/Business Hours.png'">
						<span>BUSINESS HOURS</span>
					</router-link>
				</div>
				<div v-bind:class="{'active': ($route.name == 'ProfilePassword')}">
					<router-link to="/clinic/settings/profile/profile-password">
						<img :src="'../assets/img/clinic/Password.png'">
						<span>PASSWORD</span>
					</router-link>
				</div>
				<div v-bind:class="{'active': ($route.name == 'PaymentDetails')}">
					<router-link to="/clinic/settings/profile/payment-details">
						<img :src="'../assets/img/clinic/Payment Details.png'">
						<span>PAYMENT DETAILS</span>
					</router-link>
				</div>
			</div>
			<div class="integrate-container">
				<span>Integrate</span>
				<div v-bind:class="{'active': ($route.name == 'ProfileWidget')}">
					<router-link to="/clinic/settings/profile/profile-widget">
						<img :src="'../assets/img/clinic/Widget.png'">
						<span>WIDGET</span>
					</router-link>
				</div>
				<div v-bind:class="{'active': ($route.name == 'QrCode')}">
					<router-link to="/clinic/settings/profile/qr-code">
						<img :src="'../assets/img/clinic/qr-code.png'">
						<span>QR CODE</span>
					</router-link>
				</div>
			</div>
		</div>

		<div class="profile-detail-container" id="profile-detail-wrapper">
			<div>
				<i @click="sideBarCollapse(0)" class="fa fa-bars"></i>
			</div>	
			<router-view name='profile'></router-view>
		</div>

		
	</div>
</template>

<script>
import clinicProfile from "@/components/clinic/settings/clinic-profile";

export default clinicProfile;
</script>