# Make.com Quick Start Guide - Automated Setup

## 🚀 Estratégia Rápida

O Make.com não importa blueprints complexos bem. **A melhor solução é usar o template builder visual.**

---

## ✅ Opção 1: Usar Make.com Template (RECOMENDADO)

### Passo 1: Criar Cenário Vazio

1. Vá a [Make.com](https://www.make.com)
2. Clique **"Create a new scenario"**
3. Ignore a importação de blueprint

### Passo 2: Adicionar Módulos Visualmente

Clique no **+** e adicione estes módulos **pela ordem**:

#### 1️⃣ Webhooks → Custom Webhook
- Clique "Create a webhook"
- Nome: `Proposal Form`
- **COPIE O URL DO WEBHOOK**

#### 2️⃣ Google Sheets → Search Rows (Advanced)
- Connection: Crie conexão com Google
- Spreadsheet: Selecione o seu sheet
- Sheet Name: `Products`
- Filter:
  - Column: `Product`
  - Operator: `Text operators` → `Equal to (case insensitive)`
  - Value: Clique e selecione `1. products[]` (do webhook)

#### 3️⃣ Tools → Iterator
- Array: Selecione `2. values` (do Google Sheets)

#### 4️⃣ Tools → Set Variable (3x)

**Variável 1: Subtotal**
- Name: `subtotal`
- Value: `3.2` (coluna Price)
- Lifetime: `One cycle`

**Variável 2: VAT Amount**
- Name: `vatAmount`
- Value: `{{4.subtotal * (3.3 / 100)}}` (digite isto manualmente)
- Lifetime: `One cycle`

**Variável 3: Line Total**
- Name: `lineTotal`
- Value: `{{4.subtotal + 5.vatAmount}}`
- Lifetime: `One cycle`

#### 5️⃣ Tools → Text Aggregator
- Source Module: Iterator (módulo 3)
- Text:
```
{{3.0}} - {{3.1}} | {{3.4}} {{formatNumber(4.subtotal; 2)}} | VAT {{3.3}}% | {{3.4}} {{formatNumber(6.lineTotal; 2)}}
```
- Row separator: `New line`

#### 6️⃣ Tools → Numeric Aggregator
- Source Module: Iterator (módulo 3)
- Function: `SUM`
- Value: `6.lineTotal`

#### 7️⃣ Tools → Set Variable (2x)

**Variável 4: Proposal Number**
- Name: `proposalNumber`
- Value: `{{formatDate(now; "YYYYMMDD")}}-{{substring(1.email; 0; 3)}}`
- Lifetime: `One execution`

**Variável 5: Proposal Date**
- Name: `proposalDate`
- Value: `{{formatDate(now; "DD/MM/YYYY")}}`
- Lifetime: `One execution`

#### 8️⃣ Google Docs → Create from Template
- Connection: Crie conexão com Google
- Drive: `My Drive`
- Folder: Selecione sua pasta "Proposals"
- Template: Selecione o template criado
- Name: `Proposta - {{1.company}} - {{8.proposalNumber}}`
- Values to replace: **(adicione cada um com "Add item")**
  - `customer_name` → `1.name`
  - `customer_email` → `1.email`
  - `company_name` → `1.company`
  - `customer_phone` → `1.phone`
  - `proposal_number` → `8.proposalNumber`
  - `proposal_date` → `9.proposalDate`
  - `products_table` → `7.text`
  - `grand_total` → `EUR {{formatNumber(6.result; 2)}}`
  - `currency` → `EUR`

#### 9️⃣ Google Drive → Download File
- Connection: Mesma do Google Docs
- File ID: `10.id`
- Convert: ✅ Sim
- Format: `PDF`

#### 🔟 Gmail → Send Email
- Connection: Crie conexão com Gmail
- To: `1.email`
- Subject: `A Sua Proposta Notion - {{8.proposalNumber}}`
- Content: `Text and HTML`
- HTML:
```html
<p>Exmo(a). Sr(a). <strong>{{1.name}}</strong>,</p>
<p>Em anexo encontra a proposta para <strong>{{1.company}}</strong>.</p>
<p><strong>Total: EUR {{formatNumber(6.result; 2)}}</strong></p>
<p>Atentamente,<br>Equipa Notion</p>
```
- Attachments → Add item:
  - File name: `Proposta-{{1.company}}.pdf`
  - Data: `11.data`

#### 1️⃣1️⃣ Webhooks → Webhook Response
- Status: `200`
- Body:
```json
{"success": true, "proposalNumber": "{{8.proposalNumber}}"}
```

### Passo 3: Ativar

1. Clique **Save**
2. Toggle **ON**
3. Copie o webhook URL
4. Cole em `.env.local`

---

## ✅ Opção 2: Template Simplificado (Teste Rápido)

Se quiser apenas testar rapidamente:

### Blueprint Minimalista

1. Importe `make-scenario-blueprint-simple.json`
2. Isto cria apenas:
   - Webhook (recebe dados)
   - Resposta (confirma recepção)

3. Depois **adicione módulos manualmente** usando a interface visual

---

## 📋 Dados de Teste

Para testar o formulário:

```
Nome: João Silva
Email: seu-email@gmail.com
Empresa: Empresa Teste Lda
Telefone: +351 912 345 678
Produtos: ✅ Notion Plus, ✅ Consulting
```

---

## 🎯 Estrutura Final do Cenário

```
Webhook
  ↓
Google Sheets (buscar produtos)
  ↓
Iterator (processar cada produto)
  ↓
Calcular Subtotal + VAT + Total
  ↓
Agregador de Texto (tabela de produtos)
  ↓
Agregador Numérico (total geral)
  ↓
Gerar número e data da proposta
  ↓
Google Docs (criar documento)
  ↓
Google Drive (converter para PDF)
  ↓
Gmail (enviar email com PDF)
  ↓
Webhook Response (responder ao site)
```

---

## ⚠️ Importante

- **Não use o blueprint JSON complexo** - o Make.com tem problemas com conexões pré-configuradas
- **Use a interface visual** - é mais confiável
- **Copie o webhook URL** assim que criar o webhook
- **Teste com o seu próprio email** primeiro

---

## 🆘 Problemas Comuns

### "Module not found" ao importar
➡️ **Solução**: Use a interface visual (Opção 1)

### "Connection required"
➡️ **Solução**: Clique em cada módulo Google e crie a conexão manualmente

### Produtos não encontrados
➡️ **Solução**: Verifique que os Product IDs no Google Sheets são exatamente:
- `notion-plus`
- `notion-business`
- `notion-enterprise`
- `consulting`
- `training`

### Email não chega
➡️ **Solução**:
1. Verifique spam
2. Use o seu próprio Gmail como destinatário para teste
3. Confirme que a conexão Gmail tem permissões

---

## 🎬 Video Tutorial

Make.com tem tutorials visuais excelentes:
- [How to use Webhooks](https://www.make.com/en/help/tools/webhooks)
- [Google Sheets Integration](https://www.make.com/en/help/app/google-sheets)

---

## ✅ Checklist Final

- [ ] Google Sheet criado com tabs "Products" e "Logs"
- [ ] Template Google Docs criado com placeholders
- [ ] Pasta "Proposals" criada no Google Drive
- [ ] Cenário Make.com criado visualmente
- [ ] Webhook URL copiado para `.env.local`
- [ ] Todas as conexões Google criadas
- [ ] Cenário ativado (toggle ON)
- [ ] Teste feito com sucesso

---

Boa sorte! Se tiver dúvidas, o melhor é construir módulo a módulo usando a interface visual do Make.com. É mais demorado mas 100% funcional. 🚀
