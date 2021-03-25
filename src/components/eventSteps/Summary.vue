<template>
    <div class="stepsdemo-content">
    <Card>
        <template #title>
            Summary
        </template>
        <template #subtitle>
            Check Event data before creation
        </template>
        <template #content>
            
        </template>
        <template #footer>
            <div class="p-grid p-nogutter p-justify-between">
                <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
                <Button label="Complete" @click="complete()" icon="pi pi-check" iconPos="right" class="p-button-success"/>
            </div>
        </template>
    </Card>
</div>
</template>

<script>
export default {

    methods: {
        complete() {
            this.$emit('complete');
        },
        prevPage() {
            this.$emit('prev-page', {pageIndex: 3});
        }
    }

}
</script>