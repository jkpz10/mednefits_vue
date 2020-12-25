<script>
import Modal from "../../views/clinic/modal/Modal.vue";
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from '@fullcalendar/interaction'
import allLocales from '@fullcalendar/core/locales-all';
import moment from 'moment'

var calendar = {
	components: {
		Modal,
		FullCalendar
	},
	data() {
		return {

			formats: { //v-date-picker
				input: ["MMM DD YYYY"],
				data: ["MMM DD YYYY"]
			},
			//Calendar Data
			calViewNow: null, //par sa custom na date view if mag select syag calendar view
			calendarView: 'Weekly',
			headerSettings: {
				doctorstab: false,
				dropDown: true,
				tabs: false,
			},
			config: {
				defaultView: 'timeGridWeek', // dayGridMonth,timeGridWeek,timeGridDay
				plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
				timeZone: 'local',
				defaultDate: null,
				slotDuration: '00:15',
				locales: allLocales,
				locale: 'en',
				firstDay: 1,
				events: [],
				now: new Date(),
				businessHours: {
					// days of week. an array of zero-based day of week integers (0=Sunday)
					daysOfWeek: [1, 2, 3, 4, 5], // 1 -5 Monday - Friday 6 - 7 Saturday - Sunday

					startTime: '10:00', // a start time (10am in this example)
					endTime: '17:00', // an end time (6pm in this example)
				},
				weekends: true,
				header: false,
				editable: true,
				eventLimit: true,
				nowIndicator: true,
				selectable: true,
			},
			selectState: 1,
			dateRange: moment(),
			// End Calendar Data
			//for new event
			newEvent: [
				// {
				// 	title: 'The event 1', // a property!
				// 	allDay: false, // Boolean (true or false).
				// 	start: '2019-09-16 10:00', // a property! YYYY - MM - DD hh:mm:ss:sss
				// 	end: '2019-09-16 10:15', // a property! ** see important note below about 'end' ** YYYY - MM - DD hh:mm:ss:sss
				// }, 
			],
			headerDoctorDropdown: false,
			headerCalendarView:false,
			headerSettingsDropdown:false,
			appModal: false,
			setupModal: false,
			dropDownService: false,
			dropDownDoctor: false,
			dropDownDuration: false,
			dropDownDay: false,
			setupSpeciality: false,
			setupServiceTime: false,
			setupDoctor: false,

			// DATA FORMS
			appDetails: {}, // appointment details data object
			serviceCustomIndicator: 0, // service indicator 0 - 3
			searchNewPatient: undefined, // value only 0 - 2 , 0 for search, 1 for new patient, 2 for confirm appointment
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
			setup: {
				dataStorage: {
					serviceTime: 'Mins',
				},
				stepper: 1,
			},
			newPatient: {},

			dataSample: false
		};
	},
	created() {
		this.calViewNow = this.config.defaultView;
		this.config.events = this.newEvent; // should be array format
		// this.defaultDate = moment(this.appDetails.dateRange).format('YYYY-MM-DD');
	},
	methods: {
		setAreaCode(formattedNumber, { number, isValid, country }) {
			this.appDetails.mobile_area_code = country.dialCode;
			this.appDetails.mobile_area_code_country = country;

			if (country.iso2 == 'SG') {
				this.telProps.maxLen = 8;
			} else if (country.iso2 == 'MY' || country.iso2 == 'PH') {
				this.telProps.maxLen = 10;
			} else {
				this.telProps.maxLen = 0;
			}
		},

		//calendar methods
		calNextPrev(type) {
			let calendarApi = this.$refs.calendar.getApi();
			
			if(type == 'next'){
				calendarApi.next();
				this.dateRange = calendarApi.getDate();
				// console.log(this.dateRange);


			} else if(type == 'prev') {
				calendarApi.prev();
				this.dateRange = calendarApi.getDate();
				// console.log(this.dateRange);
				
			} else if (type == 'today') {
				calendarApi.today();
				this.dateRange = calendarApi.getDate();
				// console.log(this.dateRange);
			}
			

			// this.$refs.calendar.gotoDate(moment("2019-11-03"));
			// this.config.gotoDate =  moment("2019-10-30");
		},
		handleDateClick(data) {
			let time = moment(data.date).format('hh:mm');
			let start = moment(data.date).format('YYYY-MM-DD HH:mm');
			let end = moment(data.date).add(15, 'minute').format('YYYY-MM-DD HH:mm');
			let item = {
				title: 'test event', // a property!
				allDay: false, // Boolean (true or false).
				start: start, // a property! YYYY - MM - DD hh:mm:ss:sss
				end: end, // a property! ** see important note below about 'end' ** YYYY - MM - DD hh:mm:ss:sss
				backgroundColor: '#3a87ad',
			};
			this.newEvent.push(item);
			//console.log('item', item, 'newEvent', this.newEvent);
			if (data.date >= this.config.now) {
				let timeClicked = moment(data.date).format('MMMM DD YYYY hh:mm A');
				console.log(`book now at ${timeClicked}`);
			} else {
				//console.log(`Invalid date`);
			}
		},
		handleEventClick(data) {
			console.log('event clicked')
		},
		handelSelect(info) {
			let start = moment(info.startStr).format('YYYY-MM-DD HH:mm');
			let end = moment(info.endStr).format('YYYY-MM-DD HH:mm');

			if (info.allDay) {
				console.log('dont click');
			} else if (moment(info.start).format('HH:mm') >= this.config.businessHours.startTime && moment(info.end).format('HH:mm') <= this.config.businessHours.endTime && info.start > this.config.now) {
				this.selectState = 1;
				this.appModal = true;
				this.dropDownDoctor = false;
				this.dropDownService = false;
				this.dropDownDuration = false;
				this.dropDownDay = false;
				this.serviceCustomIndicator = 0;
				this.appDetails = {};

				let item = {
					title: ' ', // a property!
					allDay: false, // Boolean (true or false).
					start: start, // a property! YYYY - MM - DD hh:mm:ss:sss
					end: end, // a property! ** see important note below about 'end' ** YYYY - MM - DD hh:mm:ss:sss
					backgroundColor: '#3a87ad',
				};
				this.newEvent.push(item);
				this.config.events = this.newEvent; // should be array format
			} else {
				let item = {
					title: ' ', // a property!
					allDay: false, // Boolean (true or false).
					start: start, // a property! YYYY - MM - DD hh:mm:ss:sss
					end: end, // a property! ** see important note below about 'end' ** YYYY - MM - DD hh:mm:ss:sss
					backgroundColor: '#3a87ad',
				};
				this.newEvent.push(item);
				this.config.events = this.newEvent; // should be array format
				this.selectState = 0;
			}
			//console.log(start, end);

			
			//console.log('item', item, 'Event', this.config.events);
		},
		handleMouseLeave() {
			if (this.selectState == 0) {
				this.config.events.pop();
				this.selectState = 1;
			} else {
				console.log(`don't remove`);
			}
		},
		handleDefaultView(data, name) {
			this.calViewNow = data;
			let calendarApi = this.$refs.calendar.getApi();
			calendarApi.changeView(data);
			// this.config.defaultView = data;
			this.calendarView = name;
			// if (this.calendarView == 'Monthly' && this.calViewNow == 'dayGridMonth') {
			// 	this.config.selectable = false;
			// }
			//console.log(this.config.defaultView);
		},
		// End of Calendar methods
		//header Methods
		handleSelectHeaderDoctor(){
			this.headerDoctorDropdown = !this.headerDoctorDropdown;
			this.headerCalendarView = false;
			this.headerSettingsDropdown = false;
		},
		handleSelectCalendarView(){
			this.headerCalendarView = !this.headerCalendarView;
			this.headerDoctorDropdown = false;
			this.headerSettingsDropdown = false;
		},
		handleSelectSettingsDropdown(){
			this.headerSettingsDropdown = !this.headerSettingsDropdown;
			this.headerDoctorDropdown = false;
			this.headerCalendarView = false;
		},
		//Modal Methods
		//Appointments
		handleSelectDoctor() {
			this.dropDownDoctor = !this.dropDownDoctor;
			this.dropDownService = false;
			this.dropDownDuration = false;
			this.dropDownDay = false;
		},
		handleSelectService() {
			this.dropDownService = !this.dropDownService;
			this.dropDownDoctor = false;
			this.dropDownDuration = false;
			this.dropDownDay = false;
		},
		handleSelectDuration() {
			this.dropDownDuration = !this.dropDownDuration;
			this.dropDownService = false;
			this.dropDownDoctor = false;
			this.dropDownDay = false;

		},
		handleSelectDay() {
			this.dropDownDay = !this.dropDownDay;
			this.dropDownService = false;
			this.dropDownDoctor = false;
			this.dropDownDuration = false;
		},
		//setup
		handleSpeciality() {
			this.setupSpeciality = !this.setupSpeciality;
		},
		handleServiceTime() {
			this.setupServiceTime = !this.setupServiceTime;
			this.setupDoctor = false;
		},
		handleSetupDoctor() {
			this.setupDoctor = !this.setupDoctor;
			this.setupServiceTime = false;
		},
		next() {
			let limit = 5;
			if (this.setup.stepper < limit) {
				this.setup.stepper++
					// this.$forceUpdate();
			}
		},
		back() {
			let limit = 0;
			if (this.setup.stepper > limit) {
				this.setup.stepper--
					// this.$forceUpdate();
			}
		},
		selectedData(type, data, indicator) {
			if (type == 'doctor') {
				this.appDetails.doctor = data;
				this.handleSelectDoctor();
			} else if (type == 'service') {
				this.appDetails.service = data;

				if (indicator == 2) {
					this.appDetails.service = undefined;
					this.serviceCustomIndicator = indicator;
					//console.log(this.serviceCustomIndicator);
				} else {
					this.serviceCustomIndicator = indicator;
				}
				this.handleSelectService();
			} else if (type == 'duration') {
				this.appDetails.duration = data;
				this.handleSelectDuration();
			} else if (type == 'day') {
				this.appDetails.time = data;
				this.handleSelectDay();
			}
			//setup modal
			else if (type == 'speciality') {
				this.setup.dataStorage.speciality = data;
				this.handleSpeciality();
			} else if (type == 'serviceTime') {
				this.setup.dataStorage.serviceTime = data;
				this.handleServiceTime();
			}
		},
		btnContinue(indicator) {
			console.log(indicator);
			if (indicator == 3){
				this.searchNewPatient = 0;
			} else if (indicator == 'newPatient') {
				this.searchNewPatient = 1;
			} else if (indicator == 'confirm') { // newPatient button
				this.searchNewPatient = 2;
			}
			//console.log('Modal form data', this.appDetails);
		},

	},
	computed: {
		//For Services li
		services() {
			let service = [{
					name: 'Slot Blocker',
					type: 1,
					time: 'Custom'
				},
				{
					name: 'Appointment Without SMS Notification',
					type: 2,
					time: 'Custom'
				},
				{
					name: 'Medicine & Treatment',
					type: 3,
					time: '10 mins'
				}
			];

			let service2 = [{
				name: 'Medicine & Treatment',
				type: 3,
				time: '10 mins'
			}]

			if (this.serviceCustomIndicator == 2) {
				return service2;
			} else {
				return service
			}
		},
		doctors() {
			let doctor = [{
				name: 'Dr Jimmy Yap',
				imgUrl: '../assets/img/clinic/ico_Profile.svg'
			}];
			return doctor;
		},
		specialities() {
			let specialities = [{
					name: 'Health Specialist',
					type: 1,
				},
				{
					name: 'Wellness',
					type: 2,
				},
				{
					name: 'Medical Spa',
					type: 3,
				}
			];

			return specialities;
		},
		hoursPerday() {
			let day = 23;
			let hours = []
			let formatTime;

			for (let i = 0; i < day + 1; i++) {
				let min = 15;
				for (let x = 4; x > 0; x--) {
					formatTime = (moment().hours(day).subtract(i, 'hours').minutes(min * x).format('hh:mmA'));
					hours.unshift(formatTime);
				}

			}
			// formatTime = (moment().subtract(22, 'hours').format('hh:00 A'));
			// hours.unshift(formatTime);

			return hours;
		},
		selectedDateRange() {
			let date = this.dateRange;
			//console.log(`${moment(date).date()} date / ${moment(date).day()} day`);
			let first = moment(date).date() - moment(date).day(); // First day is the day of the month - the day of the week
			let last = first + 6; // last day is the first day + 6

			let firstday = moment(date).date(first+1).format('MMM DD');
			let lastday = moment(date).date(last+1).format(' MMM DD YYYY');

			let selectedDate;
			//console.log(this.calViewNow);
			if (this.calViewNow == 'timeGridWeek') {
				selectedDate = `${firstday} - ${lastday}`;
				//console.log(selectedDate);
				return selectedDate;
			} else if (this.calViewNow == 'dayGridMonth') {
				selectedDate = `${moment(date).format('MMMM YYYY')}`;
				//console.log(selectedDate);
				return selectedDate;
			}
		}
	},
	watch: {
		dateRange() {
			let date = moment(this.dateRange).format('YYYY-MM-DD');
			let calendarApi = this.$refs.calendar.getApi();

			calendarApi.gotoDate(date);
		},

		'headerSettings.dropDown'(){
			if(this.headerSettings.dropDown == true) {
				this.headerSettings.tabs = false;
				this.headerSettings.doctorstab = false;
				
			} else {
				this.headerSettings.dropDown = false;
			}
		},
		'headerSettings.tabs'(){
			if(this.headerSettings.tabs == true) {
				this.headerSettings.dropDown = false;
				this.headerSettings.doctorstab = true;
			} else {
				this.headerSettings.tabs = false;
			}
		},
	}
};

export default calendar;
</script>

<style lang="scss">
@import "./src/assets/css/clinic/calendar.scss";
@import "./src/assets/css/clinic/clinic-responsive.scss";
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
</style>






