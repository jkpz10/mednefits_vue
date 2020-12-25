<script>
import axios from 'axios';
import Modal from "../../../../views/clinic/modal/Modal.vue";
import moment from "moment";

var businessHours = {
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
					profileBreaktimePicker:[],
				},
				{
					day: 'Tuesday',
					state: false,
					profileBreaktimePicker:[],
				},
				{
					day: 'Wednesday',
					state: false,
					profileBreaktimePicker:[],
				},
				{
					day: 'Thursday',
					state: false,
					profileBreaktimePicker:[],
				},
				{
					day: 'Friday',
					state: false,
					profileBreaktimePicker:[],
				},
				{
					day: 'Saturday',
					state: false,
					profileBreaktimePicker:[],
				},
				{
					day: 'Sunday',
					state: false,
					profileBreaktimePicker:[],
				},
			],
			detail_active: {
				value: 0,
				text: ""
			},
			business_active: {
				value: 0,
				text: ""
			},
			showDayTime: true,
			showCustomTime: false,
			modalProfile: {
				addTimeOffModal: false,
			}
		}
	},
	methods: {
		selectBusinessHours(value, text) {
			this.business_active.value = value;
			this.business_active.text = text;
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
		addBreak(source, index) {
			if (source == 'clinic') {

			} else if (source == 'profile') {
				this.dayBreakNames[index].profileBreaktimePicker.push({
					start: moment().startOf('day').format('hh:mm A'),
					end: moment().startOf('day').format('hh:mm A'),
				})

				console.log(this.dayBreakNames[index].profileBreaktimePicker);
			}
		},
		deleteBreak(source, index1, index2) {
			if (source == 'clinic') {

			} else if (source == 'profile') {
				this.dayBreakNames[index1].profileBreaktimePicker.splice(index2,1);
			}
		}
	},
	computed: {
		hoursPerday() {
			let day = 23;
			let hours = []
			let formatTime;

			for (let i = 0; i < day + 1; i++) {
				formatTime = (moment().hours(day).subtract(i, 'hour').format('hh:00 A'));
				hours.unshift(formatTime);
			}
			// formatTime = (moment().subtract(22, 'hours').format('hh:00 A'));
			// hours.unshift(formatTime);

			return hours;
		}
	}
}

export default businessHours
</script>

<style lang="scss" scoped>
@import "./src/assets/css/clinic/settings.scss";
@import "./src/assets/css/clinic/clinic-responsive.scss";
</style>
