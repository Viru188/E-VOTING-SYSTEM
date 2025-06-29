
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield } from "lucide-react";

const VoteConfirmation = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentElectionId, setCurrentElectionId] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [hasVotedInCurrentElection, setHasVotedInCurrentElection] = useState(false);

  useEffect(() => {
    // Get current election and selected candidate
    const electionId = localStorage.getItem("currentElectionId");
    const candidate = localStorage.getItem("selectedCandidate");
    
    if (!electionId || !candidate) {
      navigate("/voter-dashboard");
      return;
    }
    
    setCurrentElectionId(electionId);
    setSelectedCandidate(candidate);

    // Check if user has already voted in this election
    const votedElections = JSON.parse(localStorage.getItem("gujaratVotedElections") || "[]");
    if (votedElections.includes(electionId)) {
      setHasVotedInCurrentElection(true);
    }
  }, [navigate]);

  const handleFinalSubmit = () => {
    if (hasVotedInCurrentElection || !currentElectionId) {
      alert("તમે આ ચૂંટણીમાં પહેલેથી જ મત આપ્યો છે! You have already voted in this election!");
      return;
    }

    setIsSubmitting(true);
    // Simulate vote submission
    setTimeout(() => {
      // Add current election to voted elections list
      const votedElections = JSON.parse(localStorage.getItem("gujaratVotedElections") || "[]");
      votedElections.push(currentElectionId);
      localStorage.setItem("gujaratVotedElections", JSON.stringify(votedElections));
      
      // Store vote timestamp for this election
      localStorage.setItem(`gujaratVoteTimestamp_${currentElectionId}`, new Date().toISOString());
      
      // Clean up temporary data
      localStorage.removeItem("currentElectionId");
      localStorage.removeItem("selectedCandidate");
      
      setIsSubmitting(false);
      navigate("/voter-dashboard");
    }, 2000);
  };

  const getCandidateDetails = (candidateId: string) => {
    const candidates = {
      "rajesh-patel": { name: "Rajesh Patel", party: "Bharatiya Janata Party (BJP)", symbol: "🦁" },
      "priya-shah": { name: "Priya Shah", party: "Indian National Congress (INC)", symbol: "🏛️" },
      "amit-mehta": { name: "Amit Mehta", party: "Aam Aadmi Party (AAP)", symbol: "🌾" },
      "kavita-desai": { name: "Kavita Desai", party: "Independent", symbol: "⭐" }
    };
    return candidates[candidateId as keyof typeof candidates] || { name: "Unknown", party: "Unknown", symbol: "❓" };
  };

  if (hasVotedInCurrentElection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-red-800">આ ચૂંટણીમાં મત પહેલેથી આપવામાં આવ્યો છે</CardTitle>
            <CardDescription>Vote Already Cast in This Election</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              તમે પહેલેથી જ આ ચૂંટણીમાં તમારો મત આપ્યો છે। એક મતદાર દરેક ચૂંટણીમાં માત્ર એક જ વાર મત આપી શકે છે।
            </p>
            <Button onClick={() => navigate("/voter-dashboard")} className="bg-orange-600 hover:bg-orange-700">
              ડેશબોર્ડ પર પાછા જાઓ
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const candidateDetails = selectedCandidate ? getCandidateDetails(selectedCandidate) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 border-orange-200">
          <CardHeader className="text-center bg-gradient-to-r from-orange-100 to-green-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-orange-800">તમારા મતની પુષ્ટિ કરો</CardTitle>
            <CardDescription>
              અંતિમ સબમિશન પહેલાં તમારી પસંદગીની સમીક્ષા કરો
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Election Details */}
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Gujarat Legislative Assembly Election 2024</h3>
              <p className="text-sm text-gray-600">Gandhinagar Constituency</p>
            </div>

            {/* Selected Candidate */}
            {candidateDetails && (
              <Card className="border-2 border-orange-200 bg-orange-50">
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-2">{candidateDetails.symbol}</div>
                  <h4 className="font-bold text-gray-900">{candidateDetails.name}</h4>
                  <p className="text-gray-600">{candidateDetails.party}</p>
                </CardContent>
              </Card>
            )}

            {/* Security Notice */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-800 mb-1">સુરક્ષા સૂચના</h4>
                    <p className="text-green-700 text-sm">
                      આ ક્રિયા પૂર્વવત્ કરી શકાતી નથી. તમારો મત એન્ક્રિપ્ટ કરવામાં આવશે અને Gujarat ECI સિસ્ટમમાં સુરક્ષિત રીતે સંગ્રહિત કરવામાં આવશે।
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => navigate("/voting-booth")} className="flex-1">
                પાછા જાઓ
              </Button>
              
              <Button 
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Shield className="w-4 h-4 mr-2" />
                {isSubmitting ? "સબમિટ કરી રહ્યા છીએ..." : "મત સબમિટ કરો"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoteConfirmation;
