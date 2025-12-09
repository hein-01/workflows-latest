import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarInset, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { GitBranch, FileText, Settings, HelpCircle, ChevronRight, LogOut, Home as HomeIcon, Workflow, StickyNote, Zap, Smartphone, Code2, Server, Wrench } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import GitReplace from "@/pages/git-replace";
import SalesWorkflows from "@/pages/sales-workflows";
import ReplitToVercel from "@/pages/replit-to-vercel";
import LovablePrompts from "@/pages/lovable-prompts";
import FlutterWebView from "@/pages/flutter-webview";
import Capacitor from "@/pages/capacitor";
import OdooHosting from "@/pages/odoo-hosting";
import OdooCustomization from "@/pages/odoo-customization";
import General from "@/pages/general";
import Auth from "@/pages/auth";
function AppSidebar({
  user
}: {
  user: any;
}) {
  const [location, setLocation] = useLocation();
  const [generalOpen, setGeneralOpen] = useState(false);
  const [techWorkflowsOpen, setTechWorkflowsOpen] = useState(false);
  const { setOpen, isMobile } = useSidebar();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLocation("/auth");
  };
  return <Sidebar className="border-r border-sidebar-border shadow-lg">
      <SidebarHeader className="bg-sidebar-accent/50 border-b border-sidebar-border">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-lg font-bold text-sidebar-foreground animate-gradient">Mizu, Min & GoLar</h2>
          {user && <Button variant="ghost" size="sm" onClick={handleLogout} className="h-8 hover:bg-sidebar-accent transition-colors group">
              <LogOut className="h-4 w-4 text-red-500 group-hover:text-red-600 transition-colors" />
            </Button>}
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar">
        <SidebarMenu className="gap-1 px-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location === "/"} className="group transition-all duration-200 hover:bg-sidebar-accent hover:scale-[1.02] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:shadow-md">
              <Link href="/" onClick={() => isMobile && setOpen(false)}>
                <HomeIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-600 transition-colors" />
                <span className="font-medium group-hover:text-blue-600 transition-colors">Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location === "/git-replace"} className="group transition-all duration-200 hover:bg-sidebar-accent hover:scale-[1.02] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:shadow-md">
              <Link href="/git-replace" onClick={() => isMobile && setOpen(false)}>
                <GitBranch className="h-5 w-5 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
                <span className="font-medium group-hover:text-emerald-600 transition-colors">Git Replace Command</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location === "/sales-workflows"} className="group transition-all duration-200 hover:bg-sidebar-accent hover:scale-[1.02] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:shadow-md">
              <Link href="/sales-workflows" onClick={() => isMobile && setOpen(false)}>
                <Workflow className="h-5 w-5 text-purple-500 group-hover:text-purple-600 transition-colors" />
                <span className="font-medium group-hover:text-purple-600 transition-colors">Sales Workflows</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setGeneralOpen(!generalOpen)} isActive={location === "/general"} className="group transition-all duration-200 hover:bg-sidebar-accent hover:scale-[1.02] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:shadow-md">
              <StickyNote className="h-5 w-5 text-amber-500 group-hover:text-amber-600 transition-colors" />
              <span className="font-medium group-hover:text-amber-600 transition-colors">General</span>
              <ChevronRight className={`ml-auto transition-transform duration-200 text-amber-500 ${generalOpen ? 'rotate-90' : ''}`} />
            </SidebarMenuButton>
            {generalOpen && <SidebarMenuSub className="ml-4 mt-1 space-y-1 border-l-2 border-sidebar-border pl-2">
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={location === "/general"} className="transition-all duration-200 hover:bg-sidebar-accent/70 data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-medium data-[active=true]:rounded-md">
                    <Link href="/general" onClick={() => isMobile && setOpen(false)}>
                      <span className="text-sm">Notes</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setTechWorkflowsOpen(!techWorkflowsOpen)} isActive={location === "/replit-to-vercel" || location === "/lovable-prompts" || location === "/flutter-webview" || location === "/capacitor" || location === "/odoo-hosting" || location === "/odoo-customization"} className="group transition-all duration-200 hover:bg-sidebar-accent hover:scale-[1.02] data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:shadow-md">
              <Settings className="h-5 w-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
              <span className="font-medium group-hover:text-indigo-600 transition-colors">Tech Workflows</span>
              <ChevronRight className={`ml-auto transition-transform duration-200 text-indigo-500 ${techWorkflowsOpen ? 'rotate-90' : ''}`} />
            </SidebarMenuButton>
            {techWorkflowsOpen && <SidebarMenuSub className="ml-4 mt-1 space-y-1 border-l-2 border-sidebar-border pl-2">
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={location === "/lovable-prompts"} className="group transition-all duration-200 hover:bg-sidebar-accent/70 data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-medium data-[active=true]:rounded-md">
                    <Link href="/lovable-prompts" onClick={() => isMobile && setOpen(false)}>
                      <Zap className="h-4 w-4 text-yellow-500 group-hover:text-yellow-600 transition-colors" />
                      <span className="text-sm group-hover:text-yellow-600 transition-colors">Prompts</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={location === "/flutter-webview"} className="group transition-all duration-200 hover:bg-sidebar-accent/70 data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-medium data-[active=true]:rounded-md">
                    <Link href="/flutter-webview" onClick={() => isMobile && setOpen(false)}>
                      <Smartphone className="h-4 w-4 text-sky-500 group-hover:text-sky-600 transition-colors" />
                      <span className="text-sm group-hover:text-sky-600 transition-colors">Flutter Web View App</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={location === "/capacitor"} className="group transition-all duration-200 hover:bg-sidebar-accent/70 data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-medium data-[active=true]:rounded-md">
                    <Link href="/capacitor" onClick={() => isMobile && setOpen(false)}>
                      <Smartphone className="h-4 w-4 text-cyan-500 group-hover:text-cyan-600 transition-colors" />
                      <span className="text-sm group-hover:text-cyan-600 transition-colors">Capacitor</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={location === "/odoo-hosting"} className="group transition-all duration-200 hover:bg-sidebar-accent/70 data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-medium data-[active=true]:rounded-md">
                    <Link href="/odoo-hosting" onClick={() => isMobile && setOpen(false)}>
                      <Server className="h-4 w-4 text-rose-500 group-hover:text-rose-600 transition-colors" />
                      <span className="text-sm group-hover:text-rose-600 transition-colors">Odoo Hosting</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={location === "/odoo-customization"} className="group transition-all duration-200 hover:bg-sidebar-accent/70 data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-medium data-[active=true]:rounded-md">
                    <Link href="/odoo-customization" onClick={() => isMobile && setOpen(false)}>
                      <Wrench className="h-4 w-4 text-orange-500 group-hover:text-orange-600 transition-colors" />
                      <span className="text-sm group-hover:text-orange-600 transition-colors">Odoo Customization</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild isActive={location === "/replit-to-vercel"} className="group transition-all duration-200 hover:bg-sidebar-accent/70 data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-medium data-[active=true]:rounded-md">
                    <Link href="/replit-to-vercel" onClick={() => isMobile && setOpen(false)}>
                      <Code2 className="h-4 w-4 text-teal-500 group-hover:text-teal-600 transition-colors" />
                      <span className="text-sm group-hover:text-teal-600 transition-colors">Replit Made to Vercel Ready</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="group transition-all duration-200 hover:bg-sidebar-accent hover:scale-[1.02]">
              <HelpCircle className="h-5 w-5 text-pink-500 group-hover:text-pink-600 transition-colors" />
              <span className="font-medium group-hover:text-pink-600 transition-colors">Add-hocs Workflows</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>;
}
function ProtectedRoute({
  component: Component
}: {
  component: any;
}) {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then((res: any) => {
      const session = res?.data?.session;
      setUser(session?.user ?? null);
      if (!session) {
        setLocation("/auth");
      }
      setLoading(false);
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        setLocation("/auth");
      }
    });
    return () => subscription.unsubscribe();
  }, [setLocation]);
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>;
  }
  return user ? <Component /> : null;
}
function Router() {
  return <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/">
        {() => <ProtectedRoute component={Home} />}
      </Route>
      <Route path="/git-replace">
        {() => <ProtectedRoute component={GitReplace} />}
      </Route>
      <Route path="/sales-workflows">
        {() => <ProtectedRoute component={SalesWorkflows} />}
      </Route>
      <Route path="/replit-to-vercel">
        {() => <ProtectedRoute component={ReplitToVercel} />}
      </Route>
      <Route path="/general">
        {() => <ProtectedRoute component={General} />}
      </Route>
      <Route path="/lovable-prompts">
        {() => <ProtectedRoute component={LovablePrompts} />}
      </Route>
      <Route path="/flutter-webview">
        {() => <ProtectedRoute component={FlutterWebView} />}
      </Route>
      <Route path="/capacitor">
        {() => <ProtectedRoute component={Capacitor} />}
      </Route>
      <Route path="/odoo-hosting">
        {() => <ProtectedRoute component={OdooHosting} />}
      </Route>
      <Route path="/odoo-customization">
        {() => <ProtectedRoute component={OdooCustomization} />}
      </Route>
      <Route component={NotFound} />
    </Switch>;
}

// Main App Component
function App() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    supabase.auth.getSession().then((res: any) => {
      const session = res?.data?.session;
      setUser(session?.user ?? null);
    });
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);
  return <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar user={user} />
            <div className="flex-1 flex flex-col w-full">
              <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden">
                <SidebarTrigger />
                <span className="font-semibold animate-gradient">Mizu, Min & GoLar</span>
              </header>
              <main className="flex-1 w-full">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>;
}
export default App;