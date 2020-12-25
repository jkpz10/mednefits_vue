<script>
import axios from 'axios';
/* eslint-disable */

import Modal from "../../../views/company/modal/Modal";
// Methods here
let accountPayments = {
  components: {
    Modal
  },
  data() {
    return {
      modals: {
        account : {
          password: false,
          active_plans: false,
        }
      },
      companyActivePlans: [],
      selected_modal_data: {},
      update_password_data: {},
      companyContactsData: {},
      billingsList: {},
      planSubscriptions: {},
      download_token: null,
    };
  },
  created(){
    this.getDownloadToken();
    this.getCompanyContactsData();
    this.getBillingList();
    this.getPlanSubscriptions();
    this.getCompActivePlans();
  },
  methods: {
    companyContactsModal(data, modal_data) {
      let password = this.modals.account.password;
      let active_plans = this.modals.account.active_plans;

      // Accounts & payment
      console.log( modal_data );
      this.selected_modal_data = modal_data;
      if (data == 'password') {
        this.modals.account.password = !password;
      } 
      else if (data == 'active_plans') {
        if( !active_plans == true ){
          this.getActivePlanDetails( modal_data );
        }else{
          this.modals.account.active_plans = !active_plans;
        }
        
      }
      // end Accounts & payment
    },
    activePlanDownloadInvoice( id ){
      window.open( axios.defaults.serverUrl.node_company + '/benefits/invoice?invoice_id=' + id );
    },
    activePlanDownloadReceipt( id ){
      window.open( axios.defaults.serverUrl.node_company + '/benefits/receipt?invoice_id=' + id );
    },
    dependentPlanDownloadInvoice( data ){
      window.open( axios.defaults.serverUrl.node_company + '/hr/download_dependent_invoice?dependent_plan_id=' + data.dependent_plan_id + '&token=' + this.download_token );
    },
    downloadSpendingDeposit( data ){
      window.open( axios.defaults.serverUrl.node_company + '/hr/spending_desposit?id=' + data.deposit_id + '&token=' + this.download_token );
    },
    goToEmpOverview(){

      this.$router.push({ name: 'CompanyEmployee' });
    },
    updatePassword( update_data ){
      if( !update_data.current_password || !update_data.new_password || !update_data.retype_password ){
        this.$parent.swal( 'Error!', 'Password inputs are required.', 'error' );
        return false;
      }
      if( update_data.new_password != update_data.retype_password ){
        this.$parent.swal( 'Error!', 'Passwords do not match.', 'error' );
        return false;
      }
      this.$swal({
        title: "Confirm",
        text: "Are you sure you want to UPDATE your account password?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: "warning-global-container primary"
      }).then(result => {
        if (result.value) {
          var data = {
            current_password : update_data.current_password,
            new_password : update_data.new_password
          }
          this.$parent.showLoading();
          axios.post( axios.defaults.serverUrl.node_company + '/hr/update_password', data )
            .then(res => {
              this.$parent.hideLoading();
              console.log(res);
              if( res.data.status ){
                this.$parent.swal('Success!', res.data.message, 'success');
                this.update_password_data = {};
                this.companyContactsModal('password');
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
    getDownloadToken(){
      this.download_token = localStorage.getItem('vue_session');
    },
    getActivePlanDetails( data ){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/active_plan_details/' + data.customer_active_plan_id )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.selected_modal_data = res.data.data;
            this.modals.account.active_plans = true;
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
    getCompanyContactsData(  ){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/company_contacts' )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.data.status ){
            this.companyContactsData = res.data.data;
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
    getBillingList(  ){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/account_billing' )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.billingsList = res.data;
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
    getPlanSubscriptions(  ){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/get_company_plan_status' )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.planSubscriptions = res.data;
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
    getCompActivePlans(  ){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/company_active_plans' )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.companyActivePlans = res.data.data;
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
  }
};

export default accountPayments
</script>
