<template>
	<div class="settings-clinic-wrapper">
		<div class="settings-clinic-container">
			<div class="side-panel">
				<ul>
					<li v-bind:class="{'active': ($route.name == 'ClinicAccount')}">
						<router-link to="/clinic/settings/clinic-account">
							<img class="account-img" :src="'../assets/img/ico_Account.svg'">
							<br>
							<span>ACCOUNT</span>
						</router-link>
					</li>
					<li v-bind:class="{'active': ($route.name == 'ClinicStaff')}">
						<router-link to="/clinic/settings/clinic-staff">
							<img :src="'../assets/img/Staff.png'">
							<br>
							<span>STAFF</span>
						</router-link>
					</li>
					<li v-bind:class="{'active': ($route.name == 'ClinicServices')}">
						<router-link to="/clinic/settings/clinic-services">
							<img :src="'../assets/img/ico_services.svg'">
							<br>
							<span>SERVICES</span>
						</router-link>
					</li>
					<li v-bind:class="{'active': ($route.name == 'ClinicDetails' || $route.name == 'BusinessHours' || $route.name == 'ProfilePassword' || $route.name == 'PaymentDetails' || $route.name == 'ProfileWidget' || $route.name == 'QrCode' )}">
						<router-link to="/clinic/settings/clinic-profile">
							<img class="profile-img" :src="'../assets/img/ico_profile_2.svg'">
							<br>
							<span>PROFILE</span>
						</router-link>
					</li>
					<li v-bind:class="{'active': ($route.name == 'TransactionHistory' || $route.name == 'TransactionInvoice' || $route.name == 'StatementAccount')}">
						<router-link to="/clinic/settings/clinic-transactions">
							<img class="transaction-img" :src="'../assets/img/Transaction.png'">
							<br>
							<span>TRANSACTIONS</span>
						</router-link>
					</li>
				</ul>
			</div>

			<div class="setting-info-container">
				<router-view name='account'></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import settings from '@/components/clinic/settings'
	export default settings
</script>