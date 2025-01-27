"use client";

import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";

interface UptimeData {
  data: number;
  collectedAt: string;
}

const metric = {
  title: "Up Time",
  description:
    "Uptime refers to the amount of time the system has been running continuously without a reboot. Monitoring system uptime is essential for tracking system stability and ensuring high availability for critical applications. A high uptime indicates that the system has been stable and operational for an extended period, which is often desirable in environments where downtime can affect productivity or disrupt services. Uptime is especially critical for servers, data centers, and production environments where continuous operation is required to meet service-level agreements (SLAs).However, very long uptimes may also suggest that important system updates or patches, which require a reboot, have not been applied. As such, balancing uptime with regular maintenance is key to ensuring both security and reliability.By keeping an eye on uptime, administrators can make informed decisions about scheduling maintenance windows, rebooting after updates, and managing system resources more effectively.",
};

const Page = () => {
  const [uptimeData, setUptimeData] = useState<UptimeData[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/uptime");
        const result: UptimeData = await response.json();

        setUptimeData((prevData) => {
          const updatedData = [...prevData, result];
          if (updatedData.length > 10) {
            updatedData.shift();
          }
          return updatedData;
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching UpTime data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const xLabels = uptimeData.map((entry) => entry.collectedAt); // X-axis labels (time collected)

  const seriesData = [
    { data: uptimeData.map((entry) => entry.data), label: "Up Time" },
  ];

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
  if (!uptimeData || uptimeData.length === 0) return <p>No data available</p>;

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        {metric.title}
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
        {metric.description}
      </Typography>
    </Box>
  );
};

export default Page;
