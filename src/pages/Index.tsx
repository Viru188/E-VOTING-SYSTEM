
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Users, MapPin, Smartphone } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const Index = () => {
  const [loginType, setLoginType] = useState<"voter" | "admin">("voter");
  const [voterID, setVoterID] = useState("");
  const [password, setPassword] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [voterLocation, setVoterLocation] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleVoterLogin = () => {
    if (voterID && password) {
      setShowOTP(true);
      // Simulate location detection
      setTimeout(() => {
        setVoterLocation("Gandhinagar, Gujarat");
      }, 1000);
    }
  };

  const handleOTPVerification = () => {
    if (otp.length === 6) {
      navigate("/voter-dashboard");
    }
  };

  const handleAdminLogin = () => {
    if (adminUsername && adminPassword) {
      navigate("/admin-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex flex-col items-center justify-center p-4">
      {/* Government Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-green-600 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-900">ગુજરાત ઈ-વોટિંગ સિસ્ટમ</h1>
            <p className="text-lg text-gray-700">Gujarat E-Voting System</p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-2">
          <Shield className="w-4 h-4 text-green-600" />
          <span>Verified by DigiLocker</span>
          <span>•</span>
          <CheckCircle className="w-4 h-4 text-blue-600" />
          <span>Government of Gujarat</span>
          <span>•</span>
          <Users className="w-4 h-4 text-orange-600" />
          <span>Election Commission of India</span>
        </div>
        <Badge className="bg-green-600">Secure • Transparent • Democratic</Badge>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md border-2 border-orange-200">
        <CardHeader className="text-center bg-gradient-to-r from-orange-100 to-green-100">
          <CardTitle className="text-orange-800">સુરક્ષિત લોગિન પોર્ટલ</CardTitle>
          <CardDescription>Choose your access level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {!showOTP ? (
            <>
              {/* Login Type Selection */}
              <div className="flex space-x-2">
                <Button
                  variant={loginType === "voter" ? "default" : "outline"}
                  className={loginType === "voter" ? "flex-1 bg-orange-600 hover:bg-orange-700" : "flex-1"}
                  onClick={() => setLoginType("voter")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  મતદાર (Voter)
                </Button>
                <Button
                  variant={loginType === "admin" ? "default" : "outline"}
                  className={loginType === "admin" ? "flex-1 bg-green-600 hover:bg-green-700" : "flex-1"}
                  onClick={() => setLoginType("admin")}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  વહીવટદાર (Admin)
                </Button>
              </div>

              {/* Voter Login Form */}
              {loginType === "voter" && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="voterID" className="block text-sm font-medium text-gray-700 mb-1">
                      મતદાર આઈડી (Voter ID)
                    </label>
                    <Input
                      id="voterID"
                      type="text"
                      placeholder="GJ1234567890"
                      value={voterID}
                      onChange={(e) => setVoterID(e.target.value)}
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      પાસવર્ડ (Password)
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                  <Button onClick={handleVoterLogin} className="w-full bg-orange-600 hover:bg-orange-700">
                    <Smartphone className="w-4 h-4 mr-2" />
                    OTP મોકલો (Send OTP)
                  </Button>
                </div>
              )}

              {/* Admin Login Form */}
              {loginType === "admin" && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="adminUsername" className="block text-sm font-medium text-gray-700 mb-1">
                      વહીવટદાર યુઝરનેમ (Admin Username)
                    </label>
                    <Input
                      id="adminUsername"
                      type="text"
                      placeholder="admin"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      વહીવટદાર પાસવર્ડ (Admin Password)
                    </label>
                    <Input
                      id="adminPassword"
                      type="password"
                      placeholder="••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                  <Button onClick={handleAdminLogin} className="w-full bg-green-600 hover:bg-green-700">
                    <Shield className="w-4 h-4 mr-2" />
                    વહીવટદાર પ્રવેશ (Admin Access)
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* OTP Verification */
            <div className="space-y-4 text-center">
              <div className="space-y-2">
                <Smartphone className="w-12 h-12 text-orange-600 mx-auto" />
                <h3 className="text-lg font-semibold">OTP ચકાસણી (OTP Verification)</h3>
                <p className="text-sm text-gray-600">
                  Your registered mobile number પર OTP મોકલવામાં આવ્યો છે
                </p>
                {voterLocation && (
                  <div className="flex items-center justify-center space-x-2 text-sm text-green-600 bg-green-50 p-2 rounded">
                    <MapPin className="w-4 h-4" />
                    <span>Location detected: {voterLocation}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    6-અંકનો OTP દાખલ કરો (Enter 6-digit OTP)
                  </label>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                
                <Button 
                  onClick={handleOTPVerification} 
                  disabled={otp.length !== 6}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  OTP ચકાસો (Verify OTP)
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowOTP(false)}
                  className="w-full"
                >
                  પાછા જાઓ (Go Back)
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Government Footer */}
      <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-orange-600" />
          <span>DigiLocker Verified</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>ECI Approved</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-600" />
          <span>Secure & Anonymous</span>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-4 text-center max-w-md">
        આ સરકારી વેબસાઇટ છે અને તે ગુજરાત સરકાર દ્વારા સંચાલિત છે। 
        This is a government website managed by Government of Gujarat.
      </p>
    </div>
  );
};

export default Index;
