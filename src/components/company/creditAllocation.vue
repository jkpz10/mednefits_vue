<script>
/* eslint-disable */
//Methods here
import { error } from "util";
import axios from "axios";
import moment, { locale } from "moment";
import Modal from "../../views/company/modal/Modal.vue";
import { setTimeout } from "timers";

let creditAllocation = {
	components: {
		Modal
	},
	data() {
		return {
			showModalPassword: false,
			// credit: {
			// 	creditAllocSpendingType: 0,
			// 	creditAllocTransactionType: 0,
			// 	creditAllocSpendingTypeText: "medical",
			// 	creditAllocTransactionTypeText: "add"
			// },
			company_properties: {},
			employees: {}, // employee storage
			page_ctr: 6, //for pagination
			page_active: 1, //for pagination

			no_result_err: null,
			emp_last_page: null,

			selected_emp: null,
			submitState: 'Submit',
			err_mess: '',
			passCredit: '',

			search: '',
			isSearch: false,
		};
	},
	created() {

	},
	mounted() {
		this.getEmployeeList();
		this.userCompanyCreditsAllocated();
	},
	methods: {
		setSpendType(opt, emp) {
			emp.creditAllocSpendingType = opt;
			emp.creditAllocSpendingTypeText = opt == 0 ? "medical" : "wellness";
			this.$forceUpdate();
		},
		setTransType(opt, emp) {
			emp.creditAllocTransactionType = opt;
			emp.creditAllocTransactionTypeText = opt == 0 ? "add" : "deduct";
			this.$forceUpdate();
		},
		setSelectedEmp(emp) {
			this.showModalPassword = true;
			this.selected_emp = emp;
			// console.log(this.selected_emp);
		},
		passwordCredit(pass) {
			if (!pass || pass == '') {
				this.err_mess = "Please input your password"
				this.$parent.swal("Error!", this.err_mess, "error");
			} else {
				let data = {
					password: pass
				}
				this.submitState = 'Checking...';
				axios.post(`${axios.defaults.serverUrl.node_company}/hr/password`, data)
					.then(res => {
						if (res.data.status == false) {
							this.err_mess = res.data.message;
							this.$parent.swal("Error!", this.err_mess, "error");
							this.submitState = 'Submit';
						} else {
							this.passCredit = '';
							this.showModalPassword = false;
							this.updateCredit(this.selected_emp);
							this.$forceUpdate();
						}
						this.submitState = 'Submit';
					});
			}
		},
		searchEmployee() {
			// console.log(this.search);

			this.$parent.showLoading();
			let data = {
				search: this.search
			};
			this.isSearch = true;

			axios.post(`${axios.defaults.serverUrl.node_company}/hr/search/employee`, data)
				// hrSettings.searchCompanyEmployeeCredits(scope.search)
				.then(res => {
					// console.log(res);
					this.employees = res.data.data;

					this.employees.map((value, key) => {

						this.employees[key].creditAllocSpendingTypeText = 'medical';
						this.employees[key].creditAllocTransactionTypeText = 'add';
						this.employees[key].creditAllocSpendingType = 0;
						this.employees[key].creditAllocTransactionType = 0;
						this.employees[key].add_credit = 0;
						this.employees[key].deduct_credit = 0;
						this.employees[key].loading = false;
						this.employees[key].success = false;
						this.employees[key].failed = false;

						if (key == (this.employees.length - 1)) {
							this.$parent.hideLoading();
						}
					});

					if (this.employees.length == 0) {
						this.$parent.hideLoading();
						this.no_result_err = true;
						// $('.employee-overview-pagination').hide();
					} else {
						this.no_result_err = false;
						// $('.employee-overview-pagination').show();
					}
				});
		},
		removeSearchEmp() {
			this.search = '';
			this.isSearch = false;
			this.page_active = 1;
			this.getEmployeeList();
		},

		//api calls
		getEmployeeList() {
			this.$parent.showLoading();

			let num = this.page_ctr;
			let page = this.page_active;

			axios.get(`${axios.defaults.serverUrl.node_company}/hr/employee/list/${num}?page=${page}`)
				.then(res => {
					this.employees = res.data.data;
					this.emp_last_page = res.data.last_page;

					this.employees.map((value, key) => {

						this.employees[key].creditAllocSpendingTypeText = 'medical';
						this.employees[key].creditAllocTransactionTypeText = 'add';
						this.employees[key].creditAllocSpendingType = 0;
						this.employees[key].creditAllocTransactionType = 0;
						this.employees[key].add_credit = 0;
						this.employees[key].deduct_credit = 0;
						this.employees[key].loading = false;
						this.employees[key].success = false;
						this.employees[key].failed = false;

						if (key == (this.employees.length - 1)) {
							this.$parent.hideLoading();
						}

						if (this.employees.length == 0) {
							this.$parent.hideLoading();
							this.no_result_err = true;
							// $('.employee-overview-pagination').hide();
						} else {
							this.no_result_err = false;
							// $('.employee-overview-pagination').show();
						}
					});
					// console.log(this.employees);
				})
				.catch(err => {
					// console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal("Error!", err, "error");
				});
		},
		userCompanyCreditsAllocated() {
			axios.get(`${axios.defaults.serverUrl.node_company}/hr/company_allocation`)
				.then(res => {
					// console.log(res);
					this.company_properties = res.data;
				})
				.catch(err => {
					// console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal("Error!", err, "error");
				});
		},
		updateCredit(emp) {
			if (emp.add_credit > 0 || emp.deduct_credit > 0) {
				if (emp.creditAllocTransactionType == 0) {
					let data = {
						user_id: emp.user_id,
						credits: emp.add_credit,
						company_id: this.company_properties.company_id,
						spending_type: emp.creditAllocSpendingTypeText,
						allocation_type: 'add'
					}
					// console.log(data);
					axios.post(`${axios.defaults.serverUrl.node_company}/hr/employee/allocate_credits`, data)
						.then(res => {
							// console.log(res);
							if (!res.data.status) {
								emp.failed = true;
								emp.success = false;
								this.$swal('Ooops!', res.data.message, 'error');
							} else {
								emp.success = true;
								emp.failed = false;
								this.$swal('Success!', res.data.message, 'success');

								if (this.isSearch === true) {
									this.searchEmployee();
								} else {
									// $rootScope.$broadcast('refresh');
									this.getEmployeeList();
								}
							}
						})
						.catch(error => {
							emp.failed = true;
							emp.success = false;
						});
				} else {
					let data = {
						user_id: emp.user_id,
						credits: emp.deduct_credit,
						company_id: this.company_properties.company_id,
						spending_type: emp.creditAllocSpendingTypeText,
						allocation_type: 'deduct'
					}
					// console.log(data);
					axios.post(`${axios.defaults.serverUrl.node_company}/hr/employee/deduct_credits`, data)
						.then(res => {
							if (!res.data.status) {
								emp.failed = true;
								emp.success = false;
								swal('Ooops!', res.data.message, 'error');
							} else {
								emp.success = true;
								emp.failed = false;
								this.$swal('Success!', res.data.message, 'success');

								if (this.isSearch === true) {
									this.searchEmployee();
								} else {
									// $rootScope.$broadcast('refresh');
									this.getEmployeeList();
								}
							}
						})
						.catch(error => {
							emp.failed = true;
							emp.success = false;
						});
				}
			} else {
				emp.empty = true;
			}
		},

	}
};

export default creditAllocation;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/company/employee.scss";
</style>
