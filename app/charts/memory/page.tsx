"use client";

import { Box, Typography } from "@mui/material";
import { LineChart, ScatterChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface MemoryData {
  data: {
    freeMemory: number;
    usedMemory: number;
  };
  collectedAt: number;
}

const metric = {
  title: "Memory Usage",
  description:
    "Memory usage refers to the amount of RAM that is currently being utilized by the operating system and running applications. Monitoring memory usage is crucial for maintaining optimal system performance. If memory usage is too high, it can lead to performance degradation, as the system may start using swap space or disk storage, which is much slower than RAM. On the other hand, low memory usage could indicate underutilization of system resources. Regular monitoring helps administrators identify potential memory leaks, ensure that applications have enough memory to operate, and avoid system crashes due to memory exhaustion.",
};

const Page = () => {
  const [memoryData, setMemoryData] = useState<MemoryData[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/memory");
        const result: MemoryData = await response.json();

        setMemoryData((prevData) => {
          const updatedData = [...prevData, result];
          if (updatedData.length > 10) {
            updatedData.shift();
          }
          return updatedData;
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching memory data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const xLabels = memoryData.map((entry) => entry.collectedAt); // X-axis labels (time collected)
  const uniqueId = "id-" + uuidv4();
  const seriesDataFreeMemory = memoryData.map((entry, index) => ({
    x: entry.collectedAt,
    y: entry.data.freeMemory,
    id: uniqueId + index,
  }));

  const seriesDataUsedMemory = memoryData.map((entry, index) => ({
    x: entry.collectedAt,
    y: entry.data.usedMemory,
    id: uniqueId + index,
  }));

  const emptySeries = {
    series: [],
    margin: { top: 10, right: 10, left: 25, bottom: 25 },
    height: 400,
  };

  if (isLoading)
    return (
      <>
        <LineChart
          loading
          xAxis={[{ data: [0, 1, 2, 4, 5] }]}
          yAxis={[{ min: 0, max: 10 }]}
          {...emptySeries}
        />
      </>
    );
  {
    /** if (!uptimeData || uptimeData.length === 0) return <p>No data available</p>; */
  }

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        {metric.title}
      </Typography>

      <ScatterChart
        height={400}
        series={[
          {
            label: "Free Memory",
            data: seriesDataFreeMemory,
          },
          {
            label: "Used Memory",
            data: seriesDataUsedMemory,
          },
        ]}
        xAxis={[
          {
            label: "seconds from midnight",
            min: xLabels[0],
            max: xLabels[xLabels.length - 1],
            data: xLabels,
          },
        ]}
      />
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {metric.description}
      </Typography>
    </Box>
  );
};

export default Page;
