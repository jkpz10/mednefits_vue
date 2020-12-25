<script>
/* eslint-disable */
// imports here
import Modal from "../../views/company/modal/Modal.vue";
import WebInput from "../../views/company/enrollment/Web-input.vue";
import moment from "moment";
import jQuery from "jquery";
import { isNull } from "util";
import { parse } from "path";
const $ = jQuery;
window.$ = $;

// Methods here
let enrollment = {
  components: {
    Modal,
    WebInput
  },
  data() {
    return {
      isType: "", //excel or web input
      isState: "enrollment", //navigation title
      summaryBtn: false, // summary state
      isChecked: [], // used in enrollment summary
      dependentState: false, //used in web input
      empDepNavState: false, //used in web input
      selected_emp_dep_tab: 1, //used in web input
      modalEdit: false, //edit modal
      // data binding store data from WEB INPUT forms
      indexData: 0, // counter for employee
      depIndexData: 0, // counter for dependent
      prevDisabled: false,
      depPrevChevronState: false, //show hide chevron button
      depNextChevronState: false, //show hide chevron button
      employeeDetails: {}, //used in web input
      dependentDetails: {}, //used in web input
      employeeStorage: [ //used in web input
        // {
        // //   fname: "jazer",
        // //   lname: "zayas",
        // //   dependents: [
        // //     {
        // //       fname: "jazer",
        // //       lname: "zayas"
        // //     },
        // //     {
        // //       fname: "jazer",
        // //       lname: "zayas"
        // //     }
        // //   ]
        // }
      ],
      dependentStorage: [ //used in web input
        //     {
        //       fname: "jazer",
        //       lname: "zayas"
        //     },
        //     {
        //       fname: "jazer",
        //       lname: "zayas"
        //     }
      ],
      date: new Date(), // Jan 25th, 2018
      //for Excel
      empType: "empOnly",
      stepperState: "",
      checkedlistEmpOnly: [],
      checkedlistEmpDependents: [],
    };
  },
  created() {
    this.$emit("enrollmentData", {
      isState: "enrollment"
    });
  },
  methods: {
    type(data) { //used in enrollment
      this.isType = data;
      // console.log(this.isType);
    },
    next(data) { // use in enrollment
      if (this.isType === "web") {
        this.isState = "web";
        this.$router.push('enrollment/web-input');
      } else if (this.isType === "excel") {
        this.isState = "excel";
        this.$router.push('enrollment/excel');
      } else {
        console.log("select 1 item");
      }
      localStorage.setItem('enrollmentOption', this.isType );
    },
    //to check is object empty globall
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }
  },
  
};

export default enrollment;
</script>

<style lang="scss" >
@import "./src/assets/css/company/enrollment.scss";
</style>