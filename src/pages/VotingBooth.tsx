
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, CheckCircle } from "lucide-react";

const VotingBooth = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const candidates = [
    {
      id: "alex-johnson",
      name: "Alex Johnson",
      party: "Democratic Party",
      symbol: "🇺🇸"
    },
    {
      id: "sarah-williams",
      name: "Sarah Williams",
      party: "Republican Party",
      symbol: "🏛️"
    },
    {
      id: "michael-chen",
      name: "Michael Chen",
      party: "Independent",
      symbol: "⭐"
    }
  ];

  const handleCastVote = () => {
    if (selectedCandidate) {
      navigate("/vote-confirmation");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/voter-dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Secure Voting Booth</h1>
              <p className="text-sm text-blue-600">Your vote is private and encrypted</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Election Info */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Presidential Election 2024</CardTitle>
              <Badge className="bg-gray-900">Federal</Badge>
            </div>
            <CardDescription>
              Vote for the next President of the United States
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Voting Instructions */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Voting Instructions</h3>
                <p className="text-blue-800 text-sm">
                  Select one candidate by clicking on their card. Review your choice and click "Cast Vote" to submit.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {candidates.map((candidate) => (
            <Card 
              key={candidate.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedCandidate === candidate.id 
                  ? "ring-2 ring-blue-500 border-blue-500" 
                  : "hover:border-gray-300"
              }`}
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">{candidate.symbol}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{candidate.name}</h3>
                <p className="text-gray-600 mb-4">{candidate.party}</p>
                {selectedCandidate === candidate.id && (
                  <div className="flex items-center justify-center space-x-2 text-blue-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Selected</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cast Vote Button */}
        <div className="text-center">
          <Button 
            onClick={handleCastVote}
            disabled={!selectedCandidate}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
          >
            <Shield className="w-5 h-5 mr-2" />
            Cast Your Vote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VotingBooth;
