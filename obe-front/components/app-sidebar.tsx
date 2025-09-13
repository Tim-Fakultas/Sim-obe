import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ClipboardList,
  WalletCards,
  Map,
  BookOpen,
  Database,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { ChevronDown } from "lucide-react";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
];

const features = [
  {
    title: "Curriculums",
    icon: ClipboardList,
    children: [
      { title: "Visi Misi", url: "/curriculum/visimisi" },
      { title: "Profil Lulusan", url: "/curriculum/profil" },
      { title: "Bahan Kajian", url: "/curriculum/bahankajian" },
      { title: "CPL Prodi", url: "/curriculum/cplprodi" },
      { title: "CPL SNDIKTI", url: "/curriculum/cplsndikti" },
      { title: "CPMK", url: "/curriculum/cpmk" },
      { title: "Sub CPMK", url: "/curriculum/subcpmk" },
      { title: "Mata Kuliah", url: "/curriculum/mk" },
      { title: "KRS", url: "/curriculum/krs" },
    ],
  },

  {
    title: "Relations",
    icon: WalletCards,
    children: [
      { title: "CPL-BK", url: "/relations/cpl-bk" },
      { title: "CPL-PL", url: "/relations/cpl-pl" },
      { title: "CPL-MK", url: "/relations/cpl-mk" },
      { title: "CPMK-BK", url: "/relations/cpmk-mk" },
    ],
  },

  {
    title: "Curriculum Mapping",
    url: "/mapping/curriculum",
    icon: Map,
  },
  {
    title: "Assessment",
    icon: BookOpen,
    children: [
      { title: "Student Assessment", url: "/assessment" },
      { title: "Student Achivement", url: "/student" },
    ],
  },

  {
    title: "Master",
    icon: Database,
    children: [
      { title: "User", url: "/master/user" },
      { title: "Role", url: "/master/role" },
      { title: "Permission", url: "/master/permission" },
      { title: "Program Studi", url: "/master/programstudi" },
      { title: "Instrumen Nilai", url: "/master/instrumennilai" },
    ],
  },
];

export function AppSidebar() {
  return (
    <div className="mt-4">
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item, i) => (
              <SidebarMenuItem>
                <SidebarMenuButton>
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  <Link href={item.url}>{item.title}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Feature */}
        <SidebarGroup>
          <SidebarGroupLabel>Feature</SidebarGroupLabel>
          <SidebarMenu>
            {features.map((feature, i) => (
              <Collapsible key={i} className="group/collapsible">
                <SidebarMenuItem>
                  {/* Trigger / main sidebar item */}
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {feature.icon && (
                        <feature.icon className="mr-2 h-4 w-4" />
                      )}
                      <span className="flex-1">{feature.title}</span>
                      {feature.children && (
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180"></ChevronDown>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  {feature.children && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {feature.children.map((sub, j) => (
                          <SidebarMenuItem key={j}>
                            <SidebarMenuButton asChild>
                              <Link href={sub.url}>{sub.title}</Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </div>
  );
}
