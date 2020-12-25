<script>
import axios from 'axios';
import Modal from "../../../views/company/modal/Modal";
// Methods here
let benefitsTier = {
  components: {
    Modal
  },
  data() {
    return {
      isAddTierShow: false,
      isTierSummaryShow: false,
      isAddTierBtnShow: false,
      isEditTier: false,
      add_tier_data: {
        gp_cap_status: false,
      },
      tierList: [],
    };
  },
  created(){
    this.$parent.showLoading();
    this.getTiers();
  },
  methods: {
    toggleGPcapStatus(opt) {
      this.add_tier_data.gp_cap_status = opt;
      this.$forceUpdate();
    },
    showAddTier( isEdit, data, index ){
      this.isEditTier = isEdit;
      this.isAddTierBtnShow = false;
      this.isTierSummaryShow = false;
      this.isAddTierShow = !this.isAddTierShow;
      if( isEdit == true ){
        this.add_tier_data = data;
        this.add_tier_data.index = index;
        this.add_tier_data.gp_cap_status = !this.add_tier_data.gp_cap_status ? false : true;
      }else{
        this.add_tier_data = {
          gp_cap_status: false,
        };
      }
    },
    hideAddTier( ){
      this.isEditTier = false;
      this.isAddTierShow = false;
      this.add_tier_data = {
        gp_cap_status: false,
      };
      this.getTiers();
    },
    saveTierData( data ){
      if( data.medical_annual_cap == 0 || data.wellness_annual_cap == 0 || data.gp_cap_per_visit == 0 || data.member_head_count == 0 || data.dependent_head_count == 0 ){
        this.$parent.swal( 'Error!', "Input values should be 1 or more", 'error' );
        return false;
      }
      if( data.gp_cap_status == true && (!data.gp_cap_per_visit || data.gp_cap_per_visit == 0) ){
        this.$parent.swal( 'Error!', "Input values should be 1 or more", 'error' );
        return false;
      }
      if( this.isEditTier == true ){
        this.updateTier( data );
      }else{
        this.addTier( data );
      }
    },
    updateTier( data ){
      this.$parent.showLoading();
      axios.post( axios.defaults.serverUrl.node_company + '/hr/update_plan_tier', data )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.data.status ){
            this.$parent.swal('Success!', res.data.message, 'success');
            this.hideAddTier();
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
    addTier( data ){
      this.$parent.showLoading();
      axios.post( axios.defaults.serverUrl.node_company + '/hr/create/plan_tier', data )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.data.status ){
            this.$parent.swal('Success!', res.data.message, 'success');
            this.hideAddTier();
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
    deleteTier( data ){
      this.$swal({
        title: "Confirm",
        text: "Are you sure you want to delete this Tier?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: "warning-global-container danger"
      }).then(result => {
        if (result.value) {
          this.$parent.showLoading();
          var data = {
            plan_tier_id : this.add_tier_data.plan_tier_id
          }
          axios.post( axios.defaults.serverUrl.node_company + '/hr/remove_plan_tier', data )
            .then(res => {
              this.$parent.hideLoading();
              console.log(res);
              if( res.data.status ){
                this.$parent.swal('Success!', res.data.message, 'success');
                this.hideAddTier();
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
    getTiers(){
      axios.get( axios.defaults.serverUrl.node_company + '/hr/get_plan_tiers' )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.tierList = res.data.data;
            this.isTierSummaryShow = this.tierList.length > 0 ? true : false;
            this.isAddTierBtnShow = this.tierList.length == 0 ? true : false;
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

export default benefitsTier
</script>
