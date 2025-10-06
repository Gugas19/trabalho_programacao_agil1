# Google Sheets Setup - Importação Rápida

Este guia mostra como importar os dados para o Google Sheets em 2 minutos.

---

## 📊 Ficheiros Criados

- **`google-sheets-products.csv`** - Catálogo de produtos e preços
- **`google-sheets-logs.csv`** - Template para logs de erro

---

## 🚀 Passos de Importação

### 1. Criar novo Google Sheet

1. Vá a [sheets.google.com](https://sheets.google.com)
2. Clique em **"+ Blank"** (novo documento em branco)
3. Dê um nome: **"Notion Proposals Database"**

---

### 2. Importar a tab "Products"

1. No Google Sheets, clique em **File** → **Import**
2. Clique em **"Upload"**
3. Arraste o ficheiro **`google-sheets-products.csv`**
4. Nas opções de importação:
   - **Import location**: Select **"Insert new sheet(s)"**
   - **Separator type**: **Comma**
   - **Convert text to numbers, dates...**: ✅ Sim (marque)
5. Clique **"Import data"**
6. Renomeie a nova sheet para **"Products"** (clique direito na tab → Rename)

**Resultado esperado:**

| Product | Description | Price | VAT | Currency |
|---------|-------------|-------|-----|----------|
| notion-plus | Notion Plus subscription... | 80 | 23 | EUR |
| notion-business | Notion Business for... | 150 | 23 | EUR |
| notion-enterprise | Notion Enterprise with... | 500 | 23 | EUR |
| consulting | One-time Notion setup... | 600 | 23 | EUR |
| training | Team training and... | 800 | 0 | EUR |

---

### 3. Importar a tab "Logs"

1. No mesmo Google Sheet, clique em **File** → **Import**
2. Clique em **"Upload"**
3. Arraste o ficheiro **`google-sheets-logs.csv`**
4. Nas opções de importação:
   - **Import location**: Select **"Insert new sheet(s)"**
   - **Separator type**: **Comma**
5. Clique **"Import data"**
6. Renomeie a nova sheet para **"Logs"** (clique direito na tab → Rename)

**Resultado esperado:**

| Timestamp | WebhookPayloadID | ErrorMessage | ModuleName | CustomerName | CustomerEmail |
|-----------|------------------|--------------|------------|--------------|---------------|
| *(vazio)* | *(vazio)* | *(vazio)* | *(vazio)* | *(vazio)* | *(vazio)* |

---

### 4. Copiar o Spreadsheet ID

1. Na barra de endereços do browser, copie o ID:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_É_O_ID]/edit
   ```
2. **Guarde este ID** - vai precisar para configurar o Make.com

---

## ✅ Verificações

Antes de prosseguir, verifique:

- [x] A sheet tem 2 tabs: **"Products"** e **"Logs"**
- [x] A tab "Products" tem 5 produtos (linhas 2-6)
- [x] A coluna **"Product"** tem IDs em minúsculas com hífens (`notion-plus`, etc.)
- [x] A coluna **"Price"** tem apenas números (sem símbolos de moeda)
- [x] A coluna **"VAT"** tem percentagens sem o símbolo % (23, não 23%)
- [x] Copiou o Spreadsheet ID

---

## 📝 IDs dos Produtos (para referência)

Estes IDs **devem** estar exatamente assim na coluna "Product":

```
notion-plus
notion-business
notion-enterprise
consulting
training
```

**⚠️ Atenção:**
- São **case-sensitive** (tudo em minúsculas)
- Usam **hífen** (-), não underscore (_)
- Sem espaços

---

## 💰 Estrutura de Preços

| Produto | Preço Base | IVA | Preço Final |
|---------|------------|-----|-------------|
| Notion Plus | €80 | 23% | €98.40 |
| Notion Business | €150 | 23% | €184.50 |
| Notion Enterprise | €500 | 23% | €615.00 |
| Consulting | €600 | 23% | €738.00 |
| Training | €800 | 0% | €800.00 |

**Nota:** O serviço de Training tem IVA 0% (isento).

---

## 🔧 Personalizar Produtos

Para adicionar novos produtos:

1. **No Google Sheets**, adicione uma nova linha na tab "Products"
2. Preencha todas as colunas
3. **No código React**, edite [src/components/ProposalForm.tsx](src/components/ProposalForm.tsx):
   ```tsx
   const AVAILABLE_PRODUCTS = [
     // ... produtos existentes ...
     { id: "novo-produto", labelKey: "proposal.form.products.novoProduto" },
   ];
   ```
4. **Adicione traduções** em [src/contexts/LanguageContext.tsx](src/contexts/LanguageContext.tsx):
   ```tsx
   // Inglês
   "proposal.form.products.novoProduto": "New Product - Description",

   // Português
   "proposal.form.products.novoProduto": "Novo Produto - Descrição",
   ```

---

## 🎯 Próximo Passo

Agora que o Google Sheets está configurado, siga o guia:

👉 **[MAKE_QUICK_START.md](MAKE_QUICK_START.md)** para configurar o Make.com

---

## 📞 Suporte

Se tiver problemas:

1. Verifique que os IDs dos produtos no Google Sheets correspondem aos do formulário
2. Confirme que as colunas Price e VAT contêm apenas números
3. Certifique-se que a sheet "Products" tem headers na primeira linha

---

## 📊 Exemplo de URL do Spreadsheet

```
https://docs.google.com/spreadsheets/d/1ABcD1234567890EFGHijKLMNopQRsTUVwXYz/edit
                                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                      Este é o Spreadsheet ID que precisa
```

---

Pronto! Agora pode prosseguir para o Make.com. 🚀
