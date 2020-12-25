<script>
import axios from 'axios';
// script here
import Enrollment from "./enrollment";
// import Excel from "../../views/company/enrollment/Excel.vue";
import WebInput from "../../views/company/enrollment/Web-input.vue";
import Overview from "./overview";

axios.defaults.headers.common['Authorization'] = localStorage.getItem('vue_hr_session');

let dashboard = {
  components: {
    Enrollment,
    WebInput,
    Overview
  },
  data() {
    return {
      isState: "enrollment",
      stepStatus : 1,
      isActive: false,
      isDropdown: false, //hide show Dropdown,
      accountDropdown: false,
      showIconLoader: false,
      showLoader: false,
      isFloatingBox: false,
      navbarCollapse: false,
      hideNavbarCollapse: true
    };
  },
  methods: {
    swal( title, message, type ) {
      this.$swal( title, message, type);
    },
    showIconLoading() {
      this.showIconLoader = true;
    },
    hideIconLoading() {
      setTimeout(()=>{
        this.showIconLoader = false;
      },1000);
    },
    showLoading() {
      this.showLoader = true;
    },
    hideLoading() {
      setTimeout(()=>{
        this.showLoader = false;
      },1000);
    },
    showFloatingBox() {
      this.isFloatingBox = true;
    },
    hideFloatingBox() {
      setTimeout(()=>{
        this.isFloatingBox = false;
        $('.receipt-download').hide();
        $('.receipt-download #receipt_total').text( 1 );
        $('.receipt-download #receipt_count').text( 1 );
      },1000);
    },
    // change the title on navigation to Web Input and Enrollment and excel
    // functions from $emit data from another component
    excelData(state) {
      this.stepStatus = state.stepStatus;
    },
    webInputData(state) {
       this.isState = state.isState;
    },
    enrollData(state) {
       this.stepStatus = state.stepStatus;
    },
    overviewData(state) {
      this.isState = state.isState;
    },
    //Dropdown methods toggle show hide dropdown
    dropdownClicked(data) {
      if (data === "employee") {
        this.isDropdown = !this.isDropdown;
      } else if (data === "account") {
        this.accountDropdown = !this.accountDropdown;
      }
    },
    // if dropdown open then close dropdown when click anywhere in page
    employeeDocumentClick(e) {
      if (this.isDropdown === true) {
        let el = this.$refs.employeeDropdownMenu;
        let target = e.target;
        if (el !== target && !el.contains(target)) {
          this.isDropdown = false;
        }
      }
    },
    accountDocumentClick(e) {
      if (this.accountDropdown === true) {
        let el = this.$refs.accountDropdownMenu;
        let target = e.target;
        if (el !== target && !el.contains(target)) {
          this.accountDropdown = false;
        }
      }
    },
    btnNavbarCollapse() {
      if(this.navbarCollapse == false ) {
        this.navbarCollapse = true;
      }else {
        this.navbarCollapse = false;
      }
    },
    btnHideNavbarCollapse() {
      this.navbarCollapse = false;
    },
    logoutAccount(){
      this.showLoading();
      localStorage.setItem('vue_hr_session', null);
      this.$router.push({ name: 'CompanyAuth' });
      this.hideLoading();
    },
    // Your Methods here
  },
  created() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('vue_hr_session');
    if( !localStorage.getItem('vue_hr_session') || localStorage.getItem('vue_hr_session') == null || localStorage.getItem('vue_hr_session') == 'null' ){
      this.$router.push({ name: 'CompanyAuth' });
    }
    // close dropdown when click anywhere in page
    document.addEventListener("click", this.employeeDocumentClick);
    document.addEventListener("click", this.accountDocumentClick);
  },
  destroyed() {
    // close dropdown when click anywhere in page
    // important to clean up!!
    document.removeEventListener("click", this.employeeDocumentClick);
    document.removeEventListener("click", this.accountDocumentClick);
  }
};

export default dashboard;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/company/dashboard.scss";
</style>