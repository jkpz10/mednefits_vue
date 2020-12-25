<template>
	<div class="clinic-invoice-wrapper">
		<div class="trans-body-detail-header">
			<div>
				<h4>View Invoice</h4>
			</div>
			<div class="view-invoice-month-selector">
				<div class="custom-date-selector">
					<i class="fa fa-calendar"></i>
					<v-date-picker :max-date='new Date()' v-model="timeFrame.start"
            :input-props='{class: "activity-custom-input", placeholder: "MM/DD/YYYY", readonly: true}'
            popover-visibility='focus'>
          </v-date-picker>
					<i class="fa fa-caret-down"></i>
				</div>
				<button class="btn-go">Go</button>
				<button class="btn-export"><i class="fa fa-file"></i>Export as .PDF</button>
			</div>
		</div>
		<div class="invoice-card-wrapper">
			<div v-if="false">
				<h3 class="no-trans-text">No transaction found in the chosen month.</h3>
			</div>

			<div class="invoice-info-wrapper">
				<div class="btn-preview-container">
					<div>
						<button class="btn-preview"><i class="fa fa-eye"></i>Preview</button>
					</div>
				</div>

				<div class="view-invoice-detail-container">
					<div class="header">
						<div>
							<img :src="'https://res.cloudinary.com/dzh9uhsqr/image/upload/v1549795986/up0ebkyrragfte9bany7.jpg'">
						</div>
						<div class="header-right-info">
							<h1>INVOICE</h1>
							<div class="mednefits-wallet-text">
								Mednefits Wallet ( 
								<span class="invoice-day-start">0</span>
								<span class="invoice-month">Aug</span> 
								- 
								<span class="invoice-day-end">0</span>
								<span class="invoice-month">Aug</span>
								<span class="invoice-year">2019</span>
								 )
							</div>
							<div class="invoice-row-container">
								<label>Clinic Name:</label>
								<span class="clinic-name">Stackgecko GP</span>
							</div>
							<div class="invoice-row-container">
								<label>Billing/Payable Name(Bank):</label>
								<span class="billing-name">Stackgecko GP</span>
							</div>
							<div class="invoice-row-container">
								<label>Clinic Address:</label>
								<span class="clinic-address">zone 3 bugo cdo</span>
							</div>
							<div class="invoice-row-container">
								<label>Billing Address:</label>
								<span class="billing-address">Zone 3 Bugo Cdo</span>
							</div>
						</div>
					</div>
					<div class="bill-to">
						<div class="bill-to-left-info">
							<h5>BILL TO</h5>
							<h5>Medicloud Private Limited</h5>
							<div>
								<div>7 Temasek Boulevard #18-02 Suntec Tower One</div>
								<div>038987</div>
								<div>Singapore</div>
							</div>
						</div>
						<div class="bill-to-right-info">
							<div class="invoice-row-container">
								<label>Invoice Number: </label>
								<span class="invoice-number">MNST00002</span>
							</div>
							<div class="invoice-row-container">
								<label>Period Date: </label>
								<span class="period-date">1 Oct - 31 Oct 2018</span>
							</div>
							<div class="invoice-row-container">
								<label>Amount Due (SGD): </label>
								<span class="invoice-amount-due">1,399.90</span>
							</div>
						</div>
					</div>
					<div class="description">
						<div>
							<label>Descriptions:</label>
						</div>
						<div>
							<label>Period: </label>
							<span class="period-date">1 Oct - 31 Oct 2018</span>
						</div>
						<div>
							<label>Total Transactions: </label>
							<span class="total-transactions">27</span>
						</div>
						<div>
							<label>Mednefits Credit Transactions: </label>
							<span class="credit-transactions">21</span>
						</div>
						<div>
							<label>Cash/Creditcard Transactions: </label>
							<span class="cash-creditcard-transactions">6</span>
						</div>
					</div>
					<div class="table-wrapper">
						<label>Transactions Break down</label>
						<table>
							<thead>
								<tr>
									<th>Items</th>
									<th>Mednefits Fee</th>
									<th>Mednefits Credit</th>
									<th>Total Amount</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<span>STA000501 Allan Cheam Alzula</span>
									</td>
									<td>
										<span>S$ 13.91</span>
									</td>
									<td>
										<span>S$ 0.05</span>
									</td>
									<td>
										<span>S$ 13.96</span>
									</td>
								</tr>

								<tr>
									<td colspan="3">
										<span>Total Amount Due (SGD):</span>
									</td>
									<td>
										<span>S$ 1,399.90</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="notes">
						<div>
							<span>Notes</span>
						</div>
						<div>
							<label>Payment method: </label>
							<span>Bank Transfer/Cheque</span>
						</div>
						<div>
							<label>Payee's Name: </label>
							<span>N/a</span>
						</div>
						<div>
							<label>Account Type: </label>
							<span>N/a</span>
						</div>
						<div>
							<label>Payee's Account Number: </label>
							<span>132-66713-3</span>
						</div>
					</div>
					<div class="copyright">
						<h5>© 2018 Mednefits. All rights reserved</h5>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import transactionInvoice from "@/components/clinic/settings/transactions/transaction-invoice";

export default transactionInvoice;
</script>