<script>
	import axios from 'axios';
	import Modal from "../../views/clinic/modal/Modal.vue";

	var settings = {
		components: {
	    Modal
	  },
		data() {
			return {
				timeFrame: {},
			}
		},
		
	
	}

	export default settings
</script>

<style lang="scss" scoped>
@import "./src/assets/css/clinic/settings.scss";
@import "./src/assets/css/clinic/clinic-responsive.scss";
</style>






