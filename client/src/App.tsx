import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import WhatIDo from "@/pages/what-i-do";
import Cases from "@/pages/cases";
import Process from "@/pages/process";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
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
      {/* English Routes */}
      <Route path="/en">
        {() => <Home lang="en" />}
      </Route>
      <Route path="/en/what-i-do">
        {() => <WhatIDo lang="en" />}
      </Route>
      <Route path="/en/cases">
        {() => <Cases lang="en" />}
      </Route>
      <Route path="/en/process">
        {() => <Process lang="en" />}
      </Route>
      <Route path="/en/about">
        {() => <About lang="en" />}
      </Route>
      <Route path="/en/contact">
        {() => <Contact lang="en" />}
      </Route>
      <Route path="/en/privacy">
        {() => <Privacy lang="en" />}
      </Route>

      {/* Japanese Routes */}
      <Route path="/ja">
        {() => <Home lang="ja" />}
      </Route>
      <Route path="/ja/what-i-do">
        {() => <WhatIDo lang="ja" />}
      </Route>
      <Route path="/ja/cases">
        {() => <Cases lang="ja" />}
      </Route>
      <Route path="/ja/process">
        {() => <Process lang="ja" />}
      </Route>
      <Route path="/ja/about">
        {() => <About lang="ja" />}
      </Route>
      <Route path="/ja/contact">
        {() => <Contact lang="ja" />}
      </Route>
      <Route path="/ja/privacy">
        {() => <Privacy lang="ja" />}
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
