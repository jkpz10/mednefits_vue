<template>
  <transition name="fade">
    <div class="enrollment-wrapper">

      <div class="container">
        <div class="excel-import-wrapper" v-if="isState === 'excel'">

          <div class="download-template-wrapper"  v-if="stepperState === 'download'">
            <h1>Download template.</h1>
            <p>We've put together the fields that are needed for enrollements in the excel template file, first row (aka
              header). Please download, complete and submit the excel file on the step 3 (Upload).</p>
            <div class="download-template-btn">
              <button @click="empBtnType('empOnly')" v-bind:class="{'active': empType === 'empOnly'}" class=""><img
                  :src="'../assets/img/download-gray.png'"> Employees only</button>
              <button @click="empBtnType('empDependents')" v-bind:class="{'active': empType === 'empDependents'}"
                lass=""><img :src="'../assets/img/download-gray.png'">Employees + Dependents</button>
            </div>
          </div>

          <!-- Employees only-->
          <div class="review-with-dependents" v-if="stepperState === 'empOnly'">
            <h1>Let us help you with the review before upload.</h1>
            <div class="review-tick-container">
              <p class="review-tick-title">Review your file type:</p>
              <label class="review-container">
                <input type="checkbox" value="1" v-model="reviewChecks.save">
                <span class="review-prepare-template-text">Save the file .xlsx or .xls format. </span>
                <span class="review-checkmark"></span>
              </label>
              <p class="review-tick-title">Review the data in your file:</p>
              <label class="review-container">
                <input type="checkbox" value="2" v-model="reviewChecks.name">
                <span class="review-prepare-template-text">Employee's first name and last name are separated.</span>
                <span class="review-prepare-template-subtext">Separate the full name to first name as given name; last
                  name as family name.</span>
                <span class="review-checkmark"></span>
              </label>
              <label class="review-container">
                <input type="checkbox" value="3" v-model="reviewChecks.dob">
                <span class="review-prepare-template-text">Input employee's date of birth according to the format
                  (dd/mm/yyyy).</span>
                <span class="review-prepare-template-subtext">Our system will only pick and capture date in the stated
                  format.</span>
                <span class="review-checkmark"></span>
              </label>
              <label class="review-container">
                <input type="checkbox" value="4" v-model="reviewChecks.plan">
                <span class="review-prepare-template-text">Input employee's plan start date according to the format (dd/mm/yyyy).</span>
                <span class="review-prepare-template-subtext">Our system will only pick and capture date in the stated
                  format.</span>
                <span class="review-checkmark"></span>
              </label>
              <label class="review-container">
                <input type="checkbox" value="5" v-model="reviewChecks.email">
                <span class="review-prepare-template-text">A valid employee's email address.</span>
                <span class="review-prepare-template-subtext">Login credential will be sent to this email address once
                  account is set up.</span>
                <span class="review-checkmark"></span>
              </label>
              <label class="review-container">
                <input type="checkbox" value="6" v-model="reviewChecks.postal">
                <span class="review-prepare-template-text">Input employee's 6 digit postal code</span>
                <span class="review-prepare-template-subtext">It should be the local residential postal code where the
                  employee reside.</span>
                <span class="review-checkmark"></span>
              </label>
            </div>
          </div>

          <!-- Employee + Dependents-->
          <div class="review-with-dependents" v-if="stepperState === 'empDependents'">
            <h1>Let us help you with the review before upload.</h1>
            <div class="review-tick-container">
              <p class="review-tick-title">Review your file type:</p>
              <label class="review-container">
                <input type="checkbox" value="1" v-model="reviewChecks.save">
                <span class="review-prepare-template-text">Save the file .xlsx or .xls format. </span>
                <span class="review-checkmark"></span>
              </label>
              <p class="review-tick-title">Review the data in your file:</p>
              <label class="review-container">
                <input type="checkbox" value="2" v-model="reviewChecks.name">
                <span class="review-prepare-template-text">Employee, dependent/s first name and last name are
                  separated.</span>
                <span class="review-prepare-template-subtext">Separate the full name to first name as given name; last
                  name as family name.</span>
                <span class="review-checkmark"></span>
              </label>
              <label class="review-container">
                <input type="checkbox" value="3" v-model="reviewChecks.dob">
                <span class="review-prepare-template-text">Input employee, dependent/s date of birth according to the
                  format (dd/mm/yyyy).</span>
                <span class="review-prepare-template-subtext">Our system will only pick and capture date in the stated
                  format.</span>
                <span class="review-checkmark"></span>
              </label>
              <label class="review-container">
                <input type="checkbox" value="4" v-model="reviewChecks.plan">
                <span class="review-prepare-template-text">Input employee's plan start date according to the format (dd/mm/yyyy).</span>
                <span class="review-prepare-template-subtext">Our system will only pick and capture date in the stated
                  format.</span>
                <span class="review-checkmark"></span>
              </label>
              <label class="review-container">
                <input type="checkbox" value="5" v-model="reviewChecks.email">
                <span class="review-prepare-template-text">A valid employee's email address.</span>
                <span class="review-prepare-template-subtext">Login credential will be sent to this email address once
                  account is set up.</span>
                <span class="review-checkmark"></span>
              </label>
              <label class="review-container">
                <input type="checkbox" value="6" v-model="reviewChecks.postal">
                <span class="review-prepare-template-text">Input employee's 6 digit postal code</span>
                <span class="review-prepare-template-subtext">It should be the local residential postal code where the
                  employee reside.</span>
                <span class="review-checkmark"></span>
              </label>
              <label class="review-container">
                <input type="checkbox" value="7" v-model="reviewChecks.relationship">
                <span class="review-prepare-template-text">Under dependent/s relationship column only select from drop
                  down list.</span>
                <span class="review-checkmark"></span>
              </label>
            </div>
          </div>

          <div class="upload-file-wrapper" v-if="stepperState === 'upload'">
            <h1>Upload your file</h1>
            <div class="upload-box">
              <input type="file" id="upload" ref="receiptUploader" v-on:change="uploadReceipts($event.target.files);">
              <label class="fileupload-text ng-scope" for="upload">
                <img :src="'../assets/img/Upload-Receipt.png'" class="upload-icon center-block">

                <!-- upload file-->
                <div v-if="!isSuccessUpload">
                  <span>
                    Drag and drop an Excel file here to upload
                    <br>
                    or
                    <br>
                  </span>
                  <span>Select file</span>
                </div>

                <!-- successfully upload -->
                <div v-if="isSuccessUpload">
                  <span>
                    Successfully Uploaded.
                    <br>
                  </span>
                  <span>Change file</span>
                </div>

                <!-- change the file -->
                <div v-if="false">
                  <span>Change file</span>
                </div>

              </label>
            </div>
          </div>

        </div>
      </div>

      <div class="prev-next-button-container">
        <div class="button-container">
          <button v-if="isState === 'excel' && stepperState == 'download'" @click="$router.go(-1)"
            class="excel-back-btn back-btn">Back</button>
          <button v-if="stepperState == 'empOnly' || stepperState == 'empDependents' || stepperState == 'upload'"
            @click="back('download')" class="excel-back-btn back-btn">Back</button>

          <div class="btn-enroll-container">
            <button class="excel-download-btn btn-download-template" v-on:click="downloadTemplate()" v-if="isState === 'excel' && stepperState == 'download'">DOWNLOAD
              TEMPLATE</button>
            <button class="excel-next-btn next-btn" v-if="isState === 'excel' && stepperState == 'download'"
              @click="excel(empType)">Next</button>
            <button class="excel-next-btn next-btn" v-if="stepperState == 'empOnly' || stepperState == 'empDependents'"
              @click="excel('upload')">Next</button>
            <button :disabled="isNextBtnDisabled" class="excel-next-btn next-btn" v-if="stepperState == 'upload'" @click="excel('enrollsum')">Next</button>  <!-- go to enroll summary -->
          </div>
        </div>
      </div>
    </div>

  </transition>
</template>

<script>
import excel from "@/components/company/enrollment/excel";
export default excel
</script>
