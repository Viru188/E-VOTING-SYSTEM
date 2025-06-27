
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, BarChart3, Shield, LogOut, Trophy } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("Maharashtra");

  const stats = [
    { label: "Total Registered Voters", value: "45,000", icon: Users, color: "text-blue-600" },
    { label: "Votes Cast", value: "31,500", icon: BarChart3, color: "text-green-600" },
    { label: "Participation Rate", value: "70%", icon: Users, color: "text-purple-600" },
    { label: "Security Status", value: "Secure", icon: Shield, color: "text-green-600" }
  ];

  const electionResults = [
    { name: "Alex Johnson", votes: 14175, party: "Democratic", color: "#3b82f6" },
    { name: "Sarah Williams", votes: 11025, party: "Republican", color: "#ef4444" },
    { name: "Michael Chen", votes: 6300, party: "Independent", color: "#f59e0b" }
  ];

  const stateComparison = [
    { state: "Maharashtra", participation: 45 },
    { state: "National Avg", participation: 35 },
    { state: "Target", participation: 20 }
  ];

  const chartConfig = {
    votes: {
      label: "Votes",
      color: "#3b82f6",
    },
    participation: {
      label: "Participation %",
      color: "#10b981",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Election Analytics & Results</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* State Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>State-wise Analysis</span>
            </CardTitle>
            <CardDescription>Select a state to view detailed voting statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-64">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Karnataka">Karnataka</SelectItem>
                  <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leading Candidate */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Trophy className="w-8 h-8 text-yellow-600" />
                <div>
                  <h3 className="text-lg font-semibold text-green-900">Leading in {selectedState}</h3>
                  <p className="text-green-800">Alex Johnson (Democratic Party)</p>
                  <p className="text-sm text-green-700">14,175 votes (45%)</p>
                </div>
              </div>
              <Badge className="bg-green-600">45% of votes</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Election Results Chart */}
          <Card>
            <CardHeader>
              <CardTitle>{selectedState} Election Results</CardTitle>
              <CardDescription>Vote breakdown for {selectedState}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={electionResults}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="votes" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* State Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>National vs {selectedState}</CardTitle>
              <CardDescription>Comparison with national averages</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="state" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="participation" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
