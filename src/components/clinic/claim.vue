<script>
	import Modal from "../../views/clinic/modal/Modal.vue";

	var claim = {
		components: {
	    Modal
	  },
		data() {
			return {
				timeFrame: {},
				modalClaim: {
	        verifyUser: false,
	        manualClaims: false,
	        eCardModal: false,
					checkClaims: false,
				},
				manualClaimData: {},
				serviceDropdown: false,
			}
		},
		methods: {
			handleSelectService(){ //show hide dropdown sa service input
				this.serviceDropdown = !this.serviceDropdown;
			},
			handleSelectedDropdown(source, data) { //pili ug data sa dropdown para display sa input
				if( source == 'service') {
					this.manualClaimData.service = data;
					this.handleSelectService();
				}
			},
			handleDelete(source) {
				if (source == 'service') {
					this.manualClaimData.service = undefined;
					this.handleSelectService();
				}
			}
		}
		
	
	}

	export default claim
</script>

<style lang="scss" scoped>
@import "./src/assets/css/clinic/claim.scss";
@import "./src/assets/css/clinic/clinic-responsive.scss";
</style>






