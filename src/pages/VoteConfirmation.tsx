
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft, Shield, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const VoteConfirmation = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    // Simulate vote submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/voter-dashboard");
    }, 2000);
  };

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
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <Shield className="w-4 h-4 mr-2" />
                    Submit Vote
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      </div>
                      <AlertDialogTitle className="text-lg font-bold text-red-900">
                        Final Vote Submission Warning
                      </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="space-y-3 text-sm">
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <p className="font-semibold text-red-900 mb-2">⚠️ Important Warnings:</p>
                        <ul className="space-y-2 text-red-800">
                          <li className="flex items-start space-x-2">
                            <span className="text-red-600 font-bold">•</span>
                            <span><strong>You can vote only ONCE</strong> - This action is irreversible</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-red-600 font-bold">•</span>
                            <span>Your vote will be <strong>permanently recorded</strong> in the system</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-red-600 font-bold">•</span>
                            <span>You <strong>cannot change or withdraw</strong> your vote after submission</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-red-600 font-bold">•</span>
                            <span>Make sure you have selected the <strong>correct candidate</strong></span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-blue-900">
                          <strong>Selected Candidate:</strong> Rajesh Patel (BJP) - Gandhinagar Constituency
                        </p>
                      </div>
                      
                      <p className="text-gray-700 font-medium">
                        Are you absolutely sure you want to submit this vote?
                      </p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="space-x-2">
                    <AlertDialogCancel>Cancel & Go Back</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleFinalSubmit}
                      disabled={isSubmitting}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {isSubmitting ? "Submitting..." : "Yes, Submit My Vote"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoteConfirmation;
