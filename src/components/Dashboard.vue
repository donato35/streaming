 <template>
<div class="p-grid  dashboard">
	<div class="p-col-12 p-lg-4">
		<div class="card summary">
			<span class="title">Active Events</span>
			<span class="detail">Number of active Events</span>
			<span class="count visitors">6</span>
		</div>
	</div>
	<div class="p-col-12 p-lg-4">
		<div class="card summary">
			<span class="title">Active Channels</span>
			<span class="detail">Number of active Channels</span>
			<span class="count purchases">18</span>
		</div>
	</div>
	<div class="p-col-12 p-lg-4">
		<div class="card summary">
			<span class="title">Total Connected Users</span>
			<span class="detail">Realtime Users</span>
			<span class="count revenue">3,200</span>
		</div>
	</div>

	<div class="p-col-12 p-md-6 p-xl-2">
		<div class="highlight-box">	
			<div class="initials" style="background-color: #007be5; color: #00448f"><img src="assets/layout/images/flag/EU.JPG" width="100" /></div>
			<div class="highlight-details ">
				<i class="pi pi-users"></i>
				<span>Europe</span>
				<span class="count">523</span>
			</div>
		</div>
	</div>
	<div class="p-col-12 p-md-6 p-xl-2">
		<div class="highlight-box">	
			<div class="initials" style="background-color: #ef6262; color: #a83d3b"><img src="assets/layout/images/flag/NA.JPG" width="100" /></div>
			<div class="highlight-details ">
				<i class="pi pi-users"></i>
				<span>N.America</span>
				<span class="count">20</span>
			</div>
		</div>
	</div>
	<div class="p-col-12 p-md-6 p-xl-2">
		<div class="highlight-box">	
			<div class="initials" style="background-color: #20d077; color: #038d4"><img src="assets/layout/images/flag/SA.JPG" width="100" /></div>
			<div class="highlight-details ">
				<i class="pi pi-users"></i>
				<span>S.America</span>
				<span class="count">30</span>
			</div>
		</div>
	</div>
	<div class="p-col-12 p-md-6 p-xl-2">
		<div class="highlight-box">	
			<div class="initials" style="background-color: #f9c851; color: #b58c2b"><img src="assets/layout/images/flag/AS.JPG" width="100" /></div>
			<div class="highlight-details ">
				<i class="pi pi-users"></i>
				<span>Asia</span>
				<span class="count">70</span>
			</div>
		</div>
	</div>
	<div class="p-col-12 p-md-6 p-xl-2">
		<div class="highlight-box">	
			<div class="initials" style="background-color: #007be5; color: #00448f"><img src="assets/layout/images/flag/AF.JPG" width="100" /></div>
			<div class="highlight-details ">
				<i class="pi pi-users"></i>
				<span>Africa</span>
				<span class="count">12</span>
			</div>
		</div>
	</div>
	<div class="p-col-12 p-md-6 p-xl-2">
		<div class="highlight-box">	
			<div class="initials" style="background-color: #007be5; color: #00448f"><img src="assets/layout/images/flag/OC.JPG" width="100" /></div>
			<div class="highlight-details ">
				<i class="pi pi-users"></i>
				<span>Oceania</span>
				<span class="count">45</span>
			</div>
		</div>
	</div>
	
	
	<div class="p-col-12">
			<div class="card">
				<h5>Active Events</h5>
				<DataTable :value="	events" :paginator="true"  :rows="10" dataKey="id" :rowHover="true" 
							v-model:filters="filters" filterDisplay="menu" :loading="loading" :filters="filters" responsiveLayout="scroll"
							:globalFilterFields="['id','name','languages','infraState','appState']" >
					<template #header>
                        <div class="p-d-flex p-jc-between p-flex-column p-flex-sm-row">
                            <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined p-mb-2" @click="clearFilter1()"/>
                            <span class="p-input-icon-left p-mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                            </span>
                        </div>
                    </template>
                    <template #empty>
                        No Events found.
                    </template>
                    <template #loading>
                        Loading Events data. Please wait.
                    </template>
                    <Column field="id" header="Event Id" style="min-width:12rem">
                        <template #body="{data}">
                            <span class="p-column-title">Id</span>
                            {{data.id}}
                        </template>
                        <template #filter="{filterModel}">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                        </template>
                    </Column>
					<Column field="name" header="Event Name" style="min-width:12rem">
                        <template #body="{data}">
                            <span class="p-column-title">Name</span>
                            {{data.name}}
                        </template>
                        <template #filter="{filterModel}">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                        </template>
                    </Column>
					<Column header="Event Languages" style="min-width:12rem">
                        <template #body="{data}">
							<span class="p-col-1"  v-for="item of data.languages" v-bind:key="item">
								<img src="assets/layout/flags/flag_placeholder.png" :alt="item.lang" :class="'flag flag-' + item.lang" width="30" />
							</span>
                        </template>
                    </Column>
					<Column field="infraState" header="Infrastructure Status" :filterMenuStyle="{'width':'14rem'}" style="min-width:12rem">
                        <template #body="{data}">
                            <span class="p-column-title">Status</span>
                            <span :class="'infraState-badge status-' + data.infraState">{{data.infraState}}</span>
                        </template>
                        <template #filter="{filterModel}">
                            <Dropdown v-model="filterModel.value" :options="infraStatus" placeholder="Any" class="p-column-filter" :showClear="true">
                                <template #value="slotProps">
                                    <span :class="'infraState-badge status-' + slotProps.value" v-if="slotProps.value">{{slotProps.value}}</span>
                                    <span v-else>{{slotProps.placeholder}}</span>
                                </template>
                                <template #option="slotProps">
                                    <span :class="'infraState-badge status-' + slotProps.option">{{slotProps.option}}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
					<Column field="appState" header="Platform Status" :filterMenuStyle="{'width':'14rem'}" style="min-width:12rem">
                        <template #body="{data}">
                            <span class="p-column-title">Status</span>
                            <span :class="'appState-badge status-' + data.appState">{{data.appState}}</span>
                        </template>
                        <template #filter="{filterModel}">
                            <Dropdown v-model="filterModel.value" :options="appStatus" placeholder="Any" class="p-column-filter" :showClear="true">
                                <template #value="slotProps">
                                    <span :class="'appState-badge status-' + slotProps.value" v-if="slotProps.value">{{slotProps.value}}</span>
                                    <span v-else>{{slotProps.placeholder}}</span>
                                </template>
                                <template #option="slotProps">
                                    <span :class="'appState-badge status-' + slotProps.option">{{slotProps.option}}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>
					<Column field="protected" header="Access Protected" dataType="boolean" bodyClass="p-text-center" style="min-width:8rem">
                        <template #body="{data}">
                            <span class="p-column-title">Protected</span>
                            <i class="pi" :class="{'true-icon pi-check-circle': data.secure=='YES', 'false-icon pi-times-circle': data.secure=='NO'}"></i>
                        </template>
                        <template #filter={filterModel}>
                            <TriStateCheckbox v-model="filterModel.value" />
                        </template>
                    </Column>
				</DataTable>
			</div>
		</div>
</div>
</template>

<script>
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import EventService from '../service/EventService';


export default {
	data() {
		return {
			events: null,
			loading: true,
			filters: null,
			appStatus: [
					'cs', 'streaming', 'vod','pending'
				],
			infraStatus: [
					'ready', 'pending', 'error'
				],
		}
	},
	eventService: null,
	created() {
		this.eventService = new EventService();
		this.initFilters();
	},
	mounted() {
		this.eventService.getEvents().then(data => {
			this.events = data; 
			this.loading = false;
		});
	},
	methods: {
		formatCurrency(value) {
			return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
		},
		initFilters() {
				this.filters = {
					'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
					'id': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'languages': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'infraState': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
					'appState': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
					'protected': {value: null, matchMode: FilterMatchMode.EQUALS}
				}
			},
		clearFilter1() {
			this.initFilters();
		},
	}
}
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 960px) {
		::v-deep(.p-datatable) {
			&.p-datatable-customers {
				.p-datatable-thead > tr > th,
				.p-datatable-tfoot > tr > td {
					display: none !important;
				}

				.p-datatable-tbody > tr {
					border-bottom: 1px solid #dee2e6;
					> td {
						text-align: left;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 0 none !important;
						width: 100% !important;
						float: left;
						clear: left;
						border: 0 none;

						.p-column-title {
							padding: .4rem;
							min-width: 30%;
							display: inline-block;
							margin: -.4rem 1rem -.4rem -.4rem;
							font-weight: bold;
						}

						.p-progressbar {
							margin-top: .5rem;
						}
					}
				}
			}
		}
	}
	.infraState-badge {
		border-radius: 2px;
		padding: .25em .5rem;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: .3px;

		&.status-ready {
			background: #C8E6C9;
			color: #256029;
		}

		&.status-error {
			background: #FFCDD2;
			color: #C63737;
		}

		&.status-pending {
			background: #FEEDAF;
			color: #8A5340;
		}
	}

	.appState-badge {
		border-radius: 2px;
		padding: .25em .5rem;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: .3px;

		&.status-streaming {
			background: #C8E6C9;
			color: #256029;
		}

		&.status-cs {
			background: #FFCDD2;
			color: #C63737;
		}

		&.status-vod {
			background: #B3E5FC;
			color: #23547B;
		}

		&.status-pending {
			background: #FEEDAF;
			color: #8A5340;
		}
	}
	
</style>
