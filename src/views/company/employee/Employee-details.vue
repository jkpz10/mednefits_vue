<template>

  <!-- Employee Overview Information -->
  <div class="overview-info-wrapper">
    <div class="person-info-wrapper">
      <div v-if="!showAddDependents" :style="[sideInfo.sideContainer]" class="employee-information-container">
        <div :style="[sideInfo.sideStyle]" class="person-information transition-easeInOutCubic-400ms">
          <div class="person-image-name-info">
            <span v-show="sideInfo.trigger" class="close" @click="toggleSideInfo(0)"><i class="fa fa-times" aria-hidden="true"></i></span>
            <img :src="'../assets/img/user-new.png'">
            <h1>{{employees.name}}</h1>
            <div class="status-information">
              <div class="status-active-container">
                <div class="status-label-container">
                  <span class="status-label">Status</span>
                </div>
                <div class="status-text-container">
                  <span class="status-text active" v-if="employees.emp_status == 'active' || employees.account_status && employees.schedule">Active</span>
                  <span class="status-text pending" v-if="employees.emp_status == 'pending'">Pending</span>
                  <span class="status-text removed" v-if="!employees.account_status">Removed</span>
                </div>
                <div class="" v-if="employees.deletion || employees.schedule">
                  <!-- need CSS -->
						    </div>
                <div class="status-removed" v-if="employees.deletion || employees.schedule">
                  <!-- need CSS -->
							    <span>{{employees.deletion_text}}</span>
						    </div>
              </div>
            </div>
          </div>
          <div class="plan-information">
            <h4>
              <strong>Plan Information</strong>
            </h4>
            <div class="employee-plan">
              <strong>
                <span>Plan</span>
              </strong>
              <div v-for="list in employees.plan_list" :key="list.index">
                <span>{{list.user_type}}</span> - <span>{{list.plan_type}}</span>
              </div>
            </div>
            <div class="employee-plan-cover">
              <strong>Plan Covers</strong>
              <span>
                <span>{{employees.dependents + 1}}</span> People
              </span>
            </div>

            <div v-if="employees.plan_tier != null" class="employee-tier-wrapper" >
              <div class="employee-tier-container">
                <strong class="col-1" @click="isTierDetailsShow = !isTierDetailsShow">Tier 1</strong>
                
                <strong class="col-2" @click="isTierDetailsShow = !isTierDetailsShow">
                  <i v-if="!isTierDetailsShow" class="fa fa-angle-right" aria-hidden="true"></i>
                  <i v-if="isTierDetailsShow" class="fa fa-angle-down" aria-hidden="true"></i>
                </strong>
              </div>

              <div v-if="isTierDetailsShow == true" class="tier-dropdown-details">
                <div class="annual-cap">
                  <span>Medical annual cap:</span>
                  <span>S$ <span>1000</span></span>
                </div>
                <div class="annual-cap">
                  <span>Wellness annual cap:</span>
                  <span>S$ <span>300</span></span>
                </div>
                <div class="gp-cap">
                  <span>GP Cap per visit:</span>
                  <span>S$ <span>50</span></span>
                </div>
              </div>
				  	</div>

            <div class="employee-info-start-date">
              <strong>Start Date</strong>
              <span>{{employees.start_date_format}}</span>
            </div>
            <div class="employee-info-end-date">
              <strong>End Date</strong>
              <span>{{employees.expiry_date_fromat}}</span>
            </div>
          </div>
          <div class="medical-spending-account">
            <h4>
              <strong>Medical Spending Account</strong>
            </h4>
            <div class="allocation-container">
              <strong>Allocation</strong>
              <span>
                S$
                <span>{{employees.spending_account.medical.credits_allocation | decimalTwo}}</span>
              </span>
            </div>
            <div class="usage-container-wrapper">
              <div @click="toggleMedicalUsage()" class="usage-container">
                <strong>Usage</strong>
                <span>
                  S$
                  <span>
                    {{
                      getUsage(employees.spending_account.medical.credits_spent, employees.spending_account.medical.e_claim_amount_pending_medication) | decimalTwo
                    }}
                  </span>
                </span>
              </div>
              <img v-if="!isMedicalUsageShow" @click="toggleMedicalUsage()" :src="'../assets/img/arrow-right.png'">
              <img v-if="isMedicalUsageShow" @click="toggleMedicalUsage()" :src="'../assets/img/arrow-down.png'">
              <div v-if="isMedicalUsageShow" class="usage-dropdown-details">
                <div class="usage-details">
                  <span>Spent:</span>
                  <span>
                    S$
                    <span>{{employees.spending_account.medical.credits_spent | decimalTwo}}</span>
                  </span>
                </div>
                <div class="usage-details">
                  <span>Pending claim:</span>
                  <span>
                    S$
                    <span>{{employees.spending_account.medical.e_claim_amount_pending_medication | decimalTwo}}</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="balance-container">
              <strong>Balance</strong>
              <span>
                S$
                <span>{{employees.spending_account.medical.balance | decimalTwo}}</span>
              </span>
            </div>
          </div>
          <div class="wellness-spending-account">
            <h4>
              <strong>Wellness Spending Account</strong>
            </h4>
            <div class="allocation-container">
              <strong>Allocation</strong>
              <span>
                S$
                <span>{{employees.spending_account.wellness.credits_allocation_wellness | decimalTwo }}</span>
              </span>
            </div>
            <div class="usage-container-wrapper">
              <div @click="toggleWellnessUsage()" class="usage-container">
                <strong>Usage</strong>
                <span>
                  S$
                  <span>{{
                    getUsage(employees.spending_account.wellness.credits_spent_wellness, employees.spending_account.wellness.e_claim_amount_pending_wellness) | decimalTwo
                    }}
                  </span>
                </span>
              </div>
              <img v-if="!isWellnessUsageShow" @click="toggleWellnessUsage()" :src="'../assets/img/arrow-right.png'">
              <img v-if="isWellnessUsageShow" @click="toggleWellnessUsage()" :src="'../assets/img/arrow-down.png'">
              <div v-if="isWellnessUsageShow" class="usage-dropdown-details">
                <div class="usage-details">
                  <span>Spent:</span>
                  <span>
                    S$
                    <span>{{employees.spending_account.wellness.credits_spent_wellness | decimalTwo }}</span>
                  </span>
                </div>
                <div class="usage-details">
                  <span>Pending claim:</span>
                  <span>
                    S$
                    <span>{{employees.spending_account.wellness.e_claim_amount_pending_wellness | decimalTwo }}</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="balance-container">
              <strong>Balance</strong>
              <span>
                S$
                <span>{{employees.spending_account.wellness.balance | decimalTwo }}</span>
              </span>
            </div>
          </div>
          <div class="btn-person-info-container">
            <router-link :to="{ name: 'CompanyRemoveEmployee', params: { name: 'employee' }}">
              <button v-if="employees.emp_status == 'active'" class="btn-remove-employee">
                Remove Employee
              </button>
            </router-link>
            <button @click="viewEmployeeSpendingSummary()" v-if="employees.emp_status == 'deleted'" class="btn-health-spending">Health Spending
              Account Summary</button>
          </div>
        </div>
        <div :style="[sideInfo.sideStyle, sideInfo.empInfoWrapper]" class="employee-information-wrapper transition-easeInOutCubic-400ms">
          <div class="employee-info-selection">

            <div  :style="[sideInfo.trigger ? {'display': 'none'} : false]" v-on:click="toggleSideInfo(1)"
              class="employee-selection user-info">Allan <i class="fa fa-caret-right" aria-hidden="true"></i></div>
            <div v-bind:class="{'active' : toggle_overiew_type == 1}" v-on:click="toggleTabOverview(1)"
              class="employee-selection">Employee</div>
            <div v-bind:class="{'active' : toggle_overiew_type == 2}" v-on:click="toggleTabOverview(2)"
              class="employee-selection">Dependent</div>
            <div v-bind:class="{'active' : toggle_overiew_type == 3}" v-on:click="toggleTabOverview(3)"
              class="employee-selection">Settings</div>
          </div>

          <!-- <transition name="fade"> -->
            <div class="employee-information" v-if="toggle_overiew_type == 1">
              <h3 class="employee-details-title">Employee Information</h3>
              <div class="dependent-btn-container">
                <button @click="editEmployees()">
                  <img :src="'../assets/img/icons/edit.png'">Edit
                </button>
              </div>
              <div class="employee-info-details">
                <div class="col-1-employee-information-details">
                  <div>
                    <strong>First Name</strong>
                    <span>{{employees.name || 'N/A'}}</span>
                  </div>
                  <!-- <div>
                    <strong>Last Name</strong>
                    <span>{{employees.lname || 'N/A'}}</span>
                  </div> -->
                  <!-- <div>
                    <strong>NRIC/FIN</strong>
                    <span>{{employees.nric || 'N/A'}}</span>
                  </div> -->
                  <div>
                    <strong>Member ID</strong>
                    <span>{{employees.member_id || 'N/A'}}</span>
                  </div>
                  <div>
                    <strong>Date of Birth</strong>
                    <span>{{employees.dob | formatDate('DD/MM/YYYY')}}</span>
                  </div>
                  <div>
                    <strong>Work Email</strong>
                    <span>{{employees.email || 'N/A'}}</span>
                  </div>
                  
                </div>
                <div class="col-2-employee-information-details">
                  <div>
                    <strong>Mobile Number</strong>
                    <span>{{employees.phone_no || 'N/A'}}</span>
                  </div>
                  <div>
                    <strong>Postal Code</strong>
                    <span>{{employees.postal_code || 'N/A'}}</span>
                  </div>
                  <div>
                    <strong>Job Title</strong>
                    <span>{{employees.job_title || 'N/A'}}</span>
                  </div>
                  <div>
                    <strong>Bank Account Number</strong>
                    <span>{{employees.bank_account_number || 'N/A'}}</span>
                  </div>
                </div>
              </div>
              <div class="employee-btn-add-seat-wrapper">
                <h3>Add a Dependent?</h3>
                <button @click="toggleAddDependents( 'add' )" class="btn-add-seat">
                  <img :src="'../assets/img/icons/add-employee.svg'">Add
                </button>
              </div>
            </div>
          <!-- </transition> -->

          <!-- <transition name="fade"> -->
            <div class="dependent-information" v-if="toggle_overiew_type == 2">
              <h3 class="employee-details-title">Dependent Information</h3>
              <div v-for="(list, index) in selected_emp_dependents" :key="list.index">
                <div class="dependent-btn-container">
                  <router-link :to="{ name: 'CompanyRemoveEmployee', params: { name: 'dependent', dep: selected_emp_dependents[index] }}">
                  <button v-if="!list.deletion">
                    <img :src="'../assets/img/icons/dustbin.png'">Remove
                  </button>
                  </router-link>
                  <button class="btn-removed" v-if="list.deletion" disabled>
                    <span>{{list.deletion_text}}</span>
                  </button>
                  <button @click="editDependents(index)">
                    <img :src="'../assets/img/icons/edit.png'">Edit
                  </button>
                </div>
                <div class="employee-info-details">
                  <div class="col-1-employee-information-details">
                    <div>
                      <strong>First Name</strong>
                      <span>{{list.first_name || 'N/A'}}</span>
                    </div>
                    <!-- <div>
                      <strong>Last Name</strong>
                      <span>{{list.last_name || 'N/A'}}</span>
                    </div> -->
                    <!-- <div>
                      <strong>NRIC/FIN</strong>
                      <span>{{list.nric || 'N/A'}}</span>
                    </div> -->
                    <div>
                      <strong>Date of Birth</strong>
                      <span>{{list.dob | formatDate('DD/MM/YYYY')}}</span>
                    </div>
                  </div>
                  <div class="col-2-employee-information-details">
                    <div>
                      <strong>Relationship</strong>
                      <span v-if="list.relationship != null">{{list.relationship || 'N/A'}}</span>
                      <span v-if="list.relationship == null">Dependent of {{list.Name || 'N/A'}}</span>
                    </div>
                    <div>
                      <strong>Member ID</strong>
                      <span>{{list.member_id || 'N/A'}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <!-- </transition> -->

          <!-- <transition name="fade"> -->
            <div class="settings-information" v-if="toggle_overiew_type == 3">
              <button @click="reset()">
                <img :src="'../assets/img/open-wrench-tool.png'">Resend/Reset Account
              </button>
            </div>
          <!-- </transition> -->

          <HealthSpending v-if="healthSpendingAccountTabIsShow"></HealthSpending>

        </div>
      </div>

      <!-- add dependents -->
      <div class="add-dependent-wrapper" v-if="showAddDependents">
        <div class="dependent-details">
          <div class="employee-name">{{employees.name}}</div>
          <div class="employee-details-header">
            <h1>Add a Dependent</h1>
          </div>
          <div v-if="employees.plan_tier" class="employee-tier-title">
            {{employees.plan_tier.plan_tier_name}} : DEPENDENT
            <span>{{addActiveDependent_index}}</span> OF
            <span>{{employees.plan_tier.dependent_head_count}}</span>
          </div>
          <div v-if="!employees.plan_tier" class="employee-tier-title">
            DEPENDENT
            <span>{{addActiveDependent_index}}</span> OF
            <span>{{dependents.total_number_of_seats}}</span>
          </div>
          <form class="form-input-container">
            <div class="employee-input-container">
              <div class="employee-input-wrapper">
                <label for="fname">Full Name</label>
                <input type="text" name="fname" v-model="dependent_data.first_name">
              </div>
              <div class="employee-input-wrapper dob">
                <label for>Date of Birth</label>
                <v-date-picker :max-date="new Date()"
                  v-model="dependent_data.dob"
                  :formats='formats'
                  :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                  popover-visibility='focus' popover-direction='top'></v-date-picker>
              </div>
              <!-- <div class="employee-input-wrapper">
                <label for="fname">Last / Family Name</label>
                <input type="text" name="lname" v-model="dependent_data.last_name">
              </div> -->
            </div>
            <div class="employee-input-container">
              <!-- <div class="employee-input-wrapper nric">
                <label>
                  <input type="radio" name="id_status" value="nric" v-model="dependent_data.nric_status_dependents"> NRIC
                </label>
                <label>
                  <input type="radio" name="id_status" value="fin" v-model="dependent_data.fin_status_dependents"> FIN
                </label>
                <input type="text" name="nric-fin" v-model="dependent_data.nric">
              </div>
              <div class="employee-input-wrapper dob">
                <label for>Date of Birth</label>
                <v-date-picker :max-date="new Date()"
                  v-model="dependent_data.dob"
                  :input-props='{class: "vDatepicker", placeholder: "MM/DD/YYYY", readonly: true, }'
                  popover-visibility='focus' popover-direction='top'></v-date-picker>
              </div> -->
            </div>
            <div class="employee-input-container">
              <div class="employee-input-wrapper">
                <label for="fname">Relationship</label>
                <select v-model="dependent_data.relationship">
                  <option value="spouse">Spouse</option>
                  <option value="child">Child</option>
                  <option value="family">Family</option>
                  <option value="parent">Parent</option>
                </select>
                <img :src="'../assets/img/icons/down-arrow.svg'">
              </div>
              <div class="employee-input-wrapper">
                <label for="fname">Start Date</label>
                <v-date-picker
                  v-model="dependent_data.start_date"
                  :formats='formats'
                  :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                  popover-visibility='focus' popover-direction='top'></v-date-picker>
              </div>
            </div>
          </form>
          <div class="summary-left-right-btn" v-if="false">
            <img class="summary-left-btn" :src="'../assets/img/icons/left.png'">
            <img class="summary-right-btn" :src="'../assets/img/icons/right.png'">
          </div>
          <div class="dependent-details-btn">
            <button @click="toggleAddDependents( 'cancel' )" class="btn-cancel">CANCEL</button>
            <div class="btn-right-container">
              <button class="btn-save-continue" @click="saveActiveDependents()">SAVE & CONTINUE</button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="employee-prev-next-button">
      <button class="employee-btn-back" @click="$router.go(-1)">Back <span>to employee overview</span></button>
      <div class="pull-right">
        <button class="employee-btn-prev disabled">Previous</button>
        <button class="employee-btn-next">Next <span>employee</span></button>
      </div>
    </div>

    <div class="global-modal-wrapper">
      <!-- modal edit for employee -->
      <Modal class="employee-edit-modal" v-if="modalEdit.employee">
        <div slot="header" class="employee-name-container">
          <span>allan cheam alzula</span>
          <img @click="modalEdit.employee = false" :src="'../assets/img/icons/close-blue.svg'">
          <h1>Edit Employee Details</h1>
        </div>
        <div slot="body">
          <form>
            <div class="employee-input-container">
              <div class="employee-input-wrapper">
                <label for="fname">Full Name</label>
                <input type="text" name="fname" v-model="toEdit.fname">
              </div>
              <div class="employee-input-wrapper">
                <label for="work-email">Work Email</label>
                <input type="email" name="work-email" v-model="toEdit.email">
              </div>
            </div>
            <div class="employee-input-container">
              <!-- <div class="employee-input-wrapper">
                <label for="lname">Last Name</label>
                <input type="text" name="lname" v-model="toEdit.lname">
              </div> -->
              <div class="employee-input-wrapper">
                <label for="postal-code">Postal Code</label>
                <input type="text" name="postal-code" v-model="toEdit.postal_code">
              </div>
              <div class="employee-input-wrapper">
                <label for="number">Mobile Number</label>
                <vue-tel-input ref="areaCode" v-model="toEdit.phone_no" v-bind="telProps" @input="setAreaCode"></vue-tel-input>
                <!-- <input type="number" name="number" v-model="toEdit.phone_no"> -->
              </div>
            </div>
            <div class="employee-input-container">
              <!-- <div class="employee-input-wrapper">
                <label>NRIC</label>
                <input type="text" name="nric-fin" v-model="toEdit.nric">
              </div> -->
              <!-- <div class="employee-input-wrapper">
                <label for="postal-code">Postal Code</label>
                <input type="text" name="postal-code" v-model="toEdit.postal_code">
              </div> -->
            </div>
            <div class="employee-input-container">
              <div class="employee-input-wrapper">
                <label>Member ID</label>
                <input type="number" name="member-id" v-model="toEdit.member_id">
              </div>
              <div class="employee-input-wrapper">
                <label for="postal-code">Job Title</label>
                <select v-model="toEdit.job_title">
                  <option value="Building and Estate Management">Building and Estate Management</option>
                  <option value="Education">Education</option>
                  <option value="Engineering">Engineering</option>
                </select>
                <img :src="'../assets/img/icons/down-arrow.svg'">
              </div>
            </div>
            <div class="employee-input-container">
              <div class="employee-input-wrapper dob">
                <label for="fname">Date of Birth</label>
                <v-date-picker
                  mode= 'single'
                  v-model="toEdit.dob"
                  :formats = 'formats'
                  :max-date="new Date()"
                  popoverDirection="top" 
                  popoverVisibility="focus"
                  :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'>
                </v-date-picker>
                <!-- <input class="vDatepicker" placeholder="DD/MM/YYYY" :value="employees.dob"> -->
              </div>
              <div class="employee-input-wrapper">
                <label>Bank Account Number</label>
                <input type="number" name="bank-account-number" v-model="toEdit.bank_account">
              </div>
            </div>
          </form>
        </div>
        <div slot="footer" class="modal-btn-container">
          <button @click="modalEdit.employee = false">CANCEL</button>
          <button @click="update('employees')">SAVE & CONTINUE</button>
        </div>
      </Modal>

      <!-- modal edit  for dependent-->
      <Modal class="depedent-edit-modal" v-if="modalEdit.dependent">
        <div slot="header" class="employee-name-container">
          <img @click="modalEdit.dependent = false" :src="'../assets/img/icons/close-blue.svg'">
          <h1>Edit dependent details</h1>
        </div>
        <div slot="body">
          <form>
            <div class="employee-input-container">
              <div class="employee-input-wrapper">
                <label for="fname">Full Name</label>
                <input type="text" name="fname" v-model="toEdit.first_name">
              </div>
              <div class="employee-input-wrapper dob">
                <label for="fname">Date of Birth</label>
                <v-date-picker :max-date="new Date()"
                  v-model="toEdit.dob"
                  :formats="formats"
                  popoverVisibility="focus"
                  :input-props='{class: "vDatepicker", placeholder: "MM/DD/YYYY", readonly: true, }'>
                </v-date-picker>
              </div>
            </div>
            <div class="employee-input-container">
              <!-- <div class="employee-input-wrapper">
                <label for="lname">Last Name</label>
                <input type="text" name="lname" v-model="toEdit.last_name">
              </div> -->
              <div class="employee-input-wrapper">
                <label>Member ID</label>
                <input type="number" name="member-id" v-model="toEdit.member_id">
              </div>
              <div class="employee-input-wrapper">
                <label for="postal-code">Relationship</label>
                <select v-model="toEdit.relationship">
                  <!-- <option :value="toEdit.relationship">{{toEdit.relationship}}</option> -->
                  <option value="spouse">Spouse</option>
                  <option value="child">Child</option>
                  <option value="family">Family</option>
                  <option value="parent">Parent</option>
                </select>
                <img :src="'../assets/img/icons/down-arrow.svg'">
              </div>
            </div>
            <div class="employee-input-container">
              <!-- <div class="employee-input-wrapper">
                <label>Member ID</label>
                <input type="number" name="member-id" v-model="toEdit.member_id">
              </div> -->
              <!-- <div class="employee-input-wrapper">
                <label>NRIC/FIN</label>
                <input type="text" name="member-id" v-model="toEdit.nric">
              </div> -->
            </div>
          </form>
        </div>
        <div slot="footer" class="modal-btn-container">
          <button @click="modalEdit.dependent = false">CANCEL</button>
          <button @click="update('dependents', dependentIndex)">SAVE & CONTINUE</button>
        </div>
      </Modal>

      <!-- modal for settings-->
      <Modal v-if="modalEdit.reset" class="input-password-modal">
        <div slot="header">
          <span>Input Password</span>
        </div>
        <div slot="body">
          <div class="form-group">
            <input type="password">
          </div>
        </div>
        <div slot="footer">
          <button @click="modalEdit.reset = false">Cancel</button>
          <button >Submit</button>
        </div>
      </Modal>
    </div>

  </div>

</template>

<script>
  import employeeDetails from "@/components/company/employee/employee-details";

  export default employeeDetails;
</script>