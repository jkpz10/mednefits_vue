<template>
	<div class="clinic-view-statement-wrapper">
		<div class="trans-body-detail-header">
			<div>
				<h4>View Statment of Account</h4>
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
			</div>
		</div>

		<div v-if="!viewStatementAccount" class="table-statement-container">
			<ul class="table-statement-header">
				<li>
					<a>All Invoices</a>
				</li>
			</ul>

			<div class="invoice-tbl-wrapper">
				<table class="invoice-tbl-container">
					<thead>
						<tr>
							<th>
								<span>Status</span>
							</th>
							<th>
								<span>Date</span>
							</th>
							<th>
								<span>Number</span>
							</th>
							<th>
								<span>Customer</span>
							</th>
							<th>
								<span>Total</span>
							</th>
							<th>
								<span>Amount due</span>
							</th>
							<th>
								<span>Actions</span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="true">
							<td>
								<div class="status paid">PAID</div>
							</td>
							<td>
								<span>Apr 01, 2019</span>
							</td>
							<td>
								<span>MNST00005</span>
							</td>
							<td>
								<span>Stackgecko GP</span>
							</td>
							<td>
								<span>$4,023.87</span>
							</td>
							<td>
								<span>$0.00</span>
							</td>
							<td>
								<a @click="viewStatement()" class="view-statement-button">View</a>
								<div>
									<button @click="btnView()"><i class="fa fa-caret-down"></i></button>
									<ul v-if="viewSelector" class="dropdown-menu">
										<li>
											<a>Export as PDF</a>
										</li>
										<li>
											<a>Print</a>
										</li>
									</ul>	
								</div>
							</td>
						</tr>
						<tr v-if="false">
							<td>
								<h6 class="no-data-text">No data available in table</h6>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>

		<div v-if="viewStatementAccount">
			<div class="btn-preview-container">
				<div>
					<button class="btn-preview"><i class="fa fa-eye"></i>Preview</button>
				</div>
				<div>
					<i @click="viewStatement()" class="fa fa-times"></i>
				</div>
			</div>

			<div class="invoice-card-wrapper statement-account-wrapper">
				<div>
					<i @click="viewStatement()" class="fa fa-times"></i>
				</div>
				<div class="header">
					<div class="statment-account-header-title">
						<h1>STATEMENT OF ACCOUNT</h1>
						<h5>
							(Generated on <span>May 23, 2019</span>)
						</h5>
					</div>

					<div>
						<img :src="'https://res.cloudinary.com/dzh9uhsqr/image/upload/v1549795986/up0ebkyrragfte9bany7.jpg'">
					</div>
					<div class="header-right-info">
						<div class="statement-row-container">
							<span class="statement-bank-name">N/a</span>
						</div>
						<div class="statement-row-container">
							<span class="statement-bank-address">N/a</span>
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
						<div class="account-summary-title">
							<span>Account Summary</span>
						</div>
						<div class="statement-row-container">
							<label>Invoiced: </label>
							<span>S$ <span class="statement-amount-due">4,023.87</span></span>
						</div>
						<div class="statement-row-container">
							<label>Payments: </label>
							<span>(S$ <span class="statement-amount-paid">4031.36</span>)</span>
						</div>
						<div class="statement-row-container">
							<label>Ending Balance <span class="statement-created-at">May 23,2019 </span>:</label>
							<span>S$ <span class="statement-amount-total">NaN</span></span>
						</div>
					</div>
				</div>
				<div class="invoices-payments-container">
					<div>SHOWING ALL INVOICES AND PAYMENTS BETWEEN <span>FEB 01, 2017</span> AND <span>FEB 28,2017</span></div>
				</div>
				<div class="invoices-payments-tbl-container">
					<table>
						<thead>
							<tr>
								<th>
									<span>Date</span>
								</th>
								<th>
									<span>Details</span>
								</th>
								<th>
									<span>Amount</span>
								</th>
								<th>
									<span>Balance</span>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<span>Feb 01,2017</span>
								</td>
								<td>
									<span>Invoce #<span class="statement-invoice-number">MNST00005</span> (due <span>FEB 28, 2017</span>)</span>
								</td>
								<td> S$ 
									<span class="statement-amount-due">4,023.87</span>
								</td>
								<td> S$ 
									<span class="statement-amount-total">4,023.87</span>
								</td>
							</tr>
							<tr>
								<td>
									<span>Feb 28,2017</span>
								</td>
								<td> Payment 
									<span>Invoice #<span class="statement-invoice-number">MNST00005</span> </span>
								</td>
								<td> (S$ 
									<span class="statement-amount-due">4031.36</span>)
								</td>
								<td> S$ 
									<span class="statement-amount-total">NaN</span>
								</td>
							</tr>
							<tr>
								<td>
									<span>May 23,2019</span>
								</td>
								<td>
									<span>Ending Balance</span>
								</td>
								<td> 
									<span class="statement-amount-due"></span>
								</td>
								<td> S$ 
									<span class="statement-amount-total">NaN</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="total">
					<h4>Amount due (SGD)</h4>
					<div>S$ <span class="statement-amount-total">NaN</span></div>
				</div>
			</div>
		</div>

	</div> 
</template>

<script>
import statementAccount from "@/components/clinic/settings/transactions/statement-account";

export default statementAccount;
</script>