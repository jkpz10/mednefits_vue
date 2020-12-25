<script>
/* eslint-disable */
import ImgPreview from "../../views/company/modal/ImagePreview"; //image popup
import axios from 'axios';
import moment from 'moment';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import Vue2Filters from 'vue2-filters'


// Methods here
let claim = {
  mixins: [Vue2Filters.mixin],
  components: {
    ImgPreview
  },
  data() {
    return {
      current_year : moment( ).format('YYYY'),
      start_date : new Date(moment().startOf('month')),
      end_date : new Date(moment().endOf('month')),
    	eclaimSpendingType: {
    		value: 0,
        text: "medical"
      },
      viewData : 'All',
      viewEclaim: false,
      formats: {
        input: ['DD/MM/YYYY'], 
        data: ['YYYY-MM-DD']
      },
      showPreview: false,
      options: {},
      employee_list: [],
      company_details: {},
      search_emp: "",
      isActiveSearch: false,
      pageCtr: 1,
      claim_data: {},
      all_receipts: [],
      selected_user_id: null,
      download_receipts_ctr: 0,
      zip: new JSZip(),
      all_receipts: [],
      pending_receipts: [],
      approved_receipts: [],
      rejected_receipts: [],
    };
  },
  created(){
    this.getSession();
  },
  computed: {
    searchedEmployee(){
      if( this.search_emp != '' ){
        return this.employee_list.filter((value) => {
          return value.Name.startsWith( this.search_emp );
        })
      }else{
        return this.employee_list;
      }
    },
    filteredEclaimTransactions(){
      if( this.viewData != 'All' ){
        return this.claim_data.e_claim_transactions.filter((value) => {
          return value.status_text == this.viewData;
        })
      }else{
        return this.claim_data.e_claim_transactions;
      }
    },
  },
  methods: {
    togglePreview( img ){
      img.showPreview = !img.showPreview;
      this.$forceUpdate();
    },
    downloadAllReceipts( ){
      if( this.download_receipts_ctr == 0 ){
        this.$parent.showLoading();
        this.$parent.showFloatingBox();
        setTimeout(() => {
          $('.receipt-download').show();
          $('.receipt-download #receipt_total').text( this.all_receipts.length );
        }, 200);
      }

      $('.receipt-download #receipt_count').text( this.download_receipts_ctr + 1 );
      var zipfilename = moment( this.start_date, 'DD/MM/YYYY' ).format('DD MMM') + ' to ' + moment( this.end_date, 'DD/MM/YYYY' ).format('DD MMM YYYY') + ' ' + this.company_details;
      var transaction = this.all_receipts[this.download_receipts_ctr];
      var main_folder = this.zip.folder( transaction.filename );

      for( var x = 0; x < transaction.files.length; x++ ){
        var value = transaction.files[x];
        var filename = $.trim( value.file.split('/').pop().replace(/\.*/,'') );
        filename = ( filename.indexOf("?") >= 0 ) ? filename.substring(0, filename.indexOf('?')) : filename;

        var promise = $.ajax({
          url: value.file,
          method: 'GET',
          xhrFields: {
            responseType: 'blob'
          }
        });

        main_folder.file(filename, promise);

        if( x == (transaction.files.length-1) ){
          if( this.download_receipts_ctr == (this.all_receipts.length-1) ){
            setTimeout(() => {
              this.zip.generateAsync({type:"blob"})
                .then(function(content) {
                  saveAs(content, zipfilename + ".zip");
                });
              this.download_receipts_ctr = 0;
              this.$parent.hideLoading();
              this.$parent.hideFloatingBox();
            }, 1000);
            
          }else{
            setTimeout(() => {
              this.download_receipts_ctr+=1;
              this.downloadAllReceipts();
            }, 300);
          }
        }
      }
    },
    downloadReceipt( receipt, list ){
      this.$parent.showLoading();
      var zip = new JSZip();
      var main_folder = zip.folder( list.member + "_" + list.transaction_id );
      for( var i = 0; i < receipt.length; i++ ){
        var value = receipt[i];
        var filename = $.trim( value.file.split('/').pop() );
        filename = ( filename.indexOf("?") >= 0 ) ? filename.substring(0, filename.indexOf('?')) : filename;
        
        var promise = $.ajax({
          url: value.file,
          method: 'GET',
          xhrFields: {
            responseType: 'blob'
          }
        });

        main_folder.file(filename, promise);

        if( i == (receipt.length-1) ){
          zip.generateAsync({type:"blob"}).then(function(content) {
            FileSaver.saveAs(content, list.member + "_" + list.transaction_id + ".zip");
          });
          this.$parent.hideLoading();
        }
      }
    },
    downloadCSV(){
      this.$parent.showLoading();
      var data = {
        token : localStorage.getItem('vue_hr_session'),
        start : moment(this.start_date).format('YYYY-MM-DD'),
        end : moment(this.end_date).format('YYYY-MM-DD'),
        spending_type : this.eclaimSpendingType.text,
        status : this.viewData,
      }
      if( this.selected_user_id != null ){
        data.user_id = this.selected_user_id;
      }
      var api_url = axios.defaults.serverUrl.node_company + "/hr/download_out_of_network_csv?token=" + data.token + "&start=" + data.start + "&end=" + data.end + "&spending_type=" + data.spending_type + "&status=" + data.status;
      if( data.user_id ){
        api_url += ("&user_id=" + data.user_id);
      }
      window.open( api_url );
      this.$parent.hideLoading();
    },
    closeSearchEmp(){
      this.isActiveSearch = false;
      this.search_emp = "";
      this.getClaims();
    },
    selectEmployeeSearch( id, name ){
      this.selected_user_id = id;
      this.search_emp = name;
      this.getClaimsByEmployee();
    },
    searchEmployeeChanged( value ){
      if( value.length > 0 ){
        this.isActiveSearch = true;
      }else{
        this.isActiveSearch = false;
      }
    },
  	spendType(value, text) {
      //spending either medical or wellness
      this.eclaimSpendingType.value = value;
      this.eclaimSpendingType.text = text;
      this.getClaims();
    },
    toggleDetails(data) {
      data.showTransDetails = !data.showTransDetails;
      this.$forceUpdate();
    },
    viewEclaimToggle(opt, data) {
      if ( opt == 0 ) { //open dropdown
        if( data == 'open')
          this.viewEclaim = !this.viewEclaim;
      }
      else if( opt == 1) { // select item from dropdown
        if(data == 'All'){
          this.viewData = data;
          this.viewEclaim = false;
        } 
        else if (data == 'Pending') {
          this.viewData = data;
          this.viewEclaim = false;
        }
        else if (data == 'Approved') {
          this.viewData = data;
          this.viewEclaim = false;
        }
        else if (data == 'Rejected') {
          this.viewData = data;
          this.viewEclaim = false;
        }
      }
    },
    hideReasonInput( list ){
      list.showReasonInput = false;
      list.showRemarksInput = false;
      this.$forceUpdate();
    },
    updateStatusText( list, num ){
      if( ( list.reason == "" || list.reason == undefined )&& num == 2){
        this.$parent.swal('Error!', 'Reason is required.', 'error');
        return false;
      }
      var data = {
        e_claim_id: list.transaction_id,
        status: num,
        rejected_reason : list.reason
      }
      this.$parent.showLoading();
      axios.post( axios.defaults.serverUrl.node_company + '/hr/e_claim_update_status', data )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            list.status = num;
            list.showRemarksInput = false;
            if( list.status == 1 ){
              list.status_text = 'Approved';
            }
            if( list.status == 2 ){
              list.status_text = 'Rejected';
              list.rejected_reason = list.reason;
              list.rejected_date = moment().format("DD MMMM YYYY hh:mm A");
            }

            if( res.data.status == true ){
              list.res = true;
              list.message = res.data.message;
            }else{
              list.res = false;
              list.message = res.data.message;
            }
            list.showReasonInput = false;
            list.showRemarksInput = false;
          }else{
            this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
        });
      this.$forceUpdate();
    },
    updateStatus( list, num ){
      if( num == 1 ){
        list.showReasonInput = false;
        list.showRemarksInput = true;
      }
      if( num == 2 ){
        list.showReasonInput = true;
        list.showRemarksInput = false;
      }
      if( num == 3 ){
        var data = {
          e_claim_id : list.trans_id
        }
        this.$parent.showLoading();
        axios.post( axios.defaults.serverUrl.node_company + '/hr/revert_pending_e_claim', data )
          .then(res => {
            this.$parent.hideLoading();
            console.log(res);
            if( res.status == 200 ){
              list.status = 0;
              list.status_text = 'Pending';
              list.res = true;
              list.message = res.data.message;
            }else{
              this.$parent.swal('Error!', res.data.message, 'error');
            }
          })
          .catch(err => {
            console.log( err );
            this.$parent.hideLoading();
            this.$parent.swal('Error!', err,'error');
          });
      }
      this.$forceUpdate();
    },
    getSession(){
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/get-hr-session' )
        .then(res => {
          // this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.options = res.data;
            this.getEmployeeLists();
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
    getEmployeeLists(){
      // this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/employee_lists' )
        .then(res => {
          // this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.employee_list = res.data.data;
            this.getCompanyDetails();
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
    getCompanyDetails(){
      // this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/details' )
        .then(res => {
          // this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.company_details = res.data.data;
            this.getClaims();
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
    getClaimsByEmployee(){
      var data = {
        start : moment(this.start_date).format('YYYY-MM-DD'),
        end : moment(this.end_date).format('YYYY-MM-DD'),
        spending_type : this.eclaimSpendingType.text,
        user_id : this.selected_user_id,
      }
      this.isActiveSearch = false;
      this.$parent.showLoading();
      axios.post( axios.defaults.serverUrl.node_company + '/hr/search_employee_e_claim_activity', data)
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.claim_data = res.data;
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
    getClaims(){
      var data = {
        start : moment(this.start_date).format('YYYY-MM-DD'),
        end : moment(this.end_date).format('YYYY-MM-DD'),
        page : this.pageCtr,
        spending_type : this.eclaimSpendingType.text,
      }
      this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/e_claim_activity?page=' + data.page + '&start=' + data.start + '&end=' + data.end + '&spending_type=' + data.spending_type )
        .then(res => {
          
          console.log(res);
          if( res.status == 200 ){
            if( this.pageCtr != 1 ){
              this.claim_data.all_transaction_total_formatted += res.data.data.all_transaction_total_formatted;
              this.claim_data.pending_transaction_total_formatted += res.data.data.pending_transaction_total_formatted;
              this.claim_data.rejected_transaction_total_formatted += res.data.data.rejected_transaction_total_formatted;
              this.claim_data.total_e_claim_approved_formatted += res.data.data.total_e_claim_approved_formatted;
              this.claim_data.total_e_claim_pending_formatted += res.data.data.total_e_claim_pending_formatted;
              this.claim_data.total_e_claim_rejected_formatted += res.data.data.total_e_claim_rejected_formatted;
              this.claim_data.total_e_claim_submitted_formatted += res.data.data.total_e_claim_submitted_formatted;

              for( var i = 0; i < res.data.data.e_claim_transactions.length; i++ ){
                this.claim_data.e_claim_transactions.push( res.data.data.e_claim_transactions[ i ] );
              }
            }else{
              this.claim_data = res.data.data;
            }
            
            if( res.data.last_page > 0 && this.pageCtr != res.data.last_page ){
              this.pageCtr += 1;
              this.getClaims();
            }else{
              if( this.claim_data.e_claim_transactions.length > 0 ){
                // $('.btn-receipts').attr( 'disabled', false );
                for( var x = 0; x < this.claim_data.e_claim_transactions.length; x++ ){
                  var value = this.claim_data.e_claim_transactions[ x ];
                  var temp_arr = [];
                  for( var y = 0; y < value.files.length; y++ ){
                    var value2 = value.files[ y ];
                    temp_arr.push(value2);
                    if( y == ( value.files.length-1 ) ){
                      this.all_receipts.push( { filename: value.transaction_id + ' - ' + value.member, files : temp_arr } );
                      if( value.status == 0 ){
                        this.pending_receipts.push( { filename: value.transaction_id + ' - ' + value.member, files : temp_arr } );
                      }
                      if( value.status == 1 ){
                        this.approved_receipts.push( { filename: value.transaction_id + ' - ' + value.member, files : temp_arr } );
                      }
                      if( value.status == 2 ){
                        this.rejected_receipts.push( { filename: value.transaction_id + ' - ' + value.member, files : temp_arr } );
                      }
                    }
                  }
                }
              }else{
                // $('.btn-receipts').attr( 'disabled', true );
              }

              console.log( this.claim_data.e_claim_transactions );

              this.pageCtr = 1;
              this.$parent.hideLoading();
            }
          }else{
            this.$parent.hideLoading();
            this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
        });
    },
  }
};

export default claim;
</script>

<style lang="scss">
@import "./src/assets/css/company/claim.scss";
</style>

