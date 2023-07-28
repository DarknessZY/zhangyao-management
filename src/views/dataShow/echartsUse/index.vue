<template>
    <div class="content">
        <!-- 头部 -->
        <div class="content-header">
            <Header></Header>
        </div>
        <div class="content-body">
            <!-- 左看板 -->
            <div class="left">
                <div class="left-T">
                    <div style="width: 100%; height: 8%">
                        <titleHeader title="钱包结余资金" @getTime="getTimeOne"></titleHeader>
                    </div>
                    <div ref="echartsRef" style="width: 100%; height: 100%"></div>
                </div>
                <div class="left-B">
                    <div style="width: 100%; height: 8%">
                        <titleHeader title="交易类型金额占比" @getTime="getTimeTwo"></titleHeader>
                    </div>
                    <div ref="echartsRefTwo" style="width: 100%; height: 92%"></div>
                </div>
            </div>
            <!-- 右看板 -->
            <div class="right">
                <div class="right-T">
                    <div style="width: 100%; height: 5%">
                        <titleHeader title="交易金额排名" @getTime="getTimeThree"></titleHeader>
                    </div>
                    <div class="rankingList">
                        <rankingList :merchantList="merchantList"></rankingList>
                    </div>
                </div>
                <div class="right-B">
                    <div style="width: 100%; height: 15%">
                        <titleHeader title="(%)退款比例" @getTime="getTimeFour"></titleHeader>
                    </div>
                    <div ref="echartsRefThree" style="width: 100%; height: 75%"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import titleHeader from './components/titleHeader.vue'
import rankingList from './components/rankingList.vue'
import * as echarts from 'echarts'
import { useEcharts } from '@/hooks/useEcharts'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
/** 钱包结余资金Echarts图*/
const echartsRef = ref<HTMLElement>()
const echartsOneView = () => {
    const myChart: echarts.ECharts = echarts.init(echartsRef.value as HTMLElement)
    /** 横轴时间数据*/
    const xAxisData: string[] = []
    for (let i = 0; i <= 12; i++) {
        let hour = i * 2
        let time = hour < 10 ? '0' + hour + ':00' : hour + ':00'
        xAxisData.push(time)
    }
    /** 竖轴data的数据暂时随机生成吧*/
    const data1: number[] = []
    for (let i = 0; i < 13; i++) {
        data1.push(+(Math.random() * 1000).toFixed(2))
    }
    const option: echarts.EChartsCoreOption = {
        color: ['#aeaeb2', '#ECEF08'],
        legend: {
            data: ['', '钱包结余资金'],
            x: 'right', //可设定图例在左、右、居中
            padding: [0, 30, 0, 0] //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
        },
        // 上下左右及大小-设置图表占总面积的地方
        grid: {
            left: '8%', //左侧 y轴内容距离边框的距离（类似padding-left）
            top: '10%', // 与容器顶部的距离
            right: '8%',
            bottom: '10%' // 与容器底部的距离
        },
        // grid坐标系的x轴
        xAxis: [
            {
                data: xAxisData,
                axisPointer: {
                    type: 'shadow'
                },
                axisTick: {
                    show: true // 不显示坐标轴刻度线
                }
            }
        ],
        // grid坐标系的y轴
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    //分割线配置
                    show: true,
                    lineStyle: {
                        color: 'rgb(64, 94, 134)',
                        width: 1
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                splitLine: {
                    //分割线配置
                    show: true,
                    lineStyle: {
                        color: 'rgb(64, 94, 134)',
                        width: 1
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        //提示框
        tooltip: { show: true },
        // 系列列表。每个系列通过 type 决定自己的图表类型
        series: [
            {
                name: '',
                type: 'bar',
                barWidth: 8, // 柱状图粗细
                barGap: 8, // 柱图之间的间距
                tooltip: {
                    valueFormatter: function (value: any) {
                        return value
                    }
                },
                data: data1
            },
            {
                name: '钱包结余资金',
                type: 'line',
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: '#35c758',
                        barBorderRadius: [6, 6, 0, 0]
                    }
                },
                tooltip: {
                    valueFormatter: function (value: string) {
                        return value
                    }
                },
                data: data1
            }
        ]
    }
    useEcharts(myChart, option)
}
/** 交易类型金额占比Echarts图*/
const echartsRefTwo = ref<HTMLElement>()
const echartsTwoView = () => {
    const myChart: echarts.ECharts = echarts.init(echartsRefTwo.value as HTMLElement)
    const xAxisData: string[] = []
    /** 竖轴data的数据暂时随机生成吧*/
    const data1: number[] = []
    const data2: number[] = []
    const data3: number[] = []
    const data4: number[] = []
    const data5: number[] = []
    for (let i = 0; i < 13; i++) {
        data1.push(+(Math.random() * 1000).toFixed(2))
        data2.push(+(Math.random() * 500).toFixed(2))
        data3.push(+(Math.random() + 300).toFixed(2))
        data4.push(+(Math.random() * 1000).toFixed(2))
        data5.push(+(Math.random() * 1000).toFixed(2))
    }
    /** 横轴时间数据*/
    for (let i = 0; i <= 12; i++) {
        let hour = i * 2
        let time = hour < 10 ? '0' + hour + ':00' : hour + ':00'
        xAxisData.push(time)
    }
    /** 鼠标移入时柱状图时的效果*/
    const emphasisStyle = {
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
        }
    }
    const option: echarts.EChartsCoreOption = {
        legend: {
            data: ['收款', '支付', '划扣', '还款', '充值'],
            left: '5%',
            top: '0%'
        },
        toolbox: {
            feature: {
                /** 图表展示类型*/
                magicType: {
                    type: ['stack']
                },
                /** 数据Excel*/
                dataView: {
                    lang: ['数据视图:', '关闭', '导出Excel'],
                    optionToContent: function (opt: { xAxis: { data: any }[]; series: any }) {
                        //axisData是你想定义的表格第一列的数据，我这里设置为柱形图的x轴数据
                        let axisData = opt.xAxis[0].data
                        console.log('axisData', axisData)

                        //nameData为你想定义的表格第一行的数据
                        let nameData = new Array('收款', '支付', '划扣', '还款', '充值')
                        let series = opt.series
                        //表头
                        let tdHeads = '<th style="padding: 0 10px;border:1px solid #000"></th>'
                        let tdBodys = ''
                        for (var i = 0; i < nameData.length; i++) {
                            tdHeads += '<td style="padding: 0 10px;border:1px solid #000">' + nameData[i] + '</ td >'
                        }
                        let table =
                            '<table id="Mytable" style="width:100%;text-align:cente;border:1px solid #000" ><tbody><tr>' + tdHeads + ' </tr>'
                        for (let i = 0, l = axisData.length; i < l; i++) {
                            for (let j = 0; j < series.length; j++) {
                                var temp = series[j].data[i]
                                if (temp != null && temp != undefined) {
                                    tdBodys += '<td style="padding: 0 10px;border:1px solid #000">' + temp + '</td>'
                                } else {
                                    tdBodys += '<td></td>'
                                }
                            }
                            table += '<tr><td style="padding: 0 10px;border:1px solid #000">' + axisData[i] + '</td>' + tdBodys + '</tr>'
                            tdBodys = ''
                        }
                        table += '</tbody></table>'
                        return table
                    },
                    contentToOption: function (container: any, option: Object) {
                        let et = XLSX.utils.table_to_book(document.getElementById('Mytable'))
                        let etout = XLSX.write(et, {
                            bookType: 'xlsx',
                            bookSST: true,
                            type: 'array'
                        })
                        try {
                            FileSaver.saveAs(
                                new Blob([etout], {
                                    type: 'application/octet-stream'
                                }),
                                '交易类型金额' + '-' + new Date().toLocaleString() + '.xlsx'
                            )
                        } catch (e) {
                            console.log('e', e)
                        }
                        return etout
                    }
                },

                /** 下载*/
                saveAsImage: { show: true }
            }
        },
        tooltip: { show: true },
        xAxis: {
            data: xAxisData,
            name: '时间段',
            axisLine: { onZero: true },
            splitLine: { show: false },
            splitArea: { show: false }
        },
        yAxis: {},
        grid: {
            bottom: 30
        },
        series: [
            {
                name: '收款',
                type: 'bar',
                stack: 'one',
                emphasis: emphasisStyle,
                data: data1
            },
            {
                name: '支付',
                type: 'bar',
                stack: 'one',
                emphasis: emphasisStyle,
                data: data2
            },
            {
                name: '划扣',
                type: 'bar',
                stack: 'one',
                emphasis: emphasisStyle,
                data: data3
            },
            {
                name: '还款',
                type: 'bar',
                stack: 'one',
                emphasis: emphasisStyle,
                data: data4
            },
            {
                name: '充值',
                type: 'bar',
                stack: 'one',
                emphasis: emphasisStyle,
                data: data4
            }
        ]
    }
    useEcharts(myChart, option)
}
/** 退款比例Echarts图*/
const echartsRefThree = ref<HTMLElement>()
const echartsThreeView = () => {
    const myChart: echarts.ECharts = echarts.init(echartsRefThree.value as HTMLElement)
    const option: echarts.EChartsCoreOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        color: ['#000000', '#007aff', '#ff3a30', '#e5e5ea'],
        legend: {
            orient: 'horizontal',
            x: 'center',
            y: 'bottom',
            icon: 'circle',
            itemHeight: 6,
            itemWidth: 10,
            itemGap: 25, //图例图标与文字间的间距
            padding: [50, 10, 0, 10]
        },
        grid: {
            top: '0%',
            left: '0%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            show: false
        },
        yAxis: {
            data: ['Mon'],
            show: false
        },
        series: [
            {
                name: `退款总金额:${1200}`,
                type: 'bar',
                barWidth: 0, // 柱状图粗细
                stack: 'total',
                label: {
                    show: true
                }
            },
            {
                name: `支付:${300}`,
                type: 'bar',
                barWidth: 40, // 柱状图粗细
                stack: 'total',
                label: {
                    show: true,
                    formatter: '{c}%' //百分比显示
                },
                emphasis: {
                    focus: 'series'
                },
                data: [20]
            },
            {
                name: `收款:${300}`,
                type: 'bar',
                barWidth: 40, // 柱状图粗细
                stack: 'total',
                label: {
                    show: true,
                    formatter: '{c}%' //百分比显示
                },
                emphasis: {
                    focus: 'series'
                },
                data: [30]
            },
            {
                name: `划扣:${600}`,
                type: 'bar',
                stack: 'total',
                barWidth: 40, // 柱状图粗细
                label: {
                    show: true,
                    formatter: '{c}%' //百分比显示
                },
                emphasis: {
                    focus: 'series'
                },
                data: [50]
            }
        ]
    }
    useEcharts(myChart, option)
}
/**商户排行list */
const merchantList = ref([
    { name: '唱', value: 1000 },
    { name: '跳', value: 999 },
    { name: 'rap', value: 888 },
    { name: '篮球', value: 7894 },
    { name: '唱', value: 1000 },
    { name: '跳', value: 999 },
    { name: 'rap', value: 888 },
    { name: '篮球', value: 7894 },
    { name: '唱', value: 1000 },
    { name: '跳', value: 999 }
])
/** 钱包结余资金时间选择*/
const getTimeOne = (startDate: string, endDate: string) => {
    console.log('钱包结余资金时间', startDate, endDate)
}
/** 交易类型金额占比时间选择*/
const getTimeTwo = (startDate: string, endDate: string) => {
    console.log('交易类型金额占比时间选择', startDate, endDate)
}
/** 交易金额排名时间选择*/
const getTimeThree = (startDate: string, endDate: string) => {
    console.log('交易金额排名时间选择', startDate, endDate)
}
/** 退款比例时间选择*/
const getTimeFour = (startDate: string, endDate: string) => {
    console.log('退款比例时间选择', startDate, endDate)
}

onMounted(() => {
    nextTick(() => {
        echartsOneView()
        echartsTwoView()
        echartsThreeView()
    })
})
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
