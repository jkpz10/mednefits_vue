<script>
/* eslint-disable */

// Methods here
let enrollmentOptions = {
  data() {
    return {
      isRequiredTiering: null,
    };
  },
  methods: {
    toggleEnrollmentOptions( opt ) {
      this.isRequiredTiering = opt;
    },
    next() {
      if ( this.isRequiredTiering === 1 ) {
        this.$router.push( "create-team-benefits-tier" );
      } else if ( this.isRequiredTiering === 0 ) {
        this.$router.push( "enrollment" );
      }
      localStorage.setItem('isRequiredTiering', this.isRequiredTiering == 1 ? true : false );
    }
  }
};

export default enrollmentOptions
</script>

<style lang="scss" scoped>
	@import './src/assets/css/company/enrollment.scss'
</style>