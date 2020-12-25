<script>
/* eslint-disable */
import axios from 'axios';
import moment from "moment";

// methods here
let employee = {
	components: {

	},
	data() {
		return {
			member_count: 0,
			employees: {},
			paginationDropdown: false,
			page_ctr: 5, //ctr number of employees per table
			page_active: 1, //current page

			// search data
			isSearchEmp: false,
			inputSearch: undefined,

		};
	},
	created() {
		this.employeeOverviewApi();
	},
	methods: {
		toEnrollment(data) {
      this.$emit("overviewData", {
        isState: data
      });
      this.$router.push({ name: 'CompanyEnrollmentOptions' });
      // this.$router.push({ name: 'CompanyEnrollment' });
    },
		singleEmployee(index) {
			this.$router.push({
				// path: `/company/employee/${emp.member_id}`,
				name: 'CompanyEmployeeDetails',
				params: {
					id: this.employees.data[index].user_id,
					emp: this.employees.data[index],
					indexOfEmployees: index,
					page_ctr: this.page_ctr,
					page_active: this.page_active
				}
			});

			let employees_serialized = JSON.stringify(this.employees.data[index]);
			localStorage.setItem('selectedEmployee', employees_serialized);
		},
		//Pagination
		perPage() {
			this.paginationDropdown = !this.paginationDropdown;
		},
		selectedPerPage(data) {
			this.page_ctr = data;
			this.perPage();
			this.getEmployeeList();
		},
		employeePagination(direction) { //direction is prev/next
			if (direction == 'next') {
				if (this.employees.hasNextPage) {
					++this.page_active;
					this.getEmployeeList();
				}

			} else if (direction == 'prev') {
				if (this.page_active > 1) {
					--this.page_active;
					this.getEmployeeList();
				}
			}
		},


		// api calls
		employeeOverviewApi() {
			this.getTotalMembers();
			this.getEmployeeList();
		},
		getTotalMembers() {
			axios.get(`${axios.defaults.serverUrl.node_company}/hr/get_total_members`)
				.then(res => {
					// console.log( res );
					this.member_count = res.data.total_members;
				})
				.catch(err => {
					console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal('Error!', err, 'error');
				});
		},
		getEmployeeList() {
			this.$parent.showLoading();
			let num = this.page_ctr;
			let page = this.page_active;
			axios.get(`${axios.defaults.serverUrl.node_company}/hr/employee_lists/?page=${page}&limit=${num}`)
				.then(res => {

					this.employees = res.data;
					console.log(this.employees);

					this.employees.data.map((value, key) => {
						// this.employees.data[key].push({
						//   fname: this.employees.data[key].name.substring( 0, value.name.lastIndexOf(" ") ),
						//   lname: this.employees.data[ key ].name.substring( value.name.lastIndexOf(" ") + 1 )
						// });
						value.fname = this.employees.data[key].name.substring(0, value.name.lastIndexOf(" "));
						value.lname = this.employees.data[key].name.substring(value.name.lastIndexOf(" ") + 1);
						value.start_date = moment(value.start_date).format("DD MMMM YYYY");
						value.expiry_date = moment(value.expiry_date).format("DD MMMM YYYY");
						value.dob = new Date(value.dob);
						value.start_date_format = moment(value.start_date).format("DD/MM/YYYY");
						value.expiry_date_fromat = moment(value.expiry_date).format("DD/MM/YYYY");
						value.end_date_format = moment(value.expiry_date).format("DD/MM/YYYY");
					});

					if (this.employees.pagingCounter>1){
						this.employees.limit = this.employees.pagingCounter + this.employees.limit - 1;
					}
					this.$parent.hideLoading();
					// let employees_serialized = JSON.stringify(this.employees.data);
					// localStorage.setItem('employeesLocal', employees_serialized);
				})
				.catch(err => {
					console.log(err);
					this.$parent.hideLoading();
					this.$parent.swal('Error!', err, 'error');
				});
		},

		searchEmployee(input) {
			if (input) {
				this.$parent.showLoading();
				let data = {
					search: input
				};

				console.log('data sa search', data);
				axios.post(`${axios.defaults.serverUrl.node_company}/hr/search/employee`, data)
					.then(res => {
						this.employees = res.data;
						this.$parent.hideLoading();
						// this.getEmployeeList();
						this.isSearchEmp = true;
					})
					.catch(err => {
						//console.log(err);
						this.$parent.hideLoading();
						this.$parent.swal("Error!", err, "error");
					});

			} else {
				this.isSearchEmp = false;
				this.removeSearchEmp();
			}
		},
		removeSearchEmp() {
			// code here
			this.inputSearch = undefined;
			this.page_active = 1;
			this.isSearchEmp = false;
			this.getEmployeeList();
		}
	},
	watch: {
		inputSearch() {
			if (this.inputSearch == '') {
				this.removeSearchEmp();
			}
		}
	}
};



export default employee
</script>

<style lang="scss">
@import './src/assets/css/company/employee.scss';
</style>
