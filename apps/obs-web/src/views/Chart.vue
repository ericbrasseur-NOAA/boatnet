<template>
  <q-page padding>
    <gantt-elastic :tasks="tasks" :options="options"></gantt-elastic>
  </q-page>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import GanttElastic from 'gantt-elastic';

import getDate from "dayjs";
import dayjs from "dayjs";

const tasks2 = [
  {
    id: 1,
    label: 'Shawn Rogers',
    user:
      '<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">John Doe</a>',
    start: getDate(-22 * 5),
    duration: 5 * 24 * 60 * 60,
    progress: 85,
    type: 'task' //'project'
  },
  {
    id: 2,
    label: 'Salvador Ramirez',
    user:
      '<a href="https://www.google.com/search?q=Peter+Parker" target="_blank" style="color:#0077c0;">Peter Parker</a>',
    start: getDate(-24 * 4),
    duration: 4 * 24 * 60 * 60,
    progress: 50,
    type: 'task', // 'milestone',
    style: {
      base: {
        fill: '#1EBC61',
        stroke: '#0EAC51'
      }
      /*'tree-row-bar': {
      fill: '#1EBC61',
      stroke: '#0EAC51'
    },
    'tree-row-bar-polygon': {
      stroke: '#0EAC51'
    }*/
    }
  },
  {
    id: 3,
    label: 'Dylan Tauzer',
    user:
      '<a href="https://www.google.com/search?q=John+Wayne" target="_blank" style="color:#0077c0;">John Wayne</a>',
    // parentId: 2,
    start: getDate(-24 * 3),
    duration: 2 * 24 * 60 * 60,
    progress: 100,
    type: 'task'
  }
  /* ... */
];

const options2 = {
  title: {
    label: 'Observer Activity Tracking (OAT)',
    html: false
  },
  taskList: {
    columns: [
      { id: 1, label: 'ID', value: 'id', width: 40 },
      { id: 2, label: 'Observer', value: 'label', width: 200, expander: true },
      { id: 3, label: 'Debriefer', value: 'user', width: 130, html: true },
      { id: 3, label: 'Start', value: (task: any) => dayjs(task.start).format('YYYY-MM-DD'), width: 78 },
      { id: 4, label: 'Trip Status', value: 'type', width: 68 },
      // {
      //   id: 5,
      //   label: '%',
      //   value: 'progress',
      //   width: 35,
      //   style: {
      //     'task-list-header-label': {
      //       'text-align': 'center',
      //       width: '100%'
      //     },
      //     'task-list-item-value-container': {
      //       'text-align': 'center'
      //     }
      //   }
      // }
    ]
  },
  locale: {
    code: 'en',
    Now: 'Now',
    'X-Scale': 'Zoom-X',
    'Y-Scale': 'Zoom-Y',
    'Task list width': 'Task list',
    'Before/After': 'Expand',
    'Display task list': 'Task list'
    // from now on locale settings are same as those from dayjs - https://github.com/iamkun/dayjs/blob/master/docs/en/I18n.md
  }
};

@Component({
  components: {
    'gantt-elastic': GanttElastic
  }
})
export default class BaseIterator extends Vue {
  private tasks: any = tasks2;
  private options: any = options2;
}

</script>