<template>
	<div>
		<div>
			<h4>Transaction History</h4>
			<div class="dashboard-summary-wrapper">
				<div class="time-frame-container">
					<div class="select-frame-wrapper">
						<div class="activity-date-header">
							<span>Select a timeframe:</span>
							<span class="year-selector-wrapper">
								<span v-bind:class="{'active': year_active.value === 0}" @click="setYear(0,'this-year')" class="year-selector">This year</span>
								<span v-bind:class="{'active': year_active.value === 1}" @click="setYear(1,'last-year')" class="year-selector">Last year</span>
								<span v-bind:class="{'active': year_active.value === 2}" @click="setYear(2,'custom')" class="year-selector">Custom</span>
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
									<v-date-picker :max-date='new Date()' v-model="timeFrame.start"
			              :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}'
			              popover-visibility='focus'>
			            </v-date-picker>
									<i class="fa fa-caret-down"></i>
								</div>
							</div>

							<div v-if="year_active.value === 2">
								<div class="custom-date-selector-wrapper">
									<div class="custom-date-selector">
										<i class="fa fa-calendar"></i>
										<v-date-picker :max-date='new Date()' v-model="timeFrame.start"
				              :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}'
				              popover-visibility='focus'>
				            </v-date-picker>
										<i class="fa fa-caret-down"></i>
									</div>

									<span>
										<i class="fa fa-arrow-right"></i>
									</span>

									<div class="custom-date-selector">
										<i class="fa fa-calendar"></i>
										<v-date-picker :max-date='new Date()' v-model="timeFrame.start"
				              :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}'
				              popover-visibility='focus'>
				            </v-date-picker>
										<i class="fa fa-caret-down"></i>
									</div>
								</div>
							</div>

							<div class="search-export-wrapper">
								<div class="search-wrapper">
									<input type="type" placeholder="Search">
									<button>
										<i class="fa fa-search"></i>
									</button>
								</div>

								<div class="export-wrapper">
									<button class="btn-export"><i class="fa fa-file"></i>Export as .PDF</button>
									<button class="btn-export"><i class="fa fa-file"></i>Export as .CSV</button>	
								</div>
							</div>
					</div>
				</div>
			</div>
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
					<tr v-if="false">
						<td colspan="7">
							<h5>No Data</h5>
						</td>
					</tr>
					<tr>
						<td>
							<span>25 July 2019, 09:29 am</span>
						</td>
						<td>
							<span>STA001866</span>
						</td>
						<td>
							<span>Dhonald Lite</span>
						</td>
						<td>
							<span>+65 87887031</span>
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
	</div>
</template>

<script>
import transactionHistory from "@/components/clinic/settings/transactions/transaction-history";

export default transactionHistory;
</script>