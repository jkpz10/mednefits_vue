<template>
	<div class="dashboard-summary-wrapper">
		<div class="time-frame-container">
			<div class="select-frame-wrapper">
				<div class="activity-date-header">
					<span>Select a timeframe:</span>
					<span class="year-selector-wrapper">
						<span v-bind:class="{'active': year_active.value === 0}" @click="setYear(0,'this-year')" class="year-selector">This year</span>
						<span v-bind:class="{'active': year_active.value === 1}" @click="setYear(1,'last-year')" class="year-selector">Last year</span>
						<span v-bind:class="{'active': year_active.value === 2}" @click="setYear(2,'custom')" class="year-selector">Custom</span>
						<span v-bind:class="{'active': year_active.value === 3}" @click="setYear(3,'today')" class="year-selector">Today</span>
					</span>
				</div>
			</div>

			<div class="custom-picker-wrapper">
				<div v-if="year_active.value === 0 || year_active.value === 1" class="claim-slider-container">
					<vue-slider class="range-slider" v-model="range_values" :marks="range_marks" :enableCross="false" :min="1" :max="12" :process="true"></vue-slider>
				</div>

				<div v-if="year_active.value === 0 || year_active.value === 1" class="current-last-year-wrapper">
					<div class="custom-date-selector">
						<i class="fa fa-calendar"></i>
						<v-date-picker :max-date='new Date()' v-model="timeFrame.start"
              :input-props='{class: "activity-custom-input", placeholder: "DD/MM/YYYY", readonly: true}'
              popover-visibility='focus'>
            </v-date-picker>
						<i class="fa fa-caret-down"></i>
					</div>

					<span>
						<i class="fa fa-arrow-down"></i>
						<i class="fa fa-arrow-right"></i>
					</span>

					<div class="custom-date-selector">
						<i class="fa fa-calendar"></i>
						<v-date-picker :max-date='new Date()' v-model="timeFrame.end"
              :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}'
              popover-visibility='focus'>
            </v-date-picker>
						<i class="fa fa-caret-down"></i>
					</div>
				</div>

				<div v-if="year_active.value === 2" class="custom-date-selector-wrapper">
					<div class="custom-date-selector">
						<i class="fa fa-calendar"></i>
						<v-date-picker :max-date='new Date()' v-model="timeFrame.start"
              :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}'
              popover-visibility='focus'>
            </v-date-picker>
						<i class="fa fa-caret-down"></i>
					</div>

					<span>
						<i class="fa fa-arrow-down"></i>
						<i class="fa fa-arrow-right"></i>
					</span>

					<div class="custom-date-selector">
						<i class="fa fa-calendar"></i>
						<v-date-picker :max-date='new Date()' v-model="timeFrame.end"
              :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}'
              popover-visibility='focus'>
            </v-date-picker>
						<i class="fa fa-caret-down"></i>
					</div>
				</div>

				<div v-if="year_active.value === 3" class="today-date-selector-wrapper">
					<div class="custom-date-selector">
						<i class="fa fa-calendar"></i>
						<input class="activity-custom-input" style="cursor: not-allowed" v-model="timeFrame.today" placeholder="DD/MM/YYYY" type="text" readonly="true">
						<!-- <v-date-picker :max-date='new Date()' v-model="timeFrame.start"
              :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true, disable: true}'
              popover-visibility='focus'>
            </v-date-picker> -->
						<i class="fa fa-caret-down"></i>
					</div>
				</div>

			</div>

			<div class="values-wrapper">
				<div class="values-container">
					<div class="value-box">
						<h4>486</h4>
						<span>Transactions</span>
					</div>
					<div class="value-box">
						<h4>
							<span>S$</span>
							<span>18,642.93</span>
						</h4>
						<span>Mednefits Wallet</span>
					</div>
				</div>
			</div>
		</div>

		<div class="dash-trans-history-wrapper">
			<div class="dash-trans-history-container">
				<div class="trans-history-header">
					<h4>Transaction History</h4>
					<i class="fa fa-arrow-right" aria-hidden="true"></i>
				</div>

				<div class="trans-history-tbl-wrapper">
					<table class="trans-history-tbl">
						<thead>
							<tr>
								<th>DATE</th>
								<th>TRANSACTION ID</th>
								<th>NAME</th>
								<th>MOBILE NUMBER</th>
								<th>SERVICE/S</th>
								<th>MEDNEFITS FEE</th>
								<th>MEDNEFITS CREDIT</th>
								<th>CASH</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="n in 10" :key="n.index">
								<td>
									<span>25 July 2019, 09:29 am</span>
								</td>
								<td>
									<span>STA001866{{n}}</span>
								</td>
								<td>
									<span>Dhonald Lite</span>
								</td>
								<td>
									<span>+65 97887031</span>
								</td>
								<td>
									<span>Consultation and Sample Service	</span>
								</td>
								<td>
									<span>S$</span>
									<span>13.91</span>
								</td>
								<td>
									<span>S$</span>
									<span>0.20</span>
								</td>
								<td>
									<span>S$</span>
									<span>0.00</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="btn-footer-wrapper">
					<button>View Invoice</button>
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
	import dashboardSummary from '@/components/clinic/dashboard-summary'
	export default dashboardSummary
</script>