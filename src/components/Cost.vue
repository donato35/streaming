<template>
<div class="p-fluid p-grid p-formgrid">
	<div class="p-field p-col-12 p-sm-12 p-lg-2">
		<label for="basic">Select Date Range</label>
		<Calendar v-model="selectedDate" :minDate="minDate" :maxDate="maxDate" selectionMode="range" :manualInput="false" :numberOfMonths="2" :showIcon="true" dateFormat="yy-mm-dd">
			<template #footer>
				<div class="p-grid p-pt-5">
					<div class="p-col-2 p-text-bold p-as-center p-text-right" >Auto-Select:</div>
					<div class="p-col-8">
						<SelectButton v-model="autoselected" :options="dt" optionLabel="name"  @click="autoselectClick()"/>
					</div>
					<div class="p-col-1 p-mr-4">
						<Button class="p-button-outlined" label="Clear"  @click="clearClick()"/>
					</div>
					
				</div>
			</template>
		</Calendar>
	</div>
	<div class="p-field p-col-12 p-sm-12 p-lg-1">
		<label for="bt" >&nbsp;</label>
		<Button id="bt" label="Search"  @click="searchClick()"/>
	</div>
</div>
<div class="card">
	<h5 class="centerText">Platform Cost (euro)</h5>
	<Chart type="bar" :data="basicData" height="80"/>
</div>
<div class="p-fluid p-grid p-formgrid">
	<div class="p-field p-col-12 p-sm-12 p-lg-2">
		<label for="basic">Start Months</label>
		<Calendar Calendar v-model="startMonth" view="month"  dateFormat="yy-mm" yearRange="2000:2030" :showIcon="true" :manualInput="false" :showButtonBar="true" :minDate="minDate" :maxDate="maxDate"/>
	</div>
	<div class="p-field p-col-12 p-sm-12 p-lg-2">
		<label for="basic">End Months</label>
		<Calendar Calendar v-model="endMonth" view="month"  dateFormat="yy-mm" yearRange="2000:2030" :showIcon="true" :manualInput="false"  :showButtonBar="true" :minDate="minDate" :maxDate="maxDate"/>
	</div>
	<div class="p-field p-col-12 p-sm-12 p-lg-1">
		<label for="bt" >&nbsp;</label>
		<Button id="bt" label="Search"  @click="searchBillClick()"/>
	</div>
	<div class="p-col-12">
	<div class="card">
		<h5>Platform Billing</h5>
		<DataTable :value="costTable" :paginator="true"  :rows="10"  :scrollable="true" scrollHeight="400px" :loading="false" scrollDirection="both" class="p-mt-3">
			<Column field="year" header="Year" :style="{width:'150px'}" frozen></Column>
			<Column field="month" header="Month" :style="{width:'150px'}" frozen></Column>
			<Column field="cost" header="Cost" :style="{width:'150px'}" frozen alignFrozen="right">
				<template #body="{data}">
					<span class="p-text-bold">{{formatCurrency(data.cost)}}</span>
				</template>
			</Column>
		</DataTable>
	</div>
</div>
</div>

</template>

<script>

import CostService from '../service/CostService';

export default {
	
	costSevice: null,
	
	data() {
		return {
			month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			minDate:null,
			maxDate:null,
			costTable:[],
			selectedDate: null,
			startMonth: null,
			endMonth: null,
			autoselected: null,
			dt: [
				{name: '1D', code: '1D'},
				{name: '7D', code: '7D'},
				{name: '1M', code: '1M'},
				{name: '3M', code: '3M'},
				{name: '6M', code: '6M'},
				{name: '1Y', code: '1Y'},
				{name: 'MTD', code: 'MTD'},
				{name: 'YTD', code: 'YTD'}
			],
			basicData: {
				labels: [],
				datasets: [
					{
						label: 'Daily Cost',
						backgroundColor: '#42A5F5',
						data: []
					}
				]
			}
		}
	},
	
	created() {
		
	},
	async mounted() {
		this.costService = new CostService();

		const today = new Date();
		var minDate = new Date()
		var maxDate = new Date()
		var w1 = new Date()
		minDate.setMonth(minDate.getMonth()-12)
		w1.setDate(today.getDate() - 6);
		this.selectedDate=[w1,today]
		this.minDate=minDate
		this.maxDate=maxDate
		this.autoselected={name: '7D', code: '7D'}
		
		const cost = await this.costService.getCost(w1.toISOString().substring(0,10),today.toISOString().substring(0,10),"DAILY")
		var dts =[{
					label: 'Daily Cost',
					backgroundColor: '#42A5F5',
					data: cost.data
				}]
		this.basicData = Object.assign({}, this.basicData, { labels: cost.labels, datasets: dts });
	},
	methods: {
		formatCurrency(value) {
				return value.toLocaleString('it-IT', {style: 'currency', currency: 'EUR'});
		},
		clearClick(){
			this.selectedDate=null
			this.autoselected=null
		},
		async searchBillClick(){
			var startDate 
			var endDate
			if (!this.startMonth || this.startMonth > this.endMonth){
				return
			}
			if (!this.endMonth){
				startDate = new Date(this.startMonth)
				startDate.setDate(startDate.getDate()+1)
				endDate = new Date()
				endDate.setMonth(endDate.getMonth()+1)
			}else{
				if (this.startMonth.toISOString().substring(0,10) == this.endMonth.toISOString().substring(0,10)){
					
					startDate = new Date(this.startMonth)
					startDate.setDate(startDate.getDate()+1)
					endDate = new Date(startDate)
					endDate.setMonth(endDate.getMonth()+1)
				}else{
					startDate = new Date(this.startMonth)
					startDate.setDate(startDate.getDate()+1)
					endDate = new Date(this.endMonth)
					endDate.setMonth(endDate.getMonth()+1)
				}
			}
			const cost = await this.costService.getCost(startDate.toISOString().substring(0,10),endDate.toISOString().substring(0,10),"MONTHLY")
			var result=[]
			cost.labels.forEach((item,index) => {
				result.push(
					{
						year: (new Date(item)).getFullYear(),
						month: this.month_names_short[(new Date(item)).getMonth()],
						cost:parseFloat(cost.data[index])
					}	
				)
			});
			this.costTable =result;
		},
		async searchClick(){
			
			var startDate 
			var endDate
			if (!this.selectedDate){
				return
			}
			if (!this.selectedDate[1]){
				
				startDate = new Date(this.selectedDate[0])
				startDate.setDate(startDate.getDate()+1)
				endDate = new Date(startDate)
				endDate.setDate(endDate.getDate()+1)
			}else{
				if (this.selectedDate[0].toISOString().substring(0,10) == this.selectedDate[1].toISOString().substring(0,10)){
					startDate = new Date(this.selectedDate[0])
					startDate.setDate(startDate.getDate()+1)
					endDate = new Date(startDate)
					endDate.setDate(endDate.getDate()+1)
				}else{
					startDate = new Date(this.selectedDate[0])
					startDate.setDate(startDate.getDate()+1)
					endDate = new Date(this.selectedDate[1])
					endDate .setDate(endDate .getDate()+1)
				}
			}
			
			const cost = await this.costService.getCost(startDate.toISOString().substring(0,10),endDate.toISOString().substring(0,10),"DAILY")
			var dts =[{
						label: 'Daily Cost',
						backgroundColor: '#42A5F5',
						data: cost.data
					}]
			this.basicData = Object.assign({}, this.basicData, { labels: cost.labels, datasets: dts });
		},
		autoselectClick(){
			const today = new Date()
			var prevDate = new Date()
			var firstDay =null
			if(this.autoselected.code=="1D"){
				this.selectedDate=[today,null]
			}
			if(this.autoselected.code=="7D"){
				prevDate.setDate(today.getDate() - 6)
				this.selectedDate=[prevDate,today]
			}
			if(this.autoselected.code=="1M"){
				prevDate.setDate(today.getDate() - 30)
				this.selectedDate=[prevDate,today]
			}
			if(this.autoselected.code=="3M"){
				prevDate.setDate(today.getDate() - 90)
				this.selectedDate=[prevDate,today]
			}
			if(this.autoselected.code=="6M"){
				prevDate.setDate(today.getDate() - 180)
				this.selectedDate=[prevDate,today]
			}
			if(this.autoselected.code=="1Y"){
				prevDate.setDate(today.getDate() - 365)
				this.selectedDate=[prevDate,today]
			}
			if(this.autoselected.code=="MTD"){
				firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
				this.selectedDate=[firstDay,today]
			}
			if(this.autoselected.code=="YTD"){
				firstDay = new Date(today.getFullYear(), 0, 1)
				this.selectedDate=[firstDay,today]
			}
		}
	}
}
</script>

<style scoped lang="scss">
	.table-header {
		display: flex;
		justify-content: space-between;
	}

	.product-image {
		width: 100px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	}

	.p-dialog .product-image {
		width: 150px;
		margin: 0 auto 2rem auto;
		display: block;
	}

	.confirmation-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.product-badge {
		border-radius: 2px;
		padding: .25em .5rem;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: .3px;

		&.status-instock {
			background: #C8E6C9;
			color: #256029;
		}

		&.status-outofstock {
			background: #FFCDD2;
			color: #C63737;
		}

		&.status-lowstock {
			background: #FEEDAF;
			color: #8A5340;
		}
	}

	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
		.p-button {
			margin-bottom: .25rem;
		}
	}
</style>
