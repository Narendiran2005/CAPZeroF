
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Gauge, ChartLine, Timer } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line
} from "recharts";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface UserStatsProps {
  completedChallenges: number;
  totalPoints: number;
  currentStreak: number;
  rank: number;
}

export default function UserStats({
  completedChallenges = 42,
  totalPoints = 1250,
  currentStreak = 7,
  rank = 124
}: UserStatsProps) {
  const [showRankChart, setShowRankChart] = useState(false);
  const [showPointsChart, setShowPointsChart] = useState(false);

  // Generate mock rank history data
  const rankHistory = [
    { month: "Jan", rank: 350 },
    { month: "Feb", rank: 280 },
    { month: "Mar", rank: 320 },
    { month: "Apr", rank: 260 },
    { month: "May", rank: 190 },
    { month: "Jun", rank: 150 },
    { month: "Jul", rank: 124 },
  ];

  // Generate mock points history data
  const pointsHistory = [
    { month: "Jan", points: 180 },
    { month: "Feb", points: 320 },
    { month: "Mar", points: 250 },
    { month: "Apr", points: 410 },
    { month: "May", points: 280 },
    { month: "Jun", points: 220 },
    { month: "Jul", points: 350 },
  ];

  // Mock data for difficulty breakdown
  const difficultyData = [
    { name: "Easy", value: 26, color: "#10b981", avgTime: "14 min" },
    { name: "Medium", value: 11, color: "#f59e0b", avgTime: "38 min" },
    { name: "Hard", value: 5, color: "#ef4444", avgTime: "62 min" },
  ];

  // Calculation for challenge completion percentage
  const totalAvailableChallenges = 100; // Mock data
  const completionPercentage = (completedChallenges / totalAvailableChallenges) * 100;
  const pointsPercentage = (totalPoints / 2000) * 100; // Assuming 2000 is max points
  
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-bold">
          <Gauge className="mr-2 h-5 w-5 text-primary" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Stats with speedometers */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg shadow-sm">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Completed</div>
                <div className="flex justify-between items-end">
                  <div className="text-3xl font-bold">{completedChallenges}</div>
                  <div className="text-xs text-gray-400">{totalAvailableChallenges} total</div>
                </div>
                <div className="mt-2 h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Completed", value: completionPercentage },
                          { name: "Remaining", value: 100 - completionPercentage }
                        ]}
                        cx="50%"
                        cy="50%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius="60%"
                        outerRadius="100%"
                        paddingAngle={0}
                        dataKey="value"
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#e5e7eb" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Difficulty breakdown moved to the right side of charts */}
                <div className="mt-2 flex justify-end">
                  <div className="flex items-center space-x-3">
                    {difficultyData.map((item) => (
                      <HoverCard key={item.name}>
                        <HoverCardTrigger asChild>
                          <div className="flex flex-col items-center cursor-help">
                            <div className="text-xs font-medium" style={{ color: item.color }}>
                              {item.name}
                            </div>
                            <div className="text-sm font-bold">{item.value}</div>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-60">
                          <div className="flex justify-between">
                            <div className="font-medium">{item.name} Challenges</div>
                            <div className="font-bold">{item.value}</div>
                          </div>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Timer className="h-3 w-3 mr-1" /> 
                            <span>Average completion time: {item.avgTime}</span>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg shadow-sm">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Points</div>
                <div className="flex justify-between items-end">
                  <div className="text-3xl font-bold">{totalPoints}</div>
                  <div className="text-xs text-gray-400">2000 max</div>
                </div>
                <HoverCard open={showPointsChart} onOpenChange={setShowPointsChart}>
                  <HoverCardTrigger asChild>
                    <div 
                      className="mt-2 h-20 cursor-pointer"
                      onMouseEnter={() => setShowPointsChart(true)}
                      onMouseLeave={() => setShowPointsChart(false)}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Earned", value: pointsPercentage },
                              { name: "Remaining", value: 100 - pointsPercentage }
                            ]}
                            cx="50%"
                            cy="50%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius="60%"
                            outerRadius="100%"
                            paddingAngle={0}
                            dataKey="value"
                          >
                            <Cell fill="#8b5cf6" />
                            <Cell fill="#e5e7eb" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64">
                    <div className="space-y-1">
                      <p className="font-medium">Points by Month</p>
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={pointsHistory} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} />
                            <Tooltip 
                              formatter={(value) => [`${value} points`, 'Points']}
                              contentStyle={{
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                borderRadius: '0.5rem',
                                border: '1px solid #e5e7eb',
                                fontSize: '0.75rem',
                              }}
                            />
                            <Line type="monotone" dataKey="points" stroke="#8b5cf6" activeDot={{ r: 5 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                {/* Points by difficulty - moved to the right of the chart */}
                <div className="mt-2 flex justify-end">
                  <div className="flex items-center space-x-3">
                    {[
                      { name: "Easy", points: 520, color: "#10b981" },
                      { name: "Medium", points: 480, color: "#f59e0b" }, 
                      { name: "Hard", points: 250, color: "#ef4444" }
                    ].map((item) => (
                      <div key={item.name} className="flex flex-col items-center">
                        <div className="text-xs font-medium" style={{ color: item.color }}>
                          {item.name}
                        </div>
                        <div className="text-xs font-bold">{item.points}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg shadow-sm">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Streak</div>
                <div className="flex justify-between items-end">
                  <div className="text-3xl font-bold">{currentStreak}</div>
                  <div className="text-xs text-gray-400">days</div>
                </div>
                <div className="mt-2 flex justify-center">
                  <div className="flex items-end space-x-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div
                        key={day}
                        className={`w-2 ${
                          day <= currentStreak
                            ? "bg-yellow-500 dark:bg-yellow-400"
                            : "bg-gray-200 dark:bg-gray-700"
                        } rounded-t`}
                        style={{ 
                          height: `${Math.min(
                            Math.max(16 + (day <= currentStreak ? day * 4 : 0), 16),
                            36
                          )}px` 
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg shadow-sm">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Rank</div>
                <HoverCard open={showRankChart} onOpenChange={setShowRankChart}>
                  <HoverCardTrigger asChild>
                    <div 
                      className="cursor-pointer" 
                      onMouseEnter={() => setShowRankChart(true)}
                      onMouseLeave={() => setShowRankChart(false)}
                    >
                      <div className="text-3xl font-bold">#{rank}</div>
                      <div className="mt-2 text-xs text-green-500 flex items-center">
                        <span>↑ 26 this month</span>
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64">
                    <div className="space-y-1">
                      <p className="font-medium">Rank Progress</p>
                      <div className="h-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart 
                            data={rankHistory} 
                            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                            <YAxis 
                              reversed 
                              tick={{ fontSize: 10 }} 
                              domain={['dataMin', 'dataMax']} 
                            />
                            <Tooltip 
                              formatter={(value) => [`#${value}`, 'Rank']}
                              contentStyle={{
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                borderRadius: '0.5rem',
                                border: '1px solid #e5e7eb',
                                fontSize: '0.75rem',
                              }}
                            />
                            <Line type="monotone" dataKey="rank" stroke="#8b5cf6" activeDot={{ r: 5 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="text-xs text-center text-gray-500 mt-1">
                        Lower rank number is better
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>
          
          {/* Right column - removed rank graph as it's now shown on hover */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Recent Activity</div>
              <ChartLine className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={rankHistory}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="rankGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    reversed 
                    domain={['dataMin', 'dataMax']} 
                    hide={true}
                  />
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <Tooltip 
                    formatter={(value) => [`#${value}`, 'Rank']}
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: '0.5rem',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      fontSize: '0.75rem',
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="rank" 
                    stroke="#8b5cf6" 
                    fillOpacity={1} 
                    fill="url(#rankGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-center text-gray-500 mt-1">
              Lower rank number is better
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
