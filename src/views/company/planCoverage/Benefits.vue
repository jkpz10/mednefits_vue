<template>
  <div class="list-info-container benefits-info-container">
    <h3>Benefits</h3>
    <div class="benefits-wrapper">
      <div class="col-1-benefits-info">
        <div class="benefits-each-container">
          <img :src="'../assets/img/Health-Screening.png'">
          <h3>HEALTH SCREENING</h3>
          <h4 class="benefits-body-details">
            We provide on complementary basic health screening per subscription year.
          </h4>
          <h4 class="benefits-body-details">
            You may upgrade to premium health screening package at a lower rate exclusively just for you and your team.
          </h4>
        </div>
      </div>
      <div class="col-2-benefits-info">
        <div class="benefits-each-container">
          <img :src="'../assets/img/GP.png'">
          <h3>OUTPATIENT GP</h3>
          <h4 class="benefits-body-details">
            100% cosultation cost will be covered under Mednefits network GP clinic
          </h4>
          <h4 class="benefits-body-details">
            You and your team only need to pay for medicine or any treatment done in the clinic.
          </h4>
        </div>
      </div>
    </div>
    <div class="benefits-wrapper">
      <div class="col-1-benefits-info">
        <div class="benefits-each-container">
          <img :src="'../assets/img/Dental.png'">
          <h3>DENTAL CARE</h3>
          <h4 class="benefits-body-details">
            You and your team will recieve up to 30% selected basic dental services under Mednefits network dental clinics. Services include such as scaling and polishing, tooth fillings, and gum treatments.
          </h4>
        </div>
      </div>
      <div class="col-2-benefits-info">
        <div class="benefits-each-container">
          <img :src="'../assets/img/Specialist.png'">
          <h3>HEALT SPECIALIST</h3>
          <h4 class="benefits-body-details">
            You and your team will recieve up to 60% off on specialist consultation under Mednefits network specialist. Services included such as ophthalmology, orthopaedic, physiotherapy, and more.
          </h4>
        </div>
      </div>
    </div>
    <div class="benefits-wrapper">
      <div class="col-1-benefits-info">
        <div class="benefits-each-container">
          <img :src="'../assets/img/TCM.png'">
          <h3>TRADITIONAL CHINESE MEDICINE</h3>
          <h4 class="benefits-body-details">
            100% consultation cost will be covered under Mednefits network TCM partners.
          </h4>
          <h4 class="benefits-body-details">
            You and your team only need to pay for medicine or any treatment done in the clinic.
          </h4>
        </div>
      </div>
      <div class="col-2-benefits-info">
        <div class="benefits-each-container">
          <img :src="'../assets/img/Wellness.png'">
          <h3>WELLNESS BENEFITS</h3>
          <h4 class="text-center benefits-body-details">
            You and your team can save up to 40% on wellness services such as beauty and body treatment, massage therapy, fitness classes(coming soon).
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import benefits from "@/components/company/planCoverage/benefits.vue";

export default benefits;
</script>
