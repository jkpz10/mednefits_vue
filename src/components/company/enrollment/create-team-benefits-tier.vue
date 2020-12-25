<script>
/* eslint-disable */
import axios from 'axios';  
// Methods here
let createTeamBenefitsTier = {
  data() {
    return {
      isTierBtn: false,
      isTierInput: false,
      isTierSummary: false,
      isEditActive: false,
      tierCounter: 0,
      tierDetials: {
        gp_cap_status: false,
      },
      tierStorage: [],
      activeTier: null,
    };
  },
  created(){
    this.getTierList();
  },
  methods: {
    toggleGPcapStatus(opt) {
      this.tierDetials.gp_cap_status = opt;
      this.$forceUpdate();
    },
    selectTier( data, index ){
      // console.log( data );
      this.activeTier = data;
      this.activeTier.index = index;
    },
    addTierBtn(opt, index, data) {
      this.isTierInput = true;
      this.isTierBtn = false;
      this.isTierSummary = false;
      this.isEditActive = opt == 'edit' ? true : false;
      if (opt == "add") {
        this.tierDetials = {
          gp_cap_status: false,
        };
        this.tierDetials.index = this.tierStorage.length + 1;
      } else if (opt == "edit") {
        this.tierDetials.index = index;
        this.tierDetials = {
          plan_tier_id: data.plan_tier_id,
          medCap: data.medical_annual_cap,
          wellCap: data.wellness_annual_cap,
          gp_cap_status: ( data.gp_cap_status ) ? true : false,
          gpCap: data.gp_cap_per_visit,
          empCount: data.member_head_count,
          depCount: data.dependent_head_count
        };
      }
    },
    closeBtn( ) {
      this.isTierInput = false;
      this.isTierBtn = false;
      this.isEditActive = false;
      this.isTierSummary = false;
      this.tierDetials = {};
      this.activeTier = null;
      this.getTierList();
    },
    nextBtn(){
      localStorage.setItem('tierSelected', JSON.stringify(this.activeTier) );
      this.$router.push({ name: 'CompanyEnrollment' });
    },
    saveTierData() {
      // console.log( this.tierDetials );
      if( this.isEmpty(this.tierDetials) == true ){
        this.$parent.swal( 'Error!', "Input values should be 1 or more", 'error' );
        return false;
      }
      if( this.tierDetials.medCap == 0 || this.tierDetials.wellCap == 0 || this.tierDetials.empCount == 0 || this.tierDetials.depCount == 0 ){
        this.$parent.swal( 'Error!', "Input values should be 1 or more", 'error' );
        return false;
      }
      if( this.tierDetials.gp_cap_status == true && (!this.tierDetials.gpCap || this.tierDetials.gpCap == 0) ){
        this.$parent.swal( 'Error!', "Input values should be 1 or more", 'error' );
        return false;
      }
      if (this.isEditActive == true) {
        this.updateTier( this.tierDetials );
      } else {
        this.addTier( this.tierDetials );
      }
    },
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },
    removeTier() {
      this.$swal({
        title: "Confirm",
        text: "Are you sure you want to remove this tier?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#ff6864",
        cancelButtonText: "No",
        customClass: "warning-global-container danger "
      }).then(result => {
        if (result.value) {
          var data = {
            plan_tier_id : this.tierDetials.plan_tier_id
          }
          this.$parent.showLoading();
          axios.post( axios.defaults.serverUrl.node_company + '/hr/remove_plan_tier', data )
            .then(res => {
              this.$parent.hideLoading();
              console.log(res);
              if( res.data.status ){
                this.$parent.swal('Success!', res.data.message, 'success');
                this.closeBtn();
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
    addTier( data ){
      this.$parent.showLoading();
      var add_data = {
        medical_annual_cap: data.medCap,
        wellness_annual_cap: data.wellCap,
        gp_cap_status: data.gp_cap_status,
        gp_cap_per_visit: data.gpCap,
        member_head_count: data.empCount,
        dependent_head_count: data.depCount
      };
      axios.post( axios.defaults.serverUrl.node_company + '/hr/create/plan_tier', add_data )
        .then(res => {
          this.$parent.hideLoading();
          // console.log(res);
          if( res.data.status ){
            this.$parent.swal('Success!', res.data.message, 'success');
            this.closeBtn();
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
    updateTier( data ){
      this.$swal({
        title: "Confirm",
        text: "Are you sure you want to update this tier?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#0392CF",
        cancelButtonText: "No",
        customClass: "warning-global-container primary"
      }).then(result => {
        if (result.value) {
          this.$parent.showLoading();
          var add_data = {
            plan_tier_id: data.plan_tier_id,
            medical_annual_cap: data.medCap,
            wellness_annual_cap: data.wellCap,
            gp_cap_status: data.gp_cap_status,
            gp_cap_per_visit: data.gpCap,
            member_head_count: data.empCount,
            dependent_head_count: data.depCount
          };
          axios.post( axios.defaults.serverUrl.node_company + '/hr/update_plan_tier', add_data )
            .then(res => {
              this.$parent.hideLoading();
              // console.log(res);
              if( res.data.status ){
                this.$parent.swal('Success!', res.data.message, 'success');
                this.closeBtn();
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
    getTierList(){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/get_plan_tiers' )
        .then(res => {
          this.$parent.hideLoading();
          // console.log(res);
          if( res.status == 200 ){
            this.tierStorage = res.data.data;
            this.isTierSummary = this.tierStorage.length > 0 ? true : false;
            this.isTierBtn = this.tierStorage.length == 0 ? true : false;
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

export default createTeamBenefitsTier;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/company/enrollment.scss";
</style>