<template>
	<div class="clinic-transactions-wrapper">
		<div class="profile-side-list" id="trans-side-list">

			<div>
				<i @click="closeLeftContainer()" class="fa fa-times"></i>
			</div>

			<div class="payments-container">
				<span>Payments</span>
				<div v-bind:class="{'active': ($route.name == 'TransactionHistory')}">
					<router-link to="/clinic/settings/transactions/transaction-history">
						<img :src="'../assets/img/clinic/history.png'">
						<span>HISTORY</span>
					</router-link>
				</div>
				<div v-bind:class="{'active': ($route.name == 'TransactionInvoice')}">
					<router-link to="/clinic/settings/transactions/transaction-invoice">
						<img :src="'../assets/img/clinic/invoice.png'">
						<span>INVOICE</span>
					</router-link>
				</div>	
				<div v-bind:class="{'active': ($route.name == 'StatementAccount')}">
					<router-link to="/clinic/settings/transactions/statement-account">
						<img :src="'../assets/img/clinic/Statement of Account.png'">
						<span>STATEMENT OF ACCOUNT</span>
					</router-link>
				</div>
			</div>
		</div>
		<div class="transaction-body-detail" id="trans-body-detail">
			<div>
				<i @click="sideBarCollapse(0)" class="fa fa-bars"></i>
			</div>
			<router-view name='transactions'></router-view>
		</div>
	</div>
</template>

<script>
import clinicTransactions from "@/components/clinic/settings/clinic-transactions";

export default clinicTransactions;
</script>