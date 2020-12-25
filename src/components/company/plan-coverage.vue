<script>
import moment from 'moment'
//Methods here
let planCoverage = {
  data() {
    return {
      showPlanCoverageInfo: {
      	value: 0,
      	text: ""
			},
    };
  },
  methods: {
  	planCoverageList(value, text) {
  		this.showPlanCoverageInfo.value = value;
  		this.showPlanCoverageInfo.text = text;
  	},

  }
};

export default planCoverage
</script>

<style lang="scss" scoped>
@import "./src/assets/css/company/plan-coverage.scss";
</style>
