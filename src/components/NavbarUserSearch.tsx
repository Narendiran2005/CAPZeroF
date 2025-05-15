
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const NavbarUserSearch = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/search">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" title="Find users">
              <Search className="h-4 w-4" />
              <span className="sr-only">User search</span>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Find users</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavbarUserSearch;
