<template>
    <div>
        <!--  标签页 -->
    <el-row type='flex' justify='flex-start' class='title' align='middle' style="padding:10px 0px">
      <span class='text'>价格曲线</span>
    </el-row>
    <el-row style="background:#fff;padding:30px 44px;text-align:left">
        <el-row class="Title">渠道</el-row>
        <el-row style="margin-top:16px">
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">渠道：</span><span>{{cannel}}</span>
            </el-col>
            <el-col :span="10" class="item-text">
              <span style="color: rgba(0, 0, 0, 0.85);">渠道编码：</span><span>{{cannelCode}}</span>
            </el-col>
          </el-row>
          <el-row class="line"></el-row>
          <el-row id="main" style="width: 100%; height: 500px"></el-row>
    </el-row>
    </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {
      cannel: '以星特快海派包邮UPS派送',
      cannelCode: 'YXTK以星特快',
      option: {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['20-30公斤', '30-50公斤', '50-70公斤', '70-100公斤']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '20-30公斤',
            type: 'line',
            // stack: '总量',
            color: ['#5B8FF9'],
            data: [21, 22, 24, 28, 25, 24, 30]
          },
          {
            name: '30-50公斤',
            type: 'line',
            // stack: '总量',
            color: ['#5AD8A6'],
            data: [35, 50, 42, 44, 30, 31, 50]
          },
          {
            name: '50-70公斤',
            type: 'line',
            // stack: '总量',
            color: ['#5D7092'],
            data: [80, 95, 82, 78, 90, 81, 90]
          },
          {
            name: '70-100公斤',
            type: 'line',
            // stack: '总量',
            color: ['#F6BD16'],
            data: [78, 85, 92, 100, 79, 91, 80]
          }
        ]
      }
    }
  },
  // mounted生命周期在created之后
  mounted () {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    // 如果option存在
    this.option && myChart.setOption(this.option)
  }
}
</script>

<style lang="scss" scoped>
.line{
    height: 1px;
    background: #D8D8D8;
    margin: 30px 0 40px 0;
}
.item-text{
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
}
.Title{
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    }
</style>
