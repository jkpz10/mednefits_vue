<script>
/* eslint-disable */
import ImgPreview from "../../views/company/modal/ImagePreview";
// import Modal from "../../../views/company/modal/Modal.vue";
import { error } from "util";
import axios from "axios";
import moment, { locale } from "moment";
import Vue2Filters from 'vue2-filters';

import $ from "jquery";
import { setTimeout } from "timers";
window.$ = $;
// methods here
let activity = {
	mixins: [Vue2Filters.mixin],
	components: {
		ImgPreview
	},
	data() {
		return {
			formats: {
				input: ["DD/MM/YYYY"],
				data: ["DD/MM/YYYY"]
			},
			spendingType: {
				value: 0,
				text: 'medical'
			},
			networkType: {
				value: 0,
				text: ""
			},
			toggleSidebar: { in: false,
				out: false
			},
			showPreview: false,
			date: new Date(),
			timeFrame: {
				rangePicker_start: null,
				rangePicker_end: null,
			},
			testArr: [1, 2, 3, 4],
			search: {},
			searchRes: null,
			search_emp: null,
			isActiveSearch: false,
			// searchedEmployee: null,
			total_allocation: null,
			fetch_ctr: 0,
			fetching_data: {},

			activity: {},
			activity_title: "Benefits Cost",
			selected_list: {},
			selectedOut_list: {},
			activity_dates: [],
			eclaim_dates: [],
			credits: {},
			progressBar: {
				width: '0'
			},
			selected_customer_id: null,
			in_network_transactions: null,
			e_claim_transactions: null,
			inNetwork_pagination: {},
			outNetwork_pagination: {},
			currentPage: 1,
			inNetwork_activePage: 1,
			inNetwork_perPage: 5,
			paginationDropdown: false,
			outNetwork_activePage: 1,
			outNetwork_perPage: 5,

		};
	},
	created() {
		this.timeFrame.rangePicker_start = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
		this.timeFrame.rangePicker_end = this.date;
	},
	mounted() {
		let activity_search = {
			start: moment(this.timeFrame.rangePicker_start, 'DD/MM/YYYY').format('YYYY-MM-DD'),
			end: moment(this.timeFrame.rangePicker_end, 'DD/MM/YYYY').format('YYYY-MM-DD'),
		}

		this.getAllocation(activity_search);
		this.dashCredits();
		this.searchedEmployee();
	},
	methods: {
		showPreviewTesting() {
			//console.log(this.showPreview);
		},
		spendType(value, text) {
			//spending either medical or wellness
			this.spendingType.value = value;
			this.spendingType.text = text;


			let activity_search = {
				start: moment(this.timeFrame.rangePicker_start, 'DD/MM/YYYY').format('YYYY-MM-DD'),
				end: moment(this.timeFrame.rangePicker_end, 'DD/MM/YYYY').format('YYYY-MM-DD'),
			}

			this.$parent.showLoading();
			this.currentPage = 1;
			if (this.search.user_id) {
				this.searchEmployeeActivity(this.search.user_id);
			} else {
				this.searchActivity(activity_search);
				this.searchActivityPagination();
			}
		},
		netType(value, text) {
			//spending either medical or wellness
			this.networkType.value = value;
			this.networkType.text = text;
			this.toggleSidebar.in = false;
			this.toggleSidebar.out = false;
		},
		toggleShowSidebar(index, data) {
			// toggle show sidebar content
			if (this.networkType.value === 0) { //in network
				if (index == this.selected_list.index) {
					this.toggleSidebar.in = !this.toggleSidebar.in;
				} else {
					this.toggleSidebar.in = true;
					this.selected_list = data;
					this.selected_list.index = index;
				}
			} else if (this.networkType.value === 1) { //out network
				if (index == this.selectedOut_list.index) {
					this.toggleSidebar.out = !this.toggleSidebar.out;
				} else {
					this.toggleSidebar.out = true;
					this.selectedOut_list = data;
					this.selectedOut_list.index = index;
				}
			}
		},
		applyDates() {

			this.toggleSidebar.in = false;
			this.toggleSidebar.out = false;
			this.showPreview = false;


			let activity_search = {
				start: moment(this.timeFrame.rangePicker_start, 'DD/MM/YYYY').format('YYYY-MM-DD'),
				end: moment(this.timeFrame.rangePicker_end, 'DD/MM/YYYY').format('YYYY-MM-DD'),
			};

			if (this.search.user_id) {
				this.searchEmployeeActivity(this.search.user_id);
			} else {
				// this.searchActivity( activity_search );
				this.getAllocation(activity_search);
				this.searchActivityPagination();
			}
		},
		searchActivityPagination() {
			//console.log('searchActivityPagination()');
			this.getInNetworkPagination();
			this.getOutNetworkPagination();
		},
		filterActivityByDateInNetwork(data) {
			//console.log('filterActivityByDateInNetwork()', data);

			this.activity_dates = [];
			let temp_date = null;
			let ctr = 0;

			data.sort((left, right) => {
				return moment.utc(right.date_of_transaction, 'DD MMMM YYYY, hh:mma').diff(moment.utc(left.date_of_transaction, 'DD MMMM YYYY, hh:mma'));
			});

			data.map((value, key) => {
				if (temp_date == null) {
					temp_date = value.month;
					this.activity_dates.push({
						month: temp_date,
						transactions: [value]
					});
				} else {
					if (temp_date == value.month) {
						this.activity_dates[ctr].transactions.push(value);

					} else {
						temp_date = value.month;
						this.activity_dates.push({
							month: temp_date,
							transactions: [value]
						});

						ctr++;
					}
				}
				// console.log('filtered month', this.activity_dates);
			});

		},
		filterActivityByDateEclaim(data) {
			//console.log('filterActivityByDateEclaim', data);

			this.eclaim_dates = [];
			let temp_date = null;
			let ctr = 0;

			data.sort((left, right) => {
				return moment.utc(right.approved_date).diff(moment.utc(left.approved_date))
			});

			data.map((value, key) => {
				if (temp_date == null) {
					temp_date = value.month;
					this.eclaim_dates.push({
						month: temp_date,
						transactions: [value]
					});
				} else {
					if (temp_date == value.month) {
						this.eclaim_dates[ctr].transactions.push(value);

					} else {
						temp_date = value.month;
						this.eclaim_dates.push({
							month: temp_date,
							transactions: [value]
						});

						ctr++;
					}
				}
				//console.log('filtered month', this.eclaim_dates);
			});
		},
		searchTypeAhead(data) {
			if (data.length > 0) {
				this.isActiveSearch = true;
				this.search.close = true;
				// console.log(this.isActiveSearch);
			} else {
				this.isActiveSearch = false;
				this.search.close = false;
				// console.log(this.isActiveSearch);
			}
		},
		closeSearch() {
			this.search = {};
			this.search_emp = '';
			this.isActiveSearch = false;
			this.search.close = false;
			this.activity_title = "Benefits Cost";

			let activity_search = {
				start: moment(this.timeFrame.rangePicker_start, 'DD/MM/YYYY').format('YYYY-MM-DD'),
				end: moment(this.timeFrame.rangePicker_end, 'DD/MM/YYYY').format('YYYY-MM-DD'),
			};
			this.getAllocation(activity_search);
		},
		//Pagination
		perPage() {
			this.paginationDropdown = !this.paginationDropdown;
		},
		selectedPerPage(data){
			this.inNetwork_perPage = data;
			this.outNetwork_perPage = data;
			this.perPage();
			this.searchActivityPagination();
			// this.getEmployeeList();
		},
		transactionPagination(direction) { //direction is prev/next
			if (direction == 'next') {
				if( this.inNetwork_activePage < this.inNetwork_pagination.last_page || this.outNetwork_activePage < this.outNetwork_pagination.last_page) {
					++this.inNetwork_activePage;
					++this.outNetwork_activePage;
					this.searchActivityPagination();
					// this.getEmployeeList();
				}
			
			} else if (direction == 'prev') {
				if (this.inNetwork_activePage > 1 && this.outNetwork_activePage > 1) {
					--this.inNetwork_activePage;
					--this.outNetwork_activePage;
					this.searchActivityPagination();
					// this.getEmployeeList();
				}
			}
		},

		//api calls
		getSession() {
			axios
				.get(`${axios.defaults.serverUrl.node_company}/get-hr-session`)
				.then(res => {
					this.selected_customer_id = res.data.customer_buy_start_id;
					this.$parent.hideLoading();
				})
				.catch(err => {
					//console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal("Error!", err, "error");
				});
		},
		getAllocation(date) {
			let data = {
				start: date.start,
				end: date.end
			}
			this.$parent.showLoading();
			axios.get(`${axios.defaults.serverUrl.node_company}/hr/total_credits_allocation?start=${data.start}&end=${data.end}`)
				.then(res => {
					this.total_allocation = res.data;
					let activity_search = {
						start: moment(this.timeFrame.rangePicker_start, 'DD/MM/YYYY').format('YYYY-MM-DD'),
						end: moment(this.timeFrame.rangePicker_end, 'DD/MM/YYYY').format('YYYY-MM-DD'),
					}

					if (this.search.user_id) {
						//console.log('searchEmployeeActivity()');
						this.searchEmployeeActivity(this.search.user_id);
					} else {
						//console.log('searchActivity()');
						this.searchActivity(activity_search);
						this.searchActivityPagination();
					}
				})
				.catch(err => {
					//console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal("Error!", err, "error");
				});
		},
		searchActivity(data) {
			//console.log('searchActivity()', data);
			data.page = 1;
			data.spending_type = this.spendingType.text;
			this.fetch_ctr = 1;
			this.fetching_data = {
				from: 0,
				to: 0
			}
			axios.get(`${axios.defaults.serverUrl.node_company}/hr/get_activity?page=${data.page}&start=${data.start}&end=${data.end}&spending_type=${data.spending_type}`)
				.then(res => {

					if (res.status == 200) {
						this.activity = {};
						this.activity.total_lite_plan_consultation = 0;

						this.activity = res.data.data;
						//console.log('activity data', this.activity);

						this.fetching_data = {
							from: res.data.from,
							to: res.data.total
						}

						if (this.activity.spending_type == "medical") {
							this.activity.total_allocation = this.total_allocation.total_allocation;
						} else {
							this.activity.total_allocation = this.total_allocation.total_wellness_allocation;
						}
						this.in_network_transactions = res.data.data.in_network_transactions;
						this.e_claim_transactions = res.data.data.e_claim_transactions;
						this.activity.total_lite_plan_consultation = res.data.data.total_lite_plan_consultation;

						let spent_progress_percentage;
						if (this.activity.total_spent_format_number > 0) {
							spent_progress_percentage = (this.activity.in_network_spending_format_number / this.activity.total_spent_format_number) * 100;

						} else {
							spent_progress_percentage = 0;
						}
						this.progressBar.width = `${spent_progress_percentage}%`;

						if (res.data.last_page > 0 && this.currentPage != res.data.last_page) {
							this.fetchNextPage(data);
						} else {
							this.fetching_data.from = res.data.total;
						}
					}
				});
		},
		searchEmployeeActivity(user_id, name) {
			console.log('searchEmployeeActivity()', user_id);
			this.isActiveSearch = false;
			this.currentPage = 1;
			this.search_emp = name;

			let activity_search = {
				start: moment(this.timeFrame.rangePicker_start, 'DD/MM/YYYY').format('YYYY-MM-DD'),
				end: moment(this.timeFrame.rangePicker_end, 'DD/MM/YYYY').format('YYYY-MM-DD'),
			}
			this.search.user_id = user_id;
			activity_search.user_id = user_id;
			activity_search.spending_type = this.spendingType.text;
			this.search.close = true;

			axios.post(`${axios.defaults.serverUrl.node_company}/hr/search_employee_activity`, activity_search)
				.then(res => {
					if (res.status == 200) {
						this.activity_title = `${res.data.employee} Benefits Cost`;
						this.activity = {};
						this.activity.total_lite_plan_consultation = 0;
						this.activity_dates = [];
						this.eclaim_dates = [];
						this.activity = res.data;
						console.log('activity', this.activity);
						this.activity.total_lite_plan_consultation = res.data.total_lite_plan_consultation;

						if (this.activity.spending_type == "medical") {
							this.activity.total_allocation = this.total_allocation.total_allocation;
						} else {
							this.activity.total_allocation = this.total_allocation.total_wellness_allocation;
						}

						if (this.activity.balance.indexOf(',') > -1) {
							this.activity.balance = this.activity.balance.replace(",", "");
						}

						if (this.activity.allocation.indexOf(',') > -1) {
							this.activity.allocation = this.activity.allocation.replace(",", "");
						}

						if (this.activity.pending_e_claim_amount.indexOf(',') > -1) {
							this.activity.pending_e_claim_amount = this.activity.pending_e_claim_amount.replace(",", "");
						}

						this.activity.balance = parseFloat(this.activity.balance);
						this.activity.allocation = parseFloat(this.activity.allocation);
						this.activity.pending_e_claim_amount = parseFloat(this.activity.pending_e_claim_amount);

						let spent_progress_percentage;
						if (this.activity.total_spent_format_number > 0) {
							spent_progress_percentage = (this.activity.in_network_spending_format_number / this.activity.total_spent_format_number) * 100;
						} else {
							spent_progress_percentage = 0;
						}

						this.progressBar.width = `${spent_progress_percentage}%`;

						this.filterActivityByDateInNetwork(this.activity.in_network_transactions);
						this.filterActivityByDateEclaim(this.activity.e_claim_transactions);
						this.searchActivityPagination();
					}
				});

		},
		getInNetworkPagination() {
			//console.log('getInNetworkPagination()');
			this.$parent.showLoading();
			this.activity_dates = [];

			let data = {
				start: moment(this.timeFrame.rangePicker_start, 'DD/MM/YYYY').format('YYYY-MM-DD'),
				end: moment(this.timeFrame.rangePicker_end, 'DD/MM/YYYY').format('YYYY-MM-DD'),
				page: this.inNetwork_activePage,
				per_page: this.inNetwork_perPage,
				spending_type: this.spendingType.text,
				customer_id: this.selected_customer_id
			}

			if (this.search.user_id) {
				data.user_id = this.search.user_id;
			}

			axios.get(`${axios.defaults.serverUrl.node_company}/hr/get_activity_in_network_transactions?page=${data.page}&per_page=${data.per_page}&start=${data.start}&end=${data.end}&spending_type=${data.spending_type}&customer_id=${data.customer_id}`)
				.then(res => {
					this.inNetwork_pagination = res.data;
					//console.log('getInNetworkPagination', res.data);
					this.filterActivityByDateInNetwork(res.data.data);
					console.log('in data', this.inNetwork_pagination.data);
					this.$parent.hideLoading();
				});
		},
		getOutNetworkPagination() {
			//console.log('getOutNetworkPagination()');
			this.$parent.showLoading();
			this.eclaim_dates = [];

			let data = {
				start: moment(this.timeFrame.rangePicker_start, 'DD/MM/YYYY').format('YYYY-MM-DD'),
				end: moment(this.timeFrame.rangePicker_end, 'DD/MM/YYYY').format('YYYY-MM-DD'),
				page: this.outNetwork_activePage,
				per_page: this.outNetwork_perPage,
				spending_type: this.spendingType.text,
				customer_id: this.selected_customer_id
			}

			if (this.search.user_id) {
				data.user_id = this.search.user_id;
			}

			axios.get(`${axios.defaults.serverUrl.node_company}/hr/get_activity_out_network_transactions?page=${data.page}&per_page=${data.per_page}&start=${data.start}&end=${data.end}&spending_type=${data.spending_type}&customer_id=${data.customer_id}`)
				.then(res => {
					this.outNetwork_pagination = res.data;

					this.filterActivityByDateEclaim(res.data.data);
					console.log('out data', this.outNetwork_pagination.data);
					this.$parent.hideLoading();
				});
		},

		fetchNextPage(data) {
			//console.log('fetchNextPage()', data);

			this.currentPage = this.currentPage + 1;
			data.page = this.currentPage;

			axios.get(`${axios.defaults.serverUrl.node_company}/hr/get_activity?page=${data.page}&start=${data.start}&end=${data.end}&spending_type=${data.spending_type}`)
				.then(res => {
					if (res.status == 200) {
						this.fetching_data = {
							from: res.data.from,
							to: res.data.total
						}
						let in_network_transactions = res.data.data.in_network_transactions;

						in_network_transactions.map((value, key) => {
							this.in_network_transactions.push(value);
						});

						let e_claim_transactions = res.data.data.e_claim_transactions;

						e_claim_transactions.map((value, key) => {
							this.e_claim_transactions.push(value);
						});

						this.activity.e_claim_spending_format_number += res.data.data.e_claim_spending_format_number;
						this.activity.in_network_spending_format_number += res.data.data.in_network_spending_format_number;
						this.activity.total_in_network_spent_format_number += res.data.data.total_in_network_spent_format_number;
						this.activity.total_lite_plan_consultation += res.data.data.total_lite_plan_consultation;
						this.activity.total_in_network_transactions += res.data.data.total_in_network_transactions;
						this.activity.total_spent_format_number += res.data.data.total_spent_format_number;

						let spent_progress_percentage;
						if (this.activity.total_spent_format_number > 0) {
							spent_progress_percentage = (this.activity.in_network_spending_format_number / this.activity.total_spent_format_number) * 100;
							this.progressBar.width = `${spent_progress_percentage}%`;
						}

						if (this.currentPage != res.data.last_page) {
							while (this.fetch_ctr < res.data.to) {
								this.fetching_data.from = this.fetch_ctr;
								this.fetch_ctr = this.fetch_ctr + 1;
								if (this.fetch_ctr == res.data.to) {
									this.fetchNextPage(data);
								}
							}
						} else {
							this.fetching_data.from = res.data.total;

							this.$parent.hideLoading();

							// this.togglePointerEvents();
							this.currentPage = 1;
						}
					}
				});
		},
		dashCredits() {
			axios.get(`${axios.defaults.serverUrl.node_company}/hr/check_balance`)
				.then(res => {
					//console.log(res);
					this.credits = res.data;

				});
		},
		searchedEmployee() {
			axios.get(`${axios.defaults.serverUrl.node_company}/hr/employee_lists`)
				.then(res => {
					this.searchRes = res.data.data;
					console.log('searchRes', this.searchRes);
				});
		}

	},
	filters: {
		decimalTwo(value) {
			let n = parseFloat(value).toFixed(2)
			return Number(n).toLocaleString('en');
		},
		formatDate(value, format) {
			if (value != 0) {
				return moment(String(value)).format(format);
			} else {
				return "N/A";
			}
		}
	},
	computed: {

	}
};

export default activity;
</script>


<style lang="scss">
@import "./src/assets/css/company/activity.scss";
</style>
