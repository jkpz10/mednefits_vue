<template>
	<div>
		<div class="benefits-tier-wrapper">
		  <h1>Create team benefits tiers.</h1>

			<!-- button add tier -->
		  <div v-if="isTierBtn && tierStorage.length == 0" class="add-tier-wrapper">
		  	<h4>Add a tier</h4>
		  	<button @click="addTierBtn('add')"><img :src="'../assets/img/plus-gray.png'"></button>
		  </div>

			<!-- forms for add tier -->
		  <div v-if="isTierInput" class="tier-item-wrapper">
		  	<div class="tier-item-form">
					<div class="tier-item-header">
						<h4>Tier <span>{{tierDetials.index}}</span></h4>
						<img @click="closeBtn( )" :src="'../assets/img/icons/close.svg'">
					</div>
					<div class="tier-item-body">
						<div class="input-wrapper">
							<label>Medical annual cap</label>
							<div class="input-container">
								<input type="number" min="0" v-model="tierDetials.medCap">
								<div class="icon-item">
									S
									<i class="fa fa-usd icon"></i>
								</div>
							</div>
						</div>
						<div class="input-wrapper">
							<label>Wellness annual cap</label>
							<div class="input-container">
								<input type="number" min="0" v-model="tierDetials.wellCap">
								<div class="icon-item">
									S
									<i class="fa fa-usd icon"></i>
								</div>
							</div>
						</div>
						<div class="input-wrapper gp-toggle">
							<label>Add GP cap per visit?</label>
							<div class="btn-wrapper">
								<button v-bind:class="{'active' : tierDetials.gp_cap_status == true }" @click="toggleGPcapStatus(true)">Yes</button>
								<button v-bind:class="{'active' : tierDetials.gp_cap_status == false }" @click="toggleGPcapStatus(false)">No</button>
							</div>
						</div>
						<div v-if="tierDetials.gp_cap_status" class="input-wrapper">
							<label>GP cap per visit</label>
							<div class="input-container">
								<input type="number" min="0" v-model="tierDetials.gpCap">
								<div class="icon-item">
									S
									<i class="fa fa-usd icon"></i>
								</div>
							</div>
						</div>
						<div class="input-wrapper">
							<label>Employee headcount</label>
							<div class="input-container">
								<input type="number" min="0" v-model="tierDetials.empCount">
								<div class="icon-item">
									<i class="fa fa-users icon"></i>
								</div>
							</div>
						</div>
						<div class="input-wrapper">
							<label>Dependent headcount</label>
							<div class="input-container">
								<input type="number" min="0" v-model="tierDetials.depCount">
								<div class="icon-item">
									<i class="fa fa-users icon"></i>
								</div>
							</div>
						</div>
						<div class="tier-item-button">
							<button v-if="isEditActive" class="btn-delete-tier" @click="removeTier()">Remove</button>
							<button @click="saveTierData()">Save &amp; Continue</button>
						</div>
					</div>
				</div>
		  </div>

		  <div v-if="isTierSummary" class="tier-summary-wrapper">
		  	<h4>Summary</h4>
		  	<h4>Choose the tier you wish to enroll</h4>
		  	<div class="summary-details-wrapper">
		  		<div class="summary-details" v-for="(tier,index) in tierStorage" v-bind:key="tier.id">
		  			<div class="tier-summary-btn">
		  				<input type="radio" :id="'tier' +(index+1)" name="radio" :value="'tier' +(index+1)" v-on:click="selectTier( tier, index )">
							<label :for="'tier' + (index+1)">
								<div>
									Tier <span>{{index +1}}</span><br>
									<span>{{tier.member_enrolled_count + tier.dependent_enrolled_count || 0}}</span>/<span>{{tier.member_head_count + tier.dependent_head_count || 0}}</span>
								</div>
							</label>
							<span @click="addTierBtn('edit', index+1, tier)">Edit</span>
						</div>
						<div class="clinic-type-wrapper">
							<div class="clinic-type-container">
								<span class="label">Medical annual cap: </span>
								<span class="text">S$ <span>{{tier.medical_annual_cap}}</span></span>
							</div>
							<div class="clinic-type-container">
								<span class="label">Wellness annual cap: </span>
								<span class="text">S$ <span>{{tier.wellness_annual_cap}}</span></span>
							</div>
							<div class="clinic-type-container">
								<span class="label">GP cap per visit: </span>
								<span class="text">S$ <span>{{tier.gp_cap_per_visit || 0}}</span></span>
							</div>	
						</div>
		  		</div>
		  	</div>

		  	<div class="add-tier-btn-container">
		  		<button @click="addTierBtn('add')">Add a tier</button>
		  	</div>

		  	<div class="add-tier-wrapper">
			  	<h4>Add a tier</h4>
			  	<button @click="addTierBtn('add')"><img :src="'../assets/img/plus-gray.png'"></button>
			  </div>
		  </div>
		</div>

		<div class="prev-next-button-container">
			<div class="button-container">
				<button class="back-btn" @click="$router.go(-1)">Back</button>
				<button class="next-btn " v-bind:class="{'btn-next-disabled' : !activeTier }" v-on:click="nextBtn()">Next</button>
			</div>
		</div>
	</div>
</template>

<script>
import createTeamBenefitsTier from "@/components/company/enrollment/create-team-benefits-tier"

export default createTeamBenefitsTier;
</script>