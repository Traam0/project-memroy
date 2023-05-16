"use client";
import { IconMoodNeutral } from "@tabler/icons-react";
import ApexCharts from "apexcharts";
import { useRef, useLayoutEffect } from "react";

export default function GlobalChart() {
	const chartRef = useRef<HTMLDivElement>(null);

	const options = {
		colors: ["#FF5C6C", "#9D44B5", "#ffffff"],
		chart: {
			id: "Mood per Day",
			type: "area",
			height: "400px",
			background: '#161616',
			zoom: {
				autoScaleYaxis: true,
			},
		},
		theme: {
			// palette: "palette2",
			// monochrome: {
			// 	enabled: true,
			// 	color: '#29339B',
			// 	shadeTo: 'light',
			// 	shadeIntensity: 0.65
			// }
		},
		stroke: {
			curves: "smooth",
		},
		title: {
			text: "Mood per Day",
			align: "center",
			style: { color: "#F5F5F5" },
		},

		labels: [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
			22, 23, 24, 25, 26, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
			39, 40,
		],
		series: [
			{
				name: "her Mood",
				data: [
					3, 4, 6, 7, 9, 0, 6, 2, 4, 1, 6, 0, 2, 7, 4, 4, 6, 5, 8, 4, 4, 8, 4,
					10, 3, 5, 5, 3, 7, 3, 7, 10, 3, 6, 3, 8, 7, 4, 8, 3,
				],
			},
			{
				name: "my Mood",

				data: [
					1, 4, 4, 3, 4, 5, 2, 0, 0, 0, 0, 1, 6, 0, 2, 0, 1, 2, 3, 0, 4, 4, 4,
					3, 5, 1, 5, 0, 3, 1, 3, 10, 0, 6, 2, 4, 1, 6, 0, 2,
				],
			},
		],
		legend: {
			show: true,
			showForSingleSeries: true,
			position: "top",
			horizontalAlign: "center",
			floating: false,
			labels: {
				colors: ["#F5F5F5"],
				useSeriesColors: true,
			},
		},
		yaxis: {
			show: true,
			labels: {
				style: {
					colors: "#F5F5F5",
				},
			},
			axisBorder: {
				show: false,
			},
		},
		xaxis: {
			show: true,
			ticAmmount: 1,
			tickPlacement: "between",
			position: "bottom",
			labels: {
				show: true,
				showDuplicates: true,
				trim: true,
				style: {
					colors: "#F5F5F5",
				},
			},
			axisBorder: {
				show: false,
			},
		},
		markers: {
			colors: ["#F44336", "#E91E63", "#9C27B0"],
			// for markers  on mouse over
		},
		dataLabels: {
			enabled: false,
			style: {
				colors: ["#F44336", "#E91E63", "#9C27B0"],
			},
		},
	};

	useLayoutEffect(() => {
		const chart = new ApexCharts(document.querySelector("#chart"), options);
		chart.render();
		return () => chart.destroy();
	}, []);

	return (
		<div
			className="h-60 text-dark bg-[#161616] py-2 rounded-md"
			id="chart"
			ref={chartRef}
		></div>
	);
}

var options = {
	series: [
		{
			name: "STOCK ABC",
			// data: series.monthDataSeries1.prices,
		},
	],
	chart: {
		type: "area",
		height: 350,
		zoom: {
			enabled: false,
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		curve: "straight",
	},

	title: {
		text: "Fundamental Analysis of Stocks",
		align: "left",
		style: {
			color: ["#ffffff"],
		},
	},
	subtitle: {
		text: "Price Movements",
		align: "left",
	},
	// labels: series.monthDataSeries1.dates,
	xaxis: {
		type: "datetime",
	},
	yaxis: {
		opposite: true,
	},
	legend: {
		horizontalAlign: "left",
	},
};
