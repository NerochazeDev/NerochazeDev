import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AdminPage from "@/pages/admin";
import BlogPage from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import ProjectDetail from "@/pages/project-detail";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/contexts/theme-context";

function Router() {
  const [location] = useLocation();
  const isAdminPage = location === "/Hello10122"; // Changed from "/admin"
  
  return (
    <>
      {!isAdminPage && <Header />}
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/project/:id" component={ProjectDetail} />
        <Route path="/Hello10122" component={AdminPage} /> {/* Changed from "/admin" */}
        <Route path="/admin" component={NotFound} /> {/* Redirect old admin path to 404 */}
        <Route component={NotFound} />
      </Switch>
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">
                <Router />
              </main>
            </div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
