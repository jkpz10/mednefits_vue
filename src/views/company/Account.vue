<template>
  <div class="account-wrapper">
  	<div class="container">

  		<div class="account-billing-header">
  			<h3 v-if="$route.name != 'AccountBenefits'">Account & Billing</h3>
  		</div>

  		<div class="account-billing-info-wrapper">
  			<div class="account-biling-link-list">
  				<ul>
						<li v-bind:class="{'active': ($route.name == 'AccountCompany')}">
							<router-link to="/company/account/company-contacts">
								Company &amp; Contacts
							</router-link>
						</li>
						<li v-bind:class="{'active': ($route.name == 'AccountTransaction')}">
							<router-link to="/company/account/transactions">
								Transactions
							</router-link>
						</li>
						<li v-bind:class="{'active': ($route.name == 'AccountDocument')}">
							<router-link to="/company/account/document-center">
								Document Center
							</router-link>
						</li>
						<li v-bind:class="{'active': ($route.name == 'AccountPayments')}">
							<router-link to="/company/account/account-payments">
								Account &amp; Payment
							</router-link>
						</li>
						<li v-bind:class="{'active': ($route.name == 'AccountBenefits')}">
							<router-link to="/company/account/team-benefits-tier">
								Team Benefits Tier
							</router-link>
						</li>
					</ul>
  			</div>

  			<div class="info-container">
  				<router-view name='account'></router-view>
  			</div>
  		</div>

  	</div>
  </div>

</template>

<script>
import account from "@/components/company/account";

export default account;
</script>

