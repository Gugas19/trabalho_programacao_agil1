import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "proposal.form.validation.name"),
  email: z.string().email("proposal.form.validation.email"),
  company: z.string().min(2, "proposal.form.validation.company"),
  phone: z.string().min(9, "proposal.form.validation.phone"),
  products: z.string().min(1, "proposal.form.validation.products"),
  description: z.string().min(10, "proposal.form.validation.description"),
});

type FormData = z.infer<typeof formSchema>;

const AVAILABLE_PRODUCTS = [
  { id: "notion-plus", labelKey: "proposal.form.products.notionPlus" },
  { id: "notion-business", labelKey: "proposal.form.products.notionBusiness" },
  { id: "notion-enterprise", labelKey: "proposal.form.products.notionEnterprise" },
  { id: "consulting", labelKey: "proposal.form.products.consulting" },
  { id: "training", labelKey: "proposal.form.products.training" },
];

const ProposalForm = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      products: "",
    },
  });

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
    setValue('products', productId);
    trigger('products');
  };

  // Detect autofill and update form state
  useEffect(() => {
    const handleAutofill = () => {
      const form = document.querySelector('form');
      if (!form) return;

      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach((input) => {
        if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
          const name = input.name;
          const value = input.value;
          if (value && name) {
            setValue(name as keyof FormData, value, { shouldValidate: true });
          }
        }
      });
    };

    // Check for autofill after multiple delays to catch browser autofill
    const timers = [
      setTimeout(handleAutofill, 100),
      setTimeout(handleAutofill, 500),
      setTimeout(handleAutofill, 1000),
    ];

    // Listen for various events that might indicate autofill
    const form = document.querySelector('form');
    const events = ['change', 'input', 'blur'];

    events.forEach(event => {
      form?.addEventListener(event, handleAutofill);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
      events.forEach(event => {
        form?.removeEventListener(event, handleAutofill);
      });
    };
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    console.log("🚀 Form submit triggered", { data, selectedProduct });

    // Check if product is selected
    if (!selectedProduct) {
      console.warn("⚠️ No product selected");
      toast.error(t("proposal.form.error.title"), {
        description: t("proposal.form.validation.products"),
      });
      return;
    }

    console.log("📦 Sending data:", data);
    console.log("📦 JSON stringified:", JSON.stringify(data, null, 2));

    setIsSubmitting(true);

    try {
      // Use proxy API endpoint to avoid CORS issues
      const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || '/api/webhook';

      console.log("🔗 API Endpoint:", apiEndpoint);
      console.log("📡 Sending POST request to API...");

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("📨 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Response error:", errorText);
        throw new Error(`Failed to submit proposal request: ${response.status}`);
      }

      // Try to parse JSON, but accept plain text responses too
      let responseData;
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          responseData = await response.json();
        } else {
          const textResponse = await response.text();
          console.log("📄 Plain text response:", textResponse);
          responseData = { message: textResponse, success: true };
        }
        console.log("✅ Success response:", responseData);
      } catch (parseError) {
        console.warn("⚠️ Could not parse response, but request was successful");
        responseData = { success: true };
      }

      toast.success(t("proposal.form.success.title"), {
        description: t("proposal.form.success.description"),
      });

      // Reset form
      reset();
      setSelectedProduct("");
      setValue('products', "");
    } catch (error) {
      console.error("❌ Error submitting proposal:", error);
      toast.error(t("proposal.form.error.title"), {
        description: t("proposal.form.error.description"),
      });
    } finally {
      setIsSubmitting(false);
      console.log("🏁 Form submission completed");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{t("proposal.form.title")}</CardTitle>
        <CardDescription>{t("proposal.form.subtitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            console.log("📝 Form onSubmit event triggered");
            handleSubmit(onSubmit)(e);
          }}
          className="space-y-6"
        >
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">{t("proposal.form.fields.name")}</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder={t("proposal.form.placeholders.name")}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{t(errors.name.message || "")}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">{t("proposal.form.fields.email")}</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder={t("proposal.form.placeholders.email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{t(errors.email.message || "")}</p>
            )}
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company">{t("proposal.form.fields.company")}</Label>
            <Input
              id="company"
              {...register("company")}
              placeholder={t("proposal.form.placeholders.company")}
              disabled={isSubmitting}
            />
            {errors.company && (
              <p className="text-sm text-destructive">{t(errors.company.message || "")}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">{t("proposal.form.fields.phone")}</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder={t("proposal.form.placeholders.phone")}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{t(errors.phone.message || "")}</p>
            )}
          </div>

          {/* Products */}
          <div className="space-y-3">
            <Label>{t("proposal.form.fields.products")}</Label>
            <RadioGroup
              value={selectedProduct}
              onValueChange={handleProductSelect}
              disabled={isSubmitting}
            >
              {AVAILABLE_PRODUCTS.map((product) => (
                <div key={product.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={product.id} id={product.id} />
                  <label
                    htmlFor={product.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {t(product.labelKey)}
                  </label>
                </div>
              ))}
            </RadioGroup>
            {!selectedProduct && errors.products && (
              <p className="text-sm text-destructive">{t(errors.products.message || "")}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">{t("proposal.form.fields.description")}</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder={t("proposal.form.placeholders.description")}
              disabled={isSubmitting}
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{t(errors.description.message || "")}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            onClick={() => console.log("🖱️ Button clicked", { selectedProduct, isSubmitting })}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("proposal.form.button.submitting")}
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                {t("proposal.form.button.submit")}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProposalForm;
