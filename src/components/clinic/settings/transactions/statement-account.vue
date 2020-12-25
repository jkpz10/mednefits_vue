<script>
	import axios from 'axios';
	import moment from 'moment';

	var statementAccount = {
		data() {
			return {
				timeFrame: {},
	      viewSelector: false,
	      viewStatementAccount: false,
			}
		},
		methods: {
	    btnView() {
	    	if( this.viewSelector === false ) {
	    		this.viewSelector = true;
	    	} else {
	    		this.viewSelector = false;
	    	}
	    },
	    viewStatement() {
	    	if( this.viewStatementAccount === false ) {
	    		this.viewStatementAccount = true;
		    } else {
		    	this.viewStatementAccount = false;
		    }
	    }
		}
	
	}

	export default statementAccount
</script>

<style lang="scss" scoped>
@import "./src/assets/css/clinic/settings.scss";
@import "./src/assets/css/clinic/clinic-responsive.scss";
</style>