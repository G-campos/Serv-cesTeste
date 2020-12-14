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
  name: 'ChartAngularGauge',
  mounted () {
    const chart = am4core.create(this.$refs.chartdiv, am4charts.GaugeChart)
    chart.hiddenState.properties.opacity = 0

    chart.innerRadius = -25

    const axis = chart.xAxes.push(new am4charts.ValueAxis())
    axis.min = 0
    axis.max = 100
    axis.strictMinMax = true
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor('background')
    axis.renderer.grid.template.strokeOpacity = 0.3

    const colorSet = new am4core.ColorSet()

    const range0 = axis.axisRanges.create()
    range0.value = 0
    range0.endValue = 50
    range0.axisFill.fillOpacity = 1
    range0.axisFill.fill = colorSet.getIndex(0)
    range0.axisFill.zIndex = -1

    const range1 = axis.axisRanges.create()
    range1.value = 50
    range1.endValue = 80
    range1.axisFill.fillOpacity = 1
    range1.axisFill.fill = colorSet.getIndex(2)
    range1.axisFill.zIndex = -1

    const range2 = axis.axisRanges.create()
    range2.value = 80
    range2.endValue = 100
    range2.axisFill.fillOpacity = 1
    range2.axisFill.fill = colorSet.getIndex(4)
    range2.axisFill.zIndex = -1

    const hand = chart.hands.push(new am4charts.ClockHand())

    // using chart.setTimeout method as the timeout will be disposed together with a chart
    chart.setTimeout(randomValue, 2000)

    function randomValue () {
      hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut)
      chart.setTimeout(randomValue, 2000)
    }
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
