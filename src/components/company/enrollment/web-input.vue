<script>
/* eslint-disable */
// import Enrollment from "../Enrollment.vue";
import axios from 'axios';
import moment from "moment";
import { constants } from 'crypto';
// import jQuery from "jquery";
// const $ = jQuery;
// window.$ = $;
let webInput = {
	components: {},
	data() {
		return {
			isState: "web",
			summaryBtn: false, // summary state
			dependentState: false, //used in web input
			selected_emp_dep_tab: 1, //used in web input
			empDepNavState: false, //used in web input
			modalEdit: false, //edit modal
			// data binding store data from WEB INPUT forms
			indexData: 0, // counter for employee
			depIndexData: 0, // counter for dependent
			prevDisabled: false,
			depPrevChevronState: false,
			depNextChevronState: false,
			employeeDetails: {
				mCredits: 0,
				wCredits: 0,
				startDate: undefined,
				mobile_area_code: '65',
			},
			dependentDetails: {
				dob: '',
				startDate: undefined
			},
			employeeStorage: [],
			dependentStorage: [],
			enrollment_progress: {}, //enrollment count
			dependent_progress: {}, //dependent count
			isTiering: JSON.parse(localStorage.getItem('isRequiredTiering')),
			activeTier: JSON.parse(localStorage.getItem('tierSelected')),
			employeeCountIndex: 0,
			dependentCountIndex: 0,
			tierEmployeeCountIndex: 0,
			tierDependentCountIndex: 0,
			dependetStorageIndex: 0,
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
			formats: {
				input: ["DD/MM/YYYY"],
				data: ["DD/MM/YYYY"]
			}
		};
	},
	created() {
		console.log(this.activeTier);
		this.getCompanyEnrollmentCountStatus();
		this.getDependentCountStatus();

		this.tierEmployeeCountIndex = this.activeTier.member_enrolled_count + 1;
		this.tierDependentCountIndex = this.activeTier.dependent_enrolled_count + 1;
	},
	methods: {
		setAreaCode(formattedNumber, { number, isValid, country }) {
			this.employeeDetails.mobile_area_code = country.dialCode;
			this.employeeDetails.mobile_area_code_country = country;

			if (country.iso2 == 'SG') {
				this.telProps.maxLen = 8;
			} else if (country.iso2 == 'MY' || country.iso2 == 'PH') {
				this.telProps.maxLen = 10;
			} else {
				this.telProps.maxLen = 0;
			}
		},
		checkDependentForm(data) {
			// console.log( data );
			var err = 0;
			if (!data.fname) {
				this.$parent.swal('Error!', 'First name is required!', 'error');
				return false;
			}
			// if (!data.lname) {
			// 	this.$parent.swal('Error!', 'Last name is required!', 'error');
			// 	return false;
			// }
			// if (!data.nricFinNo) {
			// 	this.$parent.swal('Error!', 'NRIC/FIN is required!', 'error');
			// 	return false;
			// } else {
			// 	if (this.checkNRIC(data.nricFinNo) == false) {
			// 		this.$parent.swal('Error!', 'Invalid NRIC!', 'error');
			// 		return false;
			// 	}
			// }
			if (!data.dob) {
				this.$parent.swal('Error!', 'Date of Birth is required!', 'error');
				return false;
			}
			if (!data.relation) {
				this.$parent.swal('Error!', 'Relationship is required!', 'error');
				return false;
			}
			if (!data.startDate) {
				this.$parent.swal('Error!', 'Start Date is required!', 'error');
				return false;
			}
			return true;
		},
		checkEmployeeForm(data) {
			console.log(data);
			var err = 0;
			if (!data.fname) {
				this.$parent.swal('Error!', 'Full name is required!', 'error');
				return false;
			}
			// if( !data.lname ){
			//   this.$parent.swal( 'Error!', 'Last name is required!', 'error' );
			//   return false;
			// }
			// if( !data.nricFinNo ){
			//   this.$parent.swal( 'Error!', 'NRIC/FIN is required!', 'error' );
			//   return false;
			// }else{
			//   if( this.checkNRIC( data.nricFinNo ) == false ){
			//     this.$parent.swal( 'Error!', 'Invalid NRIC!', 'error' );
			//     return false;
			//   }
			// }
			if (!data.dob) {
				this.$parent.swal('Error!', 'Date of Birth is required!', 'error');
				return false;
			}
			if (!data.email) {
				this.$parent.swal('Error!', 'Email Address is required!', 'error');
				return false;
			} else {
				if (this.checkEmail(data.email) == false) {
					this.$parent.swal('Error!', 'Invalid Email!', 'error');
					return false;
				}
			}
			if (!data.mNumber) {
				this.$parent.swal('Error!', 'Mobile Number is required!', 'error');
				return false;
			}
			if (!data.postal) {
				this.$parent.swal('Error!', 'Postal Code is required!', 'error');
				return false;
			}
			if (!data.startDate) {
				this.$parent.swal('Error!', 'Start Date is required!', 'error');
				return false;
			}
			return true;
		},
		// checkNRIC( value ){
		//   var nric_pattern = new RegExp('^[stfgSTFG]{1}[0-9]{7}[a-zA-z]{1}$');
		//   return nric_pattern.test( value );
		// },
		checkEmail(value) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(value);
		},
		addToStorage(source, index) {
			//used in web input
			// store to temp storage when adding employees
			// if( this.checkEmployeeForm( this.employeeDetails ) == false ){
			//   return false;
			// }
			if (source == "next") {
				//this.dependentStorage.length != 0 && !this.isEmpty(this.dependentDetails)
				if (this.checkEmployeeForm(this.employeeDetails) == false) {
					return false;
				}
				this.$parent.showLoading();
				this.employeeStorage.push({
					first_name: this.employeeDetails.fname,
					last_name: this.employeeDetails.fname,
					idType: this.employeeDetails.idType,
					nric: 'S0249945B',
					dob: this.employeeDetails.dob,
					email: this.employeeDetails.email,
					mobile: this.employeeDetails.mNumber,
					mobile_area_code: this.employeeDetails.mobile_area_code,
					mobile_area_code_country: this.employeeDetails.mobile_area_code_country,
					postal_code: this.employeeDetails.postal,
					plan_start: this.employeeDetails.startDate,
					medical_credits: this.employeeDetails.mCredits,
					wellness_credits: this.employeeDetails.wCredits,
					dependents: this.dependentStorage
				});
				this.$parent.hideLoading();
			} else if (source == "enroll" && this.employeeStorage.length === 0 && this.isEmpty(this.employeeDetails) == false) {
				//this.dependentStorage.length != 0 && !this.isEmpty(this.dependentDetails)
				if (this.checkEmployeeForm(this.employeeDetails) == false) {
					return false;
				}
				this.$parent.showLoading();
				this.employeeStorage.push({
					first_name: this.employeeDetails.fname,
					last_name: this.employeeDetails.fname,
					idType: this.employeeDetails.idType,
					nric: 'S0249945B',
					dob: this.employeeDetails.dob,
					email: this.employeeDetails.email,
					mobile: this.employeeDetails.mNumber,
					mobile_area_code: this.employeeDetails.mobile_area_code,
					mobile_area_code_country: this.employeeDetails.mobile_area_code_country,
					postal_code: this.employeeDetails.postal,
					plan_start: this.employeeDetails.startDate,
					medical_credits: this.employeeDetails.mCredits,
					wellness_credits: this.employeeDetails.wCredits,
					dependents: this.dependentStorage
				});
				this.$parent.hideLoading();
			} else if (source == "enroll" && this.employeeStorage.length == this.indexData && this.isEmpty(this.employeeDetails) == false) {
				//this.dependentStorage.length != 0 && !this.isEmpty(this.dependentDetails)
				if (this.employeeDetails.fname || this.employeeDetails.lname) {
					if (this.checkEmployeeForm(this.employeeDetails) == false) {
						return false;
					}
					this.$parent.showLoading();
					this.employeeStorage.push({
						first_name: this.employeeDetails.fname,
						last_name: this.employeeDetails.fname,
						idType: this.employeeDetails.idType,
						nric: 'S0249945B',
						dob: this.employeeDetails.dob,
						email: this.employeeDetails.email,
						mobile: this.employeeDetails.mNumber,
						mobile_area_code: this.employeeDetails.mobile_area_code,
						mobile_area_code_country: this.employeeDetails.mobile_area_code_country,
						postal_code: this.employeeDetails.postal,
						plan_start: this.employeeDetails.startDate,
						medical_credits: this.employeeDetails.mCredits,
						wellness_credits: this.employeeDetails.wCredits,
						dependents: this.dependentStorage
					});
					this.$parent.hideLoading();
				}
			}
			this.dependentStorage = [];
			this.$refs.areaCode.choose(this.sgAreaCode);
			this.employeeDetails = {
				mCredits: 0,
				wCredits: 0,
				startDate: undefined,
				dob: undefined,
				mobile_area_code: '65',
			};
			this.employeeDetails.dob = undefined;
			// console.log( this.employeeStorage );
			return true;
		},
		addDependentStorage(data) {
			let arrStorage = this.employeeStorage;
			let limit = arrStorage.length;
			// this.dependentStorage = [];
			// this.dependentDetails = {};

			if (data == "add") {

				if (this.checkDependentForm(this.dependentDetails) == false) {
					return false;
				}
				if (this.isTiering) {
					this.tierDependentCountIndex += 1;
				} else {
					this.dependentCountIndex += 1;
				}
				this.$parent.showLoading();
				this.dependentStorage.push({
					first_name: this.dependentDetails.fname,
					last_name: this.dependentDetails.fname, //to remove
					relationship: this.dependentDetails.relation,
					nric: 'S0249945A', //to remove
					dob: this.dependentDetails.dob,
					plan_start: this.dependentDetails.startDate
				});
				this.dependentDetails = {};
				this.$refs.formDep.reset();
				this.$parent.hideLoading();
			} else {
				if (this.dependentStorage.length == 0 && this.isEmpty(this.dependentDetails) == true) {
					if (this.checkDependentForm(this.dependentDetails) == false) {
						return false;
					}
				}
				if (this.dependentDetails.fname || this.dependentDetails.lname) {
					if (this.checkDependentForm(this.dependentDetails) == false) {
						return false;
					}
					if (this.isTiering) {
						this.tierDependentCountIndex += 1;
					} else {
						this.dependentCountIndex += 1;
					}
					this.$parent.showLoading();
					this.dependentStorage.push({
						first_name: this.dependentDetails.fname,
						last_name: this.dependentDetails.fname, //to remove
						relationship: this.dependentDetails.relation,
						nric: 'S0249945A', //to remove
						dob: this.dependentDetails.dob,
						plan_start: this.dependentDetails.startDate
					});
					this.$refs.formDep.reset();
					this.$parent.hideLoading();
				}
				this.dependentDetails = {};
				this.dependentState = false;
				this.isState = "web";
				this.empDepNavState = true;
				this.depIndexData = 0; // reset back to zero
				this.depPrevChevronState = false;
				this.depNextChevronState = false;
			}
			console.log(this.dependentStorage);
			return true;
		},
		prevNextEmp(data, type) {
			//used in web input
			let arrStorage = this.employeeStorage;
			let depArrStorage = this.dependentStorage;
			let viewDept = this.employeeStorage[this.indexData];
			let index = this.indexData; //for employee index
			let depIndex = this.depIndexData; // for dependent index
			if (type == 0) {
				if (data == "prev") {

					if (index == 0) {
						console.log("prev is disabled");
					} else {
						if (this.isTiering) {
							this.tierEmployeeCountIndex -= 1;
						} else {
							this.employeeCountIndex -= 1;
						}
						index = --this.indexData;
						this.employeeDetails = {
							fname: arrStorage[index].first_name,
							lname: arrStorage[index].last_name,
							nricFinNo: arrStorage[index].nric,
							dob: arrStorage[index].dob,
							email: arrStorage[index].email,
							mNumber: arrStorage[index].mobile,
							mobile_area_code: arrStorage[index].mobile_area_code,
							mobile_area_code_country: arrStorage[index].mobile_area_code_country,
							postal: arrStorage[index].postal_code,
							mCredits: arrStorage[index].medical_credits,
							wCredits: arrStorage[index].wellness_credits,
							startDate: arrStorage[index].plan_start,
							dependents: arrStorage[index].dependents
						};
						this.$refs.areaCode.choose(this.employeeDetails.mobile_area_code_country);
						this.dependentStorage = arrStorage[index].dependents;
						console.log(arrStorage[index]);
						if (index == 0) {
							this.prevDisabled = true;
						}
						if (arrStorage[index].dependents.length != 0) {
							this.empDepNavState = true;
						}
					}
				} else if (data == "next") {
					this.prevDisabled = false;
					let limit = arrStorage.length;

					if (limit == index) {
						if (this.addToStorage("next") == true) {
							limit = arrStorage.length;
							if (this.isTiering) {
								this.tierEmployeeCountIndex += 1;
							} else {
								this.employeeCountIndex += 1;
							}
							index = ++this.indexData;
							this.empDepNavState = false;
							this.$refs.areaCode.choose(this.sgAreaCode);
							this.employeeDetails = {
								mCredits: 0,
								wCredits: 0,
								startDate: undefined,
								mobile_area_code: '65',
							};
							this.dependentStorage = [];
						}
					} else if (index >= limit) {
						this.empDepNavState = false;
					} else {
						this.employeeStorage[index] = {
							first_name: this.employeeDetails.fname,
							// last_name: this.employeeDetails.lname,
							idType: this.employeeDetails.idType,
							// nric: this.employeeDetails.nricFinNo,
							dob: this.employeeDetails.dob,
							email: this.employeeDetails.email,
							mobile: this.employeeDetails.mNumber,
							mobile_area_code: this.employeeDetails.mobile_area_code,
							mobile_area_code_country: this.employeeDetails.mobile_area_code_country,
							postal_code: this.employeeDetails.postal,
							plan_start: this.employeeDetails.startDate,
							medical_credits: this.employeeDetails.mCredits,
							wellness_credits: this.employeeDetails.wCredits,
							dependents: this.dependentStorage
						};
						this.$refs.areaCode.choose(this.employeeDetails.mobile_area_code_country);
						if (this.isTiering) {
							this.tierEmployeeCountIndex += 1;
						} else {
							this.employeeCountIndex += 1;
						}
						index = ++this.indexData;
						if (arrStorage[index] === undefined) {
							this.empDepNavState = false;
							this.$refs.areaCode.choose(this.sgAreaCode);
							this.employeeDetails = {
								mCredits: 0,
								wCredits: 0,
								startDate: undefined,
								mobile_area_code: '65',
							};
							this.dependentStorage = [];
						} else {
							this.employeeDetails = {
								fname: arrStorage[index].first_name,
								lname: arrStorage[index].last_name,
								nricFinNo: arrStorage[index].nric,
								dob: arrStorage[index].dob,
								email: arrStorage[index].email,
								mNumber: arrStorage[index].mobile,
								mobile_area_code: arrStorage[index].mobile_area_code,
								mobile_area_code_country: arrStorage[index].mobile_area_code_country,
								postal: arrStorage[index].postal_code,
								mCredits: arrStorage[index].medical_credits,
								wCredits: arrStorage[index].wellness_credits,
								startDate: arrStorage[index].plan_start,
								dependents: this.dependentStorage
							};
							this.$refs.areaCode.choose(this.employeeDetails.mobile_area_code_country);
						}
					}
					this.selected_emp_dep_tab = 1;
				}
			} else if (type == 1) {
				// let limit = depArrStorage.length;
				if (data == "prev") {
					if (depIndex == 0) {
						console.log("prev disabled");
					} else {
						let limit = depArrStorage.length;
						if (this.isTiering) {
							this.tierDependentCountIndex -= 1;
						} else {
							this.dependentCountIndex -= 1;
						}
						depIndex = --this.depIndexData;
						this.dependentDetails = {
							fname: depArrStorage[depIndex].first_name,
							// lname: depArrStorage[depIndex].first_name,
							relation: depArrStorage[depIndex].relationship,
							// nricFinNo: depArrStorage[depIndex].nric,
							dob: depArrStorage[depIndex].dob,
							startDate: depArrStorage[depIndex].plan_start
						};
						if (limit > depIndex) {
							this.depPrevChevronState = true;
							this.depNextChevronState = true;
						}
						if (depIndex < limit && depIndex == 0) {
							this.depPrevChevronState = false;
							this.depNextChevronState = true;
						}
					}
				} else if (data == "add") {
					let limit = depArrStorage.length;
					if (limit == depIndex) {
						// !this.isEmpty(this.employeeDetails)
						if (this.addDependentStorage("add") == true) {
							this.depPrevChevronState = true;
							// limit = depArrStorage.length;
							// this.tierDependentCountIndex += 1;
							depIndex = ++this.depIndexData;
							this.dependentDetails = {};
						}
					}
				} else if (data == "next") {
					let limit = depArrStorage.length;
					if (depIndex >= limit) {
						this.depPrevChevronState = true;
						this.depNextChevronState = false;
					} else {
						this.dependentStorage[depIndex] = {
							first_name: this.dependentDetails.fname,
							// last_name: this.dependentDetails.lname,
							relationship: this.dependentDetails.relation,
							// nric: this.dependentDetails.nricFinNo,
							dob: this.dependentDetails.dob,
							plan_start: this.dependentDetails.startDate
						};
						if (this.isTiering) {
							this.tierDependentCountIndex += 1;
						} else {
							this.dependentCountIndex += 1;
						}
						depIndex = ++this.depIndexData;
						if (depArrStorage[depIndex] === undefined) {
							this.dependentDetails = {};
							this.depNextChevronState = false;
							this.depPrevChevronState = true;
						} else {
							this.dependentDetails = {
								fname: depArrStorage[depIndex].first_name,
								// lname: depArrStorage[depIndex].last_name,
								relation: depArrStorage[depIndex].relationship,
								// nricFinNo: depArrStorage[depIndex].nric,
								dob: depArrStorage[depIndex].dob,
								startDate: depArrStorage[depIndex].plan_start
							};
							if (limit > depIndex) {
								this.depPrevChevronState = true;
								this.depNextChevronState = true;
							}
						}
					}
				}
			} else if (type == 2) {
				if (data == "prev") {
					this.dependetStorageIndex -= 1;
				} else if (data == "next") {
					this.dependetStorageIndex += 1;
				}
			}
		},
		addDependent() {
			//used in web input toggle dependent
			this.dependentState = !this.dependentState;
			if (this.dependentState === true) {
				this.isState = "dependent";
				this.depPrevChevronState = false;
				this.depNextChevronState = false;
				this.dependentDetails = {};
				this.depIndexData = 0;
			}
		},
		removeAddedDependent(index) {
			this.dependentStorage.splice(index, 1);
			if (this.isTiering) {
				this.tierDependentCountIndex -= 1;
			} else {
				this.dependentCountIndex -= 1;
			}
			if (this.dependentStorage.length == 0) {
				this.selectEmpDepTab(1);
			}
		},
		selectEmpDepTab(opt) {
			//used in web input
			this.selected_emp_dep_tab = opt;

			if (this.selected_emp_dep_tab == 2) {
				this.dependetStorageIndex = 0;
				if (this.dependentStorage.length > 1) {
					this.depNextChevronState = false;
				}
			}
		},
		cancelDep() {
			// use in add dependent
			this.$swal({
				title: "Confirm",
				text: "Unsaved data will be deleted, Proceed?",
				type: "warning",
				showCancelButton: true,
				confirmButtonText: "Confirm",
				customClass: "warning-global-container primary"
			}).then(result => {
				if (result.value) {
					this.dependentState = !this.dependentState;
					this.isState = "web";
				}
			});
		},
		toggleSummary() {
			//used in web input side nav summary
			this.summaryBtn = !this.summaryBtn;
			if (this.summaryBtn === true) {
				$("#summary-btn").css({
					right: "255px"
				});
				$("#summary-content").css({
					width: "255px"
				});
			} else {
				$("#summary-btn").css({
					right: "0"
				});
				$("#summary-content").css({
					width: "0"
				});
			}
		},
		enroll(data) {
			if (data == "enrollsum") {
				if (this.addToStorage('enroll') == true) {
					for (var i = 0; i < this.employeeStorage.length; i++) {
						this.employeeStorage[i].dob = moment(this.employeeStorage[i].dob).format('YYYY-MM-DD');
						this.employeeStorage[i].plan_start = moment(this.employeeStorage[i].plan_start).format('YYYY-MM-DD');
						if (this.employeeStorage[i].dependents.length > 0) {
							for (var x = 0; x < this.employeeStorage[i].dependents.length; x++) {
								this.employeeStorage[i].dependents[x].dob = moment(this.employeeStorage[i].dependents[x].dob).format('YYYY-MM-DD');
								this.employeeStorage[i].dependents[x].plan_start = moment(this.employeeStorage[i].dependents[x].plan_start).format('YYYY-MM-DD');
								if (i == this.employeeStorage.length - 1) {
									if (x == this.employeeStorage[i].dependents.length - 1) {
										console.log(this.employeeStorage);
										this.submitEnrollEmployees();
									}
								}
							}
						} else {
							if (i == this.employeeStorage.length - 1) {
								console.log(this.employeeStorage);
								this.submitEnrollEmployees();
							}
						}
					}
				}
			}
		},
		submitEnrollEmployees() {
			this.$parent.showLoading();
			var data = {
				employees: this.employeeStorage,
				plan_tier_id: this.isTiering ? this.activeTier.plan_tier_id : null
			}
			axios.post(axios.defaults.serverUrl.node_company + '/hr/create/employee_enrollment', data)
				.then(res => {
					this.$parent.hideLoading();
					console.log(res);
					if (res.data.status) {
						this.$parent.swal('Success!', res.data.message, 'success');
						this.isState = "enrollsum";
						this.$emit("webInputData", { isState: "enrollsum" });
						this.$router.push({ name: 'CompanyEnroll' });
						this.prevDisabled = false;
					} else {
						this.$parent.swal('Error!', res.data.message, 'error');
					}
				})
				.catch(err => {
					console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal('Error!', err, 'error');
				});
		},
		//to check is object empty -  globall
		isEmpty(obj) {
			for (var key in obj) {
				if (key != 'mCredits' && key != 'wCredits') {
					if (obj.hasOwnProperty(key)) return false;
				}
			}
			return true;
		},
		getCompanyEnrollmentCountStatus() {
			this.$parent.showLoading();
			axios.get(axios.defaults.serverUrl.node_company + '/hr/enrollment_progress')
				.then(res => {
					this.$parent.hideLoading();
					console.log(res);
					if (res.status == 200) {
						this.enrollment_progress = res.data.data;
						this.employeeCountIndex = this.enrollment_progress.completed + 1;
					} else {
						this.$parent.swal('Error!', res.data.message, 'error');
					}
				})
				.catch(err => {
					console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal('Error!', err, 'error');
				});
		},
		getDependentCountStatus() {
			this.$parent.showLoading();
			axios.get(axios.defaults.serverUrl.node_company + '/hr/get_dependent_status')
				.then(res => {
					this.$parent.hideLoading();
					console.log(res);
					if (res.status == 200) {
						this.dependent_progress = res.data;
						this.dependentCountIndex = this.dependent_progress.occupied_seats + 1;
					} else {
						this.$parent.swal('Error!', res.data.message, 'error');
					}
				})
				.catch(err => {
					console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal('Error!', err, 'error');
				});
		},
		getCompanyPaymentStatus() {
			this.$parent.showLoading();
			axios.get(axios.defaults.serverUrl.node_company + '/hr/check_plan')
				.then(res => {
					this.$parent.hideLoading();
					console.log(res);
					if (res.status == 200) {
						// this.dependent_progress = res.data.data;
					} else {
						this.$parent.swal('Error!', res.data.message, 'error');
					}
				})
				.catch(err => {
					console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal('Error!', err, 'error');
				});
		},
	},
};
export default webInput;
</script>

<style lang="scss">
@import "./src/assets/css/company/enrollment.scss";
</style>