import React, { useEffect } from "react";
import { AxisScrollStrategies, lightningChart, Themes,Theme, LineSeries } from "@arction/lcjs";
import { createProgressiveRandomGenerator, createSampledDataGenerator } from "@arction/xydata";
import { Points } from "../data";

interface PlotChartProps{
    theme : Theme
}

export const PlotChart: React.FC<PlotChartProps> = (props) => {
  const containerId = "plotchart" + Math.floor(Math.random() * 1000);

  useEffect(() => {
    const chart = lightningChart()
      .ChartXY({ container: containerId, theme: props.theme })
      .setTitle("ECG");

    const series:LineSeries = chart.addLineSeries({
      dataPattern: {
        // pattern: 'ProgressiveX' => Each consecutive data point has increased X coordinate.
        pattern: "ProgressiveX",
        // regularProgressiveStep: true => The X step between each consecutive data point is regular (for example, always `1.0`).
        regularProgressiveStep: true,
      },
    });

    // Setup view nicely.
    chart
      .getDefaultAxisY()
      //   .setTitle("mV")
      .setInterval(-250, 250)
      .setScrollStrategy(AxisScrollStrategies.progressive)
      .setMouseInteractions(false);

    chart
      .getDefaultAxisX()
      //   .setTitle("milliseconds")
      .setInterval(0, 1000)
      .setScrollStrategy(AxisScrollStrategies.progressive)
      .setMouseInteractions(false);

    chart.setMouseInteractionPan(false);
    chart.setMouseInteractionRectangleFit(false);
    chart.setMouseInteractionRectangleZoom(false);
    chart.setMouseInteractionWheelZoom(false);
    chart.setMouseInteractions(false);
    chart.setMouseInteractionsWhileScrolling(false);
    chart.setMouseInteractionsWhileZooming(false);

      createSampledDataGenerator<any>()
      .setSamplingFrequency(1)
      .setInputData(Points)
      .generate()
      .setStreamInterval(20)
      .setStreamRepeat(true)
      .toStream()
      .forEach((point) => {
        // Push the created points to the series.
        series.add({ x: point.timestamp, y: point.data });
        
      });
  }, []);

  return <div id={containerId} style={{ width: "600px", height: "150px" }} />;
};
