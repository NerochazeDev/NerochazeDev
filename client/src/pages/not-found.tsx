import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function NotFound() {
  const [_, navigate] = useLocation();

  return (
    <>
      <Helmet>
        <title>404 Page Not Found | Nerochaze Portfolio</title>
        <meta name="description" content="The page you are looking for does not exist. Navigate back to the home page." />
        <meta name="robots" content="noindex, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="404 Page Not Found | Nerochaze Portfolio" />
        <meta property="og:description" content="The page you are looking for does not exist. Navigate back to the home page." />
        <meta property="og:url" content="https://nerochaze.replit.app/404" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="404 Page Not Found | Nerochaze Portfolio" />
        <meta name="twitter:description" content="The page you are looking for does not exist. Navigate back to the home page." />
      </Helmet>

      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 text-white">
        <Card className="w-full max-w-md mx-4 bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-white">404 Page Not Found</h1>
            </div>

            <p className="mt-4 text-gray-300 mb-6">
              The page you are looking for doesn't exist or has been moved.
            </p>
            
            <Button 
              className="w-full bg-cyan-500 hover:bg-cyan-600"
              onClick={() => navigate("/")}
            >
              Return to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
