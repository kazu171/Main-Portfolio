import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // If we're at the root, check if we should redirect based on browser language
    if (location === "/") {
      const isJapanese = navigator.language.startsWith("ja");
      setLocation(isJapanese ? "/ja" : "/en");
    }
  }, [location, setLocation]);

  return (
    <Switch>
      <Route path="/en">
        {() => <Home lang="en" />}
      </Route>
      <Route path="/ja">
        {() => <Home lang="ja" />}
      </Route>
      <Route path="/" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
