<script>
	import axios from 'axios';
	import moment from 'moment';

	var transactionHistory = {
		data() {
			return {
				timeFrame: {},
				year_active: {
	        value: 0,
	        text: ""
	      },
	      inDragging : false,
      	range_values : [1,6],
      	range_marks : { '1' : 'JAN', '2' : 'FEB', '3' : 'MAR', '4' : 'APR', '5' : 'MAY', '6' : 'JUN', '7' : 'JUL', '8' : 'AUG', '9' : 'SEP', '10' : 'OCT', '11' : 'NOV', '12' : 'DEC', },
	      current_year : moment( ).format('YYYY'),
	      start_date : new Date(moment().startOf('year')),
	      end_date : new Date(moment().endOf('month')),
	      formats: {
	        input: ['MM/DD/YYYY'], 
	        data: ['YYYY-MM-DD']
	      },
			}
		},
		methods: {
	    setYear(value, text) {
	      this.year_active.value = value;
	      this.year_active.text = text; 
	    },
		}
	}

	export default transactionHistory
</script>

<style lang="scss" scoped>
@import "./src/assets/css/clinic/settings.scss";
@import "./src/assets/css/clinic/clinic-responsive.scss";
</style>