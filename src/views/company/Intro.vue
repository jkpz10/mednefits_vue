<template>
  <div class="welcome-body-container">
    <div class="container">
      <div class="body-content">
        <div class="greet-container">
          <div class="header-msg-container">
            <h2 class="header-greet-msg">
              Hi
              <span></span>, ready to get started?
            </h2>
            <p class="header-text-msg">
              Some of those sections below have been completed. For the uncompleted sections
              <br>make sure you have the required information on hand in order to make this process faster.
              <br>Give us a call at +65 6254 7889 if you have any questions.
            </p>
          </div>
          <div class="welcome-img-container">
            <img :src="'../assets/img/welcome.png'">
          </div>
        </div>
        <div class="body-summary-content">
          <p class="what-to-expect-text">What to expect:</p>
          <div class="summary-table-wrapper">
            <table class="table-bordered summary-table">
              <thead>
                <tr>
                  <th>
                    <span class="num-circle">1</span>
                    <h1>Select plan and
                    <br> provide company information</h1>
                  </th>
                  <th>
                    <span class="num-circle">2</span>
                    <h1>Input payment details
                    <br> and send payment</h1>
                  </th>
                  <th>
                    <span class="num-circle">3</span>
                    <h1>Enroll all full time
                    <br> employess into this plan</h1>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="verified-img-container">
                    <div class="check-wrapper">
                      <img :src="'../assets/img/icons/verified.png'">
                    </div>
                  </td>
                  <td class="required-info-wrapper verified-img-container">
                    <div class="check-wrapper">
                      <img v-if="introData.paid == true" :src="'../assets/img/icons/verified.png'">
                    </div>
                    <div v-if="introData.paid == false">
                      <p class="required-info-text">Required Information:</p>
                      <div>
                        <p>Payee cheque information (company name, address,ACRA number) can be found in invoice</p>
                      </div>
                      <div>
                        <p>You may download the invoice from Welcome Email or the company portal under Account & Billing.</p>
                      </div>
                    </div>
                  </td>
                  <td class="verified-img-container">
                    <div class="check-wrapper">
                      <img v-if="introData.employee_count > 0" :src="'../assets/img/icons/verified.png'">
                    </div>
                    <div v-if="introData.employee_count == 0">
                      <p class="required-info-text">Required information</p>
                      <ul>
                        <li>Employee full name, last name</li>
                        <li>Employee date of birth</li>
                        <li>Employee NRIC/FIN</li>
                        <li>Employee work email</li>
                        <li>Employee mobile number</li>
                        <li>Employee job title</li>
                      </ul>
                      <ul v-if="introData.dependent_status">
                        <li>Dependent first name, last name</li>
                        <li>Dependent date of birth</li>
                        <li>Dependent NRIC/FIN</li>
                        <li>Dependent relationship</li>
                      </ul>
										</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="lets-go-container">
      <router-link to="/company/dashboard">
        <button to="app/home" class="btn-info btn-lets-go">Let's Go</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import intro from "@/components/company/intro";

export default intro;
</script>

