import { useState } from "react";
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
            isActive: true,
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

const discountData = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  ledger: "",
  ledgerType: "",
  message: "",
}));

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
      <div key={item.title} className="w-full">
        <button
          className={cn(
            "w-full flex items-center justify-start text-left h-8 px-2 py-1 text-sm hover:bg-gray-100 rounded",
            level === 0 && "text-gray-700 font-normal",
            level === 1 && "ml-4 text-gray-600",
            level === 2 && "ml-8 text-gray-600",
            level === 3 && "ml-12 text-gray-600 pl-2",
            item.isActive && level === 0 && "bg-orange-100 text-orange-600",
            item.isActive &&
              level === 3 &&
              "bg-orange-100 text-orange-600 font-medium",
          )}
          onClick={() => hasSubItems && toggleExpanded(item.title)}
        >
          <item.icon className="h-4 w-4 flex-shrink-0 mr-2" />
          <span className="flex-1 text-left">{item.title}</span>
          {hasSubItems && (
            <div className="ml-auto flex-shrink-0">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
        </button>
        {hasSubItems && isExpanded && (
          <div className="w-full">
            {item.items.map((subItem: any) =>
              renderMenuItem(subItem, level + 1),
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0 h-full">
      <div className="p-2 space-y-1">
        {menuItems.map((item) => renderMenuItem(item))}
      </div>
    </div>
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
    <div className="flex h-screen w-full bg-gray-100">
      <AppSidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 via-red-400 to-blue-500 rounded-lg flex items-center justify-center relative">
                  <div className="w-5 h-5 bg-white rounded transform rotate-45"></div>
                  <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-300 rounded"></div>
                </div>
              </div>

              {/* Configuration Title */}
              <h1 className="text-xl font-semibold text-gray-900">
                Configuration
              </h1>

              {/* Tabs */}
              <Tabs defaultValue="sales" className="w-auto">
                <TabsList className="bg-gray-100 h-9">
                  <TabsTrigger
                    value="sales"
                    className="flex items-center space-x-2 text-sm"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Sales</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="purchase"
                    className="flex items-center space-x-2 text-sm"
                  >
                    <Package className="h-4 w-4" />
                    <span>Purchase</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-hidden">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
            {/* Toolbar */}
            <div className="px-4 py-3 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Discount Filter */}
                  <Select
                    value={discountFilter}
                    onValueChange={setDiscountFilter}
                  >
                    <SelectTrigger className="w-36 h-9">
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
                      className="pl-10 w-64 h-9"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white h-9 px-4">
                    <Plus className="h-4 w-4 mr-2" />
                    New
                  </Button>
                  <Button variant="outline" className="h-9 px-4">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-red-400"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Discount Options Panel */}
              <div className="w-64 border-r border-gray-200 bg-gray-50 flex-shrink-0">
                <div className="p-4">
                  <div className="space-y-1">
                    <div className="px-3 py-2 bg-cyan-400 text-white rounded text-sm font-medium">
                      Discount
                    </div>
                    <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                      Discount(Special)
                    </div>
                    <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                      Discount(Settlement)
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Container */}
              <div className="flex-1 flex flex-col">
                {/* Table */}
                <div className="flex-1 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-200">
                        <TableHead className="w-12 h-12">
                          <Checkbox
                            checked={
                              selectedRows.length === discountData.length
                            }
                            onCheckedChange={toggleAllRows}
                          />
                        </TableHead>
                        <TableHead className="text-left font-medium text-gray-900">
                          <div className="flex items-center">
                            Ledger
                            <BarChart3 className="ml-1 h-4 w-4 text-gray-400" />
                          </div>
                        </TableHead>
                        <TableHead className="text-left font-medium text-gray-900">
                          Ledger Type
                        </TableHead>
                        <TableHead className="text-left font-medium text-gray-900">
                          Message
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {discountData.map((row) => (
                        <TableRow
                          key={row.id}
                          className="border-b border-gray-100 hover:bg-gray-50 h-12"
                        >
                          <TableCell className="w-12">
                            <Checkbox
                              checked={selectedRows.includes(row.id)}
                              onCheckedChange={() => toggleRowSelection(row.id)}
                            />
                          </TableCell>
                          <TableCell className="text-gray-900">
                            {row.ledger}
                          </TableCell>
                          <TableCell className="text-gray-900">
                            {row.ledgerType}
                          </TableCell>
                          <TableCell className="text-gray-900">
                            {row.message}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Select defaultValue="10">
                        <SelectTrigger className="w-16 h-8 text-sm">
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
                          <PaginationPrevious
                            href="#"
                            className="h-8 px-3 text-sm"
                          />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            isActive
                            className="h-8 w-8 text-sm bg-orange-500 text-white border-orange-500"
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" className="h-8 w-8 text-sm">
                            2
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" className="h-8 w-8 text-sm">
                            3
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            className="h-8 px-3 text-sm"
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
