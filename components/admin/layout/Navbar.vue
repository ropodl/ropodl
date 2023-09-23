<script setup>
import { Icon } from '@iconify/vue';
const drawer = ref(true);

const user = useUser();
// const routes = [
//   {
//     title: "Dashboard",
//     link: "/admin",
//   },
//   {
//     title: "Clients",
//     link: "/admin/client",
//   }, {
//     title: "Blogs",
//     link: "/admin/blog",
//   },
// ];

const navitems = reactive([
  {
    icon: "mdi:home",
    title: "Home",
    routes: "/admin/"
  }, {
    icon: "mdi:pencil", title: "Blog", subitems: [
      { title: "All Blogs", routes: "/admin/blog" },
      { title: "Add New", routes: "/admin/blog/create" },
      { title: "Categories", routes: "/admin/categories" },
      { title: "Tags", routes: "/admin/tags" }
    ]
  }
])
</script>
<template>
  <v-app-bar height="50">
    <v-container fluid class>
      <v-row align="center">
        <v-app-bar-nav-icon rounded="0" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn color="white" rounded="0" height="50" v-bind="props" class="text-capitalize">
              <v-icon start>
                <Icon icon="mdi:globe" />
              </v-icon> Website <v-icon end size="sm">
                <Icon icon="mdi:chevron-down" />
              </v-icon>
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item title="Visit Site" to="/"></v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <LazyAdminSharedAdminNavDrop />
      </v-row>
    </v-container>
  </v-app-bar>
  <!-- nav drawer -->
  <v-navigation-drawer v-model="drawer" absolute>
    <v-list class="nav overflow-visible" density="compact">
      <template v-for="navitem in navitems">
        <v-list-subheader v-if="navitem.subtitle">
          {{ navitem.subtitle }}
        </v-list-subheader>
        <template v-if="navitem.subitems">
          <v-list-group v-model="navitem.active">
            <template v-slot:activator="{ props }">
              <!-- main like dashboard -->
              <v-list-item v-bind="props">
                <template v-slot:prepend>
                  <v-icon>
                    <Icon :icon="navitem['icon']" />
                  </v-icon>
                </template>
                <v-list-item-title>
                  {{ navitem.title }}
                </v-list-item-title>
              </v-list-item>
            </template>
            <span v-for="subitem in navitem.subitems">
              <span v-if="subitem.miniitems">
                <v-list-group>
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props">
                      <!-- child's option -->
                      <v-list-item-title>
                        {{ subitem.title }}
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-if="subitem.miniitems">
                    <v-list-item v-for="mini in subitem.miniitems" :to="mini.routes">
                      <!-- grand child -->
                      <v-list-item-title>
                        {{ mini.title }}
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list-group>
              </span>
              <span v-else>
                <v-list-item exact :to="subitem.routes">
                  <!-- child -->
                  <v-list-item-title>
                    {{ subitem.title }}
                  </v-list-item-title>
                </v-list-item>
              </span>
            </span>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item :to="navitem.routes">
            <template v-slot:prepend>
              <v-icon>
                <Icon :icon="navitem['icon']" />
              </v-icon>
            </template>
            <v-list-item-title>
              {{ navitem.title }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<!-- <script>
export default {
  navitems: [
    {
      icon: mdiViewDashboard,
      title: "nav.pages.dash.dashboard",
      subtitle: "nav.pages.page",
      subitems: [
        {
          title: "nav.pages.dash.default",
          routes: "/",
        },
        {
          title: "nav.pages.dash.analytics",
          routes: "/analytics",
        },
        {
          title: "nav.pages.dash.ecommerce",
          routes: "/ecommerce",
        },
        {
          title: "nav.pages.dash.social",
          routes: "/social",
        },
        {
          title: "nav.pages.dash.crypto",
          routes: "/crypto",
        },
      ],
    },
    {
      icon: mdiAccountBoxMultiple,
      title: "nav.pages.page",
      subitems: [
        {
          title: "nav.pages.pages.profile",
          routes: "/profile",
        },
        {
          title: "nav.pages.pages.settings",
          routes: "/settings",
        },
        {
          title: "nav.pages.pages.clients",
          routes: "/clients",
        },
        {
          title: "nav.pages.pages.projects",
          miniitems: [
            {
              title: "nav.pages.pages.list",
              routes: "/list",
            },
            {
              title: "nav.pages.pages.details",
              routes: "/detail",
            },
          ],
        },
        {
          title: "nav.pages.pages.invoice",
          routes: "/invoice",
        },
        {
          title: "nav.pages.pages.pricing",
          routes: "/pricing",
        },
        {
          title: "nav.pages.pages.tasks",
          routes: "/tasks",
        },
        {
          title: "nav.pages.pages.chat",
          routes: "/chat",
        },
        {
          title: "nav.pages.pages.blankpage",
          routes: "/blank-page",
        },
      ],
    },
    {
      icon: mdiAccountGroup,
      title: "nav.pages.auth.auth",
      subitems: [
        {
          title: "nav.pages.auth.signin",
          routes: "/signin",
        },
        {
          title: "nav.pages.auth.signup",
          routes: "/signup",
        },
        {
          title: "nav.pages.auth.resetpassword",
          routes: "/reset-password",
        },
        {
          title: "nav.pages.auth.fourofour",
          routes: "/404",
        },
        {
          title: "nav.pages.auth.fiveoo",
          routes: "/500",
        },
      ],
    },
    {
      icon: mdiBookOpenPageVariant,
      title: "nav.pages.document.documentation",
      subitems: [
        {
          title: "nav.pages.document.introduction",
          routes: "/introduction",
        },
        {
          title: "nav.pages.document.gettingstarted",
          routes: "/getting-started",
        },
        {
          title: "nav.pages.document.plugins",
          routes: "/plugins",
        },
        {
          title: "nav.pages.document.changelog",
          routes: "/changelog",
        },
      ],
    },
    {
      icon: mdiLayers,
      title: "nav.tool.ui.uielements",
      subtitle: "nav.tool.toolsandcomponents",
      subitems: [
        {
          title: "nav.tool.ui.alerts",
          routes: "/alerts",
        },
        {
          title: "nav.tool.ui.buttons",
          routes: "/buttons",
        },
        {
          title: "nav.tool.ui.cards",
          routes: "/cards",
        },
        {
          title: "nav.tool.ui.carousel",
          routes: "/carousel",
        },
        {
          title: "nav.tool.ui.embedvideo",
          routes: "/embed-video",
        },
        {
          title: "nav.tool.ui.general",
          routes: "/general",
        },
        {
          title: "nav.tool.ui.grid",
          routes: "/grid",
        },
        {
          title: "nav.tool.ui.modals",
          routes: "/modals",
        },
        {
          title: "nav.tool.ui.tabs",
          routes: "/tabs",
        },
        {
          title: "nav.tool.ui.typography",
          routes: "/typography",
        },
      ],
    },
    {
      icon: mdiHeart,
      title: "nav.tool.icon.icons",
      subitems: [
        {
          title: "nav.tool.icon.mdi",
          routes: "/mdi",
        },
        {
          title: "nav.tool.icon.fa",
          routes: "/fa5",
        },
      ],
    },
    {
      icon: mdiFormTextbox,
      title: "nav.tool.form.forms",
      subitems: [
        {
          title: "nav.tool.form.layouts",
          routes: "/layouts",
        },
        {
          title: "nav.tool.form.basicinputs",
          routes: "/basic-inputs",
        },
        {
          title: "nav.tool.form.inputgroups",
          routes: "/input-groups",
        },
      ],
    },
    {
      icon: mdiTable,
      title: "nav.tool.table.tables",
      routes: "/tables",
    },
    {
      icon: mdiFormTextarea,
      title: "nav.plugin.form.formplugins",
      subtitle: "nav.plugin.plugins",
      subitems: [
        {
          title: "nav.plugin.form.advancedinputs",
          routes: "/advanced-inputs",
        },
        {
          title: "nav.plugin.form.editors",
          routes: "/editors",
        },
        {
          title: "nav.plugin.form.validation",
          routes: "/validation",
        },
        {
          title: "nav.plugin.form.wizard",
          routes: "/wizard",
        },
      ],
    },
    {
      icon: mdiTableLarge,
      title: "nav.plugin.datatable.datatables",
      subitems: [
        {
          title: "nav.plugin.datatable.responsivetables",
          routes: "/responsive-tables",
        },
        {
          title: "nav.plugin.datatable.tablebuttons",
          routes: "/table-buttons",
        },
        {
          title: "nav.plugin.datatable.columnsearch",
          routes: "/column-search",
        },
        {
          title: "nav.plugin.datatable.multiselection",
          routes: "/multi-selection",
        },
        {
          title: "nav.plugin.datatable.ajaxsourceddata",
          routes: "/ajax-sourced-data",
        },
      ],
    },
    {
      icon: mdiChartArc,
      title: "nav.plugin.chart.chart",
      subitems: [
        {
          title: "nav.plugin.chart.chartjs",
          routes: "/chartjs",
        },
        {
          title: "nav.plugin.chart.apexcharts",
          routes: "/apexcharts",
        },
      ],
    },
    {
      icon: mdiBell,
      title: "nav.plugin.notification.notifications",
      routes: "/notifications",
    },
    {
      icon: mdiMapMarker,
      title: "nav.plugin.map.maps",
      subitems: [
        {
          title: "nav.plugin.map.googlemaps",
          routes: "/google-maps",
        },
        {
          title: "nav.plugin.map.vectormaps",
          routes: "/vector-maps",
        },
      ],
    },
    {
      icon: mdiCalendar,
      title: "nav.plugin.calendar.calendar",
      routes: "/calendar",
    },
    {
      icon: mdiShareVariant,
      title: "nav.plugin.multilevel.multilevel",
      subitems: [
        {
          title: "nav.plugin.multilevel.twolevel.twolevels",
          miniitems: [
            {
              title: "nav.plugin.multilevel.twolevel.item1",
            },
            {
              title: "nav.plugin.multilevel.twolevel.item2",
            },
          ],
        },
        {
          title: "nav.plugin.multilevel.threelevel.threelevels",
          miniitems: [
            {
              title: "nav.plugin.multilevel.threelevel.item1",
            },
            {
              title: "nav.plugin.multilevel.threelevel.item2",
            },
            {
              title: "nav.plugin.multilevel.threelevel.item3",
            },
          ],
        },
      ],
    },
  ],

}
</script> -->