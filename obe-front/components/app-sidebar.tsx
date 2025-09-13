"use client";

import {
  Home,
  ClipboardList,
  WalletCards,
  Map,
  BookOpen,
  Database,
  ChevronDown,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <div className="mt-4">
      <Sidebar>
        {/* Logo / Gambar */}
        <div className="flex justify-center p-4">
          <Image
            src="/main.png"
            alt="Logo"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>

        <SidebarContent>
          {/* Dashboard */}
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      className={
                        isActive
                          ? "bg-blue-500 text-white"
                          : "hover:bg-blue-100"
                      }
                    >
                      <Link href={item.url} className="flex items-center gap-2">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>

          {/* Feature */}
          <SidebarGroup>
            <SidebarGroupLabel>Feature</SidebarGroupLabel>
            <SidebarMenu>
              {features.map((feature) => {
                const isGroupActive = feature.children?.some((sub) =>
                  pathname.startsWith(sub.url)
                );
                const isSingleActive = feature.url === pathname;

                return (
                  <Collapsible
                    key={feature.title}
                    className="group/collapsible"
                    defaultOpen={isGroupActive}
                  >
                    <SidebarMenuItem>
                      {/* Trigger / main sidebar item */}
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={
                            isGroupActive || isSingleActive
                              ? "bg-blue-500 text-white"
                              : "hover:bg-blue-100"
                          }
                        >
                          {feature.icon && (
                            <feature.icon className="mr-2 h-4 w-4" />
                          )}
                          <span className="flex-1">{feature.title}</span>
                          {feature.children && (
                            <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      {/* Submenu */}
                      {feature.children && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {feature.children.map((sub) => {
                              const isActive = pathname === sub.url;
                              return (
                                <SidebarMenuItem key={sub.url}>
                                  <SidebarMenuButton
                                    asChild
                                    className={
                                      isActive
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-blue-100"
                                    }
                                  >
                                    <Link href={sub.url}>{sub.title}</Link>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
export default AppSidebar;
