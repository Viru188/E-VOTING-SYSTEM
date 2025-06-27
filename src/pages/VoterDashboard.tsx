
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, Clock, LogOut } from "lucide-react";

const VoterDashboard = () => {
  const navigate = useNavigate();

  const elections = [
    {
      id: 1,
      title: "Presidential Election 2024",
      description: "Vote for the next President of the United States",
      type: "Federal",
      candidates: 3,
      deadline: "November 5, 2024",
      status: "active",
      symbols: ["🇺🇸", "🏛️", "⭐"]
    },
    {
      id: 2,
      title: "Congressional District 5",
      description: "Choose your representative in Congress",
      type: "Federal",
      candidates: 2,
      deadline: "November 5, 2024",
      status: "active",
      symbols: ["🇺🇸"]
    },
    {
      id: 3,
      title: "Mayor Election",
      description: "Select your city mayor",
      type: "Local",
      candidates: 3,
      deadline: "November 12, 2024",
      status: "active",
      symbols: ["🏛️", "🟦", "⭐"]
    }
  ];

  const stats = [
    { label: "Total Elections", value: "3", icon: Users, color: "text-blue-600" },
    { label: "Votes Cast", value: "0", icon: CheckCircle, color: "text-green-600" },
    { label: "Pending", value: "3", icon: Clock, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Voter Dashboard</h1>
              <p className="text-sm text-gray-600">Voter ID: #VT2024-001</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Available Elections */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Elections</h2>
          <div className="grid gap-6">
            {elections.map((election) => (
              <Card key={election.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-3">
                        <span>{election.title}</span>
                        <Badge 
                          variant={election.type === "Federal" ? "default" : "secondary"}
                          className={election.type === "Federal" ? "bg-gray-900" : ""}
                        >
                          {election.type}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {election.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{election.candidates} Candidates</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {election.symbols.map((symbol, idx) => (
                          <span key={idx} className="text-lg">{symbol}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Deadline: {election.deadline}</span>
                    </div>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => navigate("/voting-booth")}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Cast Your Vote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterDashboard;
