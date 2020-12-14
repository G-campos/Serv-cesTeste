<template>
  <div class="hello" ref="chartdiv">
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themesAnimated)

export default {
  name: 'ChartColuna',
  mounted () {
    const chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart)
    console.log(chart)
    // Add data
    chart.data = [{
      country: 'USA',
      visits: 2025
    }, {
      country: 'China',
      visits: 1882
    }, {
      country: 'Japan',
      visits: 1809
    }, {
      country: 'Germany',
      visits: 1322
    }, {
      country: 'UK',
      visits: 1122
    }, {
      country: 'France',
      visits: 1114
    }, {
      country: 'India',
      visits: 984
    }, {
      country: 'Spain',
      visits: 711
    }, {
      country: 'Netherlands',
      visits: 665
    }, {
      country: 'Russia',
      visits: 580
    }, {
      country: 'South Korea',
      visits: 443
    }, {
      country: 'Canada',
      visits: 441
    }, {
      country: 'Brazil',
      visits: 395
    }]

    chart.padding(40, 40, 40, 40)
    // Create axes

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = 'country'
    categoryAxis.renderer.grid.template.location = 0
    categoryAxis.renderer.minGridDistance = 30

    categoryAxis.renderer.labels.template.adapter.add('dy', function (dy, target) {
      // eslint-disable-next-line no-self-compare
      if (target.dataItem && target.dataItem.index & 2 === 2) {
        return dy + 25
      }
      return dy
    })

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.min = 0
    valueAxis.extraMax = 0.1

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries())
    series.dataFields.valueY = 'visits'
    series.dataFields.categoryX = 'country'
    series.name = 'Visits'
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]'
    series.columns.template.fillOpacity = 0.8

    const columnTemplate = series.columns.template
    columnTemplate.strokeWidth = 2
    columnTemplate.strokeOpacity = 1
  }
}
</script>
<style scoped>
.hello {
  width: 100%;
  height: 250px;
  color: #00ffd5;
}
</style>
