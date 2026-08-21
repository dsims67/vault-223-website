import { useEffect, useState } from "react";
import {
  ArrowSquareOutIcon as ArrowSquareOut,
  ForkKnifeIcon as ForkKnife,
  ListIcon as List,
  MapPinIcon as MapPin,
  PhoneIcon as Phone,
  StorefrontIcon as Storefront,
} from "@phosphor-icons/react";
import { business, orderProviders } from "@/data/business";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu/" },
  { label: "Visit", href: "/visit/" },
];

function OrderPanel({ onSelect }: { onSelect?: () => void }) {
  return (
    <div className="order-panel-inner">
      <SheetTitle className="sheet-heading">Choose a delivery service</SheetTitle>
      <SheetDescription className="sheet-description">
        Your order will continue on the provider’s website or app.
      </SheetDescription>
      <div className="provider-list">
        {orderProviders.filter((provider) => provider.enabled).map((provider) => (
          <a
            key={provider.id}
            className="provider-link"
            href={provider.url}
            target="_blank"
            rel="noreferrer"
            onClick={onSelect}
          >
            <span>
              <strong>{provider.label}</strong>
              <small>{provider.note}</small>
            </span>
            <ArrowSquareOut size={23} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function SiteChrome({ logoSrc, currentPath }: { logoSrc: string; currentPath: string }) {
  const [hydrated, setHydrated] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [mobileOrderVisible, setMobileOrderVisible] = useState(false);
  const isActive = (href: string) => (href === "/" ? currentPath === "/" : currentPath.startsWith(href));

  useEffect(() => {
    setHydrated(true);
    const openOrder = () => setOrderOpen(true);
    const orderSentinel = document.querySelector<HTMLElement>("[data-mobile-order-sentinel]");
    let orderObserver: IntersectionObserver | undefined;

    if (orderSentinel) {
      const headerHeight = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--header-height"),
      ) || 72;

      orderObserver = new IntersectionObserver(
        ([entry]) => {
          setMobileOrderVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= headerHeight);
        },
        { rootMargin: `-${headerHeight}px 0px 0px`, threshold: 0 },
      );
      orderObserver.observe(orderSentinel);
    } else {
      setMobileOrderVisible(true);
    }

    window.addEventListener("vault:order", openOrder);
    return () => {
      orderObserver?.disconnect();
      window.removeEventListener("vault:order", openOrder);
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand-link" href="/" aria-label="Vault 223 home">
            <span className="header-wordmark">Vault 223</span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <Sheet open={orderOpen} onOpenChange={setOrderOpen}>
              <SheetTrigger asChild>
                <Button className="desktop-order" disabled={!hydrated}>Order Online</Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="order-sheet">
                <OrderPanel onSelect={() => setOrderOpen(false)} />
              </SheetContent>
            </Sheet>
            <Sheet open={navOpen} onOpenChange={setNavOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mobile-menu-button" aria-label="Open navigation" disabled={!hydrated}>
                  <List size={27} weight="bold" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="nav-sheet">
                <div className="mobile-nav-brand">
                  <img src={logoSrc} width="512" height="512" alt="" />
                  <span>Downtown Kokomo</span>
                </div>
                <nav className="mobile-nav" aria-label="Mobile navigation">
                  {navItems.map((item, index) => (
                    <SheetClose asChild key={item.href}>
                      <a href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                        <span>0{index + 1}</span>{item.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mobile-contact-links">
                  <a href={business.phoneHref}><Phone size={20} />{business.phone}</a>
                  <a href={business.directions} target="_blank" rel="noreferrer"><MapPin size={20} />Get directions</a>
                  <a href={business.facebook} target="_blank" rel="noreferrer"><Storefront size={20} />Facebook updates</a>
                </div>
                <Button className="mobile-nav-order" disabled={!hydrated} onClick={() => { setNavOpen(false); setOrderOpen(true); }}>
                  <ForkKnife size={19} weight="bold" /> Order Online
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <div className="mobile-order-bar" data-visible={mobileOrderVisible} aria-hidden={!mobileOrderVisible}>
        <button className={cn(buttonVariants({ variant: "primary", size: "large" }), "mobile-order-trigger")} disabled={!hydrated || !mobileOrderVisible} onClick={() => setOrderOpen(true)}>
          <ForkKnife size={19} weight="bold" /> Order Online
        </button>
      </div>
    </>
  );
}
