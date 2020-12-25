<script>
import axios from 'axios';
/* eslint-disable */
let excel = {
  components: {},
  data() {
    return {
      isState: 'excel',
      // stepperState: 'download',
      stepperState: 'upload',
      stepStatus : 3,
      empType: null,
      isNextBtnDisabled: true,
      isSuccessUpload : false,
      isTiering: JSON.parse( localStorage.getItem('isRequiredTiering') ),
      activeTier: JSON.parse( localStorage.getItem('tierSelected') ),
      reviewChecks: {
        save : false,
        name : false,
        dob : false,
        plan : false,
        email : false,
        postal : false,
        relationship : false,
      }
    };
  },
  methods: {
    uploadReceipts( data ){
      console.log( data );
      this.$parent.showLoading();
      let formData = new FormData();
      formData.append('file', data[0]);
      if( this.isTiering ){
        formData.append('plan_tier_id', this.activeTier.plan_tier_id);
      }
      this.$refs.receiptUploader.value = null;
      axios.post( 
        axios.defaults.serverUrl.node_company + "/upload/excel_enrollment", 
        formData, 
        { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res => {
          console.log( res );
          this.$parent.hideLoading();
          if( res.data.status ){
            this.isNextBtnDisabled = false;
            this.isSuccessUpload = true;
            this.$parent.swal('Success!', res.data.message, 'success');
          }else{
            this.isSuccessUpload = false;
            this.isNextBtnDisabled = false;
            this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          this.isSuccessUpload = false;
          this.isNextBtnDisabled = true;
          this.$parent.hideLoading();
        });
    },
    empBtnType(data) { //used in excell

      this.empType = data;
    },
    downloadTemplate(){
      if( this.empType == 'empOnly' ){
        window.open( axios.defaults.serverUrl.node_company + '/excel/Employee Enrollment Listing.xlsx' );
      }else{
        window.open( axios.defaults.serverUrl.node_company + '/excel/Employees and Dependents.xlsx' );
      }
    },
    checkReviewBoxes(){
      if( !this.reviewChecks.save || !this.reviewChecks.name || !this.reviewChecks.dob || !this.reviewChecks.plan || !this.reviewChecks.email || !this.reviewChecks.postal ){
        return false;
      }
      if( this.empType == 'empDependents' && !this.reviewChecks.relationship ){
        return false;
      }
      return true;
    },
    excel(data) { //used in excel
      if (data == 'empOnly' || data == 'empDependents') {
        if (this.empType === "empOnly") {
          this.stepperState = "empOnly";
          ++this.stepStatus;
          this.$emit('excelData', {
            stepStatus: this.stepStatus
          });
        } else if (this.empType === "empDependents") {
          this.stepperState = "empDependents";
          ++this.stepStatus;
          this.$emit('excelData', {
            stepStatus: this.stepStatus
          });
        }
      } else if (data == 'upload') {
        if( this.checkReviewBoxes() == true ){
          this.stepperState = "upload";
          ++this.stepStatus;
          this.$emit('excelData', {
            stepStatus: this.stepStatus
          });
        }else{
          this.$parent.swal( 'Error!', 'please review your downloaded file and check the boxes.', 'error' );
        }
      } else if (data == 'enrollsum') {
        this.stepperState = null;
        this.$router.push('summary');
        ++this.stepStatus;
        this.$emit('excelData', {
          stepStatus: this.stepStatus
        });
      }else{
        this.$parent.swal( 'Error!', 'Please select your desired option first and download the excel template.', 'error' );
      }
    },
    back(data) {
      if (data == "download") {
        this.stepperState = "download";
        this.stepStatus = 1;
        this.reviewChecks = {
          save : false,
          name : false,
          dob : false,
          plan : false,
          email : false,
          postal : false,
          relationship : false,
        }
        this.$emit('excelData', {
          stepStatus: this.stepStatus
        });
      }
    },
  },
  created() {

  }
}

export default excel
</script>

<style lang="scss">
  @import "./src/assets/css/company/enrollment.scss";
</style>