<template>
  <div class="list-info-container benefits-tier-container">
    <h1>Team benefits tiers.</h1>

    <div v-if="isAddTierShow" class="tier-item-wrapper">
      <div class="tier-item-form">
        <div class="tier-item-header">
          <h4>
            Tier
            <span>{{ add_tier_data.index }}</span>
          </h4>
          <img v-on:click="hideAddTier( )" :src="'../assets/img/icons/close.svg'">
        </div>
        <div class="tier-item-body">
          <div class="input-wrapper">
            <label>Medical annual cap</label>
            <div class="input-container">
              <input type="number" min="0" v-model="add_tier_data.medical_annual_cap">
              <div class="icon-item">
                S
                <i class="fa fa-usd icon"></i>
              </div>
            </div>
          </div>
          <div class="input-wrapper">
            <label>Wellness annual cap</label>
            <div class="input-container">
              <input type="number" min="0" v-model="add_tier_data.wellness_annual_cap">
              <div class="icon-item">
                S
                <i class="fa fa-usd icon"></i>
              </div>
            </div>
          </div>
          <div class="input-wrapper gp-toggle">
            <label>Add GP cap per visit?</label>
            <div class="btn-wrapper">
              <button
                v-bind:class="{'active' : add_tier_data.gp_cap_status == true }"
                @click="toggleGPcapStatus(true)"
              >Yes</button>
              <button
                v-bind:class="{'active' : add_tier_data.gp_cap_status == false }"
                @click="toggleGPcapStatus(false)"
              >No</button>
            </div>
          </div>
          <div v-if="add_tier_data.gp_cap_status" class="input-wrapper">
            <label>GP cap per visit</label>
            <div class="input-container">
              <input type="number" min="0" v-model="add_tier_data.gp_cap_per_visit">
              <div class="icon-item">
                S
                <i class="fa fa-usd icon"></i>
              </div>
            </div>
          </div>
          <div class="input-wrapper">
            <label>Employee headcount</label>
            <div class="input-container">
              <input type="number" min="0" v-model="add_tier_data.member_head_count">
              <div class="icon-item">
                <i class="fa fa-users icon"></i>
              </div>
            </div>
          </div>
          <div class="input-wrapper">
            <label>Dependent headcount</label>
            <div class="input-container">
              <input type="number" min="0" v-model="add_tier_data.dependent_head_count">
              <div class="icon-item">
                <i class="fa fa-users icon"></i>
              </div>
            </div>
          </div>
          <div class="tier-item-button">
            <button v-if="isEditTier" v-on:click="deleteTier( add_tier_data )" class="btn-delete-tier">Remove</button>
            <button v-on:click="saveTierData( add_tier_data )">Save &amp; Continue</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isTierSummaryShow" class="tier-summary-wrapper">
      <h4>Manage your team benefits tiers here.</h4>
      <div class="summary-details-wrapper">
        <div v-for="(list, index) in tierList" class="summary-details">
          <div class="tier-summary-btn">
            <input type="radio" name="radio">
            <label>
              <div>
                Tier
                <span>{{ index + 1 }}</span>
                <br>
                <span>{{ list.member_enrolled_count }}</span>/<span>{{ list.member_head_count + list.dependent_head_count }}</span>
              </div>
            </label>
            <span v-on:click="showAddTier( true, list, index+1 )">Edit</span>
          </div>
          <div class="clinic-type-wrapper">
            <div class="clinic-type-container">
              <span class="label">Medical annual cap:</span>
              <span class="text">
                S$
                <span>{{ list.medical_annual_cap }}</span>
              </span>
            </div>
            <div class="clinic-type-container">
              <span class="label">Wellness annual cap:</span>
              <span class="text">
                S$
                <span>{{ list.wellness_annual_cap }}</span>
              </span>
            </div>
            <div class="clinic-type-container">
              <span class="label">GP cap per visit:</span>
              <span class="text">
                S$
                <span>{{ list.gp_cap_per_visit }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="add-tier-wrapper">
        <h4>Add a tier</h4>
        <button v-on:click="showAddTier( false )">
          <img :src="'../assets/img/plus-gray.png'">
        </button>
      </div>
    </div>

    <div v-if="isAddTierBtnShow" class="add-tier-btn-wrapper">
      <h4>Add a tier</h4>
      <button v-on:click="showAddTier( false )"><img :src="'../assets/img/plus-gray.png'"></button>
    </div>

    <!-- modals here -->
  </div>
</template>

<script>
import BenefitsTier from "@/components/company/account/benefits-tier";

export default BenefitsTier;
</script>

