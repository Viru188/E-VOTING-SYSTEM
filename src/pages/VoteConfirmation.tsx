
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, Shield } from "lucide-react";

const VoteConfirmation = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Check if user has already voted
    const votingStatus = localStorage.getItem("gujaratVotingStatus");
    if (votingStatus === "completed") {
      setHasVoted(true);
    }
  }, []);

  const handleFinalSubmit = () => {
    if (hasVoted) {
      alert("તમે પહેલેથી જ મત આપ્યો છે! You have already cast your vote!");
      return;
    }

    setIsSubmitting(true);
    // Simulate vote submission
    setTimeout(() => {
      localStorage.setItem("gujaratVotingStatus", "completed");
      localStorage.setItem("gujaratVoteTimestamp", new Date().toISOString());
      setIsSubmitting(false);
      navigate("/voter-dashboard");
    }, 2000);
  };

  if (hasVoted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-red-800">મત પહેલેથી આપવામાં આવ્યો છે</CardTitle>
            <CardDescription>Vote Already Cast</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              તમે પહેલેથી જ આ ચૂંટણીમાં તમારો મત આપ્યો છે। એક મતદાર માત્ર એક જ વાર મત આપી શકે છે।
            </p>
            <Button onClick={() => navigate("/voter-dashboard")} className="bg-orange-600 hover:bg-orange-700">
              ડેશબોર્ડ પર પાછા જાઓ
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardContent className="p-4 text-center">
                <div className="text-4xl mb-2">🦁</div>
                <h4 className="font-bold text-gray-900">Rajesh Patel</h4>
                <p className="text-gray-600">Bharatiya Janata Party (BJP)</p>
              </CardContent>
            </Card>

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
