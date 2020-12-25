<template>
  <transition name="fade"> 
    <div class="account-summary-wrapper">
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
          <div class="spending-account-status on-track"> On Track</div>
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
    </div>
  </transition>
</template>

<script>
  import healthSpending from "@/components/company/employee/health-spending";
  
  export default healthSpending
</script>