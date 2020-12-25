<template>
	<!-- Enroll option -->
	<div>
		
	  <div class="enroll-option-wrapper">
	    <h1>Let's get to know more about your team.</h1>
	    <div class="enrollment-options-subheading">
	      <p>Does your team benefits package require custom tiering?</p>
	      <p>Such as different benefits budget for different hierarchy in the company.</p>
	    </div>
	    <div class="enrollment-options-button">
	  		<button v-bind:class="{'active' : isRequiredTiering  == 0}" @click="toggleEnrollmentOptions(0)">No</button>
	      <button v-bind:class="{'active' : isRequiredTiering  == 1}" @click="toggleEnrollmentOptions(1)">Yes</button>
	    </div>
	  </div>

	  <div class="prev-next-button-container">
	  	<div class="button-container">
	  		<button class="back-btn" @click="$router.push('dashboard')">Back</button>
	  		<button class="next-btn" @click="next()">Next</button>
	  	</div>
	  </div>
		 
	</div>

</template>

<script>
import enrollmentOptions from "@/components/company/enrollment/enrollment-options";

export default enrollmentOptions;
</script>