# Make.com Setup - Manual Step-by-Step Guide

**⚠️ NOTA IMPORTANTE:** Este guia ensina como construir o cenário **manualmente** no Make.com, módulo por módulo. Este método é mais confiável do que importar o blueprint JSON, pois o Make.com tem algumas limitações com blueprints complexos.

---

## Preparação Inicial

### 1. Criar Google Sheet

Crie um novo Google Sheet com **2 tabs**:

**Tab 1: "Products"**
```
A              | B                                  | C      | D   | E
Product        | Description                        | Price  | VAT | Currency
notion-plus    | Notion Plus for small teams        | 80     | 23  | EUR
notion-business| Notion Business for companies      | 150    | 23  | EUR
notion-enterprise| Notion Enterprise premium        | 500    | 23  | EUR
consulting     | Notion consulting service          | 600    | 23  | EUR
training       | Team training program              | 800    | 0   | EUR
```

**Tab 2: "Logs"**
```
A          | B                | C            | D          | E            | F
Timestamp  | WebhookPayloadID | ErrorMessage | ModuleName | CustomerName | CustomerEmail
```

**Guarde o Spreadsheet ID** (da URL do Google Sheets)

### 2. Criar Google Docs Template

Crie um novo Google Doc com este conteúdo:

```
═══════════════════════════════════════════════════
                    PROPOSTA COMERCIAL
═══════════════════════════════════════════════════

Proposta Nº: {{proposal_number}}
Data: {{proposal_date}}

CLIENTE
────────────────────────────────────────────────────
Nome: {{customer_name}}
Empresa: {{company_name}}
Email: {{customer_email}}
Telefone: {{customer_phone}}

────────────────────────────────────────────────────

Exmo(a). Sr(a). {{customer_name}},

Agradecemos o seu interesse nas nossas soluções Notion.
Apresentamos a proposta personalizada para {{company_name}}.

PRODUTOS E SERVIÇOS
────────────────────────────────────────────────────

{{products_table}}

────────────────────────────────────────────────────
TOTAL (com IVA): {{grand_total}}
────────────────────────────────────────────────────

Todos os preços são apresentados em {{currency}}.
Esta proposta é válida por 30 dias.

Aguardamos o vosso contacto.

Atentamente,
Equipa Notion
```

**Guarde o Document ID** (da URL do Google Docs)

### 3. Criar Pasta no Google Drive

Crie uma pasta chamada "Proposals" no Google Drive.

**Guarde o Folder ID** (da URL da pasta)

---

## Construir o Cenário no Make.com

### MÓDULO 1: Webhook (Trigger)

1. Vá a Make.com → **Create a new scenario**
2. Clique no **+** para adicionar o primeiro módulo
3. Procure por **"Webhooks"**
4. Selecione **"Custom webhook"**
5. Clique em **"Create a webhook"**
6. Nome: `Proposal Form Webhook`
7. Clique **Save**
8. **COPIE O WEBHOOK URL** - vai precisar para o `.env.local`

✅ **O webhook está pronto!** Não precisa de configurar mais nada aqui.

---

### MÓDULO 2: Google Sheets - Get Values

1. Clique no **+** à direita do webhook
2. Procure por **"Google Sheets"**
3. Selecione **"Search Rows (Advanced)"**
   - *(Nota: Não use "Get Values", use "Search Rows" pois é mais confiável)*

**Configuração:**

- **Connection**:
  - Clique **Add**
  - Faça login com Google
  - Dê permissões

- **Spreadsheet ID**:
  - Clique no campo
  - Selecione o seu spreadsheet da lista (ou cole o ID manualmente)

- **Sheet Name**: `Products`

- **Table contains headers**: ✅ Marque esta checkbox

- **Filter**:
  - Column: `Product`
  - Operator: `Equal to`
  - Value: `{{1.products[]}}`

- **Maximum number of returned rows**: `10`

- **Output**:
  - Marque **"All"**

✅ Clique **OK**

---

### MÓDULO 3: Iterator

1. Clique no **+** depois do Google Sheets
2. Procure por **"Iterator"**
3. Selecione **"Iterator"**

**Configuração:**

- **Array**: `{{2.values}}`

✅ Clique **OK**

---

### MÓDULO 4: Set Variable - Subtotal

1. Clique no **+** depois do Iterator
2. Procure por **"Set variable"**
3. Selecione **"Set variable"**

**Configuração:**

- **Variable name**: `subtotal`
- **Variable value**: `{{3.`0``}}`
  - *(Isto mapeia para a coluna Price do Google Sheets)*
- **Variable lifetime**: `One cycle`

✅ Clique **OK**

---

### MÓDULO 5: Set Variable - VAT Amount

1. Adicione outro **"Set variable"**

**Configuração:**

- **Variable name**: `vatAmount`
- **Variable value**: `{{4.subtotal * (3.`3` / 100)}}`
  - *(3.`3` = coluna VAT)*
- **Variable lifetime**: `One cycle`

✅ Clique **OK**

---

### MÓDULO 6: Set Variable - Line Total

1. Adicione outro **"Set variable"**

**Configuração:**

- **Variable name**: `lineTotal`
- **Variable value**: `{{4.subtotal + 5.vatAmount}}`
- **Variable lifetime**: `One cycle`

✅ Clique **OK**

---

### MÓDULO 7: Text Aggregator

1. Clique no **+**
2. Procure por **"Text aggregator"**
3. Selecione **"Text aggregator"**

**Configuração:**

- **Source Module**: Selecione o **Iterator** (módulo 3)

- **Row separator**: `New line`

- **Text**:
```
{{3.`0`}} - {{3.`1`}} | {{3.`4`}} {{formatNumber(4.subtotal; 2; "."; ",")}} | IVA {{3.`3`}}% | {{3.`4`}} {{formatNumber(5.vatAmount; 2; "."; ",")}} | {{3.`4`}} {{formatNumber(6.lineTotal; 2; "."; ",")}}
```

- **Group by**: *(deixe vazio)*

✅ Clique **OK**

---

### MÓDULO 8: Numeric Aggregator - Grand Total

1. Adicione um **"Numeric aggregator"**

**Configuração:**

- **Source Module**: Selecione o **Iterator** (módulo 3)

- **Aggregate function**: `SUM`

- **Value**: `{{6.lineTotal}}`

- **Group by**: *(deixe vazio)*

✅ Clique **OK**

---

### MÓDULO 9: Set Variable - Proposal Number

1. Adicione outro **"Set variable"**

**Configuração:**

- **Variable name**: `proposalNumber`
- **Variable value**: `{{formatDate(now; "YYYYMMDD")}}-{{substring(1.email; 0; 3)}}`
- **Variable lifetime**: `One execution`

✅ Clique **OK**

---

### MÓDULO 10: Set Variable - Proposal Date

1. Adicione outro **"Set variable"**

**Configuração:**

- **Variable name**: `proposalDate`
- **Variable value**: `{{formatDate(now; "DD/MM/YYYY")}}`
- **Variable lifetime**: `One execution`

✅ Clique **OK**

---

### MÓDULO 11: Google Docs - Create from Template

1. Adicione **"Google Docs"**
2. Selecione **"Create a Document from a Template"**

**Configuração:**

- **Connection**:
  - Clique **Add**
  - Faça login com Google
  - Dê permissões

- **Choose a Drive**: `My Drive`

- **Folder**:
  - Clique e navegue até à pasta "Proposals"

- **Select a Method**: `By ID`

- **Template Document ID**:
  - Cole o Document ID do seu template

- **New Document Name**:
```
Proposta - {{1.company}} - {{9.proposalNumber}}
```

- **Values to replace**:
  - Clique **Add item** para cada placeholder:

| Placeholder | Replacement Value |
|-------------|-------------------|
| `customer_name` | `{{1.name}}` |
| `customer_email` | `{{1.email}}` |
| `company_name` | `{{1.company}}` |
| `customer_phone` | `{{1.phone}}` |
| `proposal_number` | `{{9.proposalNumber}}` |
| `proposal_date` | `{{10.proposalDate}}` |
| `products_table` | `{{7.text}}` |
| `grand_total` | `{{first(2.values).Currency}} {{formatNumber(8.result; 2; "."; ",")}}` |
| `currency` | `{{first(2.values).Currency}}` |

✅ Clique **OK**

---

### MÓDULO 12: Google Drive - Download a File

1. Adicione **"Google Drive"**
2. Selecione **"Download a File"**

**Configuração:**

- **Connection**: Use a mesma conexão do Google Docs

- **Choose a Method**: `By ID`

- **File ID**: `{{11.id}}`

- **Convert a Document**: ✅ Marque

- **Conversion Format**: `PDF`

✅ Clique **OK**

---

### MÓDULO 13: Gmail - Send an Email

1. Adicione **"Gmail"**
2. Selecione **"Send an Email"**

**Configuração:**

- **Connection**:
  - Clique **Add**
  - Faça login com Gmail
  - Dê permissões

- **To**: `{{1.email}}`

- **Subject**:
```
A Sua Proposta Notion - {{9.proposalNumber}}
```

- **Content Type**: `Text and HTML`

- **Content (HTML)**:
```html
<p>Exmo(a). Sr(a). <strong>{{1.name}}</strong>,</p>

<p>Agradecemos o seu interesse nas nossas soluções Notion.</p>

<p>Em anexo encontrará a proposta personalizada para <strong>{{1.company}}</strong>.</p>

<p>A proposta inclui preços detalhados para os seguintes produtos:</p>

<ul>
{{join(map(2.values; "<li>" + `0` + " - " + `1` + "</li>"); "")}}
</ul>

<p><strong>Investimento Total: {{first(2.values).Currency}} {{formatNumber(8.result; 2; "."; ",")}}</strong></p>

<p>Para qualquer dúvida, não hesite em contactar-nos.</p>

<p>Atentamente,<br>
Equipa Notion</p>
```

- **Attachments**:
  - Clique **Add item**
  - **File name**: `Proposta-{{1.company}}-{{9.proposalNumber}}.pdf`
  - **Data**: `{{12.data}}`

✅ Clique **OK**

---

### MÓDULO 14: Webhook Response

1. Adicione **"Webhooks"**
2. Selecione **"Webhook response"**

**Configuração:**

- **Status**: `200`

- **Body**:
```json
{
  "success": true,
  "message": "Proposta enviada com sucesso",
  "proposalNumber": "{{9.proposalNumber}}"
}
```

- **Custom headers**:
  - Clique **Add item**
  - **Key**: `Content-Type`
  - **Value**: `application/json`

✅ Clique **OK**

---

## Adicionar Error Handler

1. **Clique com o botão direito** num espaço vazio do canvas
2. Selecione **"Add error handler"**
3. Desenhe uma linha do início até ao fim do cenário para cobrir todos os módulos

### Error Handler Module: Google Sheets - Add a Row

1. No error handler, adicione **"Google Sheets"**
2. Selecione **"Add a Row"**

**Configuração:**

- **Connection**: Use a mesma conexão

- **Spreadsheet ID**: O mesmo spreadsheet

- **Sheet Name**: `Logs`

- **Values**:

| Column | Value |
|--------|-------|
| Timestamp | `{{formatDate(now; "YYYY-MM-DD HH:mm:ss")}}` |
| WebhookPayloadID | `{{if(exists(1.email); 1.email; "N/A")}}` |
| ErrorMessage | `{{error.message}}` |
| ModuleName | `{{error.module}}` |
| CustomerName | `{{if(exists(1.name); 1.name; "N/A")}}` |
| CustomerEmail | `{{if(exists(1.email); 1.email; "N/A")}}` |

✅ Clique **OK**

### Error Response

1. Depois do error handler module, adicione **"Webhook response"**

**Configuração:**

- **Status**: `500`

- **Body**:
```json
{
  "success": false,
  "error": "{{error.message}}"
}
```

✅ Clique **OK**

---

## Ativar e Testar

1. **Clique em "Save"** (ícone de disquete no canto inferior esquerdo)

2. **Ative o cenário**: Toggle ON/OFF no canto inferior esquerdo → ON

3. **Copie o webhook URL** do módulo 1

4. **Cole no `.env.local`**:
```
VITE_MAKE_WEBHOOK_URL=https://hook.eu1.make.com/xxxxxxx
```

5. **Reinicie o servidor React**:
```bash
npm run dev
```

6. **Teste no browser**:
   - Abra http://localhost:5173
   - Preencha o formulário
   - Submeta
   - Verifique o email!

---

## Troubleshooting

### Erro: "Validation failed"
- Verifique se todas as conexões estão criadas (Google Sheets, Docs, Drive, Gmail)
- Confirme que os IDs (Spreadsheet, Document, Folder) estão corretos

### Erro: "Product not found"
- Verifique se os Product IDs no Google Sheets correspondem exatamente aos do formulário React
- Exemplo: `notion-plus` (não `Notion Plus`)

### Erro: "Invalid webhook URL"
- Copie novamente o webhook URL do Make.com
- Cole no `.env.local` sem espaços ou quebras de linha
- Reinicie o servidor React

### Email não chega
- Verifique a pasta de spam
- Confirme que a conexão Gmail tem permissões corretas
- Teste enviando para o seu próprio email primeiro

---

## Melhorias Opcionais

### BCC para a equipa
No módulo Gmail (13), adicione:
- **Bcc**: `equipa@empresa.com`

### Múltiplos templates
Crie templates diferentes para diferentes tipos de clientes e use lógica condicional.

### Notificações Slack
Adicione um módulo Slack para notificar a equipa quando uma proposta é enviada.

---

Boa sorte! 🚀
