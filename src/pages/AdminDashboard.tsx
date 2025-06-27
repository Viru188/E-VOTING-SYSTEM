
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
  const [selectedConstituency, setSelectedConstituency] = useState("Gandhinagar");

  const stats = [
    { label: "Total Registered Voters", value: "85,000", icon: Users, color: "text-blue-600" },
    { label: "Votes Cast", value: "59,500", icon: BarChart3, color: "text-green-600" },
    { label: "Participation Rate", value: "70%", icon: Users, color: "text-purple-600" },
    { label: "Security Status", value: "Secure", icon: Shield, color: "text-green-600" }
  ];

  const electionResults = [
    { name: "Rajesh Patel", votes: 23800, party: "BJP", color: "#ff9933" },
    { name: "Priya Shah", votes: 19040, party: "INC", color: "#19AAED" },
    { name: "Amit Mehta", votes: 11900, party: "AAP", color: "#0066CC" },
    { name: "Kavita Desai", votes: 4760, party: "Independent", color: "#f59e0b" }
  ];

  const constituencyComparison = [
    { constituency: "Gandhinagar", participation: 70 },
    { constituency: "Ahmedabad East", participation: 65 },
    { constituency: "Vadodara", participation: 72 },
    { constituency: "Surat", participation: 68 },
    { constituency: "Rajkot", participation: 75 }
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
              <h1 className="text-xl font-semibold text-gray-900">Gujarat Election Commission Dashboard</h1>
              <p className="text-sm text-gray-600">Gujarat State Election Analytics & Results</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Constituency Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Constituency-wise Analysis</span>
            </CardTitle>
            <CardDescription>Select a constituency to view detailed voting statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-64">
              <Select value={selectedConstituency} onValueChange={setSelectedConstituency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gandhinagar">Gandhinagar</SelectItem>
                  <SelectItem value="Ahmedabad East">Ahmedabad East</SelectItem>
                  <SelectItem value="Vadodara">Vadodara</SelectItem>
                  <SelectItem value="Surat">Surat</SelectItem>
                  <SelectItem value="Rajkot">Rajkot</SelectItem>
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
                  <h3 className="text-lg font-semibold text-green-900">Leading in {selectedConstituency}</h3>
                  <p className="text-green-800">Rajesh Patel (Bharatiya Janata Party)</p>
                  <p className="text-sm text-green-700">23,800 votes (40%)</p>
                </div>
              </div>
              <Badge className="bg-green-600">40% of votes</Badge>
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
              <CardTitle>{selectedConstituency} Election Results</CardTitle>
              <CardDescription>Vote breakdown for {selectedConstituency} constituency</CardDescription>
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

          {/* Constituency Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Gujarat Constituencies Comparison</CardTitle>
              <CardDescription>Voter participation across major constituencies</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={constituencyComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="constituency" tick={{ fontSize: 10 }} />
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
