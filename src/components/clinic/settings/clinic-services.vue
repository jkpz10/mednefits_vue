<script>
	import axios from 'axios';
	import Modal from "../../../views/clinic/modal/Modal.vue";

	var clinicServices = {
		components: {
	    Modal
	  },
		data() {
			return {
				timeFrame: {},
				showAddServiceWrapper: false,
			}
		},
		methods: {
			btnAddService() {
				this.showAddServiceWrapper = true;
			},
			btnCancel() {
				this.showAddServiceWrapper = false;
			}
		}
	}

	export default clinicServices
</script>

<style lang="scss" scoped>
@import "./src/assets/css/clinic/settings.scss";
@import "./src/assets/css/clinic/clinic-responsive.scss";
</style>