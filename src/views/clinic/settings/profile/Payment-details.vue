<template>
	<div class="payment-details-wrapper">
		<div class="clinic-profile-header">
			<h4>Enter Your Payment Details</h4>
		</div>
		<div>
			<div class="clinic-row-container">
				<div class="text-label">
					<span>Company Name</span>
				</div>
				<div class="profile-input-wrapper">
					<input type="text">
				</div>
			</div>
			<div class="clinic-row-container">
				<div class="text-label">
					<span>Billing Address</span>
				</div>
				<div class="profile-input-wrapper">
					<input type="text">
				</div>
			</div>
			<div class="clinic-row-container">
				<div class="text-label">
					<span>Bank Account Type</span>
				</div>
				<div class="profile-input-wrapper">
					<input type="text" placeholder="i.e UOB Account">
				</div>
			</div>
			<div class="clinic-row-container">
				<div class="text-label">
					<span>Bank Account Number</span>
				</div>
				<div class="profile-input-wrapper">
					<input type="text">
				</div>
			</div>
			<div class="clinic-row-container">
				<div>
				</div>
				<div class="profile-input-wrapper">
					<button class="btn-update">Update</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import profilePaymentDetails from "@/components/clinic/settings/profile/profile-payment-details";

export default profilePaymentDetails;
</script>