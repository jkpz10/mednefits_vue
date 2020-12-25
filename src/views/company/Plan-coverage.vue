<template>
	<div class="plan-coverage-wrapper">
		<div class="container">
			<div class="plan-coverage-title-header">
				<h1>Plan Coverage</h1>
			</div>
			<div class="plan-coverage-info-wrapper">
				<div class="account-biling-link-list">
  				<ul>
						<li v-bind:class="{'active': $route.name === 'PlanBenefits'}">
							<router-link to='/company/plan-coverage'>
								Benefits
							</router-link>
						</li>
						<li v-bind:class="{'active': $route.name === 'PlanLocalNetwork'}">
							<router-link to='/company/local-network-partners'>
								Local Network Partners
							</router-link>
						</li>
					</ul>
  			</div>
  			<div class="info-container">
					<router-view name='plan' />
  			</div>
			</div>	
		</div>	
	</div>
</template>

<script>
import planCoverage from "@/components/company/plan-coverage.vue";

export default planCoverage;
</script>

	<style type="text/css">
		.st0{fill:#FFFFFF;}
		.st1{fill:#CDCDCC;stroke:#FFFFFF;stroke-width:2;stroke-miterlimit:10;}
		.st2{fill:#CDCDCC;}
		.st3{fill:#CDCDCC;stroke:#FFFFFF;stroke-miterlimit:10;}

		

		.center {
			fill: #cececd;
		}

		.north {
			fill: #33a2d4;
		}

		.south {
			fill: #33a2d4;
		}

		.left {
			fill: #33a2d4;
		}

		.right {
			fill: #33a2d4;
		}

		.sg-map-container {
			height: 340px;
		}
	</style>
