<template>
  <div>
    <div class="enrollment-wrapper">
      <div class="container">

        <!-- Enrollment -->
        <div v-if="isState === 'enrollment'" class="enrollment-method-wrapper">
          <h1 class="enrollment-method-title">Pick your preferred enrollment method.</h1>
          <div class="pick-enrollment-method">
            <div>
              <button v-on:click="type('excel')" v-bind:class="{'active': isType === 'excel'}"
                class="enrollment-method-box btn-excel-import">
                <img :src="'../assets/img/excel.png'">
                <h4>EXCEL IMPORT</h4>
              </button>

              <div class="enrollment-method-box-text">
                <p class="below-text excel-below-text">
                  Upload employee details in a
                  <br>excel file using the template
                  <br>provided by us in the next step
                </p>
              </div>
            </div>

            <div>
              <button v-on:click="type('web')" v-bind:class="{'active': isType === 'web'}" class="enrollment-method-box btn-web-input">
                <img :src="'../assets/img/web-input.png'">
                <h4>WEB INPUT</h4>
              </button>

              <div class="enrollment-method-box-text">
                <p class="below-text web-below-text">
                  Input employee details
                  <br>using our web enrollment form.
                </p>
              </div>
            </div>
          </div>
          
          <!-- <div class="pick-enrollment-text">
            <div class="enrollment-method-box-text">
              <p class="below-text download-below-text">
                Upload employee details in a
                <br>excel file using the template
                <br>provided by us in the next step
              </p>
            </div>
            <div class="enrollment-method-box-text">
              <p class="below-text download-below-text">
                Input employee details
                <br>using our web enrollment form.
              </p>
            </div>
          </div> -->
        </div>


        <!-------- EXCEL IMPORT -------->
        <!-- isState === 'excel' -->

        <!-------- WEB INPUT -------->
        <!-- for shared components -->
        <!-- details enroll summary -->
      
        <!-- for shared components  -->

      </div> 
      <!-- end container div -->

      <div class="prev-next-button-container">
        <div class="button-container">
          <button v-if="isState === 'enrollment'" @click="$router.push({ name : 'CompanyEnrollmentOptions' })" class="back-btn">Back</button>
         

          <div class="btn-enroll-container">
            <button class="next-btn" v-if="isState === 'enrollment'" @click="next">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import enrollment from "@/components/company/enrollment";

  export default enrollment;
</script>