import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, CheckCircle, MapPin } from "lucide-react";

const VotingBooth = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [currentElectionId, setCurrentElectionId] = useState<string | null>(null);
  const [hasVotedInCurrentElection, setHasVotedInCurrentElection] = useState(false);

  useEffect(() => {
    // Get current election ID
    const electionId = localStorage.getItem("currentElectionId");
    if (!electionId) {
      navigate("/voter-dashboard");
      return;
    }
    setCurrentElectionId(electionId);

    // Check if user has voted in this specific election
    const votedElections = JSON.parse(localStorage.getItem("gujaratVotedElections") || "[]");
    if (votedElections.includes(electionId)) {
      setHasVotedInCurrentElection(true);
    }
  }, [navigate]);

  const candidates = [
    {
      id: "rajesh-patel",
      name: "Rajesh Patel",
      party: "Bharatiya Janata Party (BJP)",
      symbol: "🦁"
    },
    {
      id: "priya-shah",
      name: "Priya Shah",
      party: "Indian National Congress (INC)",
      symbol: "🏛️"
    },
    {
      id: "amit-mehta",
      name: "Amit Mehta",
      party: "Aam Aadmi Party (AAP)",
      symbol: "🌾"
    },
    {
      id: "kavita-desai",
      name: "Kavita Desai",
      party: "Independent",
      symbol: "⭐"
    }
  ];

  const handleCastVote = () => {
    if (hasVotedInCurrentElection) {
      alert("તમે આ ચૂંટણીમાં પહેલેથી જ મત આપ્યો છે! You have already voted in this election!");
      return;
    }
    if (selectedCandidate) {
      // Store selected candidate for confirmation
      localStorage.setItem("selectedCandidate", selectedCandidate);
      navigate("/vote-confirmation");
    }
  };

  if (hasVotedInCurrentElection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-green-800">આ ચૂંટણીમાં મત પહેલેથી આપવામાં આવ્યો છે</CardTitle>
            <CardDescription>You have already cast your vote in this election</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/voter-dashboard")} className="bg-orange-600 hover:bg-orange-700">
              ડેશબોર્ડ પર પાછા જાઓ
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-orange-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/voter-dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            પાછા
          </Button>
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-orange-600" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Gujarat Secure Voting Booth</h1>
              <p className="text-sm text-orange-600">તમારો મત ખાનગી અને એન્ક્રિપ્ટેડ છે</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Election Info */}
        <Card className="mb-8 border-2 border-orange-200">
          <CardHeader className="bg-gradient-to-r from-orange-100 to-green-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-orange-800">Gujarat Legislative Assembly Election 2024</CardTitle>
              <Badge className="bg-orange-600">Gujarat State</Badge>
            </div>
            <CardDescription className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span>Gandhinagar constituency માં તમારા MLA પ્રતિનિધિ માટે મત આપો</span>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Voting Instructions */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-900 mb-1">મતદાન સૂચનાઓ (Voting Instructions)</h3>
                <p className="text-orange-800 text-sm">
                  તેમના કાર્ડ પર ક્લિક કરીને એક ઉમેદવાર પસંદ કરો. તમારી પસંદગીની સમીક્ષા કરો અને સબમિટ કરવા માટે "Cast Vote" પર ક્લિક કરો.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {candidates.map((candidate) => (
            <Card 
              key={candidate.id}
              className={`cursor-pointer transition-all hover:shadow-lg border-2 ${
                selectedCandidate === candidate.id 
                  ? "ring-2 ring-orange-500 border-orange-500 bg-orange-50" 
                  : "hover:border-orange-300 border-gray-200"
              }`}
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">{candidate.symbol}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{candidate.name}</h3>
                <p className="text-gray-600 mb-4">{candidate.party}</p>
                {selectedCandidate === candidate.id && (
                  <div className="flex items-center justify-center space-x-2 text-orange-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">પસંદ કર્યું (Selected)</span>
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
            className="bg-orange-600 hover:bg-orange-700 px-8 py-3 text-lg"
          >
            <Shield className="w-5 h-5 mr-2" />
            તમારો મત આપો (Cast Your Vote)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VotingBooth;
