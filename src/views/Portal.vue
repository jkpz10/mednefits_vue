<template>
	<div class="portal-container">
		
		<div class="medne-icon-wrapper">
	  	<img :src="'../assets/img/mednefits_logo_v3_(white).png'">
	  	<p>Login as</p>
	  </div>

	  <div class="medne-platforms-box">
			<router-link tag="a" to="/company/auth">
				<div class="intro-login-content-box">
					<div class="img-wrapper">
						<img :src="'../assets/img/login icons/Business.png'" style="width: 35px;">
					</div>
					<div class="login-desc">
						<h4>Business</h4>
						<p>Manage your Mednefits business account here.</p>
					</div>
				</div>
			</router-link>
			<router-link tag="a" to="/clinic/auth">
				<div class="intro-login-content-box">
					<div class="img-wrapper" style="padding-right: 18px;">
						<img :src="'../assets/img/login icons/Health_Provider.png'" style="width: 45px;">
					</div>	
					<div class="login-desc">
						<h4>Health Provider</h4>
						<p>View claims or check member eligibility here.</p>
					</div>
				</div>
			</router-link>
			<router-link tag="a" to="/member/auth">
				<div class="intro-login-content-box">
					<div class="img-wrapper" style="padding-right: 18px;">
						<img :src="'../assets/img/login icons/Member2.png'" style="width: 48px;">
					</div>
					<div class="login-desc">
						<h4>Member</h4>
						<p>Manage your personal health coverage here.</p>
					</div>
				</div>
			</router-link>
		</div>

	</div>
</template>

<script>
	import portal from '@/components/portal'
	export default portal
</script>
