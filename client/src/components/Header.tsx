/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

import * as React from "react";
import { Link } from "react-router";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";

/**
 * Custom modules & Hooks
 */
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

/**
 * Components
 */
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ButterflyLogo from "@/components/ButterflyLogo"; // Fixed import
import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserMenu } from "@/components/UserMenu";

export const Header = ({
  className,
  ...props
}: React.ComponentProps<"header">) => {
  const user = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "border-b fixed top-0 left-0 w-full h-16 flex items-center bg-background z-40",
        className
      )}
      {...props}
    >
      <div className="container flex items-center justify-between w-full">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="group-hover:scale-110 transition-transform duration-300">
            <ButterflyLogo size="md" />
          </div>
          <span className="font-display text-xl font-bold text-foreground hidden sm:block tracking-tight">
            Bearbubbles
          </span>
        </Link>

        {/* Navigation Wrapper */}
        <div
          className={cn(
            "grow max-md:absolute max-md:top-16 max-md:left-0 max-md:bg-background max-md:w-full max-md:border-b md:flex md:justify-between md:items-center transition-all",
            !mobileMenuOpen && "max-md:hidden"
          )}
        >
          <Navbar className="max-md:p-4 md:ms-8" />

          {/* Guest Actions */}
          {!user && (
            <div className="flex flex-col-reverse gap-y-3 gap-x-2 md:flex-row md:items-center max-md:p-4">
              <Separator className="md:hidden mb-2" />
              <Button variant="outline" asChild className="w-full md:w-auto">
                <Link to="/login">Login</Link>
              </Button>

              <Button asChild className="w-full md:w-auto">
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 ms-auto">
          <ThemeToggle />
          
          {user && <UserMenu />}

          {/* Mobile Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden"
          >
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </Button>
        </div>
      </div>
    </header>
  );
};