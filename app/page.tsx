"use client";

import { useRouter } from "next/navigation";

import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";

// Import images directly from app/images folder
import userTimeImage from "@/app/images/user_time_image.jpeg";
import idleTimeImage from "@/app/images/idle_time_image.jpeg";
import systemTimeImage from "@/app/images/system_time_image.jpeg";
import niceTimeImage from "@/app/images/nice_time_image.jpeg";
import irqTimeImage from "@/app/images/irq_time_image.jpeg";
import upTimeImage from "@/app/images/up_time_image.jpeg";
import memoryUsageImage from "@/app/images/memory_usage_image.jpeg";

interface Times {
  user: number;
  nice: number;
  sys: number;
  idle: number;
  irq: number;
  up: number; //Todo
  memory: number; //Todo
}

// Metrics with longer descriptions
const metrics = [
  {
    label: "User Time",
    description: `User Time refers to the time spent by the CPU running user-initiated processes 
                  and applications. This includes any tasks that are started by the user or programs 
                  running in the foreground. A high percentage of user time often indicates that the 
                  CPU is heavily engaged in processing user commands and software executions.`,
    image: userTimeImage,
    metric: "user",
  },
  {
    label: "Idle Time",
    description: `Idle Time represents the amount of time the CPU spends doing nothing or waiting for 
                  tasks to be assigned. It’s important because it shows the capacity available in the 
                  system for additional work. A high idle time means the CPU has ample resources to 
                  handle more tasks, while a low idle time suggests the CPU is nearing its limit.`,
    image: idleTimeImage,
    metric: "idle",
  },
  {
    label: "System Time",
    description: `System Time tracks the time the CPU spends executing system-level processes, which 
                  are tasks initiated by the operating system itself. This time is crucial for managing 
                  hardware resources, memory, and other system services that ensure smooth operation 
                  of all running applications and services.`,
    image: systemTimeImage,
    metric: "sys",
  },
  {
    label: "Nice Time",
    description: `Nice Time refers to the time spent on lower-priority processes. These processes are 
                  given "nice" values by the system, which determine their importance relative to other 
                  tasks. A higher nice time indicates that the CPU is focusing more on these background 
                  or lower-priority tasks without interrupting more critical operations.`,
    image: niceTimeImage,
    metric: "nice",
  },
  {
    label: "IRQ Time",
    description: `IRQ Time, or interrupt request time, measures the time the CPU spends responding to 
                  hardware interrupts. Hardware devices, such as input/output devices or sensors, send 
                  interrupts to the CPU to signal that they need immediate attention. A higher IRQ time 
                  means the system is busy dealing with hardware events.`,
    image: irqTimeImage,
    metric: "irq",
  },
  {
    label: "Up Time",
    description: `Uptime refers to the amount of time the system has been running continuously without a reboot. Monitoring system uptime is essential for tracking system stability and ensuring high availability for critical applications.`,
    image: upTimeImage,
    metric: "up",
  },
  {
    label: "Memory Usage",
    description: `Memory usage refers to the amount of RAM currently used by the OS and applications. Monitoring memory is crucial for system performance, as high usage can lead to slowdowns or crashes, while low usage may indicate underutilized resources.`,
    image: memoryUsageImage,
    metric: "memory",
  },
];

const Page = () => {
  const router = useRouter();
  const handleCardClick = (label: keyof Times) => {
    //Todo
    if (label === "up") {
      router.push("charts/uptime");
    } else if (label === "memory") {
      router.push("charts/memory");
    } else {
      const queryParam = label.toLocaleLowerCase();
      console.log("queryParam", queryParam);
      router.push(`/charts/cpus?times=${queryParam}`);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} spacing={10}>
            <Card>
              <CardActionArea
                onClick={() => handleCardClick(metric.metric as keyof Times)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  src={metric.image.src} // Using the imported image directly
                  alt={metric.label}
                />
                <CardContent sx={{ height: 200 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {metric.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {metric.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Page;
