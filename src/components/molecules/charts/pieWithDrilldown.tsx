import React, { useState, useEffect, useRef }  from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsExporting from 'highcharts/modules/exporting'
import drilldown from "highcharts/modules/drilldown";



type Props = {

}

export default function PieWithDrilldown(props:Props) {


    drilldown(Highcharts);

    // Highcahrtsの設定
    const [chartOptions, setChartOption] = useState<Highcharts.Options>({
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        accessibility: {
            announceNewData: {
                enabled: true
            },
            point: {
                valueSuffix: '%'
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: '金額（円）'
            }
        },
        exporting: { enabled: false },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.1f}%'
                },
            }
        },
    
        series: [
            {
                showInLegend: false, 
                name: '月の出費',
                colorByPoint: true,
                type: 'pie',
                data:[{
                    name: 'カテゴリ1',
                    y: 65,
                    drilldown: 'category1',
                    color: '#12BBB4'
                },
                {
                    name: 'カテゴリ2',
                    y: 27,
                    drilldown: 'category2',
                    color: '#AFE1E6'
                },
                {
                    name: 'カテゴリ3',
                    y: 18,
                    drilldown: 'category3'
                }]
            }
        ],

        drilldown: {
            series: [
                {   
                    name: 'カテゴリ1',
                    id: 'category1',
                    data: [
                        { name: 'エステ１', y:42 },
                        { name: '洋服代', y:36 },
                        { name: '化粧品代', y:22 }
                    ],
                    type: 'pie',
                },
                {
                    name: 'カテゴリ2',
                    id: 'category2',
                    data: [
                        { name: 'Pythonの本', y:50 },
                        { name: 'Reactの本', y:45 },
                        { name: 'デザインの本', y:5 }
                    ],
                    type: 'pie',
                },
                {
                    name: 'カテゴリ3',
                    id: 'category3',
                    data: [
                        { name: '食費', y:60 },
                        { name: '娘の服', y:30 },
                        { name: 'その他', y:10 }
                    ],
                    type: 'pie',
                }
            ]
        }
    })

    // 初回のみ実行
    useEffect(() => {

        HighchartsAccessibility(Highcharts);
        
        if(typeof Highcharts  ===  'object'){
            HighchartsExporting(Highcharts);
        }

    }, [])


    const pieChartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const lineChartComponentRef = useRef<HighchartsReact.RefObject>(null);

    return (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={pieChartComponentRef} />
    )
}