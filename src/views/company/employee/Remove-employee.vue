<template>
  <div class="overview-info-wrapper">

    <!-- remove employee-->
    <div class="remove-employee-wrapper">
      <img @click="$router.go(-1)" :src="'../assets/img/icons/cancel.png'">

      <div v-if="removeState === 'default'" class="remove-details-wrapper">
        <h1>Remove employee</h1>
        <form class="form-input-container">
          <div class="employee-input-container">
            <div class="employee-input-wrapper">
              <label class="remove-label" for="fname">Full Name</label>
              <input type="text" name="fname" readonly='true' v-model="removeData.employeeInfo.fname">
            </div>
             <div class="employee-input-wrapper remove-dob">
              <label class="remove-label" for="">Last day of coverage</label>
              <v-date-picker :max-date='new Date()' :formats='formats' v-model="removeData.last_day_coverage"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'>
              </v-date-picker>
            </div>
            <!-- <div class="employee-input-wrapper">
              <label class="remove-label" for="fname">Last / Family Name</label>
              <input type="text" name="lname" readonly='true' v-model="removeData.employeeInfo.lname">
            </div> -->
          </div>
          <!-- <div class="employee-input-container">
            <div class="employee-input-wrapper remove-dob">
              <label class="remove-label" for="">Last day of coverage</label>
              <v-date-picker :max-date='new Date()' :formats='formats' v-model="removeData.last_day_coverage"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'>
              </v-date-picker>
            </div>
          </div> -->
        </form>
      </div>

      <div v-if="removeState === 'dependentDefault'" class="remove-details-wrapper">
        <h1>Remove employee</h1>
        <form class="form-input-container">
          <div class="employee-input-container">
            <div class="employee-input-wrapper">
              <label class="remove-label" for="fname">Full Name</label>
              <input type="text" name="fname" readonly='true' v-model="removeData.dependentInfo.first_name">
            </div>
            <div class="employee-input-wrapper remove-dob">
              <label class="remove-label" for="">Last day of coverage</label>
              <v-date-picker :max-date='new Date()' :formats='formats' v-model="removeData.last_day_coverage"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'>
              </v-date-picker>
            </div>
          </div>
          <div class="employee-input-container">
            <!-- <div class="employee-input-wrapper remove-dob">
              <label class="remove-label" for="">Last day of coverage</label>
              <v-date-picker :max-date='new Date()' :formats='formats' v-model="removeData.last_day_coverage"
                :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'>
              </v-date-picker>
            </div> -->
          </div>
        </form>
      </div>

      <!-- CheckList Todo -->
      <div v-if="removeState === 'todo'" class="employee-outcome-wrapper">
        <h1>How would you like to proceed?</h1>
        <div class="employee-outcome-container">
          <div class="outcome-title">Please select one of the outcome:</div>
          <label class="review-container">
            <input type="radio" name="outcome" value="1" v-model="outcome_checked">
            <span class="review-prepare-template-text">To replace the leaving employee, I would like to pre-enroll the
              new joiner. </span>
            <span class="review-checkmark"></span>
          </label>
          <label class="review-container">
            <input type="radio" name="outcome" value="2" v-model="outcome_checked">
            <span class="review-prepare-template-text">I'm not ready to pre-enroll the new joiner, please hold the seat
              for future hire. </span>
            <span class="review-prepare-template-subtext">*Note: Once this employee is removed, the occupied seat will
              move to a vacant seat.</span>
            <span class="review-checkmark"></span>
          </label>
          <label class="review-container">
            <input type="radio" name="outcome" value="3" v-model="outcome_checked">
            <span class="review-prepare-template-text">Please remove the seat completely, and proceed for refund.</span>
            <span class="review-checkmark"></span>
          </label>
        </div>
      </div>

      <div v-if="removeState === 'dependentTodo'" class="employee-outcome-wrapper">
        <h1>How would you like to proceed?</h1>
        <div class="employee-outcome-container">
          <div class="outcome-title">Please select one of the outcome:</div>
          <label class="review-container">
            <input type="radio" name="outcome" value="1" v-model="dep_outcome_checked">
            <span class="review-prepare-template-text">To replace the leaving employee, I would like to pre-enroll the
              new joiner. </span>
            <span class="review-checkmark"></span>
          </label>
          <label class="review-container">
            <input type="radio" name="outcome" value="2" v-model="dep_outcome_checked">
            <span class="review-prepare-template-text">Please remove the seat completely, and proceed for refund.</span>
            <span class="review-checkmark"></span>
          </label>
        </div>
      </div>


      <!-- Replacement Employee Details-->
      <div v-if="removeState === 'replacement'" class="replacement-employee-wrapper">
        <div class="employee-tier-title">Replacement</div>
        <div class="employee-details-header">
          <h1>Employee Details</h1>
        </div>
        <form>
          <div class="employee-input-container">
            <div class="employee-input-wrapper">
              <label for="fname">Full Name</label>
              <input type="text" name="fname" v-model="replace_emp_data.fname">
            </div>
            <div class="employee-input-wrapper dob">
              <label>Date of Birth</label>
              <v-date-picker v-model="replace_emp_data.dob" popoverDirection="top" :max-date='new Date()'
                :input-props='{class: "vDatepicker", placeholder: "MM/DD/YYYY", readonly: true, }'>
              </v-date-picker>
            </div>
            <!-- <div class="employee-input-wrapper">
              <label for="lname">Last / Family Name</label>
              <input type="text" name="lname" v-model="replace_emp_data.lname">
            </div> -->
          </div>
          <div class="employee-input-container">
            <!-- <div class="employee-input-wrapper nric">
              <label>
                <input type="radio" name="id_status" value="nric" v-model="replace_emp_data.nric_status">
                NRIC
              </label>
              <label>
                <input type="radio" name="id_status" value="fin" v-model="replace_emp_data.fin_status">
                FIN
              </label>
              <input type="text" name="nric-fin" v-model="replace_emp_data.nricFinNo">
            </div> -->
            <!-- <div class="employee-input-wrapper dob">
              <label>Date of Birth</label>
              <v-date-picker v-model="replace_emp_data.dob" popoverDirection="top" :max-date='new Date()'
                :input-props='{class: "vDatepicker", placeholder: "MM/DD/YYYY", readonly: true, }'>
              </v-date-picker>
            </div> -->
          </div>
          <div class="employee-input-container">
            <div class="employee-input-wrapper">
              <label for="email">Work Email</label>
              <input type="email" name="work-email" v-model="replace_emp_data.email">
            </div>
            <div class="employee-input-wrapper">
              <label for="mobile">Mobile</label>
              <vue-tel-input ref="areaCode" v-model="replace_emp_data.mNumber" v-bind="telProps" @input="setAreaCode"></vue-tel-input>
              <!-- <input type="number" name="mobile" v-model="replace_emp_data.mNumber"> -->
            </div>
          </div>
          <div class="employee-input-container">
            <div class="employee-input-wrapper">
              <label for="postal">Postal Code</label>
              <input type="text" name="postal-code" v-model="replace_emp_data.postal">
            </div>
            <div class="employee-input-wrapper">
              <label>Start Date</label>
              <v-date-picker v-model="replace_emp_data.startDate" popoverDirection="top" :date='new Date()'
                :input-props='{class: "vDatepicker", placeholder: "MM/DD/YYYY", readonly: true, }'>
              </v-date-picker>
            </div>
          </div>
          <div class="employee-input-container">
            <div class="employee-input-wrapper">
              <label for="mCredits" class="medical-text">Medical Credits</label>
              <label class="subtext">*If there are no credits to allocate, please key in 0</label>
              <input type="number" min="0" value="0" name="medical-credits" v-model="replace_emp_data.medical_credits">
            </div>
            <div class="employee-input-wrapper">
              <label for="wCredits" class="wellness-text">Wellness Credits</label>
              <label class="subtext">*If there are no credits to allocate, please key in 0</label>
              <input type="number" min="0" value="0" name="wellness-credits"
                v-model="replace_emp_data.wellness_credits">
            </div>
          </div>
        </form>
      </div>

      <div v-if="removeState === 'dependentReplacement'" class="replacement-employee-wrapper">
        <div class="employee-tier-title">Replacement</div>
        <div class="employee-details-header">
          <h1>Employee Details</h1>
        </div>
        <form>
          <div class="employee-input-container">
            <div class="employee-input-wrapper">
              <label for="fname">First / Given Name</label>
              <input type="text" name="fname" v-model="replace_dep_data.fname">
            </div>
            <div class="employee-input-wrapper">
              <label for="lname">Last / Family Name</label>
              <input type="text" name="lname" v-model="replace_dep_data.lname">
            </div>
          </div>
          <div class="employee-input-container">
            <div class="employee-input-wrapper nric">
              <label>
                <input type="radio" name="id_status" value="nric" v-model="replace_dep_data.nric_status">
                NRIC
              </label>
              <label>
                <input type="radio" name="id_status" value="fin" v-model="replace_dep_data.fin_status">
                FIN
              </label>
              <input type="text" name="nric-fin" v-model="replace_dep_data.nricFinNo">
            </div>
            <div class="employee-input-wrapper dob">
              <label>Date of Birth</label>
              <v-date-picker v-model="replace_dep_data.dob" popoverDirection="top" :max-date='new Date()'
                :input-props='{class: "vDatepicker", placeholder: "MM/DD/YYYY", readonly: true, }'>
              </v-date-picker>
            </div>
          </div>
          <div class="employee-input-container">
            <div class="employee-input-wrapper">
              <label for="fname">Relationship</label>
              <select v-model="replace_dep_data.relation">
                <option value="spouse">Spouse</option>
                <option value="child">Child</option>
                <option value="family">Family</option>
              </select>
              <img :src="'../assets/img/icons/down-arrow.svg'">
            </div>
            <div class="employee-input-wrapper">
              <label>Start Date</label>
              <v-date-picker v-model="replace_dep_data.startDate" popoverDirection="top" :date='new Date()'
                :input-props='{class: "vDatepicker", placeholder: "MM/DD/YYYY", readonly: true, }'>
              </v-date-picker>
            </div>
          </div>
        </form>
      </div>

      <!-- Health Spending Account Summary -->
      <!-- <div v-if="removeState === 'account_summary'" class="account-summary-wrapper">
              <span class="account-summary-name">Serene Song</span>
              <h1>Health Spending Account Summary</h1>
              <div class="credits-summary-container">
                <div class="account-summary-pro-rated">
                  Pro-rated allocation from
                  <span>
                    <strong>Start</strong> -
                    <span class="account-summary-date">01/01/2019</span>
                  </span> to
                  <span>
                    <strong>End</strong> -
                    <span class="account-summary-date">08/04/2019</span>
                  </span>
                </div>
                <div class="account-summary-usage">
                  Usage from
                  <span>
                    <strong>Start</strong> -
                    <span class="account-summary-date">01/01/2019</span>
                  </span> to
                  <span>
                    <strong>Current</strong> -
                    <span class="account-summary-date">19/03/2019</span>
                  </span>
                </div>
              </div>
              <div class="medical-wellness-wrapper">
                <div class="medical-container">
                  <h4>Medical Spending Account</h4>
                  <div class="spending-account-details">
                    <div class="bills-spending-container">
                      <strong>Initial Allocation</strong>
                      <div>
                        S$
                        <span>0.00</span>
                      </div>
                    </div>
                    <div class="bills-spending-container pro-rated">
                      <strong>Pro-rated Allocation</strong>
                      <div>
                        S$
                        <span>0.00</span>
                      </div>
                    </div>
                    <div class="bills-spending-container current-usage">
                      <strong>Current Usage</strong>
                      <div>
                        S$
                        <span>0.00</span>
                      </div>
                    </div>
                    <div class="current-usage-details">
                      <div class="bills-spending-container">
                        <span>Spent</span>
                        <div>
                          S$
                          <span>0.00</span>
                        </div>
                      </div>
                      <div class="bills-spending-container">
                        Pending claim
                        <div>
                          S$
                          <span>0.00</span>
                        </div>
                      </div>
                    </div>
                    <div class="bills-spending-container balance">
                      <strong>Balance</strong>
                      <div>
                        S$
                        <span>0.00</span>
                      </div>
                    </div>
                  </div>
                  <div class="spending-account-status on-track">On Track</div>
                </div>
                <div class="separator"></div>
                <div class="wellness-container">
                  <h4 class="font-helvetica-medium">Wellness Spending Account</h4>
                  <div class="spending-account-details">
                    <div class="bills-spending-container">
                      <strong>Initial Allocation</strong>
                      <div>
                        S$
                        <span>0.00</span>
                      </div>
                    </div>
                    <div class="bills-spending-container pro-rated">
                      <strong>Pro-rated Allocation</strong>
                      <div>
                        S$
                        <span>0.00</span>
                      </div>
                    </div>
                    <div class="bills-spending-container current-usage">
                      <strong>Current Usage</strong>
                      <div>
                        S$
                        <span>0.00</span>
                      </div>
                    </div>
                    <div class="current-usage-details">
                      <div class="bills-spending-container">
                        <span>Spent</span>
                        <div>
                          S$
                          <span>0.00</span>
                        </div>
                      </div>
                      <div class="bills-spending-container">
                        <span>Pending claim</span>
                        <div>
                          S$
                          <span>0.00</span>
                        </div>
                      </div>
                    </div>
                    <div class="bills-spending-container balance">
                      <strong>Balance</strong>
                      <div>
                        S$
                        <span>0.00</span>
                      </div>
                    </div>
                  </div>
                  <div class="spending-account-status exceed">Exceed</div>
                </div>
              </div>
            </div> -->

      <!-- Health Spending Account -->
      <div v-if="removeState === 'health_spending_wrapper'" class="health-spending-wrapper">

        <!-- Health Spending Account -->
        <div
          v-if="removeState === 'health_spending_wrapper' && spendingState === 'reserve' || removeState === 'health_spending_wrapper' && spendingState === 'remove' || removeState === 'health_spending_wrapper' && spendingState === 'replace'"
          class="account-summary-wrapper">
          <span class="account-summary-name">Serene Song</span>
          <h1>Health Spending Account Summary</h1>
          <div class="credits-summary-container">
            <div class="account-summary-pro-rated">
              Pro-rated allocation from
              <span>
                <strong>Start</strong> -
                <span class="account-summary-date">{{health_spending_summary.date.pro_rated_start}}</span>
              </span> to
              <span>
                <strong>End</strong> -
                <span class="account-summary-date">{{health_spending_summary.date.pro_rated_end}}</span>
              </span>
            </div>
            <div class="account-summary-usage">
              Usage from
              <span>
                <strong>Start</strong> -
                <span class="account-summary-date">{{health_spending_summary.date.usage_start}}</span>
              </span> to
              <span>
                <strong>Current</strong> -
                <span class="account-summary-date">{{health_spending_summary.date.usage_end}}</span>
              </span>
            </div>
          </div>
          <div class="medical-wellness-wrapper">
            <div class="medical-container">
              <h4>Medical Spending Account</h4>
              <div class="spending-account-details">
                <div class="bills-spending-container">
                  <strong>Initial Allocation</strong>
                  <div>
                    S$
                    <span>{{health_spending_summary.medical.initial_allocation}}</span>
                  </div>
                </div>
                <div class="bills-spending-container pro-rated">
                  <strong>Pro-rated Allocation</strong>
                  <div>
                    S$
                    <span>{{health_spending_summary.medical.pro_allocation}}</span>
                  </div>
                </div>
                <div class="bills-spending-container current-usage">
                  <strong>Current Usage</strong>
                  <div v-if="health_spending_summary.medical.exceed == false">
                    S$
                    <span>{{health_spending_summary.medical.current_usage}}</span>
                  </div>
                  <div v-if="health_spending_summary.medical.exceed == true">
                    S$
                    <span>{{health_spending_summary.medical.current_usage}}</span>
                  </div>
                </div>
                <div class="current-usage-details">
                  <div class="bills-spending-container">
                    <span>Spent</span>
                    <div>
                      S$
                      <span>{{health_spending_summary.medical.spent}}</span>
                    </div>
                  </div>
                  <div class="bills-spending-container">
                    Pending claim
                    <div>
                      S$
                      <span>{{health_spending_summary.medical.pending_e_claim}}</span>
                    </div>
                  </div>
                </div>
                <div class="bills-spending-container balance">
                  <strong>Balance</strong>
                  <div>
                    S$
                    <span>{{health_spending_summary.medical.balance}}</span>
                  </div>
                </div>
              </div>
              <div v-if="health_spending_summary.medical.exceed == false" class="spending-account-status on-track">On
                Track</div>
              <div v-if="health_spending_summary.medical.exceed == true" class="spending-account-status on-track">Exceed
              </div>
            </div>
            <div class="separator"></div>
            <div class="wellness-container">
              <h4 class="font-helvetica-medium">Wellness Spending Account</h4>
              <div class="spending-account-details">
                <div class="bills-spending-container">
                  <strong>Initial Allocation</strong>
                  <div>
                    S$
                    <span>{{health_spending_summary.wellness.initial_allocation}}</span>
                  </div>
                </div>
                <div class="bills-spending-container pro-rated">
                  <strong>Pro-rated Allocation</strong>
                  <div>
                    S$
                    <span>{{health_spending_summary.wellness.pro_allocation}}</span>
                  </div>
                </div>
                <div class="bills-spending-container current-usage">
                  <strong>Current Usage</strong>
                  <div v-if="health_spending_summary.wellness.exceed == false">
                    S$
                    <span>{{health_spending_summary.wellness.current_usage}}</span>
                  </div>
                  <div v-if="health_spending_summary.wellness.exceed == true">
                    S$
                    <span>{{health_spending_summary.wellness.current_usage}}</span>
                  </div>
                </div>
                <div class="current-usage-details">
                  <div class="bills-spending-container">
                    <span>Spent</span>
                    <div>
                      S$
                      <span>{{health_spending_summary.wellness.spent}}</span>
                    </div>
                  </div>
                  <div class="bills-spending-container">
                    <span>Pending claim</span>
                    <div>
                      S$
                      <span>{{health_spending_summary.wellness.pending_e_claim}}</span>
                    </div>
                  </div>
                </div>
                <div class="bills-spending-container balance">
                  <strong>Balance</strong>
                  <div>
                    S$
                    <span>{{health_spending_summary.wellness.balance}}</span>
                  </div>
                </div>
              </div>
              <div v-if="health_spending_summary.wellness.exceed == false" class="spending-account-status exceed">On
                Track</div>
              <div v-if="health_spending_summary.wellness.exceed == true" class="spending-account-status exceed">Exceed
              </div>
            </div>
          </div>
        </div>

        <div v-if="removeState === 'health_spending_wrapper' && spendingState === 'update_member'"
          class="health-spending-account-container">
          <span class="account-summary-name">Serene Song</span>
          <h1>Health Spending Account</h1>
          <p class="members-wallet-text">Do you want us to update the member’s wallet by reflecting the pro-rated
            credits amount and balance?</p>
          <p class="members-wallet-note">(note: by doing so, this member might not be able to pay with credits if the
            current usage exceeded the pro-rated allocation)
          </p>
          <div class="spending-account-btn-container">
            <button :class="{'active': update_member_wallet_status == false}"
              @click="update_member_wallet_status = false">NO</button>
            <button :class="{'active': update_member_wallet_status == true}"
              @click="update_member_wallet_status = true">YES</button>
          </div>
        </div>
      </div>

      <div class="prev-next-button-container">
        <div class="button-container">
          <!-- back buttons -->
          <button v-if="removeState === 'default'" class="back-btn" @click="$router.go(-1)">Back</button>
          <button v-if="removeState === 'dependentDefault'" class="back-btn" @click="$router.go(-1)">Back</button>

          <button v-if="removeState === 'todo'" class="back-btn" @click="removeState = 'default'">Back</button>
          <button v-if="removeState === 'dependentTodo'" class="back-btn"
            @click="removeState = 'dependentDefault'">Back</button>

          <button v-if="removeState === 'replacement'" class="back-btn" @click="removeState = 'todo'">Back</button>
          <button v-if="removeState === 'dependentReplacement'" class="back-btn"
            @click="removeState = 'dependentTodo'">Back</button>

          <button
            v-if="removeState === 'health_spending_wrapper' && spendingState === 'reserve' || removeState === 'health_spending_wrapper' && spendingState === 'remove' || removeState === 'health_spending_wrapper' && spendingState === 'replace'"
            class="back-btn" @click="removeState = 'default'">Back</button>
          <button v-if="removeState === 'health_spending_wrapper' && spendingState === 'update_member'" class="back-btn"
            @click="removeState = 'default'">Back</button>

          <!-- next Buttons -->
          <button v-if="removeState === 'default'" class="next-btn" @click="removeState = 'todo'">Next</button>
          <button v-if="removeState === 'dependentDefault'" class="next-btn"
            @click="removeState = 'dependentTodo'">Next</button>

          <button v-if="removeState === 'todo' && outcome_checked != 0" class="next-btn" @click="next('outcome')">Next
          </button>
          <button v-if="removeState === 'dependentTodo' && dep_outcome_checked != 0" class="next-btn"
            @click="next_dep('dep_outcome')">
            Next
          </button>

          <button v-if="removeState === 'replacement'" class="next-btn" @click="next('replacement')"
            :disabled="isEmpty(replace_emp_data)">
            Next
          </button>
          <button v-if="removeState === 'dependentReplacement'" class="next-btn"
            @click="next_dep('dependentReplacement')" :disabled="isEmpty(replace_dep_data)">
            Next
          </button>


          <!-- health spending -->
          <button
            v-if="removeState === 'health_spending_wrapper' && spendingState === 'reserve' || removeState === 'health_spending_wrapper' && spendingState === 'remove' || removeState === 'health_spending_wrapper' && spendingState === 'replace'"
            class="next-btn" @click="spendingState = 'update_member'">Next</button>

          <button v-if="removeState === 'health_spending_wrapper' && spendingState === 'update_member'"
            class="next-btn confirm-btn" @click="next('confirm')">Confirm</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import removeEmployee from "@/components/company/employee/remove-employee";

  export default removeEmployee;
</script>