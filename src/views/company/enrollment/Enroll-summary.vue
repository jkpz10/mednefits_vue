<template>
  <transition name="fade">
    <div class="enrollment-wrapper">
      <div class="container">
        <div class="details-enroll-wrapper" v-if="isState == 'enrollsum'">
          <h1>Please check the details below before we enroll them.</h1>
          <!-- table summary -->
          <div>
           <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" v-model="isAllChecked" v-on:change="checkAll( isAllChecked )">
                  </th>
                  <th>Full Name</th>
                  <!-- <th>Last Name</th> -->
                  <!-- <th>NRIC/FIN</th> -->
                  <th>Date of Birth</th>
                  <th>Work Email</th>
                  <th>Mobile</th>
                  <th>Medical Credits</th>
                  <th>Wellness Credits</th>
                  <template v-show="maxDep != 0">
                    <template v-for="depHead in maxDep">
                      <th :key="depHead.id">Dependent {{depHead}} Full Name</th>
                      <!-- <th :key="depHead.id">Dependent {{depHead}} Last Name</th> -->
                      <!-- <th :key="depHead.id"> Dependent {{depHead}} NRIC/FIN </th> -->
                      <th :key="depHead.id">Dependent {{depHead}} Date of Birth</th>
                      <th :key="depHead.id">Dependent {{depHead}} Relationship</th>
                    </template>
                  </template>
                  <th class="start-date-header">Start Date</th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr class="dependent-hover-container" v-for="(enroll, index) in employeeStorage" v-bind:key="enroll.id"> -->
                <tr class="dependent-hover-container" v-for="(enroll, index) in employeeStorage" v-bind:key="enroll.id" v-bind:class="{ 'has-error' : enroll.error_logs.error }">
                  <td>
                    <input type="checkbox" v-model="isChecked[ index ]" v-on:change="checkOne( isChecked[ index ], enroll )">
                  </td>
                  <td>
                    <div class="fname-container">
                      <span v-if="enroll.icon == true" class="icon">
                        <i v-if="enroll.loading == true" class="fa fa-circle-o-notch fa-spin"></i>
                        <i v-if="enroll.success == true" class="fa fa-check"></i>
                        <i v-if="enroll.fail == true" class="fa fa-times"></i>
                      </span>
                      <span class="fname">{{enroll.employee.first_name}}</span>
                      <button @click="editEmployee('edit', index)" class="dependent-hover-btn">Edit</button>
                    </div>
                  </td>
                  <!-- <td>{{enroll.lname}}</td> -->
                  <!-- <td>{{enroll.employee.last_name}}</td> -->
                  <!-- <td>{{enroll.employee.nric}}</td> -->
                  <td>{{enroll.employee.dob | formatDate}}</td>
                  <td>{{enroll.employee.email}}</td>
                  <td>{{enroll.employee.format_mobile}}</td>
                  <td>{{enroll.employee.credits}}</td>
                  <td>{{enroll.employee.wellness_credits}}</td>
                  <template v-if="enroll.dependents.length == 0" v-for="depHead in maxDep">
                    <td></td>
                    <td></td>
                    <td></td>
                  </template>
                  <template v-for="depDetails in enroll.dependents">
                    <td :key="depDetails.id">{{depDetails.enrollee.first_name}}</td>
                    <!-- <td :key="depDetails.id">{{depDetails.enrollee.last_name}}</td> -->
                    <!-- <td :key="depDetails.id">{{depDetails.enrollee.nric}}</td> -->
                    <td :key="depDetails.id">{{depDetails.enrollee.dob | formatDate}}</td>
                    <td :key="depDetails.id">{{depDetails.enrollee.relationship}}</td>
                  </template>
                  <td>{{enroll.employee.start_date | formatDate}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- succesfully enroll -->
        <div class="successfully-enrolled-wrapper" v-if="isState == 'successEnroll'">
          <h1>
            We've succesfully enrolled
            <span>{{ empCtr }}</span> employees and
            <span>{{ depCtr }}</span> dependents to the selected tier plan
          </h1>
          <div class="successfully-enrolled-img">
            <img :src="'../assets/img/successful.png'">
          </div>
        </div>

        <!-- modal edit -->
        <Modal v-if="modalEdit" class="summary-edit-modal">
          <div slot="header">
            <h4>Edit Employee Details</h4>
            <img @click="editEmployee('close')" :src="'../assets/img/icons/close.svg'">
          </div>

          <div slot="body">
            <form>
              <div class="modal-input-wrapper">
                <label>Full Name</label>
                <input type="text" v-model="employeeDetails.fname">
                <span class="err-msg">{{ employeeDetails.errors.first_name_message }}</span>
              </div>
              <!-- <div class="modal-input-wrapper">
                <label>Last Name</label>
                <input type="text" v-model="employeeDetails.lname">
                <span class="err-msg">{{ employeeDetails.errors.last_name_message }}</span>
              </div> -->
              <!-- <div class="modal-input-wrapper">
                <label>NRIC/FIN</label>
                <input type="text" v-model="employeeDetails.nricFinNo">
                <span class="err-msg">{{ employeeDetails.errors.nric_message }}</span>
              </div> -->
              <div class="modal-input-wrapper">
                <label>Date of Birth</label>
                <v-date-picker
                  popoverDirection="top"
                  :max-date="new Date()"
                  :formats ='formats'
                  :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                  popover-visibility="focus"
                ></v-date-picker>
                <span class="err-msg">{{ employeeDetails.errors.dob_message }}</span>
              </div>
              <div class="modal-input-wrapper">
                <label>Work Email</label>
                <input type="text" v-model="employeeDetails.email">
                <span class="err-msg">{{ employeeDetails.errors.email_message }}</span>
              </div>
              <div class="modal-input-wrapper">
                <label>Mobile</label>
                <input type="number" v-model="employeeDetails.mNumber">
                <span class="err-msg">{{ employeeDetails.errors.mobile_message }}</span>
              </div>
              <div class="modal-input-wrapper">
                <label>Mobile Area Code</label>
                <input type="number" v-model="employeeDetails.mAreaCode">
                <span class="err-msg"></span>
                <!-- <span class="err-msg">{{ employeeDetails.errors.mobile_area_code_message }}</span> -->
              </div>
              <div class="modal-input-wrapper">
                <label>Medical Credits</label>
                <input type="number" v-model="employeeDetails.mCredits">
                <span class="err-msg">{{ employeeDetails.errors.credits_medical_message }}</span>
              </div>
              <div class="modal-input-wrapper">
                <label>Wellness Credits</label>
                <input type="number" v-model="employeeDetails.wCredits">
                <span class="err-msg">{{ employeeDetails.errors.credits_wellnes_message }}</span>
              </div>
              <div class="modal-input-wrapper">
                <label>Start Date</label>
                <v-date-picker
                  popoverDirection="top"
                  :date="new Date()"
                  :formats ='formats'
                  v-model="employeeDetails.startDate"
                  :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                  popover-visibility="focus"
                ></v-date-picker>
                <span class="err-msg">{{ employeeDetails.errors.start_date_message }}</span>
              </div>
              <template v-for="list in employeeDetails.dependents">
                <p class="dependent-text">Dependent 1</p>
                <div class="modal-input-wrapper">
                  <label>Full Name</label>
                  <input type="text" v-model="list.enrollee.first_name">
                  <span class="err-msg">{{ list.error_logs.first_name_message }}</span>
                </div>
                <!-- <div class="modal-input-wrapper">
                  <label>Last Name</label>
                  <input type="text" v-model="list.enrollee.last_name">
                  <span class="err-msg">{{ list.error_logs.last_name_message }}</span>
                </div> -->
                <!-- <div class="modal-input-wrapper">
                  <label>NRIC/FIN</label>
                  <input type="text" v-model="list.enrollee.nric">
                  <span class="err-msg">{{ list.error_logs.nric_message }}</span>
                </div> -->
                <div class="modal-input-wrapper">
                  <label>Date of Birth</label>
                  <v-date-picker
                    popoverDirection="top"
                    :max-date="new Date()"
                    v-model="list.enrollee.dob"
                    :formats ='formats'
                    :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                    popover-visibility="focus"
                  ></v-date-picker>
                  <span class="err-msg">{{ list.error_logs.dob_message }}</span>
                </div>
                <div class="modal-input-wrapper">
                  <label>Relationship</label>
                  <select v-model="list.enrollee.relationship">
                    <option value="spouse">Spouse</option>
                    <option value="child">Child</option>
                    <option value="family">Family</option>
                  </select>
                  <img :src="'../assets/img/icons/down-arrow.svg'">
                  <span class="err-msg">{{ list.error_logs.relationship_message }}</span>
                </div>
                <div class="modal-input-wrapper">
                  <label>Start Date</label>
                  <v-date-picker
                    popoverDirection="top"
                    :date="new Date()"
                    v-model="list.enrollee.plan_start"
                    :formats ='formats'
                    :input-props='{class: "vDatepicker", placeholder: "DD/MM/YYYY", readonly: true, }'
                    popover-visibility="focus"
                  ></v-date-picker>
                  <span class="err-msg">{{ list.error_logs.start_date_message }}</span>
                </div>
              </template>
            </form>
          </div>
          <div slot="footer">
            <button @click="removeEmployee( employeeStorage[indexData].employee.temp_enrollment_id )">REMOVE</button>
            <button @click="update">UPDATE</button>
          </div>
        </Modal>
      </div>

      <div class="prev-next-button-container">
        <span v-if="isState === 'enrollsum'" class="responsive-enroll-text pending-enroll-text">
          <span>{{ enrollment_progress.in_progress }}</span> PENDING TO ENROLL
        </span>
        <div class="button-container">
          <button v-if="isState === 'enrollsum'" @click="back" class="summary-back-btn back-btn">Back</button>
          <router-link to="/company/dashboard">
            <button v-if="isState == 'successEnroll'" class="back-home-btn back-btn">BACK TO HOME</button>
          </router-link>
          <button v-if="selected_emp.length !=0" class="delete-btn" @click="removeCheckedEmployees()">Delete</button>

          <div class="btn-enroll-container">
            <div v-if="isState === 'enrollsum'" class="btn-summary-enroll-container">
              <span class="pending-enroll-text">
                <span>{{ enrollment_progress.in_progress }}</span> PENDING TO ENROLL
              </span>
              <button class="summary-enroll-btn next-btn btn-enroll" @click="enroll('successEnroll')">
                ENROLL
                <span class="enroll-badge">{{ employeeStorage.length }}</span>
              </button>
            </div>
            <div class="btn-successfully-enrolled-container" v-if="isState == 'successEnroll'">
              <button @click="$router.push({ name : 'CompanyEnrollmentOptions' })">CONTINUE WITH ENROLLMENT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import enrollSumamary from "@/components/company/enrollment/enroll-summary";

export default enrollSumamary;
</script>