<script>
import axios from 'axios';
import moment from 'moment';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
//Methods here
let statement = {
  data() {
    return {
      range_marks : { '1' : 'JAN', '2' : 'FEB', '3' : 'MAR', '4' : 'APR', '5' : 'MAY', '6' : 'JUN', '7' : 'JUL', '8' : 'AUG', '9' : 'SEP', '10' : 'OCT', '11' : 'NOV', '12' : 'DEC', },
      current_year : moment( ).format('YYYY'),
      start_date : new Date(moment().startOf('month')),
      end_date : new Date(moment().endOf('month')),
      range_values : moment().format('M'),
      showRangeMonthSlider: true,
      showInputDate: false,
      overview_active: true,
      full_active: false,
      showTransDetails: false,
      inDragging : false,
      isFromSlider : false,
      isNoTransaction : false,
      isActiveSearch : false,
      timeFrame: {},
      year_active: {
        value: 0,
        text: ""
      },
      viewStatementType: {
    		value: 0,
        text: ""
      },
      spendingTypeOpt: {
        value: 2,
        text: "both"
      },
      networkType: {
        value: 0,
        text: ""
      },
      formats: {
        input: ['DD/MM/YYYY'], 
        data: ['YYYY-MM-DD']
      },
      download_token: null,
      options: {},
      overview_data: {
        statement: {},
        e_claim_transactions: [],
        in_network_transactions: [],
      },
      employee_list: [],
      slideCtr: 0,
      selected_user_id: null,
      spendingTypeFilter: undefined,
      search_emp: '',
    };
  },
  created(){
    this.getSession();
    this.getDownloadToken();
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
    filteredInNetwork(){
      if( this.spendingTypeOpt.text != 'both' ){
        return this.overview_data.in_network_transactions.filter((value) => {
          return value.spending_type == this.spendingTypeOpt.text;
        })
      }else{
        return this.overview_data.in_network_transactions;
      }
    },
    filteredOutNetwork(){
      if( this.spendingTypeOpt.text != 'both' ){
        return this.overview_data.e_claim_transactions.filter((value) => {
          return value.spending_type == this.spendingTypeOpt.text;
        })
      }else{
        return this.overview_data.e_claim_transactions;
      }
    }
  },
  methods: {
    closeSearchEmp(){
      this.isActiveSearch = false;
      this.search_emp = "";
      this.getStatementData();
    },
    selectEmployeeSearch( id, name ){
      this.selected_user_id = id;
      this.search_emp = name;
      this.getStatementDataByEmployee();
    },
    searchEmployeeChanged( value ){
      if( value.length > 0 ){
        this.isActiveSearch = true;
      }else{
        this.isActiveSearch = false;
      }
    },
    downloadFullINPDF( invoice_data, type ){

    },
    downloadFullOUTPDF( invoice_data, type ){

    },
    downloadCSV(){

    },
    downloadPDF( data ){
      if(this.download_token.live == true) {
        window.open(this.download_token.download_link + "/spending_invoice_download?id=" + data.statement_id + '&token=' + this.download_token.token);
      } else {
        window.open(axios.defaults.serverUrl.node_company + '/hr/statement_download?id=' + data.statement_id + '&token=' + window.localStorage.getItem('vue_hr_session'));
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
    filterDate( date, format ){

      return moment( date ).format( format );
    },
    roundFloatValue( value ){

      return parseFloat( value ).toFixed(2);
    },
    sliderDragged( value ){
      if( this.inDragging == false && this.isFromSlider == true){
        setTimeout(() => {
          this.setFirstEndDate( value );
          // this.setFirstEndDate( value[0], value[1] );
          this.getStatementData( );
        }, 500);
      }
    },
    setFirstEndDate( firstMonth, lastMonth ){
      this.start_date = moment( firstMonth + " " + this.current_year,'MM YYYY' ).startOf('month').format('YYYY-MM-DD');
      this.end_date   = moment( firstMonth + " " + this.current_year,'MM YYYY' ).endOf('month').format('YYYY-MM-DD');
      // this.end_date   = moment( lastMonth + " " + this.current_year,'MM YYYY' ).endOf('month').format('YYYY-MM-DD');
    },
    dateSelected( start, end ){
      this.start_date = new Date( start );
      this.end_date   = new Date( end );
      this.getStatementData();
    },
    showCustomDate(value, text) {
      this.year_active.value = value;
      this.year_active.text = text;
      if (this.year_active.text == 'this-year') {
        this.showRangeMonthSlider = true;
        this.showInputDate = false;
        this.current_year = moment( ).format('YYYY');
      }
      if (this.year_active.text == 'last-year') {
        this.showRangeMonthSlider = true;
        this.showInputDate = false;
        this.current_year = moment( ).subtract( 1, 'years' ).format('YYYY');
      }
      this.start_date = new Date(moment( moment( this.start_date ).format('MMMM') + " " + this.current_year ).startOf('month'));
      this.end_date = new Date(moment( moment( this.end_date ).format('MMMM') + " " + this.current_year ).endOf('month'));
      if (this.year_active.text == 'custom') {
        this.showRangeMonthSlider = false;
        this.showInputDate = true;
      }else{
        this.getStatementData( );
      }
    },
  	statementType(value, text) {
      //spending either medical or wellness
      this.viewStatementType.value = value;
      this.viewStatementType.text = text;

      if ( this.viewStatementType.text == 'full') {
        this.overview_active = false;
        this.full_active = true;
      } else if ( this.viewStatementType.text == 'overview') {
        this.overview_active = true;
        this.full_active = false;
      }
    },
    setSpendingType(value, text) {
      this.spendingTypeOpt.value = value;
      this.spendingTypeOpt.text = text;
      // if( this.selected_user_id != null ){
      //   this.getStatementDataByEmployee();
      // }else{
      //   this.getStatementData();
      // }
    },
    netType(value, text) {
      this.networkType.value = value;
      this.networkType.text = text;
    },
    toggleDetails( list ) {
      list.showTransDetails = !list.showTransDetails;
      this.$forceUpdate();
    },
    uploadReceipt( list, upload_data ){
      if( !list.transaction_files ){
        list.transaction_files = [];
      }
      list.uploading = true;
      let formData = new FormData();
      formData.append('file', upload_data[0]);
      formData.append('e_claim_id', list.transaction_id);
      this.$parent.showLoading();
      axios.post( 
        axios.defaults.serverUrl.node_company + "/hr/upload_e_claim_receipt", 
        formData, 
        { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res => {
          // console.log( res );
          list.uploading = false;
          if( res.data.status == true ){
            list.files.push( res.data.file_link );
            list.upload_err = false;
          }else{
            list.upload_err = true;
            list.upload_err_message = res.data.message;
          }
          this.$parent.hideLoading();
        })
        .catch(err => {
          console.log( err );
          list.uploading = false;
          list.upload_err = true;
          list.upload_err_message = 'Something went wrong. Please check your internet connection.'
          this.$parent.hideLoading();
        });
    },
    getDownloadToken(){
      // this.$parent.showLoading();
      axios.get( axios.defaults.serverUrl.node_company + '/hr/get_download_token' )
        .then(res => {
          // this.$parent.hideLoading();
          console.log(res);
          if( res.status == 200 ){
            this.download_token = res.data;
          }else{
            this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          // this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
        });
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
            this.getStatementData();
          }else{
            this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          // this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
        });
    },
    getStatementDataByEmployee( ){
      this.isFromSlider = false;
      var data = {
        start : moment(this.start_date).format('YYYY-MM-DD'),
        end : moment(this.end_date).format('YYYY-MM-DD'),
        user_id : this.selected_user_id,
      }
      this.$parent.showLoading();
      this.isActiveSearch = false;
      axios.post( axios.defaults.serverUrl.node_company + '/hr/search_employee_statement', data )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.data.status ){
            this.overview_data = res.data.data;
            this.isNoTransaction = false;
          }else{
            this.isNoTransaction = true;
            // this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
        });
    },
    getStatementData( ){
      this.isFromSlider = false;
      var data = {
        start : moment(this.start_date).format('YYYY-MM-DD'),
        end : moment(this.end_date).format('YYYY-MM-DD'),
      }
      this.$parent.showLoading();
      axios.post( axios.defaults.serverUrl.node_company + '/hr/get_statement', data )
        .then(res => {
          this.$parent.hideLoading();
          console.log(res);
          if( res.data.status ){
            this.overview_data = res.data.data;
            this.isNoTransaction = false;
          }else{
            this.isNoTransaction = true;
            // this.$parent.swal('Error!', res.data.message, 'error');
          }
        })
        .catch(err => {
          console.log( err );
          this.$parent.hideLoading();
          this.$parent.swal('Error!', err,'error');
        });
    }
  }
};

export default statement
</script>

<style lang="scss" scoped>
@import "./src/assets/css/company/statement.scss";
</style>
