<script>
/* eslint-disable */
import axios from 'axios';
import moment from "moment";
import Vue2Filters from 'vue2-filters'
// Methods here
let overview = {
  mixins: [Vue2Filters.mixin],
  data() {
    return {
      intro : {},
      task_lists : {},
      credits : {},
      progress: {
        employees: {},
        dependents: {}
      },
      billing_status: {
        total_plan_due: 0,
        total_spending: {},
      },
      time_now : moment( moment() , 'HH:mm A' ),
      isMorning : undefined,
      isAfternoon : undefined,
      isEvening : undefined,
      spendingType: {
        value: 0,
        text: ""
      } //default is medical
    };
  },
  created() {
    this.getDay();
    setTimeout(() => {
      this.dashboardApi();
    }, 500);
	},
  methods: {
    goToNewEmployee( data ){
      window.open( axios.defaults.serverUrl.node_company + '/company-benefits-dashboard/#/vacant-seat-enrollment?vacant_id=' + data.replacement_seat_id + '&type=' + data.user_type );
    },
    spendType(value, text) {
      //spending either medical or wellness
      this.spendingType.value = value;
      this.spendingType.text = text;
    },
    //emit/transfer data data to another component
    toEnrollment(data) {
      this.$emit("overviewData", {
        isState: data
      });
      this.$router.push({ name: 'CompanyEnrollmentOptions' });
      // this.$router.push({ name: 'CompanyEnrollment' });
    },
    getDay() {
      this.isMorning = this.time_now.isAfter( moment('5:00 AM', 'HH:mm A') ) && this.time_now.isBefore( moment('11:59 AM', 'HH:mm A') );

      this.isAfternoon = this.time_now.isAfter( moment('12:00 PM', 'HH:mm A') ) && this.time_now.isBefore( moment('6:00 PM', 'HH:mm A') );

      this.isEvening = this.time_now.isAfter( moment('6:01 PM', 'HH:mm A') ) && this.time_now.isBefore( moment('4:59 AM', 'HH:mm A').add('days',1) );
    },
    /// api call
    dashboardApi() { //api container
      this.getCompanyIntroMessage();
      this.getTaskList();
      this.getDashCredits();
      this.getProgress();
      this.getBillingStatus();
    },
    getCompanyIntroMessage() { //company intro api
      this.$parent.showLoading();
      axios.get( `${axios.defaults.serverUrl.node_company}/hr/get_intro_overview `)
      .then(res => {
        // console.log(res);
        if(res.data.status) {
			 		this.intro = res.data.data;
			 	} else{
					this.$parent.swal('Error!', res.data.message, 'error');
				}
        this.$parent.hideLoading();
      })
      .catch(err => {
        console.log( err );
        this.$parent.hideLoading();
        this.$parent.swal('Error!', err,'error');
			});
    },
    getTaskList() { // task list api
      this.$parent.showLoading();
      axios.get( `${axios.defaults.serverUrl.node_company}/hr/task_list`)
      .then(res => {
        // console.log(res);
			 	this.task_lists = res.data;
        this.$parent.hideLoading();
      })
      .catch(err => {
        console.log( err );
        this.$parent.hideLoading();
        this.$parent.swal('Error!', err,'error');
			});
    },
    getDashCredits () { //// credits api 
      this.$parent.showLoading();
      axios.get( `${axios.defaults.serverUrl.node_company}/hr/check_balance`)
      .then(res => {
			 	this.credits = res.data;
        this.$parent.hideLoading();
      })
      .catch(err => {
        console.log( err );
        this.$parent.hideLoading();
        this.$parent.swal('Error!', err,'error');
			});
    },
    getProgress() { //progress api
      this.$parent.showLoading();
      axios.get( `${axios.defaults.serverUrl.node_company}/hr/enrollment_progress`)
      .then(res => {
        // console.log(res);
			 	this.progress.employees = res.data.data;
        this.$parent.hideLoading();
      })
      .catch(err => {
        console.log( err );
        this.$parent.hideLoading();
        this.$parent.swal('Error!', err,'error');
      });

      axios.get( `${axios.defaults.serverUrl.node_company}/hr/get_dependent_status`)
      .then(res => {
        // console.log(res);
			 	this.progress.dependents = res.data;
        this.$parent.hideLoading();
      })
      .catch(err => {
        console.log( err );
        this.$parent.hideLoading();
        this.$parent.swal('Error!', err,'error');
      });
    },
    getBillingStatus() { //billing status api
      //for total_plan_due
      this.$parent.showLoading();
      axios.get( `${axios.defaults.serverUrl.node_company}/hr/get_current_plan_total_due`)
      .then(res => {
         if ( res.data.status) {
           this.billing_status.total_plan_due = res.data.total_due;
         }
         this.$parent.hideLoading();
      })
      .catch(err => {
        console.log( err );
        this.$parent.hideLoading();
        this.$parent.swal('Error!', err,'error');
      });

      //for total_spending
      axios.get( `${axios.defaults.serverUrl.node_company}/hr/get_current_spending_total_due`)
      .then(res => {
         if ( res.data.status) {
           this.billing_status.total_spending = res.data;
         }
         this.$parent.hideLoading();
      })
      .catch(err => {
        console.log( err );
        this.$parent.hideLoading();
        this.$parent.swal('Error!', err,'error');
      });
    }
  }
};

export default overview;
</script>


<style lang="scss">
	@import './src/assets/css/company/overview.scss'
</style>