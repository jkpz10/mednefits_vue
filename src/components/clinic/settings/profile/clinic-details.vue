<script>
import axios from 'axios';
// import Modal from "../../../views/clinic/modal/Modal.vue";

var clinicDetails = {
	// components: {
	//    Modal
	//  },
	data() {
		return {
			timeFrame: {},
			showWeekSelector: false,
			showTimeSelector: false,
			showStartHourSeletor: false,
			showMrtSlector: false,
			clinicDetails: {},
			

			telProps: {
				defaultCountry: "SG",
				placeholder: "",
				enabledCountryCode: true,
				enabledFlags: true,
				autocomplete: "off",
				validCharactersOnly: true,
				maxLen: 8,
			},
			sgAreaCode: {
				areaCodes: null,
				dialCode: "65",
				iso2: "SG",
				name: "Singapore",
				priority: 0,
			},
		}
	},
	methods: {
		setAreaCode(formattedNumber, { number, isValid, country }) {
			this.employeeDetails.mobile_area_code = country.dialCode;
			this.employeeDetails.mobile_area_code_country = country;

			if (country.iso2 == 'SG') {
				this.telProps.maxLen = 8;
			} else if (country.iso2 == 'MY' || country.iso2 == 'PH') {
				this.telProps.maxLen = 10;
			} else {
				this.telProps.maxLen = 0;
			}
		},
		btnWeekSelector() {
			if (this.showWeekSelector === false) {
				this.showWeekSelector = true;
			} else {
				this.showWeekSelector = false;
			}
		},
		btnTimeSelector() {
			if (this.showTimeSelector === false) {
				this.showTimeSelector = true;
			} else {
				this.showTimeSelector = false;
			}
		},
		btnStartHourSelector() {
			if (this.showStartHourSeletor === false) {
				this.showStartHourSeletor = true;
			} else {
				this.showStartHourSeletor = false;
			}
		},
		btnMrtSelector(data) {
			this.clinicDetails.mrt = data;
			this.showMrtSlector = false;
		}
	},
	computed: {
		mrt() {
			let data = [
				'Jurong East',
				'Bukit Batok',
				'Bukit Gombak',
				'Choa Chu Kang'
			];

			return data;
		}
	}

}

export default clinicDetails
</script>

<style lang="scss" scoped>
@import "./src/assets/css/clinic/settings.scss";
@import "./src/assets/css/clinic/clinic-responsive.scss";
</style>
