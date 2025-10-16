import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { FileText, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Types for the highlighted text editor
interface HighlightedTextEditorProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  className?: string;
  onFocus?: () => void;
}

// Custom highlighted text editor component
function HighlightedTextEditor({ value, onChange, placeholder, className, onFocus }: HighlightedTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Template words to highlight in purple
  const templateWords = ['Kim', 'Your Name', 'Shop Name', 'www.website.com', 'image1', 'Image2', '10 sec GIF', 'Link1', 'Link2', 'Nick'];
  
  // Function to highlight template words
  const highlightText = (text: string) => {
    if (!text) return '';
    
    let highlightedText = text;
    templateWords.forEach(word => {
      const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span style="color: #8b5cf6; background-color: #f3f4f6; padding: 1px 3px; border-radius: 3px; font-weight: 500;">$&</span>`);
    });
    
    return highlightedText.replace(/\n/g, '<br>');
  };

  // Save cursor position
  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && editorRef.current) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editorRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      return preCaretRange.toString().length;
    }
    return 0;
  };

  // Restore cursor position
  const restoreCursorPosition = (position: number) => {
    if (!editorRef.current) return;
    
    const walker = document.createTreeWalker(
      editorRef.current,
      NodeFilter.SHOW_TEXT,
      null
    );
    
    let currentPosition = 0;
    let node;
    
    while (node = walker.nextNode()) {
      const textLength = node.textContent?.length || 0;
      if (currentPosition + textLength >= position) {
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(node, position - currentPosition);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
        break;
      }
      currentPosition += textLength;
    }
  };
  
  // Handle input changes
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (isUpdating) return;
    
    const text = (e.target as HTMLDivElement).innerText || '';
    const cursorPosition = saveCursorPosition();
    
    setIsUpdating(true);
    onChange(text);
    
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = highlightText(text);
        restoreCursorPosition(cursorPosition);
      }
      setIsUpdating(false);
    }, 0);
  };
  
  // Handle focus events
  const handleFocus = () => {
    setIsFocused(true);
    
    // Clear placeholder when focusing
    if (editorRef.current && (!value || !value.trim())) {
      const content = editorRef.current.innerHTML;
      if (content.includes('color: #9ca3af')) {
        editorRef.current.innerHTML = '';
      }
    }
    
    if (onFocus) {
      onFocus();
    }
  };
  
  // Handle blur events
  const handleBlur = () => {
    setIsFocused(false);
  };
  
  // Update editor content when value changes externally (only when not focused to avoid cursor issues)
  useEffect(() => {
    if (editorRef.current && !isFocused && !isUpdating) {
      const currentText = editorRef.current.innerText || '';
      if (currentText !== value) {
        if (value && value.trim()) {
          editorRef.current.innerHTML = highlightText(value);
        } else {
          editorRef.current.innerHTML = `<span style="color: #9ca3af;">${placeholder || 'Click to start typing...'}</span>`;
        }
      }
    }
  }, [value, isFocused, isUpdating, placeholder]);

  // Initialize placeholder on mount
  useEffect(() => {
    if (editorRef.current && (!value || !value.trim())) {
      editorRef.current.innerHTML = `<span style="color: #9ca3af;">${placeholder || 'Click to start typing...'}</span>`;
    }
  }, []);
  
  return (
    <div
      ref={editorRef}
      contentEditable
      onInput={handleInput}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
      style={{
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        outline: 'none',
        minHeight: '400px'
      }}
      dangerouslySetInnerHTML={{
        __html: value && value.trim() ? highlightText(value) : `<span style="color: #9ca3af;">${placeholder || 'Click to start typing...'}</span>`
      }}
      suppressContentEditableWarning={true}
    />
  );
}

export default function SalesWorkflows() {
  const [step1, setStep1] = useState("");
  const [step2, setStep2] = useState("");
  const [step3, setStep3] = useState("");
  const [step4, setStep4] = useState("");
  const [step5, setStep5] = useState("");
  const [step6, setStep6] = useState("");
  const [step7, setStep7] = useState("");
  const [step8, setStep8] = useState("");
  const [step9, setStep9] = useState("");
  const [step10, setStep10] = useState("");
  const [step11, setStep11] = useState("");
  const [step12, setStep12] = useState("");
  const [error, setError] = useState("");
  const [step1Copied, setStep1Copied] = useState(false);
  const [step2Copied, setStep2Copied] = useState(false);
  const [step3Copied, setStep3Copied] = useState(false);
  const [step4Copied, setStep4Copied] = useState(false);
  const [step5Copied, setStep5Copied] = useState(false);
  const [step6Copied, setStep6Copied] = useState(false);
  const [step7Copied, setStep7Copied] = useState(false);
  const [step8Copied, setStep8Copied] = useState(false);
  const [step9Copied, setStep9Copied] = useState(false);
  const [step10Copied, setStep10Copied] = useState(false);
  const [step11Copied, setStep11Copied] = useState(false);
  const [step12Copied, setStep12Copied] = useState(false);
  const [step4Saving, setStep4Saving] = useState(false);
  const [step5Saving, setStep5Saving] = useState(false);
  const [step6Saving, setStep6Saving] = useState(false);
  const [step7Saving, setStep7Saving] = useState(false);
  const [step8Saving, setStep8Saving] = useState(false);
  const [step9Saving, setStep9Saving] = useState(false);
  const [step10Saving, setStep10Saving] = useState(false);
  const [step11Saving, setStep11Saving] = useState(false);
  const [step12Saving, setStep12Saving] = useState(false);
  const [step4Saved, setStep4Saved] = useState(false);
  const [step5Saved, setStep5Saved] = useState(false);
  const [step6Saved, setStep6Saved] = useState(false);
  const [step7Saved, setStep7Saved] = useState(false);
  const [step8Saved, setStep8Saved] = useState(false);
  const [step9Saved, setStep9Saved] = useState(false);
  const [step10Saved, setStep10Saved] = useState(false);
  const [step11Saved, setStep11Saved] = useState(false);
  const [step12Saved, setStep12Saved] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('sales_workflows_configs')
      .select('*')
      .eq('user_id', user.id)
      .order('config_index');

    if (error) {
      console.error('Error loading configs:', error);
      return;
    }

    if (data) {
      data.forEach(config => {
        switch (config.config_index) {
          case 4: setStep4(config.config_text); break;
          case 5: setStep5(config.config_text); break;
          case 6: setStep6(config.config_text); break;
          case 7: setStep7(config.config_text); break;
          case 8: setStep8(config.config_text); break;
          case 9: setStep9(config.config_text); break;
          case 10: setStep10(config.config_text); break;
          case 11: setStep11(config.config_text); break;
          case 12: setStep12(config.config_text); break;
        }
      });
    }
  };

  const saveStep = async (stepIndex: number, stepValue: string, setSaving: (val: boolean) => void, setSaved: (val: boolean) => void) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save",
        variant: "destructive",
      });
      return;
    }

    if (!stepValue.trim()) {
      toast({
        title: "Empty field",
        description: "Please enter some text before saving",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from('sales_workflows_configs')
      .upsert({
        user_id: user.id,
        config_index: stepIndex,
        config_text: stepValue,
      }, {
        onConflict: 'user_id,config_index'
      });

    setSaving(false);

    if (error) {
      console.error('Error saving:', error);
      toast({
        title: "Error saving",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setSaved(true);
    toast({
      title: "Saved successfully",
      description: `Step ${stepIndex} has been saved`,
    });

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handleInputChange = () => {
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Input Form */}
        <Card className="mb-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm" data-testid="card-input-form">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-500" />
              <CardTitle className="text-xl font-semibold text-gray-800">
                Sales Workflows Configuration
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Subject */}
            <div>
              <Label htmlFor="subject" className="text-sm font-medium" style={{ color: '#8041CE' }}>
                Subject
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="subject"
                  type="text"
                  placeholder="Asking Permission About Your Business [shop_name] to be listed on www.testplaceholder.comm"
                  value={step1}
                  onChange={(e) => {
                    setStep1(e.target.value);
                    handleInputChange();
                  }}
                  onFocus={(e) => {
                    if (!step1) {
                      setStep1("Asking Permission About Your Business [shop_name] to be listed on www.testplaceholder.comm");
                    }
                  }}
                  className="pr-20 border-gray-200 focus:border-blue-400 focus:ring-blue-400 h-12 text-sm"
                  data-testid="input-subject"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (step1Copied) {
                      setStep1Copied(false);
                    } else {
                      navigator.clipboard.writeText(step1);
                      setStep1Copied(true);
                    }
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 border-gray-300 hover:bg-gray-50"
                  data-testid="button-copy-step-1"
                >
                  {step1Copied ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                      Done
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <Label htmlFor="step-2" className="text-sm font-medium" style={{ color: '#8041CE' }}>
                Email(General)
              </Label>
              <div className="relative mt-1.5">
                <HighlightedTextEditor
                  value={step2}
                  onChange={(text) => {
                    setStep2(text);
                    handleInputChange();
                  }}
                  onFocus={() => {
                    if (!step2) {
                      const pitchText = `Dear Kim,

I am reaching out from www.website.com, and my name is Your Name. I am writing to inquire if you are the owner or a representative of Shop Name, the business selling shoes and flowers.

I noticed that Shop Name is not currently listed on our platform and its mobile applications. We are eager to include your business and are about to start curating your shop's profile using publicly available data.

For your reference, here is a screenshot showing how your shop will appear on our website and mobile application alongside 125+ other businesses from various domains:

image1

To ensure your business profile looks polished and professional, would you grant us permission to use your logo and an image from your Facebook page? We recently added your Facebook page, but since many buyers look for a respective website for better browsing, detailed product catalogs, and perceived trustworthiness, I'm also wondering if you would be able to provide us with your website link, should you already have one. Many successful businesses on www.website.com are seamless...

The primary benefit is that, similar to other businesses in your industry already on www.website.com, your shop will become easily discoverable by all potential buyers through our website and AI-powered mobile app.

Our platform, www.website.com, and its accompanying mobile application are specifically designed to significantly increase your reach, boost sales, and enhance the digital presence for businesses like yours.

To provide a clearer vision of what we offer, please take a moment to review this example of a competitor's website on our platform:

Image2

You would receive the same high-quality website, along with access to over 60 applications designed to seamlessly manage both your online and physical shop operations.

10 sec GIF

To remain competitive in today's dynamic online marketplace, embracing innovative solutions is paramount. We are dedicated to helping you superpower your business by providing modern technology at an affordable and flexible price of just $10 per month, with the freedom to cancel anytime. This offers a distinct advantage that your competitors may currently lack.

Consider this:

Facebook Marketplace or multivendor marketplaces like Lazada/Shopee charge commissions or ad fees, forcing your products to compete in a crowded feed. An online shop website eliminates these costs.

An online shop website is accessible to anyone with an internet connection, expanding your potential customer base far beyond social media audiences, making it incredibly efficient for overseas buyers willing to import your products.

A dedicated website integrates seamlessly with your POS system for unified inventory, order management, and customer data across all online and in-store channels.

We are pleased to offer you a 365 days free listing for your business. If you have any questions or need more information, simply drop me an email or send me a message at Link1 or Link2.

Sincerely,

Nick`;
                      setStep2(pitchText);
                    }
                  }}
                  placeholder="Dear Kim,

I am reaching out from www.website.com, and my name is Your Name. I am writing to inquire if you are the owner or a representative of Shop Name, the business selling shoes and flowers.

I noticed that Shop Name is not currently listed on our platform and its mobile applications. We are eager to include your business and are about to start curating your shop's profile using publicly available data.

For your reference, here is a screenshot showing how your shop will appear on our website and mobile application alongside 125+ other businesses from various domains:

image1

To ensure your business profile looks polished and professional, would you grant us permission to use your logo and an image from your Facebook page? We recently added your Facebook page, but since many buyers look for a respective website for better browsing, detailed product catalogs, and perceived trustworthiness, I'm also wondering if you would be able to provide us with your website link, should you already have one. Many successful businesses on www.website.com are seamless...

The primary benefit is that, similar to other businesses in your industry already on www.website.com, your shop will become easily discoverable by all potential buyers through our website and AI-powered mobile app.

Our platform, www.website.com, and its accompanying mobile application are specifically designed to significantly increase your reach, boost sales, and enhance the digital presence for businesses like yours.

To provide a clearer vision of what we offer, please take a moment to review this example of a competitor's website on our platform:

Image2

You would receive the same high-quality website, along with access to over 60 applications designed to seamlessly manage both your online and physical shop operations.

10 sec GIF

To remain competitive in today's dynamic online marketplace, embracing innovative solutions is paramount. We are dedicated to helping you superpower your business by providing modern technology at an affordable and flexible price of just $10 per month, with the freedom to cancel anytime. This offers a distinct advantage that your competitors may currently lack.

Consider this:

Facebook Marketplace or multivendor marketplaces like Lazada/Shopee charge commissions or ad fees, forcing your products to compete in a crowded feed. An online shop website eliminates these costs.

An online shop website is accessible to anyone with an internet connection, expanding your potential customer base far beyond social media audiences, making it incredibly efficient for overseas buyers willing to import your products.

A dedicated website integrates seamlessly with your POS system for unified inventory, order management, and customer data across all online and in-store channels.

We are pleased to offer you a 365 days free listing for your business. If you have any questions or need more information, simply drop me an email or send me a message at Link1 or Link2.

Sincerely,

Nick"
                  className="min-h-[400px] w-full p-3 pr-20 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-y"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (step2Copied) {
                      setStep2Copied(false);
                    } else {
                      navigator.clipboard.writeText(step2);
                      setStep2Copied(true);
                    }
                  }}
                  className="absolute right-2 top-4 h-8 px-3 border-gray-300 hover:bg-gray-50"
                  data-testid="button-copy-step-2"
                >
                  {step2Copied ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                      Done
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-500">
                  Template words to customize: <span className="text-red-500 font-medium">Kim, Your Name, Shop Name, www.website.com, image1, Image2, 10 sec GIF, Link1, Link2, Nick</span>
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <Label htmlFor="step-3" className="text-sm font-medium" style={{ color: '#8041CE' }}>
                Whatsapp(General)
              </Label>
              <div className="relative mt-1.5">
                <HighlightedTextEditor
                  value={step3}
                  onChange={(text) => {
                    setStep3(text);
                    handleInputChange();
                  }}
                  onFocus={() => {
                    if (!step3) {
                      const whatsappText = `Hello Kim! 👋

I'm Your Name from www.website.com. Quick question: Are you the owner of Shop Name (your shoes and flowers business)?

We run a digital platform that helps 125+ local businesses significantly increase their reach and sales via our website and AI-powered mobile app. We're eager to feature your shop!

To get your profile looking professional, could you grant us permission to use your logo and an image from your Facebook page? If you have a separate e-commerce site, please share that link too!

We're offering you a 365-day free listing to try out the platform completely risk-free. Your shop will be instantly discoverable by thousands of potential buyers!

If you'd like to chat more, just reply here or tap: Link1 or Link2.

Thanks,
Nick`;
                      setStep3(whatsappText);
                    }
                  }}
                  placeholder="Hello Kim! 👋

I'm Your Name from www.website.com. Quick question: Are you the owner of Shop Name (your shoes and flowers business)?

We run a digital platform that helps 125+ local businesses significantly increase their reach and sales via our website and AI-powered mobile app. We're eager to feature your shop!

To get your profile looking professional, could you grant us permission to use your logo and an image from your Facebook page? If you have a separate e-commerce site, please share that link too!

We're offering you a 365-day free listing to try out the platform completely risk-free. Your shop will be instantly discoverable by thousands of potential buyers!

If you'd like to chat more, just reply here or tap: Link1 or Link2.

Thanks,
Nick"
                  className="min-h-[400px] w-full p-3 pr-20 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-y"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (step3Copied) {
                      setStep3Copied(false);
                    } else {
                      navigator.clipboard.writeText(step3);
                      setStep3Copied(true);
                    }
                  }}
                  className="absolute right-2 top-4 h-8 px-3 border-gray-300 hover:bg-gray-50"
                  data-testid="button-copy-step-3"
                >
                  {step3Copied ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                      Done
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-500">
                  Template words to customize: <span className="text-red-500 font-medium">Kim, Your Name, Shop Name, Link1, Link2, Nick</span>
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <Label htmlFor="step-4" className="text-sm font-medium" style={{ color: '#8041CE' }}>
                Step 4
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="step-4"
                  type="text"
                  placeholder="Enter step 4"
                  value={step4}
                  onChange={(e) => {
                    setStep4(e.target.value);
                    handleInputChange();
                  }}
                  className="pr-40 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  data-testid="input-step-4"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => saveStep(4, step4, setStep4Saving, setStep4Saved)}
                    disabled={step4Saving}
                    className="h-8 px-3 text-white"
                    style={{ backgroundColor: step4Saving ? '#9f7aea' : '#8041CE' }}
                    onMouseEnter={(e) => !step4Saving && (e.currentTarget.style.backgroundColor = '#6d35b8')}
                    onMouseLeave={(e) => !step4Saving && (e.currentTarget.style.backgroundColor = '#8041CE')}
                  >
                    {step4Saving ? (
                      <>
                        <div className="h-3 w-3 mr-1 animate-spin rounded-full border-2 border-muted border-t-primary" />
                        Saving
                      </>
                    ) : step4Saved ? (
                      <>Saved</>
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (step4Copied) {
                        setStep4Copied(false);
                      } else {
                        navigator.clipboard.writeText(step4);
                        setStep4Copied(true);
                      }
                    }}
                    className="h-8 px-3"
                    data-testid="button-copy-step-4"
                  >
                    {step4Copied ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                        Done
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div>
              <Label htmlFor="step-5" className="text-sm font-medium" style={{ color: '#8041CE' }}>
                Step 5
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="step-5"
                  type="text"
                  placeholder="Enter step 5"
                  value={step5}
                  onChange={(e) => {
                    setStep5(e.target.value);
                    handleInputChange();
                  }}
                  className="pr-40 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  data-testid="input-step-5"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => saveStep(5, step5, setStep5Saving, setStep5Saved)}
                    disabled={step5Saving}
                    className="h-8 px-3 text-white"
                    style={{ backgroundColor: step5Saving ? '#9f7aea' : '#8041CE' }}
                    onMouseEnter={(e) => !step5Saving && (e.currentTarget.style.backgroundColor = '#6d35b8')}
                    onMouseLeave={(e) => !step5Saving && (e.currentTarget.style.backgroundColor = '#8041CE')}
                  >
                    {step5Saving ? (
                      <>
                        <div className="h-3 w-3 mr-1 animate-spin rounded-full border-2 border-muted border-t-primary" />
                        Saving
                      </>
                    ) : step5Saved ? (
                      <>Saved</>
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (step5Copied) {
                        setStep5Copied(false);
                      } else {
                        navigator.clipboard.writeText(step5);
                        setStep5Copied(true);
                      }
                    }}
                    className="h-8 px-3"
                    data-testid="button-copy-step-5"
                  >
                    {step5Copied ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                        Done
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div>
              <Label htmlFor="step-6" className="text-sm font-medium" style={{ color: '#8041CE' }}>
                Step 6
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="step-6"
                  type="text"
                  placeholder="Enter step 6"
                  value={step6}
                  onChange={(e) => {
                    setStep6(e.target.value);
                    handleInputChange();
                  }}
                  className="pr-40 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  data-testid="input-step-6"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => saveStep(6, step6, setStep6Saving, setStep6Saved)}
                    disabled={step6Saving}
                    className="h-8 px-3 text-white"
                    style={{ backgroundColor: step6Saving ? '#9f7aea' : '#8041CE' }}
                    onMouseEnter={(e) => !step6Saving && (e.currentTarget.style.backgroundColor = '#6d35b8')}
                    onMouseLeave={(e) => !step6Saving && (e.currentTarget.style.backgroundColor = '#8041CE')}
                  >
                    {step6Saving ? (
                      <>
                        <div className="h-3 w-3 mr-1 animate-spin rounded-full border-2 border-muted border-t-primary" />
                        Saving
                      </>
                    ) : step6Saved ? (
                      <>Saved</>
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (step6Copied) {
                        setStep6Copied(false);
                      } else {
                        navigator.clipboard.writeText(step6);
                        setStep6Copied(true);
                      }
                    }}
                    className="h-8 px-3"
                    data-testid="button-copy-step-6"
                  >
                    {step6Copied ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                        Done
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 7 */}
            <div>
              <Label htmlFor="step-7" className="text-sm font-medium" style={{ color: '#8041CE' }}>
                Step 7
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="step-7"
                  type="text"
                  placeholder="Enter step 7"
                  value={step7}
                  onChange={(e) => {
                    setStep7(e.target.value);
                    handleInputChange();
                  }}
                  className="pr-40 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  data-testid="input-step-7"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => saveStep(7, step7, setStep7Saving, setStep7Saved)}
                    disabled={step7Saving}
                    className="h-8 px-3 text-white"
                    style={{ backgroundColor: step7Saving ? '#9f7aea' : '#8041CE' }}
                    onMouseEnter={(e) => !step7Saving && (e.currentTarget.style.backgroundColor = '#6d35b8')}
                    onMouseLeave={(e) => !step7Saving && (e.currentTarget.style.backgroundColor = '#8041CE')}
                  >
                    {step7Saving ? (
                      <>
                        <div className="h-3 w-3 mr-1 animate-spin rounded-full border-2 border-muted border-t-primary" />
                        Saving
                      </>
                    ) : step7Saved ? (
                      <>Saved</>
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (step7Copied) {
                        setStep7Copied(false);
                      } else {
                        navigator.clipboard.writeText(step7);
                        setStep7Copied(true);
                      }
                    }}
                    className="h-8 px-3"
                    data-testid="button-copy-step-7"
                  >
                    {step7Copied ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                        Done
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 8 */}
            <div>
              <Label htmlFor="step-8" className="text-sm font-medium" style={{ color: '#8041CE' }}>
                Step 8
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="step-8"
                  type="text"
                  placeholder="Enter step 8"
                  value={step8}
                  onChange={(e) => {
                    setStep8(e.target.value);
                    handleInputChange();
                  }}
                  className="pr-40 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  data-testid="input-step-8"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => saveStep(8, step8, setStep8Saving, setStep8Saved)}
                    disabled={step8Saving}
                    className="h-8 px-3 text-white"
                    style={{ backgroundColor: step8Saving ? '#9f7aea' : '#8041CE' }}
                    onMouseEnter={(e) => !step8Saving && (e.currentTarget.style.backgroundColor = '#6d35b8')}
                    onMouseLeave={(e) => !step8Saving && (e.currentTarget.style.backgroundColor = '#8041CE')}
                  >
                    {step8Saving ? (
                      <>
                        <div className="h-3 w-3 mr-1 animate-spin rounded-full border-2 border-muted border-t-primary" />
                        Saving
                      </>
                    ) : step8Saved ? (
                      <>Saved</>
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (step8Copied) {
                        setStep8Copied(false);
                      } else {
                        navigator.clipboard.writeText(step8);
                        setStep8Copied(true);
                      }
                    }}
                    className="h-8 px-3"
                    data-testid="button-copy-step-8"
                  >
                    {step8Copied ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                        Done
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 9 */}
            <div>
              <Label htmlFor="step-9" className="text-sm font-medium" style={{ color: '#8041CE' }}>
                Step 9
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="step-9"
                  type="text"
                  placeholder="Enter step 9"
                  value={step9}
                  onChange={(e) => {
                    setStep9(e.target.value);
                    handleInputChange();
                  }}
                  className="pr-40 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  data-testid="input-step-9"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => saveStep(9, step9, setStep9Saving, setStep9Saved)}
                    disabled={step9Saving}
                    className="h-8 px-3 text-white"
                    style={{ backgroundColor: step9Saving ? '#9f7aea' : '#8041CE' }}
                    onMouseEnter={(e) => !step9Saving && (e.currentTarget.style.backgroundColor = '#6d35b8')}
                    onMouseLeave={(e) => !step9Saving && (e.currentTarget.style.backgroundColor = '#8041CE')}
                  >
                    {step9Saving ? (
                      <>
                        <div className="h-3 w-3 mr-1 animate-spin rounded-full border-2 border-muted border-t-primary" />
                        Saving
                      </>
                    ) : step9Saved ? (
                      <>Saved</>
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (step9Copied) {
                        setStep9Copied(false);
                      } else {
                        navigator.clipboard.writeText(step9);
                        setStep9Copied(true);
                      }
                    }}
                    className="h-8 px-3"
                    data-testid="button-copy-step-9"
                  >
                    {step9Copied ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                        Done
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 10 */}
            <div>
              <Label htmlFor="step-10" className="text-sm font-medium" style={{ color: '#8041CE' }}>
                Step 10
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="step-10"
                  type="text"
                  placeholder="Enter step 10"
                  value={step10}
                  onChange={(e) => {
                    setStep10(e.target.value);
                    handleInputChange();
                  }}
                  className="pr-40 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  data-testid="input-step-10"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => saveStep(10, step10, setStep10Saving, setStep10Saved)}
                    disabled={step10Saving}
                    className="h-8 px-3 text-white"
                    style={{ backgroundColor: step10Saving ? '#9f7aea' : '#8041CE' }}
                    onMouseEnter={(e) => !step10Saving && (e.currentTarget.style.backgroundColor = '#6d35b8')}
                    onMouseLeave={(e) => !step10Saving && (e.currentTarget.style.backgroundColor = '#8041CE')}
                  >
                    {step10Saving ? (
                      <>
                        <div className="h-3 w-3 mr-1 animate-spin rounded-full border-2 border-muted border-t-primary" />
                        Saving
                      </>
                    ) : step10Saved ? (
                      <>Saved</>
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (step10Copied) {
                        setStep10Copied(false);
                      } else {
                        navigator.clipboard.writeText(step10);
                        setStep10Copied(true);
                      }
                    }}
                    className="h-8 px-3"
                    data-testid="button-copy-step-10"
                  >
                    {step10Copied ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                        Done
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 11 */}
            <div>
              <Label htmlFor="step-11" className="text-sm font-medium" style={{ color: '#8041CE' }}>
                Step 11
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="step-11"
                  type="text"
                  placeholder="Enter step 11"
                  value={step11}
                  onChange={(e) => {
                    setStep11(e.target.value);
                    handleInputChange();
                  }}
                  className="pr-40 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  data-testid="input-step-11"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => saveStep(11, step11, setStep11Saving, setStep11Saved)}
                    disabled={step11Saving}
                    className="h-8 px-3 text-white"
                    style={{ backgroundColor: step11Saving ? '#9f7aea' : '#8041CE' }}
                    onMouseEnter={(e) => !step11Saving && (e.currentTarget.style.backgroundColor = '#6d35b8')}
                    onMouseLeave={(e) => !step11Saving && (e.currentTarget.style.backgroundColor = '#8041CE')}
                  >
                    {step11Saving ? (
                      <>
                        <div className="h-3 w-3 mr-1 animate-spin rounded-full border-2 border-muted border-t-primary" />
                        Saving
                      </>
                    ) : step11Saved ? (
                      <>Saved</>
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (step11Copied) {
                        setStep11Copied(false);
                      } else {
                        navigator.clipboard.writeText(step11);
                        setStep11Copied(true);
                      }
                    }}
                    className="h-8 px-3"
                    data-testid="button-copy-step-11"
                  >
                    {step11Copied ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                        Done
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 12 */}
            <div>
              <Label htmlFor="step-12" className="text-sm font-medium" style={{ color: '#8041CE' }}>
                Step 12
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="step-12"
                  type="text"
                  placeholder="Enter step 12"
                  value={step12}
                  onChange={(e) => {
                    setStep12(e.target.value);
                    handleInputChange();
                  }}
                  className="pr-40 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  data-testid="input-step-12"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => saveStep(12, step12, setStep12Saving, setStep12Saved)}
                    disabled={step12Saving}
                    className="h-8 px-3 text-white"
                    style={{ backgroundColor: step12Saving ? '#9f7aea' : '#8041CE' }}
                    onMouseEnter={(e) => !step12Saving && (e.currentTarget.style.backgroundColor = '#6d35b8')}
                    onMouseLeave={(e) => !step12Saving && (e.currentTarget.style.backgroundColor = '#8041CE')}
                  >
                    {step12Saving ? (
                      <>
                        <div className="h-3 w-3 mr-1 animate-spin rounded-full border-2 border-muted border-t-primary" />
                        Saving
                      </>
                    ) : step12Saved ? (
                      <>Saved</>
                    ) : (
                      <>Save</>
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      if (step12Copied) {
                        setStep12Copied(false);
                      } else {
                        navigator.clipboard.writeText(step12);
                        setStep12Copied(true);
                      }
                    }}
                    className="h-8 px-3"
                    data-testid="button-copy-step-12"
                  >
                    {step12Copied ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                        Done
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50/50" data-testid="alert-error">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}