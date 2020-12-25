<script>
import axios from 'axios';
import Modal from "../../../views/clinic/modal/Modal.vue";
import moment from "moment";
import { constants } from 'crypto';

var settings = {
	components: {
		Modal
	},
	data() {
		return {
			showWeekSelector: false,
			showTimeSelector: false,
			showStartHourSeletor: false,

			itemWeekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			selectedDay: 'Monday',
			timeUnit: [5, 15, 30, 45, 60],
			selectedTime: 15,
			selectedHour: '12:00 AM',
		}
	},
	mounted() {
		// console.log('mounted gikan', this.hoursPerday);
	},
	methods: {
		btnWeekSelector() {
			this.showWeekSelector = !this.showWeekSelector;
		},
		itemWeekSelector(data) {
			console.log(data);
			this.selectedDay = data;
			this.showWeekSelector = !this.showWeekSelector;
		},
		btnTimeSelector() {
			this.showTimeSelector = !this.showTimeSelector;
		},
		itemTimeSelector(data) {
			console.log(data);
			this.selectedTime = data;
			this.showTimeSelector = !this.showTimeSelector;
		},
		btnStartHourSelector() {
			this.showStartHourSeletor = !this.showStartHourSeletor;
		},
		itemHourSelector(data) {
			console.log(data);
			this.selectedHour = data;
			this.showStartHourSeletor = !this.showStartHourSeletor;
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
		}
	}

}

export default settings
</script>

<style lang="scss" scoped>
@import "./src/assets/css/clinic/settings.scss";
</style>
