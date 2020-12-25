<script>
/* eslint-disable */
import Modal from "../../../views/company/modal/Modal.vue";
import HealthSpending from "../../../views/company/employee/Health-spending.vue";
import employee from "../../../views/company/Employee.vue";
import axios from "axios";
import moment, { locale } from "moment";

// Methods here
let employeeDetails = {
	components: {
		Modal,
		HealthSpending
	},
	props: {
		id: {
			type: null
		},
		indexOfEmployees: {
			type: null
		},
		page_ctr: {
			type: null
		},
		page_active: {
			type: null
		},
		emp: {
			type: null
		}
	},
	data() {
		return {
			sideInfo: false,
			toggle_overiew_type: 1,
			isMedicalUsageShow: false,
			isWellnessUsageShow: false,
			healthSpendingAccountTabIsShow: false,
			modalEditEmployee: false,
			modalEdit: {
				employee: false,
				dependent: false,
				reset: false
			},
			showAddDependents: false,
			sideInfo: {
				trigger: false,
				sideStyle: {},
				sideContainer: {},
				empInfoWrapper: {}
			},
			isTierDetailsShow: false,
			formats: {
				input: ["DD/MM/YYYY"],
				data: ["DD/MM/YYYY"]
			},
			employees: JSON.parse(localStorage.getItem("selectedEmployee")),
			customer_id: null,
			selected_emp_dependents: {},
			toEdit: {},
			telProps: {
				defaultCountry: "SG",
				placeholder: "",
				enabledCountryCode: true,
				enabledFlags: true,
				autocomplete: "off",
				validCharactersOnly: true,
				maxLen: 8,
			},
			sgAreaCode: {
				areaCodes: null,
				dialCode: "65",
				iso2: "SG",
				name: "Singapore",
				priority: 0,
			},
			dependentIndex: null,

			//add dependents
			dependents: {},
			overall_dep_count: null,

			addActiveDependent_index: 0,
			dependents_ctr: 0,
			cap_per_visit: 0,
			// addActiveDependent_index: 0,

			addDependents_arr: [],
			dependent_data: {},

			formats: {
				input: ["DD/MM/YYYY"],
				data: ["DD/MM/YYYY"]
			}

		};
	},
	created() {
		// this.employees = employees_deserialized;
		// console.log('mao ning data', this.employees);
	},
	mounted() {
		this.employeeDetailsApi();
		// this.getEmployeeList();
		this.$forceUpdate();
		console.log("mao ning data", this.employees);
	},
	methods: {
		setAreaCode(formattedNumber, { number, isValid, country }) {
			this.toEdit.mobile_area_code = country.dialCode;
			this.toEdit.mobile_area_code_country = country;

			if (country.iso2 == 'SG') {
				this.telProps.maxLen = 8;
			} else if (country.iso2 == 'MY' || country.iso2 == 'PH') {
				this.telProps.maxLen = 10;
			} else {
				this.telProps.maxLen = 0;
			}

		},
		editDetailsData(data) {
			//for modal edit in employee information
			this.modalEditEmployee = data.modalEditEmployee;
		},
		toggleTabOverview(opt) {
			//tab employee,dependent,settings in employee information
			this.toggle_overiew_type = opt;
			this.healthSpendingAccountTabIsShow = false;
		},
		toggleSideInfo(opt) {
			//sidebar information in mobile view
			this.sideInfo.trigger = !this.sideInfo.trigger;

			if (this.sideInfo.trigger == true) {
				this.sideInfo.sideStyle = {
					left: "0"
				};
				// this.sideInfo.sideContainer = {
				//   gridTemplateColumns: '1fr 100%',
				// }
			} else {
				console.log("false ni");
				this.sideInfo.sideStyle = {
					left: "-320px"
				};
				// this.sideInfo.sideContainer = {
				//   gridTemplateColumns: '1fr 100%',
				// }
			}
		},
		toggleMedicalUsage() {
			//chevron image for medical spending account
			if (this.isMedicalUsageShow == false) {
				this.isMedicalUsageShow = true;
			} else {
				this.isMedicalUsageShow = false;
			}
		},
		toggleWellnessUsage() {
			//chevron image for wellness spending account
			if (this.isWellnessUsageShow == false) {
				this.isWellnessUsageShow = true;
			} else {
				this.isWellnessUsageShow = false;
			}
		},
		toggleAddDependents(data) {
			//add button for dependent under employee information
			let x = data;
			if (x === "add") {
				this.showAddDependents = true;

				if (this.employees.plan_tier != null || this.employees.plan_tier) {
					this.addActiveDependent_index = this.employees.plan_tier.dependent_enrolled_count + 1;
				} else {
					this.addActiveDependent_index = this.dependents.occupied_seats + 1;
				}
			} else if (x === "cancel") {
				this.showAddDependents = false;
			}
		},
		reset() {
			//resend/reset account button in settings tab
			this.$swal({
				title: "Confirm",
				text: "Are you sure you want to resend and reset the password for this account?",
				type: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes",
				cancelButtonText: "No",
				customClass: "warning-global-container primary"
			}).then(result => {
				if (result.value) {
					this.modalEdit.reset = true;
					// this.dependentState = !this.dependentState;
					// this.isState = "web";
					// show input password modal
				}
			});
		},
		viewEmployeeSpendingSummary() {
			//health spending account summary button under person information

			this.toggleSideInfo(0);
			if (this.healthSpendingAccountTabIsShow == false) {
				this.toggle_overiew_type = 4;
				this.healthSpendingAccountTabIsShow = true;
			} else {
				this.toggle_overiew_type = 1;
				this.healthSpendingAccountTabIsShow = false;
			}
			setTimeout(function() {
				// $("html, body").animate({scrollTop: $("body").offset().top}, 400);
				console.log("gana ni");
				$("body").scrollTop(0);
			}, 2000);
		},
		getUsage(x, y) {
			return parseFloat(x) + parseFloat(y);
		},
		editEmployees() {
			this.modalEdit.employee = !this.modalEdit.employee;
			this.toEdit = {
				fname: this.employees.name,
				email: this.employees.email,
				// lname: this.employees.lname,
				phone_no: this.employees.phone_no,
				// nric: this.employees.nric,
				postal_code: this.employees.postal_code,
				member_id: this.employees.member_id,
				job_title: this.employees.job_title,
				dob: this.employees.dob,
				bank_account_number: this.employees.bank_account_number,
				user_id: this.employees.user_id
			};
			// this.$refs.areaCode.choose(this.sgAreaCode);
		},
		editDependents(index) {
			this.modalEdit.dependent = !this.modalEdit.dependent;
			this.dependentIndex = index;
			this.toEdit = {
				user_id: this.selected_emp_dependents[index].user_id,
				first_name: this.selected_emp_dependents[index].first_name,
				dob: this.selected_emp_dependents[index].dob,
				// last_name: this.selected_emp_dependents[index].last_name,
				relationship: this.selected_emp_dependents[index].relationship,
				member_id: this.selected_emp_dependents[index].member_id,
				// nric: this.selected_emp_dependents[index].nric
			};

			console.log(this.selected_emp_dependents[index]);
		},
		update(source, index) {
			//to update employee and dependent details
			if (source == "employees") {
				this.$swal({
					title: "Confirm",
					text: "Are you sure you want to update this employee?",
					type: "warning",
					showCancelButton: true,
					confirmButtonText: "Yes",
					confirmButtonColor: "#0392CF",
					cancelButtonText: "No",
					customClass: "warning-global-container primary"
				}).then(result => {
					if (result.value) {
						this.updateToApi(source);
						this.modalEdit.employee = false;
						this.$swal(
							"Updated!",
							"Employee Details Has Been Updated.",
							"success"
						);
					}
				});
			} else if (source == "dependents") {
				this.$swal({
					title: "Confirm",
					text: "Are you sure you want to update this employee?",
					type: "warning",
					showCancelButton: true,
					confirmButtonText: "Yes",
					confirmButtonColor: "#0392CF",
					cancelButtonText: "No",
					customClass: "warning-global-container primary"
				}).then(result => {
					if (result.value) {
						this.updateToApi(source, index);
						this.modalEdit.dependent = false;
						this.dependentIndex = null;
						this.$swal(
							"Updated!",
							"Dependent Details Has Been Updated.",
							"success"
						);
					}
				});
			}
		},
		updateToApi(source, index) {
			// Post to api

			if (source == "employees") {
				let updated_data = {
					fullname: `${this.toEdit.fname}`,
					dob: moment(this.toEdit.dob).format("YYYY-MM-DD"),
					// nric: this.toEdit.nric,
					email: this.toEdit.email,
					phone_no: String(this.toEdit.phone_no),
					job_title: this.toEdit.job_title,
					postal_code: String(this.toEdit.postal_code),
					bank_account_number: String(this.toEdit.bank_account_number),
					member_id: this.toEdit.member_id
				};

				console.log(updated_data);
				this.postEmployee(updated_data);
			} else if (source == "dependents") {
				let updated_data = {
					user_id: this.toEdit.user_id,
					name: `${this.toEdit.first_name} ${this.toEdit.last_name}`,
					first_name: this.toEdit.first_name,
					dob: moment(this.toEdit.dob).format("YYYY-MM-DD"),
					// last_name: this.toEdit.last_name,
					relationship: this.toEdit.relationship,
					member_id: this.toEdit.member_id,
					// nric: this.toEdit.nric
				};
				this.postDependent(updated_data);
				this.$forceUpdate();

				console.log(updated_data);
				// this.selected_emp_dependents[index] = this.toEdit;
			}
		},
		saveActiveDependents() {
			if (this.checkDependentForm(this.dependent_data) == true) {
				if (!this.addDependents_arr[this.dependents_ctr]) {
					this.addActiveDependent_index += 1;
					this.addDependents_arr.push(this.dependent_data);
				}
			} else {
				return false;
			}

			this.$parent.showLoading();

			let data = {
				customer_id: this.customer_id,
				employee_id: this.employees.user_id,
				dependents: this.addDependents_arr
			}
			data.dependents.map((value, key) => {
				value.dob = moment(data.dependents[key].dob).format('YYYY-MM-DD');
				value.start_date = moment(data.dependents[key].start_date).format('YYYY-MM-DD');
			});
			this.addDependentForEmployee(data);
		},

		//API calls
		employeeDetailsApi() {
			this.getSession();
			this.getEmpPlans(this.id);
			this.companyDependents();
		},
		getSession() {
			axios
				.get(`${axios.defaults.serverUrl.node_company}/hr/get_hr_session`)
				.then(res => {
					this.customer_id = res.data.customer_buy_start_id;
					this.$parent.hideLoading();
				})
				.catch(err => {
					console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal("Error!", err, "error");
				});
		},
		getEmpPlans(id) {
			//Get API
			axios
				.get(
					`${axios.defaults.serverUrl.node_company}/hr/get_employee_plan_covers?employee_id=${this.id}`
				)
				.then(res => {
					this.employees.plan_list = res.data;
					this.$forceUpdate();

					console.log("sa plan list", this.employees);
					this.getEmpDependents(this.id);
				})
				.catch(err => {
					console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal("Error!", err, "error");
				});
		},
		getEmpDependents(id) {
			//Get API
			axios
				.get(
					`${axios.defaults.serverUrl.node_company}/hr/get_employee_dependents?employee_id=${this.id}`
				)
				.then(res => {
					this.selected_emp_dependents = res.data.dependents;

					this.selected_emp_dependents.map((value, key) => {
						value.dob = new Date(value.dob);
					});

					console.log(this.selected_emp_dependents);
					this.$forceUpdate();
				})
				.catch(err => {
					console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal("Error!", err, "error");
				});
		},
		getEmployeeList() {
			//Get API

			let num = this.page_ctr;
			let page = this.page_active;

			axios
				.get(`${axios.defaults.serverUrl.node_company}/hr/employee_lists/?page=${page}&limit=${num}`)
				.then(res => {
					this.employees = res.data;

					this.employees.data.map((value, key) => {
						value.fname = this.employees.data[key].name.substring(
							0,
							value.name.lastIndexOf(" ")
						);
						value.lname = this.employees.data[key].name.substring(
							value.name.lastIndexOf(" ") + 1
						);
						value.start_date = moment(value.start_date).format("DD MMMM YYYY");
						value.expiry_date = moment(value.expiry_date).format(
							"DD MMMM YYYY"
						);
						value.dob = new Date(value.dob);
						value.start_date_format = moment(value.start_date).format(
							"DD/MM/YYYY"
						);
						value.expiry_date_fromat = moment(value.expiry_date).format(
							"DD/MM/YYYY"
						);
						value.end_date_format = moment(value.expiry_date).format(
							"DD/MM/YYYY"
						);

						if (this.employees.data.length - 1 == key) {
							localStorage.setItem(
								"selectedEmployee",
								JSON.stringify(this.employees.data[this.indexOfEmployees])
							);

							this.employees = JSON.parse(
								localStorage.getItem("selectedEmployee")
							);
							console.log("sa getemp ni", this.employees);
						}
					});
					// this.getEmpPlans(this.id);
				})
				.catch(err => {
					console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal("Error!", err, "error");
				});
		},
		postEmployee(data) {
			//POST API
			axios
				.put(`${axios.defaults.serverUrl.node_company}/hr/update_employee_details`, data)
				.then(res => {
					this.$parent.hideLoading();
					this.getEmployeeList();
				})
				.catch(err => {
					console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal("Error!", err, "error");
				});
		},
		postDependent(data) {
			//POST API
			axios
				.post(`${axios.defaults.serverUrl.node_company}/hr/update_dependent_details`, data)
				.then(res => {
					this.$parent.hideLoading();
					this.getEmpDependents(this.id);
				})
				.catch(err => {
					console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal("Error!", err, "error");
				});
		},
		companyDependents() {
			axios.get(`${axios.defaults.serverUrl.node_company}/hr/get_dependent_status`)
				.then(res => {
					this.dependents = res.data;
					this.overall_dep_count = this.dependents.occupied_seats + 1;
					this.$forceUpdate();

					console.log("seats", this.overall_dep_count, 'data', this.dependents);
				})
				.catch(err => {
					console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal("Error!", err, "error");
				});
		},
		addDependentForEmployee(data) {
			axios
				.post(`${axios.defaults.serverUrl.node_company}/hr/create_dependent_accounts`, data)
				.then(res => {
					this.$parent.hideLoading();
					console.log(res);
					if (res.data.status) {
						this.$swal('Success!', res.data.message, 'success');
						this.addDependents_arr = [];
						this.dependent_data = {};
						this.dependents_ctr = 0;
						this.getEmpDependents(this.id);
						this.getEmployeeList();
						this.toggleAddDependents('cancel');
					} else {
						this.$parent.swal('Error!', res.data.message, 'error');
					}
				})
				.catch(err => {
					console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal("Error!", err, "error");
				});
		},

		//globall used function
		checkDependentForm(data) {
			console.log(data);
			var err = 0;
			if (!data.first_name) {
				this.$parent.swal("Error!", "First name is required!", "error");
				return false;
			}
			// if (!data.last_name) {
			//   this.$parent.swal("Error!", "Last name is required!", "error");
			//   return false;
			// }
			// if (!data.nric) {
			//   this.$parent.swal("Error!", "NRIC/FIN is required!", "error");
			//   return false;
			// } else {
			//   if (this.checkNRIC(data.nric) == false) {
			//     this.$parent.swal("Error!", "Invalid NRIC!", "error");
			//     return false;
			//   }
			// }
			if (!data.dob) {
				this.$parent.swal("Error!", "Date of Birth is required!", "error");
				return false;
			}
			if (!data.relationship) {
				this.$parent.swal("Error!", "Relationship is required!", "error");
				return false;
			}
			if (!data.start_date) {
				this.$parent.swal("Error!", "Start Date is required!", "error");
				return false;
			}
			return true;
		},
		// checkNRIC(value) {
		//   var nric_pattern = new RegExp("^[stfgSTFG]{1}[0-9]{7}[a-zA-z]{1}$");
		//   return nric_pattern.test(value);
		// },
		checkEmail(value) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(value);
		}
	},
	filters: {
		decimalTwo(value) {
			if (value != 0) {
				return parseFloat(value).toFixed(2);
			} else {
				return 0;
			}
		},
		formatDate(value, format) {
			if (value != 0) {
				return moment(String(value)).format(format);
			} else {
				return "N/A";
			}
		}
	}
};

export default employeeDetails;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/company/employee.scss";
</style>


