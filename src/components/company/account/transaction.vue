<script>
import axios from 'axios';
import Modal from "../../../views/company/modal/Modal";
// Methods here
let transaction = {
  components: {
    Modal
  },
  data() {
    return {
      modals: {
        transactions : {
          refund: false
        },
      },
      download_token: null,
      plan_transactions_page: 1, 
      benefits_spending_page: 1, 
      spending_deposit_page: 1,
      transactions: [], 
      transactions_pagination: {}, 
      benefits_spending_transactions: [], 
      benefits_spending_transactions_pagination: {}, 
      spending_deposits: [], 
      spending_deposits_pagination: {}, 
      refund_data: {
        data: [],
        company: {}
      }, 
      refunds: [], 
      refunds_pagination: {}, 
      refund_active_emp_ctr: 0,
      job_list: [],
    };
  },
  created(){
    this.getDownloadToken( );
    this.getTransactions( this.plan_transactions_page );
    this.getBenefitsSpendingTransactions( this.plan_transactions_page );
    this.getSpendingDeposits( this.spending_deposit_page );
    this.getRefunds( );
    this.getJobList( );
  },
  methods: {
    empRefundPrevNext( isNext ){
      if( isNext ){
        this.refund_active_emp_ctr += 1;
      }else{
        this.refund_active_emp_ctr -= 1;
      }
    },
    companyContactsModal(data, modal_data) {
      // company
      let refund = this.modals.transactions.refund;
      // Transactions
      if (data == 'refund') {
        if( !refund == true ){
          this.getUsersRefund( modal_data );
        }else{
          this.modals.transactions.refund = !refund;
        }
      }
      // end Transactions
    },
    downDepedentInvoice( id ){

      window.open( axios.defaults.serverUrl.node_company + '/hr/download_dependent_invoice?dependent_plan_id=' + id + '&token=' + this.download_token );
    },
    downloadSpendingReceipt( data ){
      if(this.download_token.live == true) {
        window.open(this.download_token.download_link + "/spending_receipt_download?id=" + data.statement_id + '&token=' + this.download_token);
      } else {
        window.open(axios.defaults.serverUrl.node_company + '/hr/download_spending_receipt?statement_id=' + data.statement_id + '&token=' + this.download_token);
      }
    },
    downloadSpendingInvoice( data ){
      if(this.download_token.live == true) {
        window.open(this.download_token.download_link + "/spending_invoice_download?id=" + data.statement_id + '&token=' + this.download_token);
      } else {
        window.open(axios.defaults.serverUrl.node_company + '/hr/statement_download?id=' + data.statement_id + '&token=' + this.download_token);
      }
    },
    downloadSpendingDeposit( id ){

      window.open( axios.defaults.serverUrl.node_company + '/hr/spending_desposit?id=' + id + '&token=' + this.download_token);
    },
    downloadRefund( id ){

      window.open( axios.defaults.serverUrl.node_company + '/hr/get_cancellation_details?id=' + id + '&token=' + this.download_token);
    },
    transactionsNextPrev( isNext ){
      if( isNext ){
        this.plan_transactions_page += 1;
      }else{
        this.plan_transactions_page -= 1;
      }
      this.getTransactions( this.plan_transactions_page );
    },
    benefitsSpendingTransactionsNextPrev( isNext ){
      if( isNext ){
        this.benefits_spending_page += 1;
      }else{
        this.benefits_spending_page -= 1;
      }
      this.getBenefitsSpendingTransactions( this.benefits_spending_page );
    },
    spendingDepositsNextPrev( isNext ){
      if( isNext ){
        this.spending_deposit_page += 1;
      }else{
        this.spending_deposit_page -= 1;
      }
      this.getSpendingDeposits( this.spending_deposit_page );
    },
    getTransactions( page ){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/transactions?page=' + page )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.transactions = res.data.data;
            this.transactions_pagination = res.data;
          }else{
            this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
        });
    },
    getBenefitsSpendingTransactions( page ){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/benefits_spending_invoice_transactions?page=' + page )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.benefits_spending_transactions = res.data.data;
            this.benefits_spending_transactions_pagination = res.data;
          }else{
            this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
        });
    },
    getSpendingDeposits( page ){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/get_spending_deposits?page=' + page )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.spending_deposits = res.data.data;
            this.spending_deposits_pagination = res.data;
          }else{
            this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
        });
    },
    getRefunds( ){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/get_refunds' )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.refunds = res.data;
          }else{
            this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
        });
    },
    getUsersRefund( data ){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/get_runded_lists/' + data.payment_refund_id )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.refund_data = res.data;
            for( var i = 0; i < this.refund_data.data.length; i++ ){
              this.refund_data.data[i].user.fname = this.refund_data.data[i].user.Name.substring(0, this.refund_data.data[i].user.Name.lastIndexOf(" "));
              this.refund_data.data[i].user.lname = this.refund_data.data[i].user.Name.substring(this.refund_data.data[i].user.Name.lastIndexOf(" ") + 1);
              this.refund_data.data[i].user.Email = this.refund_data.data[i].user.Email.substring(this.refund_data.data[i].user.Email.lastIndexOf(" ") + 1);
            }
            this.modals.transactions.refund = true;
          }else{
            this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
        });
    },
    getDownloadToken(){
      this.download_token = localStorage.getItem('vue_session');
      console.log( this.download_token );
    },
    getJobList(){
      axios.get( '../assets/json/job.json')
        .then(res => {
          console.log(res);
          this.job_list = res.data;
        })
        .catch(err => {
          console.log( err );
          this.$parent.swal('Error!', err,'error');
        });
    },
  }
};

export default transaction
</script>
