<script>
import axios from 'axios';
/* eslint-disable */

import Modal from "../../../views/company/modal/Modal";
// Methods here
let accountCompany = {
  components: {
    Modal
  },
  data() {
    return {
      modals: {
        company: {
          business_info: false,
          business_contact: false,
          Billing_contacts: false,
          Billing_address: false
        }
      },
      companyContactsData: {
        business_information: {},
        business_contact: {},
        billing_contact: {},
        payment_method: {},
      },
      selected_modal_data: {},
    };
  },
  created(){
    this.getCompanyContactsData();
  },
  methods: {
    companyContactsModal(data, modal_data) {
      // company
      let business_info = this.modals.company.business_info;
      let business_contact = this.modals.company.business_contact;
      let Billing_contacts = this.modals.company.Billing_contacts;
      let Billing_address = this.modals.company.Billing_address;

      this.selected_modal_data = modal_data;
      if( data == 'business_info'){
        this.modals.company.business_info = !business_info;
      }
      else if( data == 'business_contact'){
        this.modals.company.business_contact = !business_contact;
      }
      else if( data == 'Billing_contacts'){
        this.modals.company.Billing_contacts = !Billing_contacts;
      }
      else if( data == 'Billing_address'){
        this.modals.company.Billing_address = !Billing_address;
        this.selected_modal_data = this.companyContactsData;
      }
      // end company & contacts
      console.log( modal_data );
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
    updateBusinessInfo( update_data ){
      this.$swal({
        title: "Confirm",
        text: "Are you sure you want to UPDATE your business information?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: "warning-global-container primary"
      }).then(result => {
        if (result.value) {
          var data = {
            customer_business_information_id : update_data.customer_business_information_id,
            address : update_data.company_address,
            postal  : update_data.postal_code,
          }
          this.$parent.showLoading();
          axios.post( axios.defaults.serverUrl.node_company + '/hr/update/business_information', data )
            .then(res => {
              this.$parent.hideLoading();
              console.log(res);
              if( res.data.status ){
                this.$parent.swal('Success!', res.data.message, 'success');
                this.getCompanyContactsData();
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
    updateBusinessContact( update_data ){
      this.$swal({
        title: "Confirm",
        text: "Are you sure you want to UPDATE your business information?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: "warning-global-container primary"
      }).then(result => {
        if (result.value) {
          var data = {
            customer_business_contact_id  : update_data.customer_business_contact_id ,
            first_name : update_data.first_name,
            last_name : update_data.last_name,
            work_email  : update_data.work_email,
            phone : update_data.phone,
            job_title : update_data.job_title,
          }
          this.$parent.showLoading();
          axios.post( axios.defaults.serverUrl.node_company + '/hr/update/business_contact', data )
            .then(res => {
              this.$parent.hideLoading();
              console.log(res);
              if( res.data.status ){
                this.$parent.swal('Success!', res.data.message, 'success');
                this.getCompanyContactsData();
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
    updateBillingContact( update_data ){
      this.$swal({
        title: "Confirm",
        text: "Are you sure you want to UPDATE your billing contact?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: "warning-global-container primary"
      }).then(result => {
        if (result.value) {
          var data = {
            customer_billing_contact_id: update_data.customer_billing_contact_id,
            first_name : update_data.first_name,
            last_name : update_data.last_name,
            work_email  : update_data.work_email,
          }
          this.$parent.showLoading();
          axios.post( axios.defaults.serverUrl.node_company + '/hr/update/billing_contact', data )
            .then(res => {
              this.$parent.hideLoading();
              console.log(res);
              if( res.data.status ){
                this.$parent.swal('Success!', res.data.message, 'success');
                this.getCompanyContactsData();
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
    updateBillingAddress( update_data ){
      this.$swal({
        title: "Confirm",
        text: "Are you sure you want to UPDATE your billing address?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: "warning-global-container primary"
      }).then(result => {
        if (result.value) {
          var data = {
            company_name : this.companyContactsData.business_information.company_name,
            billing_address : this.companyContactsData.billing_contact.billing_address,
            postal  : this.companyContactsData.billing_contact.postal,
          }
          this.$parent.showLoading();
          axios.post( axios.defaults.serverUrl.node_company + '/hr/update/billing_address', data )
            .then(res => {
              this.$parent.hideLoading();
              console.log(res);
              if( res.data.status ){
                this.$parent.swal('Success!', res.data.message, 'success');
                this.getCompanyContactsData();
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
  }
};

export default accountCompany
</script>
