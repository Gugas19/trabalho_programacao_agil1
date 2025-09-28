import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const PortugalFlag = () => (
    <svg className="w-5 h-4" viewBox="0 0 30 20" fill="none">
      <rect width="12" height="20" fill="#006600"/>
      <rect x="12" width="18" height="20" fill="#FF0000"/>
      <circle cx="12" cy="10" r="4.5" fill="#FFFF00" stroke="#0000FF" strokeWidth="0.5"/>
    </svg>
  );

  const UKFlag = () => (
    <svg className="w-5 h-4" viewBox="0 0 30 20" fill="none">
      <rect width="30" height="20" fill="#012169"/>
      <path d="M0 0L30 20M30 0L0 20" stroke="white" strokeWidth="4"/>
      <path d="M0 0L30 20M30 0L0 20" stroke="#C8102E" strokeWidth="2.5"/>
      <path d="M15 0V20M0 10H30" stroke="white" strokeWidth="6.5"/>
      <path d="M15 0V20M0 10H30" stroke="#C8102E" strokeWidth="4"/>
    </svg>
  );

  const languages = {
    pt: { flag: <PortugalFlag />, label: "Português" },
    en: { flag: <UKFlag />, label: "English" },
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          {languages[language].flag}
          <span className="hidden sm:inline">{languages[language].label}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage("pt")}
          className="gap-2 cursor-pointer"
        >
          <PortugalFlag />
          <span>Português</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className="gap-2 cursor-pointer"
        >
          <UKFlag />
          <span>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;