import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Users,
  Settings,
  BarChart3,
  Receipt,
  UserPlus,
  Percent,
  Calculator,
  Sliders,
  FileText,
  Contact,
  Package,
  Building,
  DollarSign,
  FileBarChart,
  Bell,
  Filter,
  Plus,
  Search,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/",
  },
  {
    title: "Third Party",
    icon: Users,
    isActive: true,
    items: [
      {
        title: "Configuration",
        icon: Settings,
        isActive: true,
        items: [
          {
            title: "Sales",
            icon: BarChart3,
            items: [
              { title: "Sales", icon: BarChart3 },
              { title: "Receipt", icon: Receipt },
              { title: "Debtor", icon: UserPlus },
              { title: "Discount", icon: Percent, isActive: true },
              { title: "Taxation", icon: Calculator },
              { title: "Adjustment", icon: Sliders },
              { title: "Other Charges", icon: FileText },
              { title: "Cust./Contact(Due)", icon: Contact },
              { title: "Cust./Contact(Other)", icon: Contact },
              { title: "Payment Mode", icon: DollarSign },
              { title: "Voucher Type", icon: FileBarChart },
              { title: "Stock Item", icon: Package },
              { title: "Cost Center", icon: Building },
              { title: "Common Setting", icon: Settings },
              { title: "Godown", icon: Package },
            ],
          },
          {
            title: "Sales Ledger",
            icon: FileBarChart,
          },
        ],
      },
    ],
  },
];

const discountData = [
  {
    id: 1,
    ledger: "Discount",
    ledgerType: "",
    message: "",
  },
  {
    id: 2,
    ledger: "Discount(Special)",
    ledgerType: "",
    message: "",
  },
  {
    id: 3,
    ledger: "Discount(Settlement)",
    ledgerType: "",
    message: "",
  },
];

function AppSidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "Third Party",
    "Configuration",
    "Sales",
  ]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title],
    );
  };

  const renderMenuItem = (item: any, level = 0) => {
    const hasSubItems = item.items && item.items.length > 0;
    const isExpanded = expandedItems.includes(item.title);

    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton
          isActive={item.isActive}
          className={cn(
            "w-full justify-start",
            level > 0 && "ml-4",
            level > 1 && "ml-8",
            item.isActive && level > 1 && "bg-orange-100 text-orange-600",
          )}
          onClick={() => hasSubItems && toggleExpanded(item.title)}
        >
          {hasSubItems && (
            <div className="ml-auto">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
        </SidebarMenuButton>
        {hasSubItems && isExpanded && (
          <SidebarMenuSub>
            {item.items.map((subItem: any) => (
              <SidebarMenuSubItem key={subItem.title}>
                {renderMenuItem(subItem, level + 1)}
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => renderMenuItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const Index = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [discountFilter, setDiscountFilter] = useState("Discount");

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const toggleAllRows = () => {
    if (selectedRows.length === discountData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(discountData.map((item) => item.id));
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-sm"></div>
                  </div>
                </div>

                {/* Configuration Title */}
                <h1 className="text-xl font-semibold text-gray-900">
                  Configuration
                </h1>

                {/* Tabs */}
                <Tabs defaultValue="sales" className="w-auto">
                  <TabsList className="bg-gray-100">
                    <TabsTrigger
                      value="sales"
                      className="flex items-center space-x-2"
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>Sales</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="purchase"
                      className="flex items-center space-x-2"
                    >
                      <Package className="h-4 w-4" />
                      <span>Purchase</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Right side controls */}
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Toolbar */}
            <div className="bg-white rounded-lg border border-gray-200 mb-6">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Discount Filter */}
                    <Select
                      value={discountFilter}
                      onValueChange={setDiscountFilter}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Discount">Discount</SelectItem>
                        <SelectItem value="Discount(Special)">
                          Discount(Special)
                        </SelectItem>
                        <SelectItem value="Discount(Settlement)">
                          Discount(Settlement)
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      New
                    </Button>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Discount Options */}
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="space-y-2">
                  <div className="px-3 py-2 bg-cyan-400 text-white rounded text-sm font-medium">
                    Discount
                  </div>
                  <div className="px-3 py-1 text-sm text-gray-700">
                    Discount(Special)
                  </div>
                  <div className="px-3 py-1 text-sm text-gray-700">
                    Discount(Settlement)
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedRows.length === discountData.length}
                          onCheckedChange={toggleAllRows}
                        />
                      </TableHead>
                      <TableHead>Ledger</TableHead>
                      <TableHead>Ledger Type</TableHead>
                      <TableHead>Message</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {discountData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(row.id)}
                            onCheckedChange={() => toggleRowSelection(row.id)}
                          />
                        </TableCell>
                        <TableCell>{row.ledger}</TableCell>
                        <TableCell>{row.ledgerType}</TableCell>
                        <TableCell>{row.message}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="10">
                      <SelectTrigger className="w-16 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
