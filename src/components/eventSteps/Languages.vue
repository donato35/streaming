<template>
    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                Basic Data
            </template>
           
            <template v-slot:content>
                <div class="p-fluid">
                    <div class="p-field">
                        <label for="name">Event Name</label>
                        <InputText id="name" v-model="name" :class="{'p-invalid': validationErrors.name && submitted}" />
                        <small v-show="validationErrors.name && submitted" class="p-error">Event name is required.</small>
                    </div>
                </div>
                <Card>
                    <template v-slot:subtitle>
                        <div class="p-text-bold">Channels</div>
                    </template>
                    <template v-slot:content>
                        <div class="p-fluid p-formgrid p-grid">
                            <div class="p-field p-col">
                                <label for="in_lan">Language</label>
                                <Dropdown v-model="selectedLanguage" :options="languages" optionLabel="name"  placeholder="Language" :showClear="true" style="width: 150px">
                                    <template #value="slotProps">
                                        <div class="country-item country-item-value p-grid" v-if="slotProps.value">
                                            <div class="p-col-fixed">
                                                <img src="assets/layout/flags/flag_placeholder.png" :class="'flag flag-' + slotProps.value.code.toLowerCase()" />
                                            </div>
                                            <div class="p-col p-text-left">{{slotProps.value.name}}</div>
                                        </div>
                                    
                                    </template>
                                    <template #option="slotProps">
                                        <div class="country-item p-grid" >

                                            <div class="p-col-fixed">
                                            <img src="assets/layout/flags/flag_placeholder.png" :class="'flag flag-' + slotProps.option.code.toLowerCase()" />
                                            </div>
                                            <div class="p-col p-text-left">{{slotProps.option.name}}</div>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>
                            <div class="p-field p-col">
                                <label for="in_cod">Input Codec</label>
                                <Dropdown v-model="selectedInCodec" :options="inCodecs" optionLabel="name" placeholder="Codec" /> 
                                <small v-show="validationErrors.name && submitted" class="p-error">Select a language</small>
                            </div>
                            <div class="p-field p-col">
                                <label for="in_res">Input Res.</label>
                                <Dropdown v-model="selectedInRes" :options="inRes" optionLabel="name" placeholder="Resolution" /> 
                            </div>
                            <div class="p-field p-col">
                                <label for="in_br">Input BR</label>
                                <Dropdown v-model="selectedInBr" :options="inBr" optionLabel="name" placeholder="B.Rate" /> 
                            </div> 
                            <div class="p-field p-col">
                                <label for="out_cod">Output Codec</label>
                                <Dropdown v-model="selectedOutCodec" :options="outCodecs" optionLabel="name" placeholder="Codec" /> 
                            </div>
                            <div class="p-field p-col">
                                <label for="out_res">Output Res.</label>
                                <Dropdown v-model="selectedOutRes" :options="inRes" optionLabel="name" placeholder="Resolution" /> 
                            </div>
                            <div class="p-field p-col">
                                <label for="out_brc">Output BRC</label>
                                <Dropdown v-model="selectedOutBrc" :options="outBrc" optionLabel="name" placeholder="BRC" /> 
                            </div>
                            <div class="p-field p-col">
                                <label for="bitrate">Output BR</label>
                                <InputText id="bitrate" v-model="selectedOutBr" :class="{'p-invalid': validationErrors.name && submitted}" />
                                <small v-show="validationErrors.name && submitted" class="p-error">Event name is required.</small>
                            </div>
                            <div class="p-field  p-col">
                                <label for="framerate">Output FR</label>
                                <InputText id="framerate" v-model="selectedOutFr" :class="{'p-invalid': validationChannelErrors.lang && submitted}" />
                                <small v-show="validationChannelErrors.lang && submitted" class="p-error">Event name is required.</small>
                            </div>
                            <div class="p-field  p-col">
                                <label for="framerate">.</label>
                                <Button label="ADD" icon="pi pi-plus" class="p-button-success p-mr-2" @click="addChannel" />
                            </div>
                        </div>
                        <DataTable :value="channels" :paginator="true"  :rows="5" dataKey="id" :rowHover="true"  responsiveLayout="scroll">
                             <template #empty>
                                No Channels defined.
                            </template>
                            <template #loading>
                                Loading Channels data. Please wait.
                            </template>
                            
                            <Column field="lang" header="Language" >
                                <template #body="{data}">
                                    <span class="p-column-title">Id</span>
                                    {{data.lang}}
                                </template>
                            </Column>
                            <Column field="ic" header="Input Codec" >
                                <template #body="{data}">
                                    <span class="p-column-title">Id</span>
                                    {{data.ic}}
                                </template>
                            </Column>
                            <Column field="ir" header="Input Resolution" >
                                <template #body="{data}">
                                    <span class="p-column-title">Id</span>
                                    {{data.ir}}
                                </template>
                            </Column>
                            <Column field="ibr" header="Input Bitrate" >
                                <template #body="{data}">
                                    <span class="p-column-title">Id</span>
                                    {{data.ibr}}
                                </template>
                            </Column>
                            <Column field="oc" header="Output Codec" >
                                <template #body="{data}">
                                    <span class="p-column-title">Id</span>
                                    {{data.oc}}
                                </template>
                            </Column>
                            <Column field="or" header="Output Resolution" >
                                <template #body="{data}">
                                    <span class="p-column-title">Id</span>
                                    {{data.or}}
                                </template>
                            </Column>
                            <Column field="obrc" header="Output BRC" >
                                <template #body="{data}">
                                    <span class="p-column-title">Id</span>
                                    {{data.obrc}}
                                </template>
                            </Column>
                            <Column field="obr" header="Output Bitrate" >
                                <template #body="{data}">
                                    <span class="p-column-title">Id</span>
                                    {{data.obr}}
                                </template>
                            </Column>
                            <Column field="ofr" header="Output Framerate" >
                                <template #body="{data}">
                                    <span class="p-column-title">Id</span>
                                    {{data.ofr}}
                                </template>
                            </Column>
                            <Column field="ofr" >
                                <template #body="{data}">
                                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="deleteChannel(data)" />
                                </template>
                            </Column>
                        </DataTable>
                    </template>
                </Card>	
            </template>
            <template v-slot:footer>
                <div class="p-grid p-nogutter p-justify-between">
                    <i></i>
                    <Button label="Next" @click="nextPage()" icon="pi pi-angle-right" iconPos="right" />
                </div>
            </template>
        </Card>
    </div>
</template>
 
<script>
export default {
    data () {
        return {
            counter: 1,
            name: '',
            submitted: false,
            validationErrors: {},
            validationChannelErrors: {},
            selectedLanguage: null,
            selectedInCodec: null,
            selectedInRes: null,
            selectedInBr: null,
            selectedOutCodec: null,
            selectedOutBrc: null,
            selectedOutRes: null,
            selectedOutBr:null,
            selectedOutFr: null,
            channels: [],
            languages: [
                {name: 'Italian', code: 'it'},
                {name: 'French', code: 'fr'},
                {name: 'German', code: 'de'},
                {name: 'Chinese', code: 'cn'},
                {name: 'Japanese', code: 'jp'},
                {name: 'Spanish', code: 'es'},
                {name: 'English', code: 'uk'}
            ],
            inCodecs: [
                {name: 'AVC', code: 'avc'},
                {name: 'MPEG2', code: 'mpg2'},
                {name: 'HEVC', code: 'hevc'}
            ],
            inRes: [
                {name: 'SD', code: 'sd'},
                {name: 'HD', code: 'hd'},
                {name: 'UHD', code: 'uhd'}
            ],
            inBr: [
                {name: '10', code: '10'},
                {name: '20', code: '20'},
                {name: '50', code: '50'}
            ],
            outCodecs: [
                {name: 'H264', code: 'h264'},
                {name: 'H265', code: 'h265'}
            ],
            outBrc: [
                {name: 'CBR', code: 'cbr'},
                {name: 'VBR', code: 'vbr'},
                {name: 'QVBR', code: 'qvbr'},
            ],

        }
    },
    methods: {
        nextPage() {
            this.submitted = true;
            if (this.validateForm() ) {
                this.$emit('next-page', {formData: {name: this.name}, pageIndex: 0});
            }
        },
        validateForm() {
            console.log(this.validationErrors)
            if (!this.name.trim())
                this.validationErrors['name'] = true;
            else
                delete this.validationErrors['name'];
            return !Object.keys(this.validationErrors).length;
        },
        validateChannel(){
            console.log(this.selectedLanguage)
             if (this.selectedLanguage==null)
                this.validationChannelErrors['lang'] = true;
            else
                delete this.validationChannelErrors['lang'];
            console.log(this.validationChannelErrors)
            return !Object.keys(this.validationChannelErrors).length;
        },
        addChannel(){
            this.validateChannel()
            /*
            var channel={};
            channel.id=this.counter
            this.counter++
            channel.lang=this.selectedLanguage.name
            channel.ic=this.selectedInCodec.name
            channel.ir=this.selectedInRes.name
            channel.ibr=this.selectedInBr.name
            channel.oc=this.selectedOutCodec.name
            channel.or=this.selectedOutRes.name
            channel.obrc=this.selectedOutBrc.name
            channel.obr=this.selectedOutBr
            channel.ofr=this.selectedOutFr
            this.channels.push(channel)
            console.log(this.selectedLanguage)
            */
        },
        deleteChannel(data){
            console.log(this.channels.indexOf(data))
            this.channels.splice(this.channels.indexOf(data),1)
        }
    }
}
</script> 

<style lang="scss" scoped>

.country-item-value {
    img.flag {
        width: 17px;
    }
}

</style>