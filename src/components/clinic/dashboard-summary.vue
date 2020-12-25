<script>
/* eslint-disable */

import Modal from "../../views/clinic/modal/Modal.vue";
import moment from "moment";
import axios from "axios";

var dashboardSummary = {
	components: {
		Modal
	},
	data() {
		return {
			timeFrame: {},
			year_active: {
				value: 0,
				text: ""
			},
			modalClaim: {
				verifyUser: false,
				manualClaims: false,
				eCardModal: false,
				checkClaims: false,
			},
			inDragging: false,
			range_values: [1, 6],
			range_marks: { '1': 'JAN', '2': 'FEB', '3': 'MAR', '4': 'APR', '5': 'MAY', '6': 'JUN', '7': 'JUL', '8': 'AUG', '9': 'SEP', '10': 'OCT', '11': 'NOV', '12': 'DEC', },
			current_year: moment().format('YYYY'),
			start_date: new Date(moment().startOf('year')),
			end_date: new Date(moment().endOf('month')),
			formats: {
				input: ['MM/DD/YYYY'],
				data: ['YYYY-MM-DD']
			},

			monthToday: moment().format('MM'),
			monthToday2: moment().format('MM'),
			yearToday: moment().format('YYYY'),

			trans_data: null,
		}
	},
	mounted() {

		let range_data = this.range_values;
		let activity_search = this.getFirstEndDate(range_data[0], range_data[1]);
		// var activity_search = scope.getFirstEndDate( monthToday , monthToday );
		// console.log(activity_search);
		this.getTransactions(activity_search);
	},
	methods: {
		setYear(value, text) {
			this.year_active.value = value;
			this.year_active.text = text;

			if (value == 0) {
				this.yearToday = moment().format('YYYY');
			} else if (value == 1) {
				this.yearToday = moment().subtract(1, 'years').format('YYYY');
			} else if (value == 3) {
				this.setDateToday();
			}

			if (value != 3) {
				let range_data = this.range_values;

				this.monthToday = range_data[0];
				this.monthToday2 = range_data[1];

				let activity_search = this.getFirstEndDate(range_data[0], range_data[1]);
				this.getTransactions(activity_search);
			}

		},
		setDateToday() {
			let activity_search = {
				start: moment().format('YYYY-MM-DD'),
				end: moment().format('YYYY-MM-DD'),
			};
			console.log(activity_search);
			this.getTransactions(activity_search);

			this.timeFrame.today = moment().format('DD/MM/YYYY');
		},
		showCustomDate() {
			this.timeFrame.start = firstDay;
			this.timeFrame.end = lastDay;

			if (this.timeFrame.end && (this.timeFrame.end > this.timeFrame.start)) {
				var activity_search = {
					start: moment(this.timeFrame.start, 'DD/MM/YYYY').format('YYYY-MM-DD'),
					end: moment(this.timeFrame.end, 'DD/MM/YYYY').format('YYYY-MM-DD'),
				};
				// console.log(activity_search);
				this.getTransactions(activity_search);
			}

		},
		getFirstEndDate(firstMonth, lastMonth) {
			firstMonth = moment(firstMonth + " " + this.yearToday, 'MM YYYY').format('YYYY-MM-DD');
			lastMonth = moment(lastMonth + " " + this.yearToday, 'MM YYYY').format('YYYY-MM-DD');

			let date1 = new Date(firstMonth);
			let date2 = new Date(lastMonth);
			let y1 = date1.getFullYear();
			let m1 = date1.getMonth();
			let y2 = date2.getFullYear();
			let m2 = date2.getMonth();
			let firstDay = new Date(y1, m1, 1);
			let lastDay = new Date(y2, m2 + 1, 0);

			console.log(firstDay);
			let start = moment(firstDay).format('YYYY-MM-DD');
			let end = moment(lastDay).format('YYYY-MM-DD');

			this.timeFrame.start = firstDay;
			this.timeFrame.end = lastDay;

			return {
				start: start,
				end: end,
				// user_id: scope.user_details.UserID
			}
		},
		getTransactions(data) {
			this.$parent.showLoading();
			console.log('transaction', data);
			axios.post(`${axios.defaults.serverUrl.node_clinic}/clinic/transaction_lists`, data)
				.then(res => {
					console.log(res);

					this.trans_data = res.data.data;
					this.$parent.hideLoading();
					this.$forceUpdate();
				})
		}
	}

}

export default dashboardSummary;
</script>

<style lang="scss">
@import "./src/assets/css/clinic/dashboard-summary.scss";
@import "./src/assets/css/clinic/clinic-responsive.scss";
</style>
