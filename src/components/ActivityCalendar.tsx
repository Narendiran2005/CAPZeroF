
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ActivityLevel = 0 | 1 | 2 | 3 | 4;

interface ActivityDay {
  date: Date;
  count: number;
  level: ActivityLevel;
}

interface ActivityCalendarProps {
  data?: ActivityDay[];
}

export default function ActivityCalendar({ data }: ActivityCalendarProps) {
  // Generate mock data for the past year if no data is provided
  const activityData = useMemo(() => {
    if (data) return data;
    
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    
    const mockData: ActivityDay[] = [];
    let currentDate = new Date(oneYearAgo);
    
    while (currentDate <= today) {
      // Generate random activity counts with more intentional patterns
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const monthValue = currentDate.getMonth();
      
      // Create patterns: more activity on weekdays, seasonal variations
      const baseChance = isWeekend ? 0.2 : 0.4;
      // More activity in January (resolutions) and summer months
      const seasonalBoost = (monthValue === 0 || (monthValue >= 5 && monthValue <= 7)) ? 0.2 : 0;
      
      const random = Math.random();
      const activityChance = baseChance + seasonalBoost;
      
      let count = 0;
      let level: ActivityLevel = 0;
      
      if (random > (1 - activityChance * 0.5)) {
        count = Math.floor(Math.random() * 10) + 8;
        level = 4;
      } else if (random > (1 - activityChance * 0.7)) {
        count = Math.floor(Math.random() * 5) + 5;
        level = 3;
      } else if (random > (1 - activityChance * 0.9)) {
        count = Math.floor(Math.random() * 3) + 2;
        level = 2;
      } else if (random > (1 - activityChance)) {
        count = 1;
        level = 1;
      }
      
      mockData.push({
        date: new Date(currentDate),
        count,
        level,
      });
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return mockData;
  }, [data]);

  // Get the most recent 3 months for the compact calendar view
  const recentMonths = useMemo(() => {
    const today = new Date();
    const months = [];
    
    for (let i = 0; i < 3; i++) {
      const monthDate = new Date(today);
      monthDate.setMonth(today.getMonth() - i);
      months.push({
        date: monthDate,
        key: `${monthDate.getFullYear()}-${monthDate.getMonth() + 1}`,
        name: monthDate.toLocaleString('default', { month: 'short' }),
        year: monthDate.getFullYear()
      });
    }
    
    return months.reverse();
  }, []);

  // Generate calendar data organized by months
  const calendarData = useMemo(() => {
    // Group activities by month
    const months: { [key: string]: ActivityDay[][] } = {};
    
    activityData.forEach(day => {
      const date = day.date;
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!months[monthKey]) {
        // Initialize month with empty weeks
        months[monthKey] = [];
        
        // Get first day of month
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const firstDayOfWeek = firstDay.getDay();
        
        // Fill in empty days at the beginning
        let currentWeek: ActivityDay[] = [];
        for (let i = 0; i < firstDayOfWeek; i++) {
          currentWeek.push({
            date: new Date(firstDay),
            count: 0,
            level: 0
          });
        }
        
        months[monthKey].push(currentWeek);
      }
      
      let currentWeek = months[monthKey][months[monthKey].length - 1];
      
      // Start a new week if current week is full
      if (currentWeek.length === 7) {
        currentWeek = [];
        months[monthKey].push(currentWeek);
      }
      
      // Add day to current week
      currentWeek.push(day);
    });
    
    return months;
  }, [activityData]);
  
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg font-bold">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          Contribution Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div className="space-y-4">
          {recentMonths.map((month) => (
            <div key={month.key} className="space-y-1">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {month.name} {month.year}
              </h3>
              
              {calendarData[month.key] && (
                <div className="grid grid-cols-7 gap-0.5">
                  {/* Weekday headers - using initials only for compact display */}
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                    <div key={idx} className="text-[9px] text-center text-gray-400">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar cells - smaller size */}
                  {calendarData[month.key].flatMap((week, weekIdx) => 
                    week.map((day, dayIdx) => {
                      const dayNum = day.date.getDate();
                      const hasActivity = day.count > 0;
                      const dateStr = day.count > 0 ? 
                        `${day.count} contributions on ${day.date.toDateString()}` : 
                        "No contributions";
                      
                      return (
                        <Popover key={`${weekIdx}-${dayIdx}`}>
                          <PopoverTrigger asChild>
                            <div
                              className={`aspect-square w-full h-5 rounded-sm flex items-center justify-center transition-colors ${
                                day.level === 0
                                  ? "bg-gray-100 dark:bg-gray-700"
                                  : day.level === 1
                                  ? "bg-green-100 dark:bg-green-900"
                                  : day.level === 2
                                  ? "bg-green-300 dark:bg-green-700"
                                  : day.level === 3
                                  ? "bg-green-500 dark:bg-green-500"
                                  : "bg-green-700 dark:bg-green-300"
                              } ${hasActivity ? 'cursor-pointer hover:ring-1 hover:ring-offset-1 hover:ring-primary' : ''}`}
                            >
                              <span className={`text-[9px] font-medium ${hasActivity ? 'text-white dark:text-gray-900' : 'text-gray-400 dark:text-gray-600'}`}>
                                {dayNum}
                              </span>
                            </div>
                          </PopoverTrigger>
                          {hasActivity && (
                            <PopoverContent className="w-56 p-2" side="top">
                              <div className="space-y-1">
                                <p className="font-medium text-sm">{day.date.toDateString()}</p>
                                <p className="text-xs">{day.count} contributions</p>
                                <div className="flex items-center pt-1">
                                  <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                                  <p className="text-xs text-gray-500">{Math.round(day.count * 0.8)} solved challenges</p>
                                </div>
                                <div className="flex items-center">
                                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                                  <p className="text-xs text-gray-500">{Math.round(day.count * 0.2)} comments</p>
                                </div>
                              </div>
                            </PopoverContent>
                          )}
                        </Popover>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-end mt-2 gap-1 text-[9px] text-muted-foreground">
          <span>Less</span>
          <div className="w-2 h-2 rounded-sm bg-gray-100 dark:bg-gray-700"></div>
          <div className="w-2 h-2 rounded-sm bg-green-100 dark:bg-green-900"></div>
          <div className="w-2 h-2 rounded-sm bg-green-300 dark:bg-green-700"></div>
          <div className="w-2 h-2 rounded-sm bg-green-500 dark:bg-green-500"></div>
          <div className="w-2 h-2 rounded-sm bg-green-700 dark:bg-green-300"></div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
