<script>
import axios from 'axios';
import Modal from "../../../views/clinic/modal/Modal.vue";
import moment from "moment";

var clinicStaff = {
	components: {
		Modal
	},
	data() {
		return {
			weekDayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			dayBreakNames: [
				{
					day: 'Monday',
					state: false,
					staffBreaktimePicker:[],
				},
				{
					day: 'Tuesday',
					state: false,
					staffBreaktimePicker: [],
				},
				{
					day: 'Wednesday',
					state: false,
					staffBreaktimePicker: [],
				},
				{
					day: 'Thursday',
					state: false,
					staffBreaktimePicker: [],
				},
				{
					day: 'Friday',
					state: false,
					staffBreaktimePicker: [],
				},
				{
					day: 'Saturday',
					state: false,
					staffBreaktimePicker: [],
				},
				{
					day: 'Sunday',
					state: false,
					staffBreaktimePicker: [],
				},
			],
			timeFrame: {},
			detail_active: {
				value: '0',
				text: ""
			},
			showAddDoctorTooltip: false,
			showDeleteDoctorTooltip: false,
			showCountryCodeList: false,
			showDayTime: true,
			showCustomTime: false,
			modalStaff: {
				addTimeOffModal: false,
			},
			toggleSideBar: true,

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

			addBreak: false,
			addBreakIndex: null,
		}
	},
	methods: {
		// showWorkingHourStart( index ){
		// 	this.workingHourStartArr[ index ] = ( this.workingHourStartArr[ index ] ) ? true : false;
		// 	this.$forceUpdate();
		// 	console.log( this.workingHourStartArr );
		// },
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
		sideBarCollapse(data) {
			if (data === 0) {
				if (this.toggleSideBar === false) {

					document.getElementById('staff-side-wrapper').style.left = "0";
					document.getElementById('staff-detail-wrapper').style.left = "0";
					this.toggleSideBar = true;
				} else {

					document.getElementById('staff-side-wrapper').style.left = "-320px";
					document.getElementById('staff-detail-wrapper').style.left = "-320px";
					this.toggleSideBar = false;
				}
			}
		},
		closeLeftContainer() {
			this.toggleSideBar = true;
			this.sideBarCollapse(0);
		},
		selectDetail(value, text) {
			this.detail_active.value = value;
			this.detail_active.text = text;
		},
		btnAddDoctor() {
			this.showAddDoctorTooltip = (this.showAddDoctorTooltip === false) ? true : false;
		},
		btnDeleteDoctor() {
			if (this.showDeleteDoctorTooltip === false) {
				this.showDeleteDoctorTooltip = true;
			} else {
				this.showDeleteDoctorTooltip = false;
			}
		},
		btnCountryCode() {
			if (this.showCountryCodeList === false) {
				this.showCountryCodeList = true;
			} else {
				this.showCountryCodeList = false;
			}
		},
		toggleCheckBox() {
			if (this.showDayTime === true) {
				this.showDayTime = false;
				this.showCustomTime = true;

			} else {
				this.showCustomTime = false;
				this.showDayTime = true;

			}
		},
		btnAddBreak(index1, day) {
			this.dayBreakNames[index1].staffBreaktimePicker.push({
				start: moment().startOf('day').format('hh:mm A'),
				end: moment().startOf('day').format('hh:mm A'),
			});
		},
		btnDeleteBreak(index1, index2) {
			this.dayBreakNames[index1].staffBreaktimePicker.splice(index2,1);
		}
	},
	computed: {
		hoursPerday() {
			let day = 23;
			let hours = []
			let formatTime;

			for ( let i = 0 ; i < day+1; i++) {
				formatTime = (moment().hours(day).subtract(i, 'hour').format('hh:00 A'));
				hours.unshift(formatTime);
			}
			// formatTime = (moment().subtract(22, 'hours').format('hh:00 A'));
			// hours.unshift(formatTime);
			
			return hours;
		},
	}

}

export default clinicStaff
</script>

<style lang="scss">
@import "./src/assets/css/clinic/settings.scss";
@import "./src/assets/css/clinic/clinic-responsive.scss";
</style>