<script>
/* eslint-disable */
import axios from 'axios';
// Methods here
let intro = {
  data() {
    return {
      introData: {},
    };
  },
  created() {
  	setTimeout(() => {
			this.getCompanyStatus();
    }, 500);
	},
  methods: {
  	getCompanyStatus(){
  		this.$parent.showLoading();
    	axios.get( axios.defaults.serverUrl.node_company + '/hr/check_plan' )
				.then(res => {
					console.log(res);
					if( res.data.status ){
						this.introData = res.data.data;
						if( this.introData.checks == true ){
							this.$router.push({ name: 'CompanyHome' });
							this.$parent.hideLoading();
						} else {
							this.$parent.hideLoading();
						}
					}else{
						this.$parent.hideLoading();
						this.$parent.swal('Error!', res.data.message, 'error');
					}
				})
				.catch(err => {
					console.log( err );
					this.$parent.hideLoading();
					this.$parent.swal('Error!', err,'error');
				});
  	}
  }
};

export default intro;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/company/intro.scss";
</style>