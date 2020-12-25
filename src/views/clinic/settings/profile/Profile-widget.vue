<template>
	<div class="booking-widget-wrapper">
		<div class="clinic-profile-header">
			<h4>Booking Widget Integration</h4>
		</div>
		<div>
			<div class="booking-widget-row-container">
				<div>
					<span>Widget Code</span>
				</div>
				<div>
					<textarea></textarea>
				</div>
			</div>
			<div class="booking-widget-row-container">
				<div>
				</div>
				<div>
					<span>Copy & paste this link into your website.</span>
					<button class="btn-copy-clipboard">Copy to Clipboard</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import profileWidget from "@/components/clinic/settings/profile/profile-widget";

export default profileWidget;
</script>

