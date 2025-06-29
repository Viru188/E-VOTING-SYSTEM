
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, Clock, LogOut, MapPin, Shield } from "lucide-react";

const VoterDashboard = () => {
  const navigate = useNavigate();
  const [hasVoted, setHasVoted] = useState(false);
  const [voteTimestamp, setVoteTimestamp] = useState<string | null>(null);

  useEffect(() => {
    const votingStatus = localStorage.getItem("gujaratVotingStatus");
    const timestamp = localStorage.getItem("gujaratVoteTimestamp");
    if (votingStatus === "completed") {
      setHasVoted(true);
      setVoteTimestamp(timestamp);
    }
  }, []);

  const elections = [
    {
      id: 1,
      title: "Gujarat Legislative Assembly Election 2024",
      description: "Vote for your MLA representative in Gujarat Assembly",
      type: "State",
      candidates: 4,
      deadline: "December 15, 2024",
      status: "active",
      symbols: ["🦁", "🏛️", "🌸", "⭐"],
      constituency: "Gandhinagar"
    },
    {
      id: 2,
      title: "Lok Sabha - Ahmedabad East",
      description: "Choose your Member of Parliament for Ahmedabad East constituency",
      type: "Federal",
      candidates: 3,
      deadline: "May 20, 2024",
      status: "active",
      symbols: ["🇮🇳", "🏛️", "🌾"],
      constituency: "Ahmedabad East"
    },
    {
      id: 3,
      title: "Gandhinagar Municipal Corporation",
      description: "Select your local municipal representative",
      type: "Local",
      candidates: 5,
      deadline: "January 10, 2025",
      status: "active",
      symbols: ["🏛️", "🟦", "⭐", "🌸", "🦁"],
      constituency: "Gandhinagar"
    }
  ];

  const stats = [
    { label: "Total Elections", value: "3", icon: Users, color: "text-blue-600" },
    { label: "Votes Cast", value: hasVoted ? "1" : "0", icon: CheckCircle, color: "text-green-600" },
    { label: "Pending", value: hasVoted ? "2" : "3", icon: Clock, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-orange-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-green-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Gujarat Voter Dashboard</h1>
              <p className="text-sm text-gray-600">Voter ID: #GJ2024-001 | મતવિસ્તાર: Gandhinagar</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-green-600">DigiLocker Verified</span>
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              <LogOut className="w-4 h-4 mr-2" />
              લોગઆઉટ
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Voting Status */}
        {hasVoted && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="text-lg font-semibold text-green-900">મત સફળતાપૂર્વક આપવામાં આવ્યો</h3>
                  <p className="text-green-800">Your vote has been successfully cast and recorded</p>
                  {voteTimestamp && (
                    <p className="text-sm text-green-700">
                      Voted on: {new Date(voteTimestamp).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">ગુજરાતમાં ઉપલબ્ધ ચૂંટણીઓ (Available Elections)</h2>
          <div className="grid gap-6">
            {elections.map((election) => (
              <Card key={election.id} className="hover:shadow-md transition-shadow border-2 border-orange-100">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-green-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-3">
                        <span>{election.title}</span>
                        <Badge 
                          variant={election.type === "Federal" ? "default" : election.type === "State" ? "secondary" : "outline"}
                          className={election.type === "Federal" ? "bg-gray-900" : election.type === "State" ? "bg-orange-600" : ""}
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
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{election.constituency}</span>
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
                    
                    {election.id === 1 && hasVoted ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="font-medium">મત આપવામાં આવ્યો (Vote Cast)</span>
                      </div>
                    ) : (
                      <Button 
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        onClick={() => navigate("/voting-booth")}
                        disabled={election.id === 1 && hasVoted}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        તમારો મત આપો (Cast Your Vote)
                      </Button>
                    )}
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
