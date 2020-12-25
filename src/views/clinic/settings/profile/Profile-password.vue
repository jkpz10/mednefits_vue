<template>
	<div class="clinic-password-wrapper">
		<div class="clinic-profile-header">
			<h4>Change Your Password Here</h4>
		</div>
		<div>
			<div class="clinic-row-container">
				<div class="profile-password-img">
					<img :src="'../assets/img/clinic/ico_Profile.svg'">
				</div>
				<div class="profile-password-label">
					<span>Stackgecko GP</span>
				</div>
			</div>
			<div class="clinic-row-container">
				<div class="text-label">
					<span>Current Password</span>
				</div>
				<div class="profile-input-wrapper">
					<input type="text">
				</div>
			</div>
			<div class="clinic-row-container">
				<div class="text-label">
					<span>New Password</span>
				</div>
				<div class="profile-input-wrapper">
					<input type="text">
				</div>
			</div>
			<div class="clinic-row-container">
				<div class="text-label">
					<span>Confirm Password</span>
				</div>
				<div class="profile-input-wrapper">
					<input type="text">
				</div>
			</div>
			<div class="clinic-row-container">
				<div>
				</div>
				<div>
					<button class="btn-update-changes">Update Changes</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import profilePassword from "@/components/clinic/settings/profile/profile-password";

export default profilePassword;
</script>