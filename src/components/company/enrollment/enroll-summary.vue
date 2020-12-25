<script>
/* eslint-disable */
import axios from 'axios';
import moment from "moment";
import Modal from "../../../views/company/modal/Modal.vue";
import { deprecate } from "util";

let enrollSumamary = {
  components: {
    Modal
  },
  data() {
    return {
      isState: "enrollsum",
      modalEdit: false, //edit modal
      isEnrollDisabled: false,
      maxDep: 0,
      enrollCtr: 0,
      empCtr: 0,
      depCtr: 0,
      employeeDetails: {},
      enrollment_progress: {},
      employeeStorage: [],
      isAllChecked: false, 
      isChecked: [], 
      selected_emp: [], 
      formats: {
				input: ["DD/MM/YYYY"],
				data: ["DD/MM/YYYY"]
			}
    };
  },
  created(){
    this.getTempEmployees();
    this.getCompanyEnrollmentCountStatus();
  },
  methods: {
    checkOne( opt, data ){
      if( opt == true ){
        this.selected_emp.push( data.employee.temp_enrollment_id );
      }else{
        var check = $.inArray( data.employee.temp_enrollment_id, this.selected_emp );
        this.selected_emp.splice( check, 1 );
      }
    },
    checkAll( opt ){
      this.selected_emp = [];
      for( var i = 0; i < this.isChecked.length; i++ ){
        this.isChecked[ i ] = opt;
        if( opt == true ){
          this.selected_emp.push( this.employeeStorage[ i ].employee.temp_enrollment_id );
        }
      }
    },
    findMaxDep() { // methods to find maximum depdents each employee
      let depLength = []; //holds array of all dependent array length to find na fax depdendent on each employee
      let dep;
      let value;
      for (let i = 0; i <= this.employeeStorage.length-1; i++){ //TO SELECT 1 EMPLOYEE
        dep = this.employeeStorage[i].dependents;
        value = dep.length;
        depLength.push(value);
        this.isChecked[ i ] = false;
      };
      let max = Math.max.apply(Math, depLength);
      this.maxDep = max;
    },
    checkErrors() {
      this.isEnrollDisabled = false;
      for( var i = 0; i < this.employeeStorage.length; i++ ){
        if( this.employeeStorage[i].error_logs.error == true ){
          this.isEnrollDisabled = true;
        }
        if( this.employeeStorage[i].dependents.length > 0 ){
          for( var x = 0; x < this.employeeStorage[i].dependents.length; x++ ){
            if( this.employeeStorage[i].dependents[x].error_logs.error == true ){
              this.isEnrollDisabled = true;
            }
          }
        }
      }
    },
    checkDependentForm( data ){
      // console.log( data );
      var err = 0;
      if( !data.first_name ){
        this.$parent.swal( 'Error!', 'First name is required!', 'error' );
        return false;
      }
      // if( !data.last_name ){
      //   this.$parent.swal( 'Error!', 'Last name is required!', 'error' );
      //   return false;
      // }
      // if( !data.nric ){
      //   this.$parent.swal( 'Error!', 'NRIC/FIN is required!', 'error' );
      //   return false;
      // }else{
      //   if( this.checkNRIC( data.nric ) == false ){
      //     this.$parent.swal( 'Error!', 'Invalid NRIC!', 'error' );
      //     return false;
      //   }
      // }
      if( !data.dob ){
        this.$parent.swal( 'Error!', 'Date of Birth is required!', 'error' );
        return false;
      }
      if( !data.relationship ){
        this.$parent.swal( 'Error!', 'Relationship is required!', 'error' );
        return false;
      }
      if( !data.plan_start ){
        this.$parent.swal( 'Error!', 'Start Date is required!', 'error' );
        return false;
      }
      return true; 
    },
    checkEmployeeForm( data ){
      // console.log( data );
      var err = 0;
      if( !data.fname ){
        this.$parent.swal( 'Error!', 'First name is required!', 'error' );
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
      if( !data.dob ){
        this.$parent.swal( 'Error!', 'Date of Birth is required!', 'error' );
        return false;
      }
      if( !data.email ){
        this.$parent.swal( 'Error!', 'Email Address is required!', 'error' );
        return false;
      }else{
        if( this.checkEmail( data.email ) == false ){
          this.$parent.swal( 'Error!', 'Invalid Email!', 'error' );
          return false;
        }
      }
      if( !data.mNumber ){
        this.$parent.swal( 'Error!', 'Mobile Number is required!', 'error' );
        return false;
      }
      if( !data.mAreaCode ){
        this.$parent.swal( 'Error!', 'Mobile Area Code is required!', 'error' );
        return false;
      }
      // if( !data.postal ){
      //   this.$parent.swal( 'Error!', 'Postal Code is required!', 'error' );
      //   return false;
      // }
      if( !data.startDate ){
        this.$parent.swal( 'Error!', 'Start Date is required!', 'error' );
        return false;
      }
      return true; 
    },
    // checkNRIC( value ){
    //   var nric_pattern = new RegExp('^[stfgSTFG]{1}[0-9]{7}[a-zA-z]{1}$');
    //   return nric_pattern.test( value );
    // },
    checkEmail( value ){
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test( value );
    },
    back() {
      this.$swal({
        title: "Confirm",
        text: "Temporary employee(s) will be deleted, Proceed?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#0392CF",
        cancelButtonText: "No",
        customClass: "warning-global-container primary"
      }).then(result => {
        if (result.value) {
          for( var i = 0; i < this.employeeStorage.length; i++ ){
            axios.get( axios.defaults.serverUrl.node_company + '/remove/temp_enrollee/' + this.employeeStorage[i].employee.temp_enrollment_id )
              .then(res => {
                this.$parent.hideLoading();
                // console.log(res);
                if( res.data.status ){
                }else{
                  this.$parent.swal('Error!', res.data.message, 'error');
                }
              })
              .catch(err => {
                console.log( err );
                this.$parent.hideLoading();
                this.$parent.swal('Error!', err,'error');
              });
            if( i == this.employeeStorage.length - 1 ){
              this.$router.push({ name: 'CompanyEnrollmentOptions' });
            }
          }
        }
      });
    },
    enroll( data ) {
      if (data === "successEnroll") {
        if( this.isEnrollDisabled == true ){
          this.$parent.swal('Error!', 'Please check your enrollment errors first.', 'error');
        }else{
          this.saveEnrolledEmployees();
        }
      }
    },
    editEmployee( data, index ) {
      // used in enrollment summary
      let x = data;
      this.indexData = index;
      if (x === "edit") {
        this.employeeDetails = {
          fname: this.employeeStorage[index].employee.first_name,
          // lname: this.employeeStorage[index].employee.last_name,
          // nricFinNo: this.employeeStorage[index].employee.nric,
          dob: new Date( moment( this.employeeStorage[index].employee.dob, ['DD/MM/YYYY', 'YYYY-MM-DD'] ) ),
          email: this.employeeStorage[index].employee.email,
          mNumber: this.employeeStorage[index].employee.mobile,
          mAreaCode: this.employeeStorage[index].employee.mobile_area_code,
          mCredits: this.employeeStorage[index].employee.credits,
          wCredits: this.employeeStorage[index].employee.wellness_credits,
          startDate: new Date( moment( this.employeeStorage[index].employee.start_date, ['DD/MM/YYYY', 'YYYY-MM-DD'] ) ),
          errors: this.employeeStorage[index].error_logs,
          dependents: this.employeeStorage[index].dependents
        };
        if( this.employeeDetails.dependents.length > 0 ){
          for( var i = 0; i < this.employeeDetails.dependents.length; i++ ){
            this.employeeDetails.dependents[i].enrollee.dob = new Date( moment( this.employeeDetails.dependents[i].enrollee.dob, ['DD/MM/YYYY', 'YYYY-MM-DD'] ) );
            this.employeeDetails.dependents[i].enrollee.plan_start = new Date( moment( this.employeeDetails.dependents[i].enrollee.plan_start, ['DD/MM/YYYY', 'YYYY-MM-DD'] ) );
            if( i == this.employeeDetails.dependents.length - 1 ){
              this.modalEdit = !this.modalEdit;
            }
          }
        }else{
          this.modalEdit = !this.modalEdit;
        }
      }else{
        this.modalEdit = !this.modalEdit;
      }
    },
    saveEnrolledEmployees(){
      var value = this.employeeStorage[ this.enrollCtr ];
      value.icon = true;
      value.loading = true;
      var data = {
        temp_enrollment_id : value.employee.temp_enrollment_id
      }
      this.$parent.showLoading();
      axios.post( axios.defaults.serverUrl.node_company + '/hr/create/employee_user', data)
        .then(res => {
          // console.log(res);
          value.loading = false;
          if( res.data.result.status ){
            value.success = true;
            console.log( this.enrollCtr );
            console.log( this.employeeStorage.length );
            this.empCtr += res.data.result.total_employee_enrolled;
            this.depCtr += res.data.result.total_dependents_enrolled;
            if( this.enrollCtr == this.employeeStorage.length-1 ){
              this.$parent.hideLoading();
              // this.$parent.swal('Success!', res.data.message, 'success');
              this.isState = "successEnroll";
            }else{
              this.enrollCtr += 1;
              this.saveEnrolledEmployees();
            }
          }else{
            value.fail = true;
            this.$parent.swal('Error!', res.data.message, 'error');
          }
          this.$forceUpdate();
        })
        .catch(err => {
          console.log( err );
          value.loading = false;
          value.fail = true;
          this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
          this.$forceUpdate();
        });
      this.$forceUpdate();
    },
    update() {
      // used in enrollment summary
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
          if( this.checkEmployeeForm( this.employeeDetails ) == true ){
            if( this.employeeDetails.dependents.length > 0 ){
              for( var i = 0; i < this.employeeDetails.dependents.length; i++ ){
                if( this.checkDependentForm( this.employeeDetails.dependents[i].enrollee ) == true ){
                  if( i == this.employeeDetails.dependents.length - 1 ){
                    this.updateEmployee();
                  }
                }
              }
            }else{
              this.updateEmployee();
            }
          }
        }
      });
    },
    updateEmployee( ){
      var data = {
        temp_enrollment_id : this.employeeStorage[this.indexData].employee.temp_enrollment_id,
        first_name: this.employeeDetails.fname,
        last_name: this.employeeDetails.fname, // to remove
        nric: 'S0249945B', //to remove
        dob: moment(this.employeeDetails.dob, [ 'YYYY-MM-DDTHH:mm:ss.SSSSZ', 'DD/MM/YYYY', 'YYYY-MM-DD' ]).format('DD/MM/YYYY'),
        // dob: moment(this.employeeDetails.dob).format('YYYY-MM-DD'),
        email: this.employeeDetails.email,
        mobile: this.employeeDetails.mNumber,
        job_title: this.employeeStorage[this.indexData].employee.job_title,
        medical_credits: this.employeeDetails.mCredits,
        wellness_credits: this.employeeDetails.wCredits,
        plan_start: moment(this.employeeDetails.startDate, [ 'YYYY-MM-DDTHH:mm:ss.SSSSZ', 'DD/MM/YYYY', 'YYYY-MM-DD' ]).format('DD/MM/YYYY'),
        // plan_start: moment(this.employeeDetails.startDate).format('YYYY-MM-DD'),
        postal_code: this.employeeStorage[this.indexData].employee.postal_code,
        mobile_area_code: this.employeeDetails.mAreaCode
      }
      this.$parent.showLoading();
      axios.post( axios.defaults.serverUrl.node_company + '/hr/update/tier_employee_enrollee_details', data )
        .then(res => {
          this.$parent.hideLoading();
          // console.log(res);
          if( res.data.status ){
            if( this.employeeDetails.dependents.length > 0 ){
              this.updateDependents();
            }else{
              this.modalEdit = false;
              this.$parent.swal('Success!', res.data.message, 'success');
              this.getTempEmployees();
            }
          }else{
            this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
        });
    },
    updateDependents( ){
      for( var i = 0; i < this.employeeDetails.dependents.length; i++ ){
        var data = {
          dependent_temp_id : this.employeeDetails.dependents[i].enrollee.dependent_temp_id,
          first_name : this.employeeDetails.dependents[i].enrollee.first_name,
          // last_name : this.employeeDetails.dependents[i].enrollee.last_name,
          // nric : this.employeeDetails.dependents[i].enrollee.nric,
          dob : moment(this.employeeDetails.dependents[i].enrollee.dob, [ 'YYYY-MM-DDTHH:mm:ss.SSSSZ', 'DD/MM/YYYY', 'YYYY-MM-DD' ]).format('YYYY-MM-DD'),
          plan_start : moment(this.employeeDetails.dependents[i].enrollee.plan_start, [ 'YYYY-MM-DDTHH:mm:ss.SSSSZ', 'DD/MM/YYYY', 'YYYY-MM-DD' ]).format('YYYY-MM-DD'),
          relationship : this.employeeDetails.dependents[i].enrollee.relationship,
        } 
        this.$parent.showLoading();
        axios.post( axios.defaults.serverUrl.node_company + '/hr/update_tier_dependent_enrollee_details', data )
          .then(res => {
            this.$parent.hideLoading();
            // console.log(res);
            if( res.data.status ){
              this.modalEdit = false;
              this.$parent.swal('Success!', res.data.message, 'success');
              this.getTempEmployees();
            }else{
              this.$parent.swal('Error!', res.data.message, 'error');
            }
          })
          .catch(err => {
            console.log( err );
            this.$parent.hideLoading();
            this.$parent.swal('Error!', err,'error');
          });
      }
    },
    removeEmployee( id ){
      this.$swal({
        title: "Confirm",
        text: "Are you sure you want to remove this employee?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#ff6864",
        cancelButtonText: "No",
        customClass: "warning-global-container danger"
      }).then(result => {
        if (result.value) {
          this.$parent.showLoading();
          axios.get( axios.defaults.serverUrl.node_company + '/remove/temp_enrollee/' + id )
            .then(res => {
              this.$parent.hideLoading();
              // console.log(res);
              if( res.data.status ){
                this.modalEdit = false;
                this.$parent.swal('Success!', res.data.message, 'success');
                this.getTempEmployees();
              }else{
                this.$parent.swal('Error!', res.data.message, 'error');
              }
            })
            .catch(err => {
              console.log( err );
              this.$parent.hideLoading();
              this.$parent.swal('Error!', err,'error');
            });
        }
      });
    },
    removeCheckedEmployees( ){
      this.$swal({
        title: "Confirm",
        text: "Are you sure you want to remove these employee(s)?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#ff6864",
        cancelButtonText: "No",
        customClass: "warning-global-container danger"
      }).then(result => {
        if (result.value) {
          for( var i = 0; i < this.selected_emp.length; i++ ){
            axios.get( axios.defaults.serverUrl.node_company + '/remove/temp_enrollee/' + this.selected_emp[i] )
              .then(res => {
                this.$parent.hideLoading();
                // console.log(res);
                if( res.data.status ){
                }else{
                  this.$parent.swal('Error!', res.data.message, 'error');
                }
              })
              .catch(err => {
                console.log( err );
                this.$parent.hideLoading();
                this.$parent.swal('Error!', err,'error');
              });
            if( i == this.selected_emp.length - 1 ){
              this.$parent.swal('Success!', 'Employee(s) removed.', 'success');
              this.getTempEmployees();
            }
          }
        }
      });
    },
    getTempEmployees(){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/get/plan_tier_enrolless' )
        .then(res => {
          this.$parent.hideLoading();
          // console.log(res);
          if( res.data.status ){
            this.employeeStorage = res.data.data;
            if( this.employeeStorage.length > 0 ){
              this.findMaxDep();
              this.checkErrors();
            }else{
              this.$parent.swal( 'Error!', 'No Employees to Enroll. Add Employees First.', 'error' );
              this.$router.push({ name: 'CompanyEnrollmentOptions' });
            }
          }else{
            this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
        });
    },
    getCompanyEnrollmentCountStatus(){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/enrollment_progress' )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.enrollment_progress = res.data.data;
          }else{
            this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
        });
    },
  },
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment( String(value), [ 'YYYY-MM-DDTHH:mm:ss.SSSSZ', 'DD/MM/YYYY', 'YYYY-MM-DD' ] ).format("MM/DD/YYYY");
      }
    },
  },
};

export default enrollSumamary;
</script>

<style lang="scss">
@import "./src/assets/css/company/enrollment.scss";
</style>