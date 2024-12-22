import React from "react";
import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

interface Times {
  user: number;
  nice: number;
  sys: number;
  idle: number;
  irq: number;
}

interface DataItem {
  times: Times;
}

interface CpuUsageData {
  data: DataItem[];
  collectedAt: string;
}

interface CpuTimeChartProps {
  cpuData: CpuUsageData[];
  metric: keyof Times;
}

const cpuMetrics = {
  user: {
    title: "User Time (CPU)",
    description: `User Time refers to the time spent by the CPU running user-initiated processes 
                  and applications. This includes any tasks that are started by the user or programs 
                  running in the foreground. A high percentage of user time often indicates that the 
                  CPU is heavily engaged in processing user commands and software executions. Over time, 
                  optimizing user-time processes can lead to a more responsive system under heavy workloads.`,
  },
  idle: {
    title: "Idle Time (CPU)",
    description: `Idle Time represents the amount of time the CPU spends doing nothing or waiting for 
                  tasks to be assigned. It shows how much capacity is available for additional work. A high 
                  idle time means the CPU has available resources, while a low idle time suggests it is 
                  nearing its processing limit. Monitoring idle time is important for ensuring system 
                  scalability and optimal resource allocation.`,
  },
  sys: {
    title: "System Time (CPU)",
    description: `System Time tracks the time the CPU spends executing system-level processes, such as 
                  managing hardware resources, memory, and system services. These tasks are crucial for 
                  ensuring smooth operations. A high system time may indicate the CPU is busy handling 
                  internal operations, which could impact the performance of user-level applications. 
                  Balancing system time with user time is essential for optimal system health.`,
  },
  nice: {
    title: "Nice Time (CPU)",
    description: `Nice Time refers to the time the CPU spends on lower-priority processes that are assigned 
                  "nice" values by the system scheduler. These tasks are less critical and can be postponed 
                  to free up CPU resources for more important operations. A high nice time indicates that 
                  lower-priority tasks are running, while critical operations remain unaffected. Monitoring 
                  nice time helps maintain system responsiveness and efficiency.`,
  },
  irq: {
    title: "IRQ Time (CPU)",
    description: `IRQ Time, or interrupt request time, measures the time the CPU spends handling hardware 
                  interrupts. These interrupts come from peripherals like network devices or storage, 
                  signaling the CPU to attend to immediate tasks. A high IRQ time indicates frequent handling 
                  of hardware events, which may slow down other tasks. Efficiently managing IRQ time ensures 
                  smooth system operations, especially when dealing with heavy I/O tasks or real-time data processing.`,
  },
};

const timeChart: React.FC<CpuTimeChartProps> = ({ cpuData, metric }) => {
  const xLabels = cpuData.map((entry) => entry.collectedAt); // X-axis labels (time collected)

  const seriesData = cpuData[0].data.map((_, coreIndex) => {
    return {
      data: cpuData.map((entry) => entry.data[coreIndex].times[metric]),
      label: `Core ${coreIndex + 1}`,
    };
  });

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        {cpuMetrics[metric].title}
      </Typography>

      <LineChart
        height={400}
        series={seriesData}
        xAxis={[
          {
            scaleType: "point",
            data: xLabels,
          },
        ]}
      />
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {cpuMetrics[metric].description}
      </Typography>
    </Box>
  );
};

export default timeChart;
