
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Users } from "lucide-react";

const Index = () => {
  const [loginType, setLoginType] = useState<"voter" | "admin">("voter");
  const [voterID, setVoterID] = useState("");
  const [password, setPassword] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();

  const handleVoterLogin = () => {
    // Demo: accept any ID + password
    if (voterID && password) {
      navigate("/voter-dashboard");
    }
  };

  const handleAdminLogin = () => {
    // Demo: accept admin credentials
    if (adminUsername && adminPassword) {
      navigate("/admin-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">E-Voting System</h1>
        <p className="text-gray-600">Secure • Transparent • Democratic</p>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Login Portal</CardTitle>
          <CardDescription>Choose your access level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Login Type Selection */}
          <div className="flex space-x-2">
            <Button
              variant={loginType === "voter" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setLoginType("voter")}
            >
              <Users className="w-4 h-4 mr-2" />
              Voter
            </Button>
            <Button
              variant={loginType === "admin" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setLoginType("admin")}
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </div>

          {/* Voter Login Form */}
          {loginType === "voter" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="voterID" className="block text-sm font-medium text-gray-700 mb-1">
                  Voter ID
                </label>
                <Input
                  id="voterID"
                  type="text"
                  placeholder="Enter your voter ID"
                  value={voterID}
                  onChange={(e) => setVoterID(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button onClick={handleVoterLogin} className="w-full bg-blue-600 hover:bg-blue-700">
                <Users className="w-4 h-4 mr-2" />
                Voter Login
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Demo: Any ID + Any Password
              </p>
            </div>
          )}

          {/* Admin Login Form */}
          {loginType === "admin" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="adminUsername" className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Username
                </label>
                <Input
                  id="adminUsername"
                  type="text"
                  placeholder="admin"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Password
                </label>
                <Input
                  id="adminPassword"
                  type="password"
                  placeholder="••••••"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
              </div>
              <Button onClick={handleAdminLogin} className="w-full bg-red-600 hover:bg-red-700">
                <Shield className="w-4 h-4 mr-2" />
                Admin Access
              </Button>
              <p className="text-sm text-gray-500 text-center">
                Demo: admin + admin123
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Features */}
      <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <span>Secure</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span>Verified</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-purple-600" />
          <span>Anonymous</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
