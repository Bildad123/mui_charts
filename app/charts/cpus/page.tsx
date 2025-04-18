"use client";

import { Box } from "@mui/material";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TimeChart from "./TimeChart";
import { LineChart } from "@mui/x-charts";

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

const PageContent = () => {
  const [cpuData, setCpuData] = useState<CpuUsageData[]>([]);
  const [isLoading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const metric = (searchParams.get("times") as keyof Times) || "user"; // Fallback to 'user'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/cpus/times");
        const result: CpuUsageData = await response.json();

        setCpuData((prevData) => {
          const updatedData = [...prevData, result];
          if (updatedData.length > 10) {
            updatedData.shift();
          }
          return updatedData;
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching CPU data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

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
  if (!cpuData || cpuData.length === 0) return <p>No data available</p>;

  return (
    <Box display={"flex"} flexDirection={"column"} gap={3}>
      <TimeChart cpuData={cpuData} metric={metric} />
    </Box>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<p>Loading search params...</p>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
