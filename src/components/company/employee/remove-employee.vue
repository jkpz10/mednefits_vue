<script>
/* eslint-disable */
import Modal from "../../../views/company/modal/Modal.vue";
import { error } from "util";
import axios from "axios";
import moment, { locale } from "moment";
import { POINT_CONVERSION_HYBRID } from "constants";

let removeEmployee = {
  components: {
    Modal
  },
  props: {
    name: {
      type: null
    },
    dep: {
      type: null
    }
  },
  data() {
    return {
      sampleData: false,
      removeState: "default",
      spendingState: "account_summary",
      outcome_checked: 0,
      dep_outcome_checked: 0,
      replace_emp_data: {},
      replace_dep_data: {},
      removeData: {
        customer_id: null,
        employeeInfo: JSON.parse(localStorage.getItem("selectedEmployee")),
        dependentInfo: this.dep,
        reserve_emp_date: new Date(),
        last_day_coverage: new Date()
      },
      health_spending_summary: {},
      update_member_wallet_status: null,
      formats: {
        input: ["DD/MM/YYYY"],
        data: ["DD/MM/YYYY"]
      },
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

    };
  },
  created() {
    if (this.name == "dependent") {
      this.removeState = "dependentDefault";
    }

    console.log(this.removeData.dependentInfo);
    this.getSession();
    this.getSpendingAccountSummary();
  },
  mounted() {
    this.removeData.last_day_coverage.setDate(
      this.removeData.last_day_coverage.getDate() + 1
    );
    this.removeData.reserve_emp_date.setDate(
      this.removeData.reserve_emp_date.getDate() + 1
    );
  },
  methods: {
    setAreaCode(formattedNumber, { number, isValid, country }) {
			this.replace_emp_data.mobile_area_code = country.dialCode;
      this.replace_emp_data.mobile_area_code_country = country;

      if( country.iso2 == 'SG') {
        this.telProps.maxLen = 8;
      } else if (country.iso2 == 'MY' || country.iso2 == 'PH') {
        this.telProps.maxLen = 10;
      } else {
        this.telProps.maxLen = 0;
      }

      // console.log(this.replace_emp_data.mNumber, country.iso2, this.replace_emp_data.mobile_area_code);

		},
    next(data) {
      // this.getSpendingAccountSummary();
      if (data === "outcome") {
        if (this.outcome_checked == 1) {
          //replace
          this.removeState = "replacement";
          this.outcome_checked = 1;
          // this.$refs.areaCode.choose(this.sgAreaCode);
          console.log(this.outcome_checked, this.removeState);
        } else if (this.outcome_checked == 2) {
          //reserve
          this.removeState = "health_spending_wrapper";
          this.spendingState = "reserve";
          this.outcome_checked = 2;
          console.log(
            this.outcome_checked,
            this.removeState,
            this.spendingState
          );
        } else if (this.outcome_checked == 3) {
          //remove
          this.removeState = "health_spending_wrapper";
          this.spendingState = "remove";
          this.outcome_checked = 3;
          console.log(
            this.outcome_checked,
            this.removeState,
            this.spendingState
          );
        } else {
          console.log(this.outcome_checked, this.removeState);
        }
      } else if (
        data === "replacement" &&
        !this.isEmpty(this.replace_emp_data)
      ) {
        console.log("ni work ni", this.replace_emp_data);
        this.checkEmployeeForm(this.replace_emp_data);

        if (this.checkEmployeeForm(this.replace_emp_data)) {
          this.removeState = "health_spending_wrapper";
          this.spendingState = "replace";
        }
      } else if (data === "confirm") {
        this.confirmWalletUpdateBtn();
        this.$router.go(-2);
      } else {
        this.$parent.swal("Warning", "Error");
      }
    },
    next_dep(data) {
      if (data === "dep_outcome") {
        if (this.dep_outcome_checked == 1) {
          //replace
          this.removeState = "dependentReplacement";
          this.dep_outcome_checked = 1;
        } else if (this.dep_outcome_checked == 2) {
          //delete
          this.dep_outcome_checked = 2;
          this.deleteDependent();
        }
      } else if (
        data === "dependentReplacement" &&
        !this.isEmpty(this.replace_dep_data)
      ) {
        this.checkDependentForm(this.replace_dep_data);

        if (this.checkDependentForm(this.replace_dep_data)) {
          this.reserveDependent();
          console.log("add dep success");
          this.$router.go(-1);
        }
      } else {
        this.$parent.swal("Warning", "Error");
      }
    },
    confirmWalletUpdateBtn() {
      if (this.update_member_wallet_status) {
        let last_day = moment(this.removeData.last_day_coverage).format(
          "YYYY-MM-DD"
        );
        this.updateWalletMember(
          this.removeData.employeeInfo.user_id,
          this.removeData.customer_id,
          last_day
        );
      } else {
        this.$parent.swal(
          "Success!",
          "Member has successfully scheduled for remove.",
          "success"
        );
      }

      if (this.outcome_checked == 1) {
        //replace
        this.replaceEmployee(this.replace_emp_data);
      } else if (this.outcome_checked == 2) {
        //reserve
        this.reserveEmployee();
      } else if (this.outcome_checked == 3) {
        //remove
        this.deleteEmployee();
      }
    },

    //API calls
    getSession() {
      axios
        .get(`${axios.defaults.serverUrl.node_company}/get-hr-session`)
        .then(res => {
          this.removeData.customer_id = res.data.customer_buy_start_id;
          this.$parent.hideLoading();
        })
        .catch(err => {
          console.log(err);
          this.$parent.hideLoading();
          this.$parent.swal("Error!", err, "error");
        });
    },
    getSpendingAccountSummary() {
      let emp_id = this.removeData.employeeInfo.user_id;
      let customer_id = this.removeData.customer_id;
      let last_day = moment(
        this.removeData.last_day_coverage,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");

      axios
        .get(
          `${axios.defaults.serverUrl.node_company}/hr/get_employee_spending_account_summary?employee_id=${emp_id}&customer_id=${customer_id}&last_date_of_coverage=${last_day}`
        )
        .then(res => {
          console.log(res);

          this.health_spending_summary = res.data;
          this.$parent.hideLoading();
          this.$forceUpdate();
        })
        .catch(err => {
          console.log(err);
          this.$parent.hideLoading();
          this.$parent.swal("Error!", err, "error");
        });
    },
    updateWalletMember(emp_id, customer_id, last_day) {
      axios
        .get(
          `${axios.defaults.serverUrl.node_company}/hr/get_employee_spending_account_summary?employee_id=${emp_id}&customer_id=${customer_id}&last_date_of_coverage=${last_day}&calibrate_wellness=true&calibrate_medical=true`
        )
        .then(res => {
          if (res.data.status) {
            this.$parent.swal(
              "Success!",
              "Member has successfully scheduled for remove and credits updated according.",
              "success"
            );
          } else {
            this.$parent.swal("Error!", response.data.message, "error");
          }
          this.$parent.hideLoading();
        })
        .catch(err => {
          console.log(err);
          this.$parent.hideLoading();
          this.$parent.swal("Error!", err, "error");
        });
    },
    deleteEmployee() {
      this.$parent.showLoading();

      let users = [
        {
          expiry_date: moment(
            this.removeData.last_day_coverage,
            "DD/MM/YYYY"
          ).format("YYYY-MM-DD"),
          user_id: this.removeData.employeeInfo.user_id
        }
      ];

      axios
        .post(`${axios.defaults.serverUrl.node_company}/hr/employees/withdraw`, {
          users: users
        })
        .then(res => {
          this.$parent.hideLoading();

          if (res.data.status) {
            this.getSession();
          } else {
            this.$parent.swal("Error!", response.data.message, "error");
          }
        })
        .catch(err => {
          console.log(err);
          this.$parent.hideLoading();
          this.$parent.swal("Error!", err, "error");
        });
    },
    reserveEmployee() {
      let data = {
        employee_id: this.removeData.employeeInfo.user_id,
        // date_enrollment : moment( scope.reserve_emp_date, 'DD/MM/YYYY' ).format('YYYY-MM-DD'),
        last_date_of_coverage: moment(
          this.removeData.last_day_coverage,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD"),
        customer_id: this.removeData.customer_id
      };

      this.$parent.showLoading();
      axios
        .post(
          `${axios.defaults.serverUrl.node_company}/hr/create_employee_replace_seat`,
          data
        )
        .then(res => {
          this.$parent.hideLoading();

          if (res.data.status) {
            this.getSession();
          } else {
            this.$parent.swal("Error!", response.data.message, "error");
          }
        })
        .catch(err => {
          console.log(err);
          this.$parent.hideLoading();
          this.$parent.swal("Error!", err, "error");
        });
    },
    replaceEmployee(data) {
      this.$parent.showLoading();

      data.last_day_coverage = moment(
        this.removeData.last_day_coverage,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      data.replace_id = this.removeData.employeeInfo.user_id;
      data.startDate = moment(data.startDate, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );

      if (!data.medical_credits) {
        data.medical_credits = 0;
      }

      if (!data.wellness_credits) {
        data.wellness_credits = 0;
      }

      let newData = {
        dob: moment(data.dob, "DD/MM/YYYY").format("YYYY-MM-DD"),
        email: data.email,
        first_name: data.fname,
        last_day_coverage: data.last_day_coverage,
        last_name: data.lname,
        medical_credits: data.medical_credits,
        mobile: data.mNumber,
        nric: data.nricFinNo,
        plan_start: data.startDate,
        postal_code: data.postal,
        replace_id: data.replace_id,
        wellness_credits: data.wellness_credits
      };

      axios
        .post(`${axios.defaults.serverUrl.node_company}/hr/employee/replace`, newData)
        .then(res => {
          this.$parent.hideLoading();

          if (res.data.status) {
            this.getSession();
          } else {
            this.$parent.swal("Error!", response.data.message, "error");
          }
        })
        .catch(err => {
          console.log(err);
          this.$parent.hideLoading();
          this.$parent.swal("Warning!", err, "error");
        });
    },
    reserveDependent() {
      let data = {
        user_id: this.removeData.dependentInfo.user_id,
        date_enrollment: moment(
          this.removeData.reserve_emp_date,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD"),
        last_date_of_coverage: moment(
          this.removeData.last_day_coverage,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD"),
        customer_id: this.removeData.customer_id
      };

      this.$parent.showLoading();

      axios
        .post(
          `${axios.defaults.serverUrl.node_company}/hr/create_dependent_replace_seat`,
          data
        )
        .then(res => {
          this.$parent.hideLoading();

          if (res.data.status) {
            this.$parent.swal("Success!", res.data.message, "success");
            this.getSession();
          } else {
            this.$parent.swal("Error!", res.data.message, "error");
          }
        })
        .catch(err => {
          console.log(err);
          this.$parent.hideLoading();
          this.$parent.swal("Warning!", err, "error");
        });
    },
    deleteDependent() {
      this.$swal({
          title: "Confirm",
          text: "Are you sure you want to remove this dependent?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#ff6864",
          confirmButtonText: "Remove",
          cancelButtonText: "No",
          customClass: "warning-global-container primary"
        }).then(res => {
          if (res.value) {
            console.log('e remove dpt');
            let data = {
              expiry_date: moment(this.removeData.last_day_coverage,"DD/MM/YYYY").format("YYYY-MM-DD"),
              user_id: this.removeData.dependentInfo.user_id
            };

            axios.post(`${axios.defaults.serverUrl.node_company}/hr/with_draw_dependent`, data)
              .then(res => {
                this.$parent.hideLoading();

                if (res.data.status) {
                  this.$parent.swal(
                    "Updated!",
                    "Employee details has been updated.",
                    "success"
                  );
                  this.getSession();
                  this.$router.go(-1);
                } else {
                  this.$parent.swal("Error!", res.data.message, "error");
                }
              })
              .catch(err => {
                console.log(err);
                this.$parent.hideLoading();
                this.$parent.swal("Warning!", err, "error");
              });
          }
        });
    },
    //GLobal used function
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },
    checkDependentForm(data) {
      console.log(data);
      var err = 0;
      if (!data.fname) {
        this.$parent.swal("Error!", "First name is required!", "error");
        return false;
      }
      if (!data.lname) {
        this.$parent.swal("Error!", "Last name is required!", "error");
        return false;
      }
      if (!data.nricFinNo) {
        this.$parent.swal("Error!", "NRIC/FIN is required!", "error");
        return false;
      } else {
        if (this.checkNRIC(data.nricFinNo) == false) {
          this.$parent.swal("Error!", "Invalid NRIC!", "error");
          return false;
        }
      }
      if (!data.dob) {
        this.$parent.swal("Error!", "Date of Birth is required!", "error");
        return false;
      }
      if (!data.relation) {
        this.$parent.swal("Error!", "Relationship is required!", "error");
        return false;
      }
      if (!data.startDate) {
        this.$parent.swal("Error!", "Start Date is required!", "error");
        return false;
      }
      return true;
    },
    checkEmployeeForm(data) {
      console.log(data);
      var err = 0;
      if (!data.fname) {
        this.$parent.swal("Error!", "First name is required!", "error");
        return false;
      }
      if (!data.lname) {
        this.$parent.swal("Error!", "Last name is required!", "error");
        return false;
      }
      if (!data.nricFinNo) {
        this.$parent.swal("Error!", "NRIC/FIN is required!", "error");
        return false;
      } else {
        if (this.checkNRIC(data.nricFinNo) == false) {
          this.$parent.swal("Error!", "Invalid NRIC!", "error");
          return false;
        }
      }
      if (!data.dob) {
        this.$parent.swal("Error!", "Date of Birth is required!", "error");
        return false;
      }
      if (!data.email) {
        this.$parent.swal("Error!", "Email Address is required!", "error");
        return false;
      } else {
        if (this.checkEmail(data.email) == false) {
          this.$parent.swal("Error!", "Invalid Email!", "error");
          return false;
        }
      }
      if (!data.mNumber) {
        this.$parent.swal("Error!", "Mobile Number is required!", "error");
        return false;
      }
      if (!data.postal) {
        this.$parent.swal("Error!", "Postal Code is required!", "error");
        return false;
      }
      if (!data.startDate) {
        this.$parent.swal("Error!", "Start Date is required!", "error");
        return false;
      }
      return true;
    },
    checkNRIC(value) {
      var nric_pattern = new RegExp("^[stfgSTFG]{1}[0-9]{7}[a-zA-z]{1}$");
      return nric_pattern.test(value);
    },
    checkEmail(value) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(value);
    }
  }
};

export default removeEmployee;
</script>

<style lang="scss" scoped>
@import "./src/assets/css/company/employee.scss";
</style>