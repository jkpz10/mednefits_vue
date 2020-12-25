<template>
	<div class="clinic-qr-code-wrapper">
		<div class="mednefits-icon-container">
			<img :src="'../assets/img/mednefits_icon_blue.png'">
		</div>
		<div class="qr-code-container">
			<img :src="'../assets/img/qr_code_PNG2.png'">
		</div>
		<div>
			<h4>Stackgecko GP</h4>
		</div>
	</div>
</template>

<script>
import qrCode from "@/components/clinic/settings/profile/qr-code";

export default qrCode;
</script>