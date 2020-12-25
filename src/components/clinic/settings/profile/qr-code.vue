<script>
	import axios from 'axios';
	// import Modal from "../../../../views/clinic/modal/Modal.vue";

	var qrCode = {
		// components: {
	 //    Modal
	 //  },
		data() {
			return {
				detail_active: {
	        value: 0,
	        text: ""
				},
			}
		},
		methods: {
			
		}
	}

	export default qrCode
</script>

<style lang="scss" scoped>
@import "./src/assets/css/clinic/settings.scss";
@import "./src/assets/css/clinic/clinic-responsive.scss";
</style>
