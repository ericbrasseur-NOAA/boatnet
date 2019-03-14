<template>
  <q-page padding>
    <gantt-elastic :tasks="tasks" :options="options">
    <!-- <gantt-elastic-header slot="header"></gantt-elastic-header>
    <gantt-elastic-footer slot="footer"></gantt-elastic-footer> -->
  </gantt-elastic>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GanttElastic from 'gantt-elastic';

@Component
export default class PageAbout extends Vue {
  components = { GanttElastic };
  private tasks:any;
  private options:any;
}
</script>