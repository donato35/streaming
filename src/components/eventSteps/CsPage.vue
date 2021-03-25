<template>
    <div class="stepsdemo-content">
    <Card>
        <template #title>
            Cooming Soon Page
        </template>
        <template #subtitle>
            Set Page Template
        </template>
        <template #content>
            
        </template>
        <template #footer>
            <div class="p-grid p-nogutter p-justify-between">
                <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
                <Button label="Next" @click="nextPage()" icon="pi pi-angle-right" iconPos="right" />
            </div>
        </template>
    </Card>
</div>
</template>

<script>
export default {

    methods: {
       
        nextPage() {
            this.$emit('next-page', {formData: {}, pageIndex: 1});
        },
        prevPage() {
            this.$emit('prev-page', {pageIndex: 1});
        }
    }

}
</script>