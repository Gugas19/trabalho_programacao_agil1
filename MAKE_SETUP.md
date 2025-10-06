# Make.com Proposal Generator Setup Guide

This guide will help you set up the Make.com scenario that automatically generates and emails PDF proposals based on website form submissions.

## Overview

The scenario performs the following workflow:
1. Receives form data via webhook
2. Looks up product details and pricing in Google Sheets
3. Calculates subtotals, VAT, and grand total
4. Generates a Google Docs proposal from a template
5. Converts the document to PDF
6. Emails the PDF to the customer
7. Logs errors to a Google Sheets "Logs" tab

---

## Prerequisites

You'll need:
- A Make.com account (free tier works)
- A Google account with access to:
  - Google Sheets
  - Google Docs
  - Google Drive
  - Gmail

---

## Step 1: Prepare Your Google Sheets

### 1.1 Create a new Google Sheet

Create a new Google Sheet with **two tabs**:

#### Tab 1: "Products"
This sheet contains your product catalog with pricing information.

**Columns (A-E):**
| Product | Description | Price | VAT | Currency |
|---------|-------------|-------|-----|----------|
| notion-plus | Notion Plus subscription for small teams (up to 10 users) | 80.00 | 23 | EUR |
| notion-business | Notion Business for growing companies with advanced features | 150.00 | 23 | EUR |
| notion-enterprise | Notion Enterprise with premium security and unlimited users | 500.00 | 23 | EUR |
| consulting | One-time Notion setup and consulting service (8 hours) | 600.00 | 23 | EUR |
| training | Team training and onboarding program (full day) | 800.00 | 0 | EUR |

**Important notes:**
- The **Product** column must match the product IDs used in the React form (`notion-plus`, `notion-business`, etc.)
- **Price** should be numbers only (e.g., `80.00`, not `€80.00`)
- **VAT** is the percentage (e.g., `23` for 23% VAT, `0` for VAT-exempt products)
- **Currency** is typically `EUR` (but the column is kept for flexibility)

#### Tab 2: "Logs"
This sheet will automatically log errors.

**Columns (A-F):**
| Timestamp | WebhookPayloadID | ErrorMessage | ModuleName | CustomerName | CustomerEmail |
|-----------|------------------|--------------|------------|--------------|---------------|
| *(auto)* | *(auto)* | *(auto)* | *(auto)* | *(auto)* | *(auto)* |

Just create the header row - Make.com will populate the data automatically when errors occur.

### 1.2 Note your Spreadsheet ID

In your Google Sheets URL, copy the spreadsheet ID:
```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
```

---

## Step 2: Create Google Docs Template

### 2.1 Create a new Google Doc

Create a new Google Doc that will serve as your proposal template.

### 2.2 Add placeholders

Use **double curly braces** `{{placeholder}}` for values that will be replaced by Make.com:

```
PROPOSAL

Proposal Number: {{proposal_number}}
Date: {{proposal_date}}

TO:
{{customer_name}}
{{company_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}

Dear {{customer_name}},

Thank you for your interest in our Notion solutions. We are pleased to present this customized proposal for {{company_name}}.

PRODUCTS & SERVICES

{{products_table}}

TOTAL: {{grand_total}}

All prices are in {{currency}}.

This proposal is valid for 30 days from the date of issue.

We look forward to working with you!

Best regards,
The Notion Team
```

**Available placeholders:**
- `{{customer_name}}` - Customer's full name
- `{{customer_email}}` - Customer's email address
- `{{company_name}}` - Company name
- `{{customer_phone}}` - Phone number
- `{{proposal_number}}` - Auto-generated proposal number (e.g., `20250106-joh`)
- `{{proposal_date}}` - Current date (DD/MM/YYYY format)
- `{{products_table}}` - Auto-generated product list with pricing
- `{{grand_total}}` - Total amount including VAT
- `{{currency}}` - Currency code (EUR)

### 2.3 Note your Template Document ID

In your Google Docs URL, copy the document ID:
```
https://docs.google.com/document/d/[TEMPLATE_DOC_ID]/edit
```

### 2.4 Create a folder for proposals

Create a folder in Google Drive where generated proposals will be saved. Note the **Folder ID** from the URL:
```
https://drive.google.com/drive/folders/[PROPOSALS_FOLDER_ID]
```

---

## Step 3: Import the Make.com Scenario

### 3.1 Download the blueprint

The blueprint file is: `make-scenario-blueprint.json`

### 3.2 Import into Make.com

1. Go to [Make.com](https://www.make.com)
2. Click **Scenarios** in the left sidebar
3. Click **Create a new scenario** (or the `+` button)
4. Click the three dots menu (⋯) in the bottom left
5. Select **Import Blueprint**
6. Upload `make-scenario-blueprint.json`
7. Click **Save**

---

## Step 4: Configure Connections

After importing, you need to configure all the Google service connections.

### 4.1 Webhook Connection

1. Click on the **Webhook** module (module #1)
2. Click **Create a webhook**
3. Give it a name (e.g., "Proposal Form Webhook")
4. Click **Save**
5. **Copy the webhook URL** - you'll need this for your `.env.local` file

### 4.2 Google Sheets Connection

1. Click on any **Google Sheets** module (modules #2 or #100)
2. Click **Add** next to Connection
3. Sign in with your Google account
4. Grant permissions
5. Save the connection

### 4.3 Google Docs Connection

1. Click on the **Google Docs** module (module #12)
2. Click **Add** next to Connection
3. Sign in with your Google account
4. Grant permissions
5. Save the connection

### 4.4 Google Drive Connection

1. Click on the **Google Drive** module (module #13)
2. Click **Add** next to Connection
3. Sign in with your Google account
4. Grant permissions
5. Save the connection

### 4.5 Gmail Connection

1. Click on the **Gmail** module (module #14)
2. Click **Add** next to Connection
3. Sign in with your Google account
4. Grant permissions
5. In the **account** field, enter **your email address** (e.g., `your-email@gmail.com`)

---

## Step 5: Configure Module Parameters

### 5.1 Google Sheets - Get Values (Module #2)

Click on the module and fill in:
- **Spreadsheet ID**: Paste your spreadsheet ID from Step 1.2
- **Sheet Name**: `Products`
- **Range**: `A:E`

### 5.2 Google Docs - Create from Template (Module #12)

Click on the module and fill in:
- **Choose a Drive**: Select "My Drive"
- **Folder**: Browse and select your proposals folder (from Step 2.4)
- **Template Document ID**: Paste your template doc ID from Step 2.3

### 5.3 Gmail - Send Email (Module #14)

Click on the module and verify:
- **Account**: Your Gmail address (e.g., `your-email@gmail.com`)
- The subject and body are already pre-configured but you can customize them

### 5.4 Error Handler - Add to Logs (Module #100)

Click on the error handler module and fill in:
- **Spreadsheet ID**: Same as Module #2 (your spreadsheet ID)
- **Sheet Name**: `Logs`

---

## Step 6: Update Your React App

### 6.1 Update `.env.local`

Open `/workspaces/trabalho_programacao_agil1/.env.local` and replace the webhook URL:

```bash
VITE_MAKE_WEBHOOK_URL=https://hook.eu1.make.com/your-actual-webhook-url-here
```

Paste the webhook URL you copied in Step 4.1.

### 6.2 Restart your dev server

If your React app is running, restart it to load the new environment variable:

```bash
npm run dev
```

---

## Step 7: Test the Scenario

### 7.1 Activate the scenario

1. In Make.com, click the **ON/OFF toggle** in the bottom left to activate the scenario
2. The scenario will now listen for webhook requests

### 7.2 Test from your website

1. Open your website (e.g., `http://localhost:5173`)
2. Navigate to the proposal form section
3. Fill out the form:
   - Name: Test User
   - Email: your-test-email@example.com
   - Company: Test Company
   - Phone: +351 912 345 678
   - Products: Select one or more products
4. Click **Request Proposal**

### 7.3 Check the results

1. Go back to Make.com and check the scenario execution history
2. Each module should show a green checkmark ✓
3. Check your email inbox (the email you entered in the form)
4. You should receive an email with a PDF proposal attached
5. Check your Google Drive folder - the proposal document should be saved there

### 7.4 Test error handling

To test error logging:
1. Temporarily change a product ID in the form to something that doesn't exist in your Google Sheet
2. Submit the form
3. Check the "Logs" tab in your Google Sheet - it should contain an error entry

---

## Step 8: Customize (Optional)

### 8.1 Customize email template

Edit module #14 (Gmail - Send Email) to change:
- Subject line
- Email body (HTML supported)
- Sender name

### 8.2 Add more products

Simply add new rows to the "Products" sheet in Google Sheets.

**Important:** If you add new product IDs, you must also:
1. Update the `AVAILABLE_PRODUCTS` array in `src/components/ProposalForm.tsx`
2. Add translations for the new products in `src/contexts/LanguageContext.tsx`

### 8.3 Change VAT rates

Edit the VAT column in the "Products" sheet. You can have different VAT rates per product.

### 8.4 Customize the proposal template

Edit your Google Docs template to change:
- Logo (insert an image)
- Company information
- Terms and conditions
- Styling and formatting

---

## Troubleshooting

### Issue: Webhook not receiving data

**Solution:**
- Check that the scenario is **activated** (ON/OFF toggle)
- Verify the webhook URL in `.env.local` matches the one in Make.com
- Check browser console for network errors
- Ensure CORS is not blocking the request

### Issue: Products not found

**Solution:**
- Verify product IDs in Google Sheets **exactly match** the IDs in the React form
- Check for extra spaces or typos
- Product IDs are case-sensitive

### Issue: VAT calculation wrong

**Solution:**
- Ensure VAT column contains numbers only (e.g., `23`, not `23%`)
- Check that VAT-exempt products have `0` (not blank)

### Issue: PDF not generated

**Solution:**
- Check that Google Docs template has correct placeholder syntax: `{{placeholder}}`
- Verify template document ID is correct
- Ensure Google Docs connection has proper permissions

### Issue: Email not sent

**Solution:**
- Verify Gmail connection is active
- Check spam folder
- Ensure the email address in module #14 is correct
- Check Gmail sending limits (Gmail free has daily limits)

### Issue: Errors not logged

**Solution:**
- Verify "Logs" sheet exists and has the correct header row
- Check the spreadsheet ID in module #100
- Ensure Google Sheets connection has write permissions

---

## Advanced Configuration

### Multiple currencies

To support multiple currencies:
1. Add currency-specific products to Google Sheets
2. Update the template to handle currency conversion
3. Add a currency selector to the React form

### Discount codes

To add discount functionality:
1. Create a "Discounts" sheet in Google Sheets
2. Add a discount code field to the form
3. Add a lookup module in Make.com to check discount validity
4. Apply discount to grand total calculation

### BCC copy

To send a copy of each proposal to your team:
1. Edit module #14 (Gmail)
2. Add a `bcc` field
3. Enter your team email address

---

## Security Notes

- Never commit `.env.local` to version control (already in `.gitignore`)
- Keep your webhook URL private - anyone with it can trigger the scenario
- Regularly review the "Logs" sheet for suspicious activity
- Consider adding rate limiting in Make.com (available in paid plans)
- Use Make.com's IP whitelist feature if your site has a static IP

---

## Make.com Limits

### Free Plan
- 1,000 operations per month
- 15 minutes execution time per scenario
- 2 active scenarios

### Paid Plans
For production use, consider upgrading to access:
- More operations
- Longer execution times
- Priority support
- Error retry mechanisms

---

## Support

If you encounter issues:
1. Check Make.com execution history for detailed error messages
2. Review the "Logs" sheet in Google Sheets
3. Check browser console for frontend errors
4. Consult [Make.com documentation](https://www.make.com/en/help)

---

## Architecture Diagram

```
┌─────────────────┐
│   React Form    │
│  (Website)      │
└────────┬────────┘
         │ POST
         ▼
┌─────────────────┐
│  Make.com       │
│  Webhook        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│ Google Sheets   │◄─────┤   Iterator       │
│ (Products)      │      │   (Loop over     │
└────────┬────────┘      │    products)     │
         │               └──────────────────┘
         │ Lookup prices
         ▼
┌─────────────────┐
│  Calculate      │
│  VAT & Totals   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Aggregator     │
│  (Sum totals)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Google Docs    │
│  (Generate      │
│   from template)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Google Drive   │
│  (Export to PDF)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Gmail       │
│  (Send to       │
│   customer)     │
└─────────────────┘

        │ (on error)
        ▼
┌─────────────────┐
│ Google Sheets   │
│ (Logs tab)      │
└─────────────────┘
```

---

## Next Steps

Once everything is working:
1. Customize the email template with your branding
2. Add more products to your catalog
3. Create multiple proposal templates for different use cases
4. Set up Google Analytics to track form submissions
5. Consider adding a CRM integration (HubSpot, Salesforce, etc.)

Good luck! 🚀
