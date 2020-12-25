<script>
import axios from 'axios';
import Modal from "../../../views/company/modal/Modal";
// Methods here
let documentCenter = {
  components: {
    Modal
  },
  data() {
    return {
      documentData: {},
    };
  },
  created(){
    this.getDocumentData();
  },
  methods: {
    getDocumentData(){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/get/active_plan_hr')
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.documentData = axios.defaults.serverUrl.node_company + '/get/certificate/' + res.data;
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
  }
};

export default documentCenter
</script>
