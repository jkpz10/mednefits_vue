<script>
	import axios from 'axios';
	import Modal from "../../../../views/clinic/modal/Modal.vue";
	import moment from 'moment';

	var transactionInvoice = {
		components: {
	    Modal
	  },
		data() {
			return {
				timeFrame: {},
			}
		},
		methods: {
			
	   
		}
	}

	export default transactionInvoice
</script>

<style lang="scss" scoped>
@import "./src/assets/css/clinic/settings.scss";
@import "./src/assets/css/clinic/clinic-responsive.scss";
</style>