
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, Shield } from "lucide-react";

const VoteConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle>Confirm Your Vote</CardTitle>
            <CardDescription>
              Please review your selection before final submission
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Election Details */}
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Gujarat Legislative Assembly Election 2024</h3>
              <p className="text-sm text-gray-600">Gandhinagar Constituency</p>
            </div>

            {/* Selected Candidate */}
            <Card className="border-2 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-4xl mb-2">🦁</div>
                <h4 className="font-bold text-gray-900">Rajesh Patel</h4>
                <p className="text-gray-600">Bharatiya Janata Party (BJP)</p>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Security Notice</h4>
                    <p className="text-yellow-700 text-sm">
                      This action cannot be undone. Your vote will be encrypted and stored securely in Gujarat ECI system.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => navigate("/voting-booth")} className="flex-1">
                Go Back
              </Button>
              <Button 
                onClick={() => navigate("/voter-dashboard")} 
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Shield className="w-4 h-4 mr-2" />
                Submit Vote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoteConfirmation;
