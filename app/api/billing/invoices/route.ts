import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real implementation, you would fetch invoices from Stripe API
    // For now, return mock invoice data
    const mockInvoices = [
      {
        id: "in_1234567890",
        number: "INV-001",
        created: Math.floor(Date.now() / 1000) - 86400 * 30, // 30 days ago
        amount_paid: 9900, // $99.00 in cents
        status: "paid",
        invoice_pdf: "https://example.com/invoice.pdf",
      },
      {
        id: "in_0987654321",
        number: "INV-002",
        created: Math.floor(Date.now() / 1000) - 86400 * 60, // 60 days ago
        amount_paid: 9900, // $99.00 in cents
        status: "paid",
        invoice_pdf: "https://example.com/invoice.pdf",
      },
    ]

    return NextResponse.json({ invoices: mockInvoices })
  } catch (error) {
    console.error("Invoices API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
